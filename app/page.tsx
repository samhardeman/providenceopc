"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, ArrowRight, Instagram, Facebook, QrCode, Mouse } from "lucide-react";

const BELIEFS = [
  {
    title: "Confessionally Reformed",
    text: "Providence OPC subscribes to the Westminster Standards as an accurate summary of the Bible’s teachings. Subscription to a confession of faith allows us to clearly communicate our beliefs and ties us to a family of churches.<br /><br />Perhaps even more importantly, the Westminster Standards serve as a promise to and protection for the congregation; every man, woman and child can hold their leadership accountable to this Confession, so that the church will not break it, nor go past it.<br /><br />Of course, you need not subscribe to this Confession to visit or even join us - this is our promise to you, not a requirement for you. We invite everyone to join us in humbly pursuing a God who has already promised to love and reward those who seek him (Proverbs 8:17)."
  },
  {
    title: "Christ-Centered In Community",
    text: "There is nothing this life has to offer that compares to knowing Jesus Christ; “Indeed, I count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord” (Phillipians 3:8).<br /><br />Providence OPC is committed to making the saving grace of Jesus Christ the first, second, third, and last priority of our worship, our service, and our life together. We are committed to consistently preaching the Gospel not only to the world but ourselves, resting on the mercy of Christ to save sinners and edify believers."
  },
  {
    title: "Committed To Kingdom Growth",
    text: "Providence OPC is not the end of the road in the Kingdom of God, and we believe that we are called to build that Kingdom more than our own castle.<br /><br />To that end, we are truly committed to growing the Kingdom through church planting, as we see church planting as a fulfillment of the Great Commision (Matthew 28). We seek to build up our own body to participate in future mission works and earnestly pray for more laborers for the harvest in Phoenix. To that end, we faithfully seek outreach and evangelism opportunities close to us in the city of Scottsdale."
  }
];

export default function Home() {
  const [index, setIndex] = useState(0);
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

  return (
    <main className="h-[100dvh] w-full bg-black overflow-hidden relative text-white selection:bg-white selection:text-black">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
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
        
        {/* Navbar */}
        <nav className="w-full p-6 md:p-8">
          <div className="max-w-[1200px] mx-auto flex items-center justify-between relative">
            <div className="hidden md:flex gap-12 text-2xl font-serif">
              {navLinks.slice(0, 3).map(l => <a key={l} href="#" className="hover:opacity-60 transition">{l}</a>)}
            </div>

            {/* Logo with Custom Tight Tracking */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-start md:items-center">
              <h1 
                className="text-3xl md:text-5xl font-serif uppercase leading-none"
                style={{ letterSpacing: '-0.075em' }}
              >
                Providence
              </h1>
              <span className="w-full text-center text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase opacity-80 mt-1 md:mt-2">
                Orthodox Presbyterian Church
              </span>
            </div>

            <div className="hidden md:flex gap-12 text-2xl font-serif ml-auto">
              {navLinks.slice(3).map(l => <a key={l} href="#" className="hover:opacity-60 transition">{l}</a>)}
            </div>

            <button onClick={() => setMenuOpen(true)} className="md:hidden ml-auto p-2 relative z-[110]"><BookOpen size={30} /></button>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-grow flex items-start md:items-center justify-center p-6 md:p-8 pt-32 md:pt-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex justify-center"
            >
              {index === 0 && (
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-tight text-center max-w-5xl drop-shadow-2xl md:mt-0 mt-16">
                  Ascribe to the LORD the glory due his name; <br className="hidden md:block" />
                  worship the LORD in the splendor of holiness.
                </h2>
              )}

              {index === 1 && (
                <div className="max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start md:items-center px-8 md:px-24 lg:px-32">
                  <div className="font-serif space-y-4 md:space-y-6">
                    {BELIEFS.map((belief, i) => (
                      <button
                        key={i}
                        onClick={() => setBeliefIndex(i)}
                        className={`block text-left transition-all duration-300 ${
                          beliefIndex === i ? "text-white translate-x-2" : "text-white/20 hover:text-white/50"
                        }`}
                      >
                        <h3 className="text-3xl md:text-5xl lg:text-6xl leading-tight">
                          {belief.title}
                        </h3>
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[350px] flex flex-col justify-start md:justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={beliefIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-sans text-base md:text-lg lg:text-xl leading-relaxed space-y-6 max-w-2xl text-justify"
                      >
                        <p className="opacity-90" dangerouslySetInnerHTML={{ __html: BELIEFS[beliefIndex].text }} />
                        <a href="#" className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-sm md:text-lg border-b border-white/20 pb-1">
                          Learn More <ArrowRight size={20} />
                        </a>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {index === 2 && (
                <div className="w-full max-w-[1200px] flex flex-col items-center gap-10 md:gap-20 mt-12 md:mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center md:text-left">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif mb-4">Sunday Worship</h3>
                      <p className="text-xl md:text-2xl">10:00 AM / 5:00 PM</p>
                      <p className="italic opacity-60 text-lg">followed by dinner</p>
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif mb-4">Location</h3>
                      <p className="text-xl md:text-2xl">7575 E Redfield Rd #101, Scottsdale AZ</p>
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-serif mb-4">Wednesday School</h3>
                      <p className="text-xl md:text-2xl">Dinner 5:30 PM / Teaching 6:30 PM</p>
                    </div>
                  </div>
                  <button className="border border-white/60 px-10 py-4 rounded-full font-serif text-2xl hover:bg-white hover:text-black transition">FAQ</button>
                </div>
              )}

              {index === 3 && (
                <div className="w-full max-w-[1100px] border border-white/10 p-8 md:p-16 backdrop-blur-md bg-white/5 mt-8 md:mt-0">
                  <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="space-y-6 text-center md:text-left">
                      <h2 className="text-4xl md:text-7xl font-serif">Contact Us</h2>
                      <p className="text-xl md:text-2xl opacity-70">info@providencescottsdale.com</p>
                      <div className="bg-white p-3 w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 mt-6"><QrCode className="w-full h-full text-black" /></div>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-between">
                      <div className="flex gap-8"><Instagram size={32}/><Facebook size={32}/></div>
                      <div className="text-center md:text-right text-2xl font-serif space-y-4 mt-8 md:mt-12">
                        <p className="hover:underline cursor-pointer">Blog</p>
                        <p className="hover:underline cursor-pointer">OPC</p>
                        <p className="hover:underline cursor-pointer">Library</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-20 flex justify-center items-end pb-8">
          {index === 0 && (
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center opacity-40">
              <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
              <Mouse size={20} />
            </motion.div>
          )}
        </div>
      </div>

      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {[0, 1, 2, 3].map((i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full transition-all ${index === i ? "bg-white scale-150" : "bg-white/20"}`} />
        ))}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center space-y-8">
            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 p-2"><X size={40} /></button>
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-4xl font-serif" onClick={() => setMenuOpen(false)}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}