"use client";


import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Library() {
      const [index, setIndex] = useState(5);
      const [beliefIndex, setBeliefIndex] = useState(0);
      const [menuOpen, setMenuOpen] = useState(false);
      const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
    
      useEffect(() => {
        const handleScroll = (e: WheelEvent) => {
          if (menuOpen || scrollTimeout.current) return;
          if (Math.abs(e.deltaY) < 20) return;
    
          if (e.deltaY > 0 && index < 3) {
            setIndex((prev) => prev + 1);
            scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 800);
          } else if (e.deltaY < 0 && index > 0) {
            setIndex((prev) => prev - 1);
            scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null; }, 800);
          }
        };
        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
      }, [index, menuOpen]);
    
      const navLinks = ["Events", "Missions", "About", "Join Us", "Give", "Sermons"];
    return(
            <main className="h-[100dvh] w-full bg-black overflow-hidden relative text-white selection:bg-white selection:text-black">


              {/* --- BACKGROUND --- */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence initial={false}>
                    <motion.div
                        key={1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                <Image 
                    src={`/image${index + 1}.jpg`} 
                    alt="background" 
                    fill 
                    priority
                    className="object-cover brightness-[0.3] blur-[1px]" 
                />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        
        <Navbar />
        </div>
        </main>
    )
}