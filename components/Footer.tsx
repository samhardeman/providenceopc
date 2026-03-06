"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, QrCode } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide this global footer on the main landing page
  if (pathname === "/") {
    return null;
  }
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 py-20 md:py-24 px-6 md:px-12 font-sans border-t border-neutral-800 relative z-50">
      {/* Using a 12-column grid on md+ screens allows us to give the Brand column 
        more width, perfectly balancing the spacing between the other columns. 
      */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-16">
        
        {/* Col 1: Brand & Desc (Span 4) */}
        <div className="space-y-4 md:col-span-4 lg:col-span-5">
          <Link href="/" className="inline-block">
            <h2 className="text-4xl md:text-3xl font-serif text-white uppercase tracking-tighter leading-none mb-1">
              Providence
            </h2>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] opacity-80 whitespace-nowrap">
              Orthodox Presbyterian Church
            </p>
          </Link>
          <p className="text-sm leading-relaxed mt-4 max-w-sm">
            Ascribe to the LORD the glory due his name; worship the LORD in the splendor of holiness.
          </p>
        </div>

        {/* Col 2: Quick Links (Span 2) */}
        <div className="md:col-span-2 lg:col-span-2">
          <h3 className="text-white font-serif text-xl mb-6">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/events" className="hover:text-white transition">Events</Link></li>
            <li><Link href="/outreach" className="hover:text-white transition">Outreach</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/join-us" className="hover:text-white transition">Join Us</Link></li>
            <li><Link href="/give" className="hover:text-white transition">Give</Link></li>
            <li><Link href="/sermons" className="hover:text-white transition">Sermons</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact & Visit (Span 3) */}
        <div className="md:col-span-3 lg:col-span-3">
          <h3 className="text-white font-serif text-xl mb-6">Visit Us</h3>
          <address className="not-italic text-sm space-y-2 mb-8">
            <p>7575 E Redfield Rd #101</p>
            <p>Scottsdale, AZ 85260</p>
          </address>
          <h3 className="text-white font-serif text-xl mb-6">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@providencescottsdale.com" className="hover:text-white transition">info@providencescottsdale.com</a></li>
          </ul>
        </div>

        {/* Col 4: Resources & Social (Span 3) */}
        <div className="flex flex-col md:items-end md:col-span-3 lg:col-span-2">
           <div className="flex gap-6 md:gap-4 mb-10">
             <Link href="https://instagram.com" target="_blank" className="hover:text-white transition"><Instagram size={24}/></Link>
             <Link href="https://facebook.com" target="_blank" className="hover:text-white transition"><Facebook size={24}/></Link>
           </div>
           
           <div className="flex gap-4 items-center">
             <div className="text-left md:text-right text-sm space-y-3 mr-2">
                <Link href="/blog" className="block hover:text-white transition">Blog</Link>
                <Link href="https://opc.org/" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition">The OPC</Link>
                <Link href="/library" className="block hover:text-white transition">Library</Link>
             </div>
             <div className="bg-white p-2 rounded-sm shrink-0">
               <QrCode className="w-16 h-16 text-black" />
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-[1200px] mx-auto border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60 text-center md:text-left">
        <p>© {new Date().getFullYear()} Providence Orthodox Presbyterian Church. All rights reserved.</p>
        <p>Providence is a thankful member of the Orthodox Presbyterian Church.</p>
      </div>
    </footer>
  );
}