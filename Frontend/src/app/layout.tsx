"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
// import Providers from '../providers';
import Navbar from "@/components/Navbar";
// import {AlertBox} from "@/app/AlertBox";
import React from "react";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {




  return (
      <html lang="en">
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Color</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar/>
        <div>{children}</div>
        <Footer/>
      </body>
      </html>
  );
}
