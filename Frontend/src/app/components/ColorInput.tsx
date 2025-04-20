'use client';

import {useEffect, useRef} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Color} from "@/app/page";


function clamp(value: number) {
    return Math.max(0, Math.min(255, value));
}


type ColorInputProps = {
    isBackground: boolean;
    text: string
    onColorChange?: (hex: string) => void
}

export default function ColorInput(props: ColorInputProps) {
    const {
        register,
        setValue,
        watch,
        control,
        formState: {errors},
    } = useForm<Color>({
        defaultValues: {
            name: '#000000',
            r: 255,
            g: 255,
            b: 255,
            a: 0
        },
    });

    const hex = watch('name');
    const r = watch('r');
    const g = watch('g');
    const b = watch('b');
    const a = watch('a');


    const skipHexUpdate = useRef(false);
    const skipRgbUpdate = useRef(false);

    // ⬅️ When hex changes → update RGB
    useEffect(() => {
        props.onColorChange?.(hex);
        if (skipRgbUpdate.current) {
            skipRgbUpdate.current = false;
            return;
        }

        const isValidHex = /^#?([a-f\d]{6})$/i.test(hex);
        if (isValidHex) {
            const normalized = hex.startsWith('#') ? hex.slice(1) : hex;
            const bigint = parseInt(normalized, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;

            skipHexUpdate.current = true;
            setValue('r', r);
            setValue('g', g);
            setValue('b', b);
        }
    }, [hex]);

    useEffect(() => {
        if (skipHexUpdate.current) {
            skipHexUpdate.current = false;
            return;
        }

        const rClamped = clamp(r);
        const gClamped = clamp(g);
        const bClamped = clamp(b);
        const toHex = (val: number) => val.toString(16).padStart(2, '0');
        const newHex = `#${toHex(rClamped)}${toHex(gClamped)}${toHex(bClamped)}`;

        if (newHex.toLowerCase() !== hex.toLowerCase()) {
            skipRgbUpdate.current = true;
            setValue('name', newHex);
        }


    }, [r, g, b]);

    const handleRgbChange = (field: 'r' | 'g' | 'b') => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));  // Clamp value
        setValue(field, value);  // Set the clamped value
    }


        return (
            <div className="p-4 border rounded max-w-md space-y-4">
                <label className="block text-sm font-medium">{props.text}</label>
                <input
                    type="text"
                    {...register('name', {
                        pattern: {
                            value: /^#?([a-fA-F0-9]{6})$/,
                            message: 'Invalid hex color',
                        },
                    })}
                    className="border p-2 rounded w-full"
                    placeholder="#fffffff"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <div className="grid grid-cols-3 gap-2">
                    {(['r', 'g', 'b'] as const).map((color) => (
                        <div key={color}>
                            <label className="block text-sm font-medium">{color.toUpperCase()}</label>
                            <input
                                type="number"
                                value={color === 'r' ? r : color === 'g' ? g : b}
                                onChange={handleRgbChange(color)}
                                className="border p-2 rounded w-full"
                                min={0}
                                max={255}
                            />
                        </div>
                    ))}
                </div>

                <div
                    hidden={props.isBackground}
                    className="w-full h-12 rounded mt-4 border"
                    style={{backgroundColor: hex}}
                />
            </div>
        );
}


