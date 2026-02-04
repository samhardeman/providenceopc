"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X } from "lucide-react";

const navLinks = [
  { name: "Events", path: "/events" },
  { name: "Missions", path: "/missions" },
  { name: "About", path: "/about" },
  { name: "Join Us", path: "/join-us" },
  { name: "Give", path: "/give" },
  { name: "Sermons", path: "/sermons" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full p-6 md:p-8 relative z-[100]">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between relative">
          
          {/* Left Links */}
          <div className="hidden md:flex gap-12 text-2xl font-serif">
            {navLinks.slice(0, 3).map((l) => (
              <Link key={l.name} href={l.path} className="hover:opacity-60 transition">
                {l.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-start md:items-center">
            <h1 
              className="text-3xl md:text-5xl font-serif uppercase leading-none"
              style={{ letterSpacing: "-0.075em" }}
            >
              Providence
            </h1>
            <span className="w-full text-center text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase opacity-80 mt-1 md:mt-2">
              Orthodox Presbyterian Church
            </span>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex gap-12 text-2xl font-serif ml-auto">
            {navLinks.slice(3).map((l) => (
              <Link key={l.name} href={l.path} className="hover:opacity-60 transition">
                {l.name}
              </Link>
            ))}
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden ml-auto p-2 relative z-[110]">
            <BookOpen size={30} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center space-y-8 text-white"
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 p-2"><X size={40} /></button>
            {navLinks.map((l) => (
              <Link 
                key={l.name} 
                href={l.path} 
                className="text-4xl font-serif" 
                onClick={() => setMenuOpen(false)}
              >
                {l.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}