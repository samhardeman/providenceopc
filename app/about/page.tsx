import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import { PASTOR, ELDERS, DEACONS } from "@/data/leadership"; // <-- Adjust this path to match your folder structure

export default function AboutPage() {
  // --- PAGE HEADER IMAGE CONFIGURATION ---
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
                alt="About Header Background"
                fill
                priority
                className="object-cover blur-[1px]"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-[#FAFAF7]/50 backdrop-blur-sm" />
          </>
        )}

        <div className="relative z-20 max-w-[1000px] mx-auto px-6 md:px-12 pt-12 pb-10 md:pt-20 md:pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif leading-tight pb-5">
            About Us
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto"></p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-250 mx-auto px-6 md:px-12">
        <section className="space-y-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif border-b border-neutral-900/20 pb-6 mb-12">
              Our Leadership
            </h2>

            {/* --- SESSION --- */}
            <div className="mb-20">
              <h3 className="text-2xl font-serif text-neutral-500 mb-10 uppercase tracking-[0.2em]">
                Session
              </h3>

              {/* Pastor Profile mapped from TS file */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-16">
                <div className="w-full md:w-1/3 aspect-3/4 bg-neutral-900/5 border border-neutral-900/10 rounded-sm flex items-center justify-center shrink-0 overflow-hidden relative">
                  {PASTOR.image ? (
                    <Image
                      src={PASTOR.image}
                      alt={PASTOR.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-neutral-400 text-sm tracking-widest uppercase">
                      Photo
                    </span>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <h4 className="text-3xl md:text-4xl font-serif mb-2">
                    {PASTOR.name}
                  </h4>
                  <p className="text-neutral-500 uppercase tracking-widest text-sm mb-6 border-b border-neutral-900/10 pb-4 inline-block w-max">
                    {PASTOR.role}
                  </p>
                  <div className="space-y-4 text-neutral-700 leading-relaxed text-lg">
                    {PASTOR.bio.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elders Grid mapped from TS file */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {ELDERS.map((elder) => (
                  <div
                    key={elder.name}
                    className="bg-neutral-900/5 border border-neutral-900/10 p-6 flex flex-col items-center text-center rounded-sm"
                  >
                    <div className="w-24 h-24 bg-neutral-900/10 rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
                      {elder.image ? (
                        <Image
                          src={elder.image}
                          alt={elder.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-neutral-400 text-xs">Photo</span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl mb-1">{elder.name}</h4>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest">
                      {elder.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- DIACONATE --- */}
            <div>
              <h3 className="text-2xl font-serif text-neutral-500 mb-10 uppercase tracking-[0.2em]">
                Diaconate
              </h3>

              {/* Deacons Grid mapped from TS file */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {DEACONS.map((deacon) => (
                  <div
                    key={deacon.name}
                    className="bg-neutral-900/5 border border-neutral-900/10 p-6 flex flex-col items-center text-center rounded-sm"
                  >
                    <div className="w-24 h-24 bg-neutral-900/10 rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
                      {deacon.image ? (
                        <Image
                          src={deacon.image}
                          alt={deacon.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-neutral-400 text-xs">Photo</span>
                      )}
                    </div>
                    <h4 className="font-serif text-xl mb-1">{deacon.name}</h4>
                    <p className="text-neutral-500 text-xs uppercase tracking-widest">
                      {deacon.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
