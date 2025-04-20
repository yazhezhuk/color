"use client"

import Image from "next/image";
import ColorInput from "@/app/components/ColorInput";
import {useState} from "react";


export type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
  name: string;
};

const getColorString = (color: Color) => {
  return `rgba(${color.r},${color.g},${color.b},${color.a/255})`;
}

export default function Home() {

  // const query = JSON.stringify({
  //   ForegroundColor: '121,113,233,151',
  //   ForegroundColorInputType: 'rgb',
  //   BackgroundColor:'255,255,255,255',
  //   BackgroundColorInputType:'rgb'
  // });
  // const res = await fetch('http://localhost:5051/Color/AlphaAdjustedColor', {
  //   method: "POST", body: query, headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  //
  // const colors: Color[] = await res.json();


  const [hex, setHex] = useState("#ffffff");

  const handleColorChange = (hex:string ) => {
    setHex(hex);
  };


  // console.log(colors);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="grid grid-cols-2 gap-[32px] row-start-2 items-center sm:items-start" style={{backgroundColor: hex}}>
        <ColorInput text={'Enter pure color'} onColorChange={handleColorChange}/>
        {/*<div className="flex w-28  flex-col gap-[32px] items-center">*/}
        {/*{ colors.map((item ,index) =>*/}
        {/*    <div className="flex w-14 justify-center items-center h-14" key={index} style={{ backgroundColor: getColorString(item) }}>*/}
        {/*  .</div>)*/}
        {/*}*/}
        {/*</div>*/}
        {/*<div className="flex flex-col w-28 gap-[32px] bg-white items-center">*/}
        {/*  { colors.map((item ,index) =>*/}
        {/*      <div className="flex w-14 justify-center items-center h-14" key={index} style={{ backgroundColor: getColorString(item) }}>*/}
        {/*        .</div>)*/}
        {/*  }*/}
        {/*</div>*/}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
      </footer>
    </div>
  );
}
