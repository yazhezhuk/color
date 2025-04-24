'use client';

import React, {useEffect, useRef, useState} from 'react';
import ColorPicker from "@/app/components/ColorPicker";

type ColorInputProps = {
    isBackground: boolean;
    text: string,
    hex: string
    onColorChange: (hex: string) => void
}

export default function ColorInput(props: ColorInputProps) {
    const [color, setColor] = useState(props.hex)
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
    }, []);

    //validation hook
    // useEffect(() => {
    //     //because picker always returns correct data
    //     if (usingPicker)
    //         return;
    //
    //     if (hex.length === 7)
    //
    //
    //     const isValidHex = /^([a-f\d]{6})$/i.test(hex);
    //     if (isValidHex) {
    //         const normalized = hex.startsWith('#') ? hex.slice(1) : hex;
    //
    //         const bigint = parseInt(normalized, 16);
    //         const r = (bigint >> 16) & 255;
    //         const g = (bigint >> 8) & 255;
    //         const b = bigint & 255;
    //
    //         setR(r);
    //         setG(g);
    //         setB(b);
    //     }
    // }, [hex]);

    useEffect(() => {
        setColor(props.hex);
    }, [props.hex]);

    const handleColorTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value
            .replace(/[^0-9a-fA-F]/g, '')
            .slice(0,6);

        setColor(e.currentTarget.value);

        if (e.target.value.length === 6)
            props.onColorChange(e.target.value);
    };

    const handleColorChange = (color: string)=> {
        props.onColorChange(color);
    }


    // useEffect(() => {
    //     if (skipHexUpdate.current) {
    //         skipHexUpdate.current = false;
    //         return;
    //     }
    //
    //     const rClamped = clamp(r);
    //     const gClamped = clamp(g);
    //     const bClamped = clamp(b);
    //     const toHex = (val: number) => val.toString(16).padStart(2, '0');
    //     const newHex = `#${toHex(rClamped)}${toHex(gClamped)}${toHex(bClamped)}`;
    //
    //     if (newHex.toLowerCase() !== hex.toLowerCase()) {
    //         skipRgbUpdate.current = true;
    //         setValue('name', newHex);
    //     }
    //
    //
    // }, [r, g, b]);

        return (
            <div className="flex flex-col flex-wrap rounded space-y-2">
                <label className="font-medium">{props.text}</label>
                <div className="relative w-fit">
                    <div onClick={() => setShowPicker(!showPicker)} style={{borderColor:'rgba(217, 217, 217, 1)',backgroundColor: '#'+ props.hex}} className='rounded border h-6 w-6 absolute left-2 top-1/2 -translate-y-1/2 '></div>
                    <span className="absolute left-9 top-1/2 -translate-y-1/2  pointer-events-none select-none">#</span>
                    <input
                        type="text"
                        className="w-full pl-11 py-2 border rounded outline-none"
                        maxLength={7}
                        value={color}
                        onChange={handleColorTextChange}

                    />
                </div>
                {/*rgb fields*/}
                {/*<div className="grid grid-cols-3 gap-2">*/}
                {/*    {(['r', 'g', 'b'] as const).map((color) => (*/}
                {/*        <div key={color}>*/}
                {/*            <label className="block text-sm font-medium">{color.toUpperCase()}</label>*/}
                {/*            <input*/}
                {/*                type="number"*/}
                {/*                value={color === 'r' ? r : color === 'g' ? g : b}*/}
                {/*                onChange={handleRgbChange(color)}*/}
                {/*                className="border p-2 rounded w-full"*/}
                {/*                min={0}*/}
                {/*                max={255}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <div
                    className="w-full rounded">
                    <ColorPicker style={{display: showPicker ? 'flex' : 'none'}} colorText={props.hex} onColorChange={handleColorChange} />
                </div>
            </div>
        );
}


