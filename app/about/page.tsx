import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import bannerImage from "@/public/image1.jpg";
import { ArrowRight } from "lucide-react";
import { PASTOR, ELDERS, DEACONS } from "@/data/leadership"; // <-- Adjust this path to match your folder structure

export default function AboutPage() {
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
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="space-y-32">
          
          {/* =========================================
              BELIEFS SECTION
          ========================================= */}
          <section id="beliefs" className="scroll-mt-32">
            <h2 className="text-4xl md:text-5xl font-serif border-b border-neutral-900/20 pb-6 mb-12">
              Our Beliefs
            </h2>

            {/* INTRODUCTORY GOSPEL MESSAGE */}
            <div className="mb-16">
              <div className="prose prose-lg md:prose-xl text-neutral-700 leading-relaxed max-w-none">
                <p className="text-2xl md:text-3xl font-serif text-neutral-900 mb-8 leading-snug">
                  Our most important belief is in the gospel of Jesus Christ, as
                  revealed to us by the inspired and inerrant Scriptures of the
                  Holy Bible. These are some of the basic facts in that story of
                  God’s saving grace.
                </p>

                <ul className="space-y-6 mb-12 list-disc pl-6 marker:text-neutral-400">
                  <li>
                    God made people, male and female, perfect, bearing the image
                    of God.
                  </li>
                  <li>
                    Our first parents rebelled against the Creator, and their
                    rebellion brought sin, suffering, and death into the world.
                  </li>
                  <li>
                    But God, being rich in mercy, sent his Son to be born of a
                    woman into this world, in order to make all things new, to
                    right all wrongs, and to seek out and save sinners. This is
                    Jesus of Nazareth.
                  </li>
                  <li>
                    We proclaim to our dying world this good news of God’s
                    glorious grace: that the only way of salvation is to believe
                    that Jesus is the Christ, the Son of the Living God.
                  </li>
                </ul>

                <div className="bg-neutral-900/5 border border-neutral-900/10 p-8 md:p-10 rounded-sm">
                  <p className="mb-6">
                    For a fuller statement of our faith and doctrine, Providence
                    subscribes to the Westminster Standards as an accurate summary
                    of the Bible’s teachings. Holding to a confession of faith
                    allows us to clearly communicate our beliefs and ties us to
                    the historic faith of the apostles.
                  </p>
                  <p className="mb-8">
                    Perhaps even more importantly, the Westminster Standards serve
                    as a promise to the church and our visitors: the church to
                    stand by its doctrine and practice, no matter the wind or tide
                    of changing times.
                  </p>
                  <Link
                    href="https://www.opc.org/confessions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-serif uppercase tracking-widest hover:translate-x-2 transition-transform text-sm md:text-base border-b border-neutral-900/30 hover:border-neutral-900 pb-1 text-neutral-900 w-max"
                  >
                    Read The Confessions <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* OUR DISTINCTIVES */}
            <div className="pt-10 border-t border-neutral-900/10">
              <h3 className="text-3xl md:text-4xl font-serif mb-12">
                Our Core Distinctives
              </h3>

              <div className="space-y-16">
                {/* Distinctive 1: Confessionally Reformed */}
                <div id="confessionally-reformed" className="scroll-mt-32">
                  <h4 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    Confessionally Reformed
                  </h4>
                  <div className="text-neutral-700 leading-relaxed text-lg space-y-4">
                    <p>
                      Providence OPC subscribes to the Westminster Standards as an
                      accurate summary of the Bible’s teachings. Subscription to a
                      confession of faith allows us to clearly communicate our
                      beliefs and ties us to a family of churches.
                    </p>
                    <p>
                      Perhaps even more importantly, the Westminster Standards
                      serve as a promise to and protection for the congregation;
                      every man, woman and child can hold their leadership
                      accountable to this Confession, so that the church will not
                      break it, nor go past it.
                    </p>
                    <p>
                      Of course, you need not subscribe to this Confession to
                      visit or even join us - this is our promise to you, not a
                      requirement for you. We invite everyone to join us in humbly
                      pursuing a God who has already promised to love and reward
                      those who seek him (Proverbs 8:17).
                    </p>
                  </div>
                </div>

                {/* Distinctive 2: Christ-Centered In Community */}
                <div
                  id="christ-centered"
                  className="scroll-mt-32 border-t border-neutral-900/10 pt-16"
                >
                  <h4 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    Christ-Centered In Community
                  </h4>
                  <div className="text-neutral-700 leading-relaxed text-lg space-y-4">
                    <p>
                      There is nothing this life has to offer that compares to
                      knowing Jesus Christ; “Indeed, I count everything as loss
                      because of the surpassing worth of knowing Christ Jesus my
                      Lord” (Phillipians 3:8).
                    </p>
                    <p>
                      Providence OPC is committed to making the saving grace of
                      Jesus Christ the first, second, third, and last priority of
                      our worship, our service, and our life together. We are
                      committed to consistently preaching the Gospel not only to
                      the world but ourselves, resting on the mercy of Christ to
                      save sinners and edify believers.
                    </p>
                  </div>
                </div>

                {/* Distinctive 3: Committed To Kingdom Growth */}
                <div
                  id="kingdom-growth"
                  className="scroll-mt-32 border-t border-neutral-900/10 pt-16"
                >
                  <h4 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    Committed To Kingdom Growth
                  </h4>
                  <div className="text-neutral-700 leading-relaxed text-lg space-y-4">
                    <p>
                      Providence OPC is not the end of the road in the Kingdom of
                      God, and we believe that we are called to build that Kingdom
                      more than our own castle.
                    </p>
                    <p>
                      To that end, we are truly committed to growing the Kingdom
                      through church planting, as we see church planting as a
                      fulfillment of the Great Commision (Matthew 28). We seek to
                      build up our own body to participate in future mission works
                      and earnestly pray for more laborers for the harvest in
                      Phoenix. To that end, we faithfully seek outreach and
                      evangelism opportunities close to us in the city of
                      Scottsdale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================
              LEADERSHIP SECTION
          ========================================= */}
          <section id="leadership" className="scroll-mt-32">
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
          </section>

        </div>
      </div>
    </main>
  );
}