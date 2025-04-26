import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: "export",
    basePath: '/tinteligent',
    assetPrefix: '/tinteligent/',
    eslint: {
        ignoreDuringBuilds: true,
    },
};
module.exports = nextConfig;

export default nextConfig;
