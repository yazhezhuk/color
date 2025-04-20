"use client"

import Image from "next/image";
import ColorInput from "@/app/components/ColorInput";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";


export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
  name: string;
};

export type AlphaColorRequest = {
  foregroundColor: string;
  foregroundColorInputType: string;
  backgroundColor: string;
  backgroundColorInputType: string;
};

const getBrightness = (r: number, g: number, b: number): number => {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Standard brightness formula
};

// Convert hex color to RGB
const hexToRgb = (hex: string): [number, number, number] => {
  let r = 0, g = 0, b = 0, a = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return [r, g, b];
};



const getColorString = (color: Color) => {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}

const getColorStringNormalized = (color: Color) => {
  return `rgba(${color.r},${color.g},${color.b},${color.a/225})`;
}

export default function Home() {

  const [fontColor, setFontColor] = useState("#ffffff");
  const [background, setBackground] = useState("#ffffff");
  const [foreground, setForeground] = useState("#ffffff");

  const [colors,setColors] = useState<Color[]>([])

  const handleBackgroundColorChange = (hex:string ) => {
    setBackground(hex);
  };

  const handleForegroundColorChange = (hex:string ) => {
    setForeground(hex);
  };

  const mutation = useMutation<void, Error, AlphaColorRequest>({mutationFn: async (req: AlphaColorRequest) : Promise<void> => {
    const res = await fetch('http://localhost:5051/Color/AlphaAdjustedColor', {
      method: "POST", body: JSON.stringify(req), headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Network response failed');
    setColors(await res.json() as Color[]);
  }, onSuccess: (data) => {
      console.log('Color adjusted:', data);
      alert('Color successfully adjusted');
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('Failed to adjust color');
    },
  });

  useEffect(() => {
    // Get the RGB values from the background color
    const [r, g, b] = hexToRgb(background);

    // Calculate the brightness of the background color
    const brightness = getBrightness(r, g, b);

    // If brightness is less than or equal to 128, set text color to white (dark background)
    // Otherwise, set text color to black (light background)
    if (brightness <= 128) {
      setFontColor('white');
    } else {
      setFontColor('black');
    }
  }, [background]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colorData: AlphaColorRequest = {
      foregroundColor: foreground,
      foregroundColorInputType: 'hex',
      backgroundColor: background,
      backgroundColorInputType: 'hex'
    };
    console.log(colorData);
    mutation.mutate(colorData); // Trigger the mutation to submit the color data
  };

  // console.log(colors);

  return (
    <div className="grid grid-rows-[1/4fr_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="p-6 sm:p-12 flex flex-col gap-[32px] md:grid md:grid-cols-2" style={{backgroundColor: background, color: fontColor}}>
        <ColorInput isBackground={false} text={'Enter pure color'}  onColorChange={handleForegroundColorChange}/>
        <ColorInput isBackground={true} text={'Enter background color'} onColorChange={handleBackgroundColorChange}/>
        {mutation.isPending ? (
            'Adding todo...'
        ) : (
            <>
              {mutation.isError ? (
                  <div>An error occurred: {mutation.error.message}</div>
              ) : null}

              {mutation.isSuccess ? <div>Fetched!</div> : null}

              <button className="m-auto rounded-xl h-12 w-1/3 col-span-2 border-1" onClick={handleSubmit}>
                Get colors
              </button>
            </>
        )}
        <div className="grid col-span-2 grid-cols-2 content-center">
          <label className="m-auto hidden sm:flex">Original color</label>
          <label className="m-auto hidden sm:flex">Filtered color</label>
          <div className="hidden rounded sm:flex p-6 flex-col gap-[32px] items-center" style={{backgroundColor: fontColor ? 'white' : 'black'}}>
            { colors?.map((item ,index) =>
                <div className="rounded w-14 justify-center items-center h-14" key={index} style={{ backgroundColor: getColorStringNormalized(item) }}>
                  .</div>)
            }
          </div>
          <div className="grid p-2 col-span-2 sm:col-span-1 flex-col gap-[24px] items-center" style={{backgroundColor: background, color: fontColor}}>
            { colors?.map((item ,index) =>
                <div className="grid grid-cols-2 justify-center items-center h-14" key={index} >
                  <div className="flex rounded ml-5 w-14 h-14" style={{ backgroundColor: getColorStringNormalized(item) }}></div>
                  <div className="">
                    <div className="font-bold text-sm md:text-base w-auto"> <span className="font-normal">Hex:</span>  #{item.name} </div>
                    <div className="font-bold text-sm md:text-base w-auto"> <span className="font-normal">RGBA:</span> {getColorString(item)} </div>
                  </div>
                </div>)
            }
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
