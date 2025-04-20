import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    output: "export",
    basePath: '/color',
    assetPrefix: '/color/',
    eslint: {
        ignoreDuringBuilds: true,
    },
};
module.exports = nextConfig;

export default nextConfig;
