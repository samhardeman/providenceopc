"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Mouse, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

import image1 from "@/public/image1.jpg";
import image4 from "@/public/image4.jpg"; 

export default function Home() {
return (
    <main className="relative w-full bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* SCROLLING CONTENT */}
      <div className="relative z-10 w-full flex flex-col">

        {/* =========================================
            SECTION 1: HERO
        ========================================= */}
        <section className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden">
          
          {/* Static Background Image anchored just to this section */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={image1}
              alt="background"
              fill
              priority
              quality={30}
              placeholder="blur"
              className="object-cover brightness-[0.3] blur-[1px]"
            />
          </div>

          {/* HEADER / NAVBAR (Overlaying the image) */}
          <div className="relative z-20 w-full">
            <Banner />
            <Navbar />
          </div>

          <div className="relative z-10 flex-grow flex items-center justify-center px-4 md:px-8 pb-10">            
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-tight text-center max-w-5xl drop-shadow-2xl">
              Ascribe to the LORD the glory due his name;{" "}
              <br className="hidden md:block" />
              worship the LORD in the splendor of holiness.
            </h2>
          </div>

          <div className="relative z-10 h-20 flex justify-center items-end pb-8">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center opacity-40"
            >
              <span className="text-[10px] uppercase tracking-widest mb-2 font-sans">
                Scroll
              </span>
              <Mouse size={20} />
            </motion.div>
          </div>
        </section>

        {/* --- TOP GRADIENT BLUR TRANSITION --- */}
        <div className="relative z-10 h-40 w-full bg-gradient-to-b from-transparent to-[#121212] -mt-40 pointer-events-none" />

        {/* =========================================
            SECTION 2: INFO / JOIN US (Solid Color: Very Dark Neutral)
        ========================================= */}
        <section className="relative z-10 w-full flex items-center justify-center py-20 md:py-32 bg-[#121212]">
          <div className="w-full max-w-[1200px] flex flex-col items-center gap-4 md:gap-10 px-4 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 w-full text-left">
              
              <div className="lg:col-span-3 bg-white/5 border border-white/10 p-6 md:p-12 rounded-sm backdrop-blur-md flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8 border-b border-white/20 pb-3 md:pb-4">
                    The Lord's Day
                  </h3>
                  <ul className="space-y-4 md:space-y-8 text-base md:text-2xl text-white/90">
                    <li className="flex flex-row justify-between items-center gap-2">
                      <span>Morning Worship</span>
                      <span className="font-serif text-xl md:text-4xl text-white">
                        10:00 AM
                      </span>
                    </li>
                    <li className="flex flex-row justify-between items-center gap-2 pt-2">
                      <div className="flex flex-col">
                        <span>Evening Worship</span>
                        <span className="text-xs md:text-lg text-white/60 italic mt-1 font-sans">
                          Followed by dinner
                        </span>
                      </div>
                      <span className="font-serif text-xl md:text-4xl text-white">
                        5:00 PM
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-white/10">
                  <Link
                    href="/join-us"
                    className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-sm md:text-lg border-b border-white/30 hover:border-white pb-1 w-max"
                  >
                    Join Us <ArrowRight size={20} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
                <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm backdrop-blur-md flex-grow">
                  <h3 className="text-2xl md:text-4xl font-serif mb-4 md:mb-6 border-b border-white/20 pb-3 md:pb-4">
                    Wednesday School
                  </h3>
                  <ul className="space-y-4 md:space-y-6 text-base md:text-2xl text-white/90">
                    <li className="flex justify-between items-center">
                      <span>Dinner</span>
                      <span className="font-serif text-lg md:text-3xl text-white">
                        5:30 PM
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Teaching</span>
                      <span className="font-serif text-lg md:text-3xl text-white">
                        6:30 PM
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-sm backdrop-blur-md flex-grow relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-4xl font-serif mb-2 md:mb-4 flex items-center gap-2 md:gap-3">
                      <MapPin size={24} className="opacity-80" /> Location
                    </h3>
                    <a
                      href="https://maps.google.com/?q=7575+E+Redfield+Rd+%23101,+Scottsdale,+AZ+85260"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base md:text-2xl text-white/80 hover:text-white hover:underline transition leading-relaxed block mt-2 md:mt-4"
                    >
                      7575 E Redfield Rd #101
                      <br />
                      Scottsdale, AZ 85260
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SECTION 3: BELIEFS (Solid Color: Dark Zinc)
        ========================================= */}
        <section className="relative z-10 w-full flex items-center justify-center py-24 md:py-32 bg-[#1A1A1A]">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white">
              Our Beliefs
            </h2>
            <p className="text-lg md:text-2xl text-white/70 mb-10 font-sans leading-relaxed">
              Our most important belief is in the gospel of Jesus Christ, as revealed to us by the inspired and inerrant Scriptures of the Holy Bible. We subscribe to the Westminster Standards as an accurate summary of these teachings, tethering us to the historic faith of the apostles.
            </p>
            <Link
              href="/about#beliefs"
              className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-lg border-b border-white/30 hover:border-white pb-1 text-white"
            >
              Read Our Beliefs <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* =========================================
            SECTION 4: LEADERSHIP (Solid Color: Dark Stone)
        ========================================= */}
        <section className="relative z-10 w-full flex items-center justify-center py-24 md:py-32 bg-[#171615]">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white">
              Our Leadership
            </h2>
            <p className="text-lg md:text-2xl text-white/70 mb-10 font-sans leading-relaxed">
              Providence OPC is guided by a Session of elders who shepherd the flock, and served by a Diaconate dedicated to ministries of mercy, both working together to build up the body of Christ and serve the community of Scottsdale.
            </p>
            <Link
              href="/about#leadership"
              className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-lg border-b border-white/30 hover:border-white pb-1 text-white"
            >
              Meet Our Leaders <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* =========================================
            SECTION 5: CONTACT
        ========================================= */}
        <section className="relative min-h-[100dvh] w-full flex items-center justify-center py-20 md:py-32 overflow-hidden">
          
          {/* Static Background Image anchored just to this section */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={image4}
              alt="background"
              fill
              quality={30}
              placeholder="blur"
              className="object-cover brightness-[0.3] blur-[1px]"
            />
          </div>

          {/* --- BOTTOM GRADIENT BLUR TRANSITION --- */}
          <div className="absolute top-0 left-0 right-0 z-10 h-40 w-full bg-gradient-to-b from-[#171615] to-transparent pointer-events-none" />

          <div className="relative z-20 w-full max-w-[1200px] flex flex-col justify-between min-h-[50vh] px-4 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-12 md:space-y-0 flex-grow">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-serif mb-4">
                  Contact
                </h2>
                <a
                  href="mailto:info@providencescottsdale.com"
                  className="text-xl md:text-3xl font-serif hover:underline block mb-8 break-all"
                >
                  info@providencescottsdale.com
                </a>
                <a
                  href="https://maps.google.com/?q=7575+E+Redfield+Rd+%23101,+Scottsdale,+AZ+85260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl opacity-60 hover:opacity-100 hover:underline transition leading-relaxed block font-sans"
                >
                  7575 E Redfield Rd #101
                  <br />
                  Scottsdale, AZ 85260
                </a>
              </div>

              <div className="flex flex-col items-center md:items-end justify-between h-full">
                <div className="flex gap-8">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="hover:opacity-60 transition"
                  >
                    <Instagram size={32} />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    className="hover:opacity-60 transition"
                  >
                    <Facebook size={32} />
                  </Link>
                </div>
                <div className="text-center md:text-right text-2xl font-serif space-y-4 mt-8 md:mt-12">
                  <Link
                    href="/blog"
                    className="block hover:underline opacity-80 hover:opacity-100 transition"
                  >
                    Blog
                  </Link>
                  <Link
                    href="https://opc.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:underline opacity-80 hover:opacity-100 transition"
                  >
                    The OPC
                  </Link>
                  <Link
                    href="/library"
                    className="block hover:underline opacity-80 hover:opacity-100 transition"
                  >
                    Library
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50 text-center md:text-left w-full font-sans">
              <p>
                © {new Date().getFullYear()} Providence Orthodox Presbyterian
                Church.
              </p>
              <p>A thankful member of the Orthodox Presbyterian Church.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}