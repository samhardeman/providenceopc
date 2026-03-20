import type { NextConfig } from "next";

// Check if we are building for production (GitHub Pages)
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 1. Automatically use the repository name as the base path on GitHub Pages, 
  // but keep it at the root ("") for local development.
  // **Note:** If your GitHub repository is named something other than "providenceopc", change this string!
  basePath: isProd ? "/providenceopc" : "",
  
  // 2. Required for GitHub Pages static hosting
  output: "export", 
  
  images: {
    // 3. Disables Next.js server-side image optimization, which is required for static hosts
    unoptimized: true, 
  },
};

export default nextConfig;