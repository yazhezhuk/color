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
          <title>Tinteligent - foreground alpha adjusted color generation</title>
          <meta name="author" content="@yazhezhuk & @korytsky"/>
          <meta name="description"
                content="Auto-generate foreground tints with transparency — perfect look on any background."/>
          <meta name="google-site-verification" content="qv2CUDdad1cFsb6maQG2gCa-wrW-7UbfXz_8KfWqpTc" />
          <link rel="icon" type="image/png" sizes="32x32" href="/tinteligent/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/tinteligent/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/tinteligent/favicon-16x16.png"/>
          <link rel="manifest" href="/tinteligent/manifest.json"/>
          <meta name="theme-color" content="#ffffff"/>

          {/*Google tag (gtag.js)*/}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-TRV5R9MXEB"></script>
          <script
              dangerouslySetInnerHTML={{
                  __html: ` window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-TRV5R9MXEB');`,
              }}
          />

      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Navbar/>
      <div>{children}</div>
      <Footer/>
      </body>
      </html>
  );
}
