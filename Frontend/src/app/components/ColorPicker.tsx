import React, {useState} from 'react';
import { HexColorPicker } from 'react-colorful';


export default function ColorPicker({ style,onColorChange, colorText }: {
    style?: React.CSSProperties;
    onColorChange: (color: string) => void,
    colorText: string }) {


    const handleChange = (newColor: string) => {
        onColorChange(newColor.slice(1));
    };

    return (
        <div style={style} className="flex flex-col">
            <div className="">
                <HexColorPicker style={{width:'100%', height:100, scale: 1}} color={colorText} onChange={handleChange} />
            </div>
        </div>
    );
}