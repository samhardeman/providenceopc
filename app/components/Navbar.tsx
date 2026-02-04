// app/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const leftLinks = [
    { name: "Events", href: "#" },
    { name: "Missions", href: "#" },
    { name: "About", href: "#" },
  ];

  const rightLinks = [
    { name: "Join Us", href: "#" },
    { name: "Give", href: "#" },
    { name: "Sermons", href: "#" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white p-6 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        
        {/* Desktop Left Links */}
        <div className="hidden md:flex gap-8 text-3xl font-serif">
          {leftLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gray-300 transition">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo Area */}
        <div className="flex flex-col md:items-center items-start">
          <h1 className="text-3xl md:text-4xl font-serif tracking-tighter uppercase">Providence</h1>
          <span className="text-xs md:text-sm font-sans tracking-wide opacity-90">
            Orthodox Presbyterian Church
          </span>
        </div>

        {/* Desktop Right Links */}
        <div className="hidden md:flex gap-8 text-3xl font-serif">
          {rightLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gray-300 transition">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Trigger (Book Icon) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition"
        >
          {isOpen ? <X size={28} /> : <BookOpen size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md md:hidden flex flex-col items-center py-8 gap-6 font-serif text-xl animate-in slide-in-from-top-5">
          {allLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}