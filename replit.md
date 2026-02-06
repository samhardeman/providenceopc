# Providence OPC Website

## Overview
A church website for Providence Orthodox Presbyterian Church built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Features a full-screen scroll-based design with animated transitions using Framer Motion.

## Project Architecture
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), DM Sans (sans-serif) via next/font/google

## Project Structure
```
app/
  layout.tsx        - Root layout with font configuration
  page.tsx          - Homepage with 4-section scroll experience
  globals.css       - Global styles and Tailwind imports
  library/page.tsx  - Library page
components/
  Navbar.tsx        - Navigation bar component
public/
  image1-6.jpg      - Background images
```

## Development
- Dev server: `npm run dev` (runs on port 5000, host 0.0.0.0)
- Build: `npm run build`
- Start: `npm run start` (runs on port 5000, host 0.0.0.0)

## Deployment
- Type: Autoscale
- Build: `npm run build`
- Run: `npm run start`

## Recent Changes
- Configured Next.js for Replit environment (port 5000, 0.0.0.0 host, allowedDevOrigins)
