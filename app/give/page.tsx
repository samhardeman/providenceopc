"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Image from "next/image";
import dynamic from "next/dynamic";

export default function EventsPage() {
  const bannerImage = "/image1.jpg"; // Update this path when ready

  return (
    <main className="min-h-screen w-full bg-[#FAFAF7] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans pb-24">
      <Banner />
      <Navbar />

      {/* --- PAGE HEADER BANNER --- */}
      <section className="relative w-full overflow-hidden border-b border-neutral-900/10 mb-10 md:mb-16">
        {bannerImage && (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={bannerImage}
                alt="Give Header Background"
                fill
                priority
                className="object-cover blur-[1px]"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-[#FAFAF7]/50 backdrop-blur-sm" />
          </>
        )}

        {/* Content Layer */}
        <div className="relative z-20 max-w-[1000px] mx-auto px-6 md:px-12 pt-12 pb-10 md:pt-20 md:pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Give
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto">
            Thank You!
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <section className="space-y-20">
          {/* Wednesday School */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              There is nothing here right now :)
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
}
