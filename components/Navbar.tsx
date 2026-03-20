"use client";

import React, { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  // Detect when the user scrolls down to trigger the fade effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Made the nav sticky top-0. 
        Added dynamic padding so it shrinks slightly when scrolling.
      */}
<nav className="sticky top-0 left-0 w-full z-[100] py-2 md:py-3 lg:py-4">
        {/* FADE OUT EFFECT FOR CONTENT SCROLLING UNDERNEATH */}
        <div
          className={`absolute inset-0 w-full h-[150%] pointer-events-none transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
          style={{
            // Applies a strong blur that fades out smoothly at the bottom
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            maskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 40%, transparent 100%)",
            // A subtle universal tint to obscure text on both light and dark pages
            backgroundColor: "rgba(120, 120, 120, 0.1)",
          }}
        />

        <div className="max-w-[1400px] mx-auto flex items-center justify-between w-full px-4 relative z-10">
          {/* Left Links */}
          <div className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 xl:gap-12 text-base lg:text-xl xl:text-2xl font-serif">
            {navLinks.slice(0, 3).map((l) => (
              <Link
                key={l.name}
                href={l.path}
                className="hover:opacity-60 transition whitespace-nowrap"
              >
                {l.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-center shrink-0 z-10 mx-2 lg:mx-8"
          >
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-serif uppercase leading-none transition-all"
              style={{ letterSpacing: "-0.075em" }}
            >
              Providence
            </h1>
            <span className="w-full text-center text-[8px] md:text-[10px] lg:text-xs font-sans tracking-[0.2em] uppercase opacity-80 -mt-0.5 whitespace-nowrap">
              Orthodox Presbyterian Church
            </span>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex flex-1 justify-center gap-4 lg:gap-8 xl:gap-12 text-base lg:text-xl xl:text-2xl font-serif">
            {navLinks.slice(3).map((l) => (
              <Link
                key={l.name}
                href={l.path}
                className="hover:opacity-60 transition whitespace-nowrap"
              >
                {l.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden ml-auto p-2 relative z-[110]"
          >
            <BookOpen size={30} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center space-y-8 text-white"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 p-2"
            >
              <X size={40} />
            </button>
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
