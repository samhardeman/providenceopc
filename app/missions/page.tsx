import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import { ExternalLink } from "lucide-react";

export default function OutreachPage() {
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
                alt="Outreach Header Background"
                fill
                priority
                className="object-cover blur-[1px]"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-[#FAFAF7]/50 backdrop-blur-sm" />
          </>
        )}

        {/* Content Layer: Reduced padding for tighter spacing */}
        <div className="relative z-20 max-w-[1000px] mx-auto px-6 md:px-12 pt-12 pb-10 md:pt-20 md:pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Missions
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto">
            Advancing His Kingdom in the Valley and Beyond
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <section className="space-y-20">
          {/* Church Planting */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Church Planting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-xl font-serif text-neutral-900 md:sticky md:top-24 uppercase tracking-wider">
                  Growing the Church
                </h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-neutral-700 leading-relaxed text-lg text-pretty">
                <p>
                  We believe that one of the primary ways that God advances His
                  kingdom in this world is through the planting of faithful
                  churches. Providence is committed to supporting church
                  planting across the Valley as a matter of first priority.
                </p>

                <div className="bg-neutral-900/5 p-6 md:p-8 rounded-sm border-l-4 border-neutral-900 mt-4">
                  <h4 className="font-serif text-2xl text-neutral-900 mb-3">
                    Laveen Church Plant
                  </h4>
                  <p className="text-neutral-700 mb-4">
                    They have recently begun meeting for both morning and
                    evening fellowship, and also host a Bible Study on Friday
                    mornings.
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-neutral-900">
                    Interested in participating?
                  </p>
                  <p className="text-neutral-600 mt-1">
                    Contact Rev. Paul Johnson:{" "}
                    <a
                      href="mailto:placeholder@email.com"
                      className="text-neutral-900 border-b border-neutral-900/30 hover:border-neutral-900 transition-colors"
                    >
                      email@placeholder.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Events */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Community Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 md:sticky md:top-24">
                  Serving Scottsdale
                </h3>
              </div>
              <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                <p>
                  Providence aims to serve the people of North Scottsdale
                  through the proclamation of the gospel and the invitation to
                  find new life in Christ.
                </p>
                <p>
                  To this end, we have seasonal community events, where we seek
                  to create opportunities to bless the individuals and families
                  who make up our neighborhoods and create connections for the
                  sake of introducing Christ and Providence as a church.
                </p>
              </div>
            </div>
          </div>

          {/* Foreign Missions */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Foreign Missions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 md:sticky md:top-24">
                  Global Evangelism
                </h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-neutral-700 leading-relaxed text-lg">
                <p>
                  The Orthodox Presbyterian Church has had a life-long
                  commitment to sending and supporting foreign missionaries; in
                  fact, it was this fierce devotion to preaching Christ to the
                  nations without compromise that led to the founding of the
                  denomination in the first place!
                </p>
                <p>
                  Providence is proud to partner with OPC missionaries and
                  evangelism efforts across the globe.
                </p>
                <a
                  href="https://opc.org/foreign_missions.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 font-serif text-xl text-neutral-900 border-b border-neutral-900/30 pb-1 hover:border-neutral-900 transition-colors"
                >
                  Explore OPC Overseas Work <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
