import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import bannerImage from "@/public/image1.jpg";
import minimapImg from "@/public/minimap.png";

export default function JoinUsPage() {
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
                alt="Join Us Header Background"
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
          <h1 className="text-5xl md:text-7xl font-serif leading-tight pb-5">
            Join Us
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto"></p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <section className="space-y-20">
          {/* Schedule & Location Section */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-neutral-900/5 border border-neutral-900/10 p-8 md:p-12 rounded-sm">
              <h3 className="text-3xl font-serif mb-6 border-b border-neutral-900/10 pb-4">
                The Lord's Day
              </h3>
              <ul className="space-y-6 text-lg text-neutral-700">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span>Prayer Meeting</span>
                  <span className="font-serif text-xl sm:text-2xl text-neutral-900">
                    9:15 – 9:35 AM
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span>Morning Worship</span>
                  <span className="font-serif text-xl sm:text-2xl text-neutral-900">
                    10:00 – 11:30 AM
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2">
                  <div className="flex flex-col">
                    <span>Evening Worship</span>
                    <span className="text-sm text-neutral-500 italic mt-1">
                      No worship on 5th Sundays
                    </span>
                  </div>
                  <span className="font-serif text-xl sm:text-2xl text-neutral-900">
                    5:00 – 6:00 PM
                  </span>
                </li>
              </ul>
            </div>

            {/* UPGRADED LOCATION CARD WITH MINIMAP */}
            <div className="lg:col-span-2 relative bg-neutral-900 text-white rounded-sm overflow-hidden flex flex-col group min-h-[350px]">
              {/* Background Map Image */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                {}
                <img
                  src={minimapImg.src}
                  alt="Map of Providence OPC location"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                {/* Dark gradient overlay to ensure text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-end">
                <MapPin size={32} className="mb-6 opacity-80" />
                <h3 className="text-3xl font-serif mb-4">Location</h3>
                <p className="text-lg text-white/90 leading-relaxed mb-8 drop-shadow-md">
                  7575 E Redfield Rd #101
                  <br />
                  Scottsdale, AZ 85260
                </p>
                <a
                  href="https://maps.google.com/?q=7575+E+Redfield+Rd+#101,+Scottsdale,+AZ+85260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-sm border-b border-white/30 hover:border-white pb-1 w-max mt-auto"
                >
                  Get Directions <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </section>

          {/* What to Expect Section */}
          <section className="space-y-16 mb-32">
            <h2 className="text-4xl md:text-5xl font-serif border-b border-neutral-900/20 pb-6 mb-12">
              What to Expect
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 sticky top-24">
                  Order of Worship
                </h3>
              </div>
              <div className="md:col-span-8 text-neutral-700 leading-relaxed text-lg">
                <p>
                  We follow a basic liturgy as a tool to help the congregation
                  to perceive how our order of worship follows God’s pattern in
                  his Word and in the life of every believer: God speaks and his
                  people respond, and so on in a covenantal dialogue. This will
                  include singing, scripture readings, creeds, catechisms, the
                  sacraments, and the sermon.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 sticky top-24">
                  Music
                </h3>
              </div>
              <div className="md:col-span-8 text-neutral-700 leading-relaxed text-lg">
                <p>
                  We sing hymns, psalms, and modern songs with simple yet
                  beautiful musical accompaniment meant to encourage and equip
                  congregational singing, which is the main form of
                  congregational expression in our liturgy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 sticky top-24">
                  Preaching
                </h3>
              </div>
              <div className="md:col-span-8 text-neutral-700 leading-relaxed text-lg">
                <p>
                  We believe the Word of God is beating heart of the worship
                  service, and so we join the public reading of the Word with
                  clear, expository preaching of Scripture. Our pastor will
                  generally preach straight through a book of the Bible in his
                  sermon series.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 sticky top-24">
                  Sacraments
                </h3>
              </div>
              <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                <p>
                  We celebrate the Lord’s Supper every week at the end of the
                  morning worship service. We baptise both new believers and the
                  children of believers, in line with God’s covenant promises
                  (Acts 2:39).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900 sticky top-24">
                  Worship for Children
                </h3>
              </div>
              <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                <p>
                  At Providence OPC we welcome and encourage our children to be
                  in our “adult” worship services instead of dismissing them to
                  a separate children’s service. This is a deliberate choice
                  that flows out of who and what our children are according to
                  the Word of God...
                </p>
                <p className="bg-neutral-900/5 p-6 rounded-sm border-l-4 border-neutral-900 mt-6 italic">
                  This does mean that in our services you can occasionally hear
                  the sounds that children make. These sounds are our children
                  and grandchildren in the faith, faithfully sitting under the
                  Word of God as it is read, taught, and preached.
                </p>
              </div>
            </div>
          </section>

          {/* CTA to Fellowship Page */}
          <section className="bg-[#EFEFEA] p-8 md:p-16 text-center rounded-sm">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Life Together
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-10">
              The life of the church extends far beyond corporate worship on
              Sunday. We are called to build vital, life-long discipleship
              relationships throughout the body.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 font-serif text-xl rounded-full hover:bg-neutral-800 transition"
            >
              Explore Fellowship Opportunities <ArrowRight size={20} />
            </Link>
          </section>
        </section>
      </div>
    </main>
  );
}
