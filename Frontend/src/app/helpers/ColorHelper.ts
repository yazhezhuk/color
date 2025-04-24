import {Color} from "@/app/page";

type RGB = { r: number; g: number; b: number };

// Blends a foreground color over a white background
function blendOverBg(fg: Color,bg:Color): RGB {
    const alpha = fg.a / 255;
    return {
        r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
        g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
        b: Math.round(fg.b * alpha + bg.b * (1 - alpha)),
    };
}

export const invertColor = (hex: string): string => {
    const rgb = hexToRgb(hex).map(c => 255-c)
    return rgbToHex(rgb[0],rgb[1],rgb[2]);
}

export const valueInRange = (val: number, range: [number,number]): boolean => {
    return val >= range[0] && val <= range[1]
}


// Checks if two RGB colors are equal
function colorsEqual(c1: RGB, c2: RGB): boolean {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
}

export const getBrightness = (r: number, g: number, b: number): number => {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Standard brightness formula
};

// Convert hex color to RGB
export const hexToRgb = (hex: string): [number, number, number] => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
    }
    return [r, g, b];
};

export const hexToRgba = (hex: string): [number, number, number, number] => {
    let r = 0, g = 0, b = 0, a = 0;
    if (hex.length === 9) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
        a = parseInt(hex.slice(7, 9), 16);
    }
    return [r, g, b, a];
};

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
    const toHex = (value: number): string =>
        Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (value: number): string =>
        Math.max(0, Math.min(255, value)).toString(16).padStart(2, '0');

    return `${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function clamp(num : number, min :number, max: number) {
    return num <= min
        ? min
        : num >= max
            ? max
            : num
}

// Finds all (R,G,B,A) combinations that appear as the given pure RGB color on white background
export function findMatchingAlphaColors(target: string, bg:string): Color[] {
    const matches: Color[] = [];

    const targetColor = {v: hexToRgb(target),name: target}
    const bgColor = {v: hexToRgb(bg),name: bg}
    const foreground:Color = {r: targetColor.v[0],g:targetColor.v[1],b:targetColor.v[2],a:255, name: targetColor.name}
    const background:Color = {r: bgColor.v[0],g:bgColor.v[1],b:bgColor.v[2],a:255, name: bgColor.name}



    for (let a = 1; a <= 255; a+=0.5) {
        const alpha = a / 255;

        // Reverse blend formula: C = (F * A) + (B * (1 - A))
        const r = Math.round((foreground.r - background.r * (1 - alpha)) / alpha);
        const g = Math.round((foreground.g - background.g * (1 - alpha)) / alpha);
        const b = Math.round((foreground.b - background.b * (1 - alpha)) / alpha);

        // Ensure components are valid (0–255)
        if ([r, g, b].every(c => c >= 0 && c <= 255)) {
            const candidate: Color = { r, g, b, a: Number(a.toFixed(3)), name:rgbaToHex(r,g,b,Number(a.toFixed(0)))};
            const blended = blendOverBg(candidate, background);
            if (colorsEqual(blended, foreground)) {
                matches.push(candidate);
            }
        }
    }
    return matches;
}