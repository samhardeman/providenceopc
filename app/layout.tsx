import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Footer from "@/components/Footer"; // <-- Add this import
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "Providence OPC",
  description: "Ascribe to the LORD the glory due his name.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} font-sans antialiased flex flex-col min-h-screen`}>
        {/* Main content wrapper pushes footer to bottom */}
        <div className="flex-grow">
          {children}
        </div>
        <Footer /> {/* <-- Add the Footer here */}
      </body>
    </html>
  );
}