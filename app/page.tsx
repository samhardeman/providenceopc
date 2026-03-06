"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Instagram, Facebook, Mouse } from "lucide-react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";

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
  
  // Create refs to lock the scroll listener during button clicks
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const ratio = scrollY / vh;

      if (ratio < 1) { 
        setIndex(0);
      } else if (ratio < 4) { 
        setIndex(1);
        
        // Only update the belief index from scrolling if a button wasn't just clicked
        if (!isClickScrolling.current) {
          if (ratio < 2) setBeliefIndex(0); 
          else if (ratio < 3) setBeliefIndex(1); 
          else setBeliefIndex(2); 
        }
        
      } else if (ratio < 5) { 
        setIndex(2);
      } else {
        setIndex(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBeliefClick = (i: number) => {
    // 1. Lock the scroll listener
    isClickScrolling.current = true;
    
    // 2. Instantly update the UI
    setBeliefIndex(i); 

    // 3. Perform the smooth scroll
    const vh = window.innerHeight;
    window.scrollTo({ top: (i + 1) * vh, behavior: "smooth" });

    // 4. Unlock the listener after the smooth scroll finishes (approx 800ms)
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  return (
    <main className="h-[700vh] w-full bg-black relative text-white selection:bg-white selection:text-black">
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col">
        
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
          
          <Banner />
          <Navbar />

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
                {/* SECTION 1: HERO */}
                {index === 0 && (
                  <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif leading-tight text-center max-w-5xl drop-shadow-2xl md:mt-0 mt-16">
                    Ascribe to the LORD the glory due his name; <br className="hidden md:block" />
                    worship the LORD in the splendor of holiness.
                  </h2>
                )}

                {/* SECTION 2: BELIEFS */}
                {index === 1 && (
                  <div className="max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-start px-8 md:px-24 lg:px-32">
                    <div className="font-serif space-y-4 md:space-y-6">
                      {BELIEFS.map((belief, i) => (
                        <button
                          key={i}
                          onClick={() => handleBeliefClick(i)}
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

                    <div className="min-h-[350px] flex flex-col justify-start">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={beliefIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="font-sans text-base md:text-lg lg:text-xl leading-tight space-y-6 max-w-2xl text-justify"
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

                {/* SECTION 3: INFO */}
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
                    <Link href="/join-us" className="border border-white/60 px-10 py-4 rounded-full font-serif text-2xl hover:bg-white hover:text-black transition">Join Us</Link>
                  </div>
                )}

                {/* SECTION 4: RESTORED CONTACT SLIDE */}
                {index === 3 && (
                  <div className="w-full max-w-[1200px] flex flex-col justify-between h-full min-h-[50vh] mt-12 md:mt-0">
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-12 md:space-y-0 flex-grow">
                      
                      <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-serif mb-4">Contact</h2>
                        <a href="mailto:info@providencescottsdale.com" className="text-2xl md:text-4xl hover:underline block mb-8">
                          info@providencescottsdale.com
                        </a>
                        <p className="text-xl md:text-2xl opacity-60 leading-relaxed">
                          7575 E Redfield Rd #101<br />
                          Scottsdale, AZ 85260
                        </p>
                      </div>

                      <div className="flex flex-col items-center md:items-end justify-between h-full">
                        <div className="flex gap-8">
                          <Link href="https://instagram.com" target="_blank" className="hover:opacity-60 transition"><Instagram size={32}/></Link>
                          <Link href="https://facebook.com" target="_blank" className="hover:opacity-60 transition"><Facebook size={32}/></Link>
                        </div>
                        <div className="text-center md:text-right text-2xl font-serif space-y-4 mt-8 md:mt-12">
                          <Link href="/blog" className="block hover:underline opacity-80 hover:opacity-100 transition">Blog</Link>
                          <Link href="https://opc.org/" target="_blank" rel="noopener noreferrer" className="block hover:underline opacity-80 hover:opacity-100 transition">The OPC</Link>
                          <Link href="/library" className="block hover:underline opacity-80 hover:opacity-100 transition">Library</Link>
                        </div>
                      </div>

                    </div>

                    <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-50 text-center md:text-left w-full">
                      <p>© {new Date().getFullYear()} Providence Orthodox Presbyterian Church.</p>
                      <p>A thankful member of the Orthodox Presbyterian Church.</p>
                    </div>

                  </div>
                )} 

              </motion.div>
            </AnimatePresence>
          </div>

          <div className="h-20 flex justify-center items-end pb-8 shrink-0">
            {index === 0 && (
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="flex flex-col items-center opacity-40">
                <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
                <Mouse size={20} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}