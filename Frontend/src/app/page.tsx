'use client'

import ColorInput from "@/components/ColorInput";
import React, {useEffect, useState} from "react";
// import {useMutation} from "@tanstack/react-query";
import {
  findMatchingAlphaColors,
  getBrightness,
  hexToRgb,
  invertColor,
  rgbToHex,
  valueInRange
} from "@/helpers/ColorHelper";
import {toNumber} from "lodash";
import {ColorCard} from "@/components/ColorCard";

const isGithubPages = () => process.env.NEXT_PUBLIC_GITHUB_PAGES=="true";

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

export default function Home() {

  const [fontColor, setFontColor] = useState("ffffff");
  const [secondaryFontColor, setSecondaryFontColor] = useState('aaaaaa');

  const [foregroundFontColor, setForegroundFontColor] = useState("white");
  const [secondaryForegroundFontColor, setSecondaryForegroundFontColor] = useState("aaaaaa");

  const [previousBrightness, setPreviousBrightness] = useState(0);

  const [background, setBackground] = useState("f5f4f8");
  const [foreground, setForeground] = useState("dddeef");

  const [maxColors, setMaxColors] = useState(5);
  const [maxColorsNormalized, setMaxColorsNormalized] = useState(5);

  const [alphaRange, setAlphaRange] = useState<[number,number]>([0,100]);
  const [alphaPrecision, setAlphaPrecision] = useState(2);

  const [colors,setColors] = useState<Color[]>([])

  const getColorStringNormalized = (color: Color) => {
    return `rgba(${color.r},${color.g},${color.b},${(Number((color.a/255))).toFixed(alphaPrecision+1)})`;
  }

  const getColorString = (color: Color) => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  }

  // const mutation = useMutation<void, Error, AlphaColorRequest>({mutationFn: async (req: AlphaColorRequest) : Promise<void> => {
  //   const res = await fetch('http://localhost:5051/Color/AlphaAdjustedColor', {
  //     method: "POST", body: JSON.stringify(req), headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (!res.ok) throw new Error('Network response failed');
  //   setColors(await res.json() as Color[]);
  // }, onSuccess: (data) => {
  //     console.log('Color adjusted:', data);
  //     alert('Color successfully adjusted');
  //   },
  //   onError: (error) => {
  //     console.error('Error:', error);
  //     alert('Failed to adjust color');
  //   },
  // });



  useEffect(() => {
    setColors([])
    // Get the RGB values from the background color
    const [r, g, b] = hexToRgb(background);

    // Calculate the brightness of the background color
    const brightness = getBrightness(r, g, b);

    // If brightness is less than or equal to 128, set text color to white (dark background)
    // Otherwise, set text color to black (light background)
    if ((brightness <= 128 && previousBrightness > 128) ||
        (brightness > 128 && previousBrightness <= 128)) {
      setFontColor(invertColor(fontColor));
      setSecondaryFontColor(invertColor(secondaryFontColor));
    }
    setPreviousBrightness(brightness);
  }, [background]);

  useEffect(() => {
    setColors([])
    // Get the RGB values from the background color
    const [r, g, b] = hexToRgb(foreground);

    // Calculate the brightness of the background color
    const brightness = getBrightness(r, g, b);

    // If brightness is less than or equal to 128, set text color to white (dark background)
    // Otherwise, set text color to black (light background)
    if (brightness <= 128) {
      setSecondaryForegroundFontColor('aaaaaa')
      setForegroundFontColor('white');
    } else {
      setSecondaryForegroundFontColor('555555')
      setForegroundFontColor('black');
    }
  }, [foreground]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colorData: AlphaColorRequest = {
      foregroundColor: '#' + foreground,
      foregroundColorInputType: 'hex',
      backgroundColor: '#' + background,
      backgroundColorInputType: 'hex'
    };

    console.log(colorData);

    if (isGithubPages()) {
      setColors(findMatchingAlphaColors(foreground,background))
      return
    }
    // mutation.mutate(colorData);
  };

  //filters
  const handleAlphaRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case '1': setAlphaRange([0.1,5]); break;
      case '2': setAlphaRange([5,10]); break;
      case '3': setAlphaRange([10,15]); break;
      case '4': setAlphaRange([15,20]); break;
      case '5': setAlphaRange([0.1,100]); break;
    }
  }
  const handleAlphaPrecisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case '1': setAlphaPrecision(1); break;
      case '2': setAlphaPrecision(2); break;
      case '3': setAlphaPrecision(3); break;
    }
  }
  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const range = [5,10,15,20]
    const i = Math.round(toNumber(e.target.value)/5) - 1

    setMaxColorsNormalized(range[i])
    setMaxColors(toNumber(e.target.value))
  }

  const handleClearFilters = ( e: React.FormEvent) => {
    setAlphaPrecision(2)
    setMaxColors(17.55)
    setMaxColorsNormalized(20)
    setAlphaRange([0.1,100])
  }

  function parseRgba(input: string): Color {
    const regex = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*\.?\d+)\s*)?\)/i;
    const match = input.match(regex);
    // @ts-ignore
    const r = parseInt(match[1], 10);
    // @ts-ignore
    const g = parseInt(match[2], 10);
    // @ts-ignore
    const b = parseInt(match[3], 10);
    // @ts-ignore
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
    return { r, g, b, a, name: rgbToHex(r, g, b) };
  }

  const filterColor = (colors: Color[]): Color[] => {
    const filtered = colors
        .filter(c => valueInRange(Number((c.a/255*100).toFixed(alphaPrecision)),alphaRange))
        .map(c => getColorStringNormalized(c))
        .filter((val,idx,array) => array.indexOf(val) === idx)
        .map(s => parseRgba(s))
    if (filtered.length <= maxColorsNormalized) return filtered
    else return filtered.slice(0, maxColorsNormalized)
  }

  const getItemName = (item: Color) => {
    if (!isGithubPages())
      return item.name.slice(2) + item.name.slice(0,2)
    return item.name
  }

  return (
    <div className="flex px-4 py-8 w-full font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-row container m-auto gap-[32px] md:flex-col" >
        
        <aside className="flex flex-col space-y-4 w-[312px]">

           {/*text*/}
          <div className="flex flex-col">
            {/* <span style={{fontSize: 22, backgroundImage: `linear-gradient(45deg, ${'#'+foreground}, ${'#'+background})`}} className='bg-clip-text text-transparent font-bold'>Tintelligent</span> */}
            <span style={{fontSize: 22, color: '#121212'}} className='text-transparent font-bold'>Choose Colors</span>
            <span style={{fontSize: 16, color: '#999999'}} className='font-light'>Auto-generate foreground tints with transparency — perfect look on any background.</span>
          </div>

          {/*input bar*/}
          <div className="flex flex-col space-y-4">
            <ColorInput isBackground={false} text={'Foreground'} hex={foreground} onColorChange={setForeground}/>
            <ColorInput isBackground={true} text={'Background'} hex={background} onColorChange={setBackground}/>
            {/* <button style={{backgroundColor: '#'+ fontColor, color: '#'+invertColor(fontColor)}} className="font-medium rounded-lg py-2 w-full border-1" onClick={handleSubmit}>
              Get colors
            </button> */}
            <button style={{backgroundColor: '#121212', color: '#ffffff'}} className="font-medium rounded-lg py-2 w-full border-1" onClick={handleSubmit}>
              Get colors
            </button>

            <div className="flex flex-col">
              <label className="text-sm font-medium">Select range</label>

              <input
                type="range"
                className=" rounded "
                value={maxColors}
                onChange={handleRange}
                max={17.55}
                min={7.45}
                step="0.1"
                style={{accentColor: 'black',transitionProperty: 'all', transitionDuration: '0.5s', transitionTimingFunction: 'linear'}}
              />
              <span className="text-sm font-medium m-auto">{maxColorsNormalized}</span>
            </div>
          </div>
          {/* {mutation.isPending ? (
            'Adding todo...'
        ) : (
            <>
              {mutation.isError ? (
                  <div>An error occurred: {mutation.error.message}</div>
              ) : null}

              {mutation.isSuccess ? <div>Fetched!</div> : null}
            </>
        )} */}
        </aside>

        <div className="main-wrapper flex-col flex w-full">
          <div className="flex flex-col">
            <span style={{fontSize: 22}} className='font-bold'>Alpha adjusted tints</span>
            <div className="flex flex-row my-3 gap-4">
              {/*filters*/}
              <div className="flex flex-col gap-1 w-full">
                <span style={{fontSize: 16, color: '#999999'}} className='font-light'>Select opacity range</span>
                <select className="rounded p-1 mx-1" style={{backgroundColor: '#0000000F'}} defaultValue='5' onChange={handleAlphaRangeChange}>
                  <option value="1">0-5</option>
                  <option value="2">5-10</option>
                  <option value="3">10-15</option>
                  <option value="4">15-20</option>
                  <option value="5">0-100</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <span style={{fontSize: 16, color: '#999999'}} className='font-light'>Select alpha precision</span>
                <select className="rounded p-1 mx-1" style={{backgroundColor: '#0000000F'}} defaultValue='2' onChange={handleAlphaPrecisionChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <span style={{fontSize: 16, color: '#999999'}} className='font-light'>Select count colors</span>

                {/* Counts colors // add onchange please*/}
                <select className="rounded p-1 mx-1" style={{backgroundColor: '#0000000F'}} defaultValue='2'>
                  <option value="1">5</option>
                  <option value="2">10</option>
                  <option value="3">20</option>
                  <option value="4">30</option>
                  <option value="5">40</option>
                  <option value="6">50</option>
                </select>
              </div>
            </div>
          </div>

          {/*colorі section*/}
          <div className={`grid mt-7 p-6 grid-cols-5 grid-rows-4 rounded-xl gap-[12px]`} style={{backgroundColor: '#'+background, color: foregroundFontColor}}>
            { colors.length !== 0
                ?
                (filterColor(colors).length !== 0 ?
                    (filterColor(colors).map((item ,index) =>
                      <ColorCard style={{backgroundColor: getColorString(item)}} key={index} hex={getItemName(item)}
                                 alpha={(item.a * 100).toFixed(alphaPrecision) + '%'}/>
                    )) : (<div className="flex flex-col items-center space-y-5 row-span-4 col-span-5 justify-center">
                      <div className="flex flex-col items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 4C9.37333 4 4 9.37333 4 16C4 22.6267 9.37333 28 16 28C17.1067 28 18 27.1067 18 26C18 25.48 17.8 25.0133 17.48 24.6533C17.1733 24.3067 16.9733 23.84 16.9733 23.3333C16.9733 22.2267 17.8667 21.3333 18.9733 21.3333H21.3333C25.0133 21.3333 28 18.3467 28 14.6667C28 8.77333 22.6267 4 16 4ZM8.66667 16C7.56 16 6.66667 15.1067 6.66667 14C6.66667 12.8933 7.56 12 8.66667 12C9.77333 12 10.6667 12.8933 10.6667 14C10.6667 15.1067 9.77333 16 8.66667 16ZM12.6667 10.6667C11.56 10.6667 10.6667 9.77333 10.6667 8.66667C10.6667 7.56 11.56 6.66667 12.6667 6.66667C13.7733 6.66667 14.6667 7.56 14.6667 8.66667C14.6667 9.77333 13.7733 10.6667 12.6667 10.6667ZM19.3333 10.6667C18.2267 10.6667 17.3333 9.77333 17.3333 8.66667C17.3333 7.56 18.2267 6.66667 19.3333 6.66667C20.44 6.66667 21.3333 7.56 21.3333 8.66667C21.3333 9.77333 20.44 10.6667 19.3333 10.6667ZM23.3333 16C22.2267 16 21.3333 15.1067 21.3333 14C21.3333 12.8933 22.2267 12 23.3333 12C24.44 12 25.3333 12.8933 25.3333 14C25.3333 15.1067 24.44 16 23.3333 16Z" fill={"#"+fontColor}/>
                        </svg>

                        <span style={{color: '#'+fontColor}} className='font-medium text-lg text-center'>No matching tints found</span>

                        <span style={{color: '#'+secondaryFontColor}} className='text-md'>Try adjusting foreground or background color</span>
                      </div>

                      <span style={{color: '#'+secondaryFontColor}} className='text-md'>OR</span>
                      <button style={{backgroundColor: '#'+ fontColor, color: '#'+invertColor(fontColor)}} className="rounded-lg font-medium py-2 w-1/6 border-1" onClick={handleClearFilters}>
                        Clear filters
                      </button>
                    </div>))
                :
                (<div className="flex flex-col items-center row-span-4 col-span-5 justify-center">
                  <svg className="" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C9.37333 4 4 9.37333 4 16C4 22.6267 9.37333 28 16 28C17.1067 28 18 27.1067 18 26C18 25.48 17.8 25.0133 17.48 24.6533C17.1733 24.3067 16.9733 23.84 16.9733 23.3333C16.9733 22.2267 17.8667 21.3333 18.9733 21.3333H21.3333C25.0133 21.3333 28 18.3467 28 14.6667C28 8.77333 22.6267 4 16 4ZM8.66667 16C7.56 16 6.66667 15.1067 6.66667 14C6.66667 12.8933 7.56 12 8.66667 12C9.77333 12 10.6667 12.8933 10.6667 14C10.6667 15.1067 9.77333 16 8.66667 16ZM12.6667 10.6667C11.56 10.6667 10.6667 9.77333 10.6667 8.66667C10.6667 7.56 11.56 6.66667 12.6667 6.66667C13.7733 6.66667 14.6667 7.56 14.6667 8.66667C14.6667 9.77333 13.7733 10.6667 12.6667 10.6667ZM19.3333 10.6667C18.2267 10.6667 17.3333 9.77333 17.3333 8.66667C17.3333 7.56 18.2267 6.66667 19.3333 6.66667C20.44 6.66667 21.3333 7.56 21.3333 8.66667C21.3333 9.77333 20.44 10.6667 19.3333 10.6667ZM23.3333 16C22.2267 16 21.3333 15.1067 21.3333 14C21.3333 12.8933 22.2267 12 23.3333 12C24.44 12 25.3333 12.8933 25.3333 14C25.3333 15.1067 24.44 16 23.3333 16Z" fill={"#"+fontColor}/>
                  </svg>
                    <span style={{color: '#'+fontColor}} className='font-medium content-center row-span-4 text-lg text-center'>Start by selecting colors</span>
                </div>)
            }
          </div>


          {/*ui example*/}
          <div className={`flex flex-col col-start-2 mt-7 rounded-xl gap-[12px]`} >
            <div className="flex flex-col">
              <span style={{fontSize: 22}} className='font-bold'>UI Example</span>
              <span style={{fontSize: 16, color: '#999999'}} className='font-light'>Tintelligent</span>
            </div>
            <div className="grid p-6 grid-cols-2 rounded-xl gap-[12px]" style={{backgroundColor: '#'+background, color: '#'+fontColor}}>
              <div className="flex flex-col gap-y-5">
                <span className='font-medium text-lg'>Before adjustment</span>
                <div>
                  <span style={{color: '#'+secondaryFontColor}} className='text-md'>Input label</span>
                  <div  style={{backgroundColor:'#'+foreground,color: foregroundFontColor}} className='p-3 rounded-lg w-3/4 '>
                    Placeholder
                  </div>
                </div>
                <div style={{backgroundColor:'#'+foreground,color: foregroundFontColor}} className='p-5 rounded-lg w-3/4 '>
                  <span className='font-medium text-lg'>Card label</span>
                  <div className="mt-3">
                    <span style={{color: '#'+secondaryForegroundFontColor}} className='text-md'>Input label</span>
                    <div style={{'--color': '23B57373FF',borderColor: '#'+secondaryForegroundFontColor,backgroundColor:'#'+foreground,color: foregroundFontColor} as React.CSSProperties} className='p-3 border border-dashed rounded-lg w-3/4 '>
                      Placeholder
                    </div>
                  </div>
                </div>
              </div>
              { colors.length !== 0
                  ?
                  (<div className="flex flex-col gap-y-5">
                <span className='font-medium text-lg'>After adjustment</span>
                <div>
                  <span style={{color: '#'+secondaryFontColor}} className='text-md'>Input label</span>
                  <div  style={{backgroundColor:getColorStringNormalized(colors[0]),color: foregroundFontColor}} className='p-3 rounded-lg w-3/4 '>
                    Placeholder
                  </div>
                </div>
                <div style={{backgroundColor:'#' + foreground,color: foregroundFontColor}} className='p-5 rounded-lg w-3/4 '>
                  <span className='font-medium text-lg'>Card label</span>
                  <div className="mt-3">
                    <span style={{color: '#'+secondaryForegroundFontColor}} className='text-md'>Input label</span>
                    <div style={{'--color': '23B57373FF',borderColor: '#'+secondaryForegroundFontColor,backgroundColor:getColorStringNormalized(colors[0]),color: foregroundFontColor} as React.CSSProperties} className='p-3 border border-dashed rounded-lg w-3/4 '>
                      Placeholder
                    </div>
                  </div>
                </div>
              </div>)
                  :
                  (<span style={{color: '#'+fontColor}} className='font-medium content-center text-lg text-center'>Waiting for your input...</span>)}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
