"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BANNER_CONFIG = {
  color: "#8B0000",
  durationMs: 5000,
  items: [
    "Welcome to Providence OPC — Join us for Sunday Worship at 10:00 AM",
    "Wednesday School: Dinner at 5:30 PM, Teaching at 6:30 PM",
    "Visit us at 7575 E Redfield Rd #101, Scottsdale AZ",
  ],
};

export default function Banner() {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (BANNER_CONFIG.items.length <= 1) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_CONFIG.items.length);
    }, BANNER_CONFIG.durationMs);
    return () => clearInterval(interval);
  }, []);

  if (BANNER_CONFIG.items.length === 0) return null;

  return (
    <div
      className="w-full text-center text-white text-xs md:text-sm font-sans py-2 px-4 overflow-hidden shrink-0"
      style={{ backgroundColor: BANNER_CONFIG.color }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={bannerIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="block"
        >
          {BANNER_CONFIG.items[bannerIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}