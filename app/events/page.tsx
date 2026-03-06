"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the map to prevent Server-Side Rendering errors with Leaflet
const MapWithNoSSR = dynamic(() => import("@/components/GroupsMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] md:h-[450px] bg-neutral-900/5 animate-pulse rounded-sm border border-neutral-900/10 flex items-center justify-center mt-8">
      <span className="opacity-40 text-sm tracking-widest uppercase font-sans">Loading Map...</span>
    </div>
  ),
});

export default function EventsPage() {
  const bannerImage = '/image1.jpg'; // Update this path when ready
  
  return (
    <main className="min-h-screen w-full bg-[#FAFAF7] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans pb-24">
      <Navbar />

      {/* --- PAGE HEADER BANNER --- */}
      <section className="relative w-full overflow-hidden border-b border-neutral-900/10 mb-10 md:mb-16">
        {bannerImage && (
          <>
            <div className="absolute inset-0 z-0">
              <Image 
                src={bannerImage} 
                alt="Events Header Background" 
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
            Events
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto">
            Fellowship for the Flock
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <section className="space-y-20">
          
          {/* Wednesday School */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Wednesday School
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <div className="bg-neutral-900/5 p-6 rounded-sm border-l-4 border-neutral-900">
                  <p className="font-serif text-xl mb-2">Schedule</p>
                  <p className="text-neutral-600 mb-1"><strong>5:30 PM</strong> - Fellowship Meal</p>
                  <p className="text-neutral-600"><strong>6:30 PM</strong> - Classes Begin</p>
                </div>
              </div>
              <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                <p>
                  We gather on Wednesday nights both for fellowship and to deepen our faith through 
                  Christian education classes. We meet at 5:30 to share in a fellowship meal together, 
                  and begin class at 6:30. Classes are available for all ages!
                </p>
                <p>
                  We use the Great Commissions Publications curriculum for our grade school classes, 
                  while our youth group class meets to study through the Westminster Shorter Catechism.
                </p>
              </div>
            </div>
          </div>

          {/* Small Groups (Now with Map!) */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Small Groups
            </h2>
            
            {/* The Map spans the full container above the text */}
            <div className="mb-12">
               <MapWithNoSSR />
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-serif text-neutral-900">Home Groups</h3>
                </div>
                <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                  <p>
                    At Providence we believe that the life of the church includes not just corporate 
                    worship on Sunday, but also building life-long discipleship relationships throughout 
                    the body. To assist the congregation in forming these vital relationships, we have 
                    Small Groups that meet once or twice a month across the Valley in homes of different members.
                  </p>
                  <p className="pt-2">
                    If you are interested in joining one of our small groups, please contact <a href="mailto:david.schexnayder@providencescottsdale.com" className="text-neutral-900 border-b border-neutral-900/30 hover:border-neutral-900 transition-colors">david.schexnayder@providencescottsdale.com</a>.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-serif text-neutral-900">College & Career</h3>
                </div>
                <div className="md:col-span-8 space-y-4 text-neutral-700 leading-relaxed text-lg">
                  <p>
                    We also have a College & Career small group that meets on the second Saturday of each 
                    month for mutual edification and encouragement. While this group is targeted at young 
                    adults in college into their early 30’s, it is also attended by several wise and mature 
                    couples from Providence, as the goal of this group is to build vital, multi-generational 
                    discipleship relationships as much as shared fellowship.
                  </p>
                  <p className="pt-2">
                    If you are interested in attending our College & Career ministry, please contact <a href="mailto:david.schexnayder@providencescottsdale.com" className="text-neutral-900 border-b border-neutral-900/30 hover:border-neutral-900 transition-colors">david.schexnayder@providencescottsdale.com</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Youth & Children's Ministry */}
          <div>
            <h2 className="text-4xl font-serif border-b border-neutral-900/20 pb-4 mb-8">
              Youth & Children's Ministry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-serif text-neutral-900">Growing Together</h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-neutral-700 leading-relaxed text-lg">
                <p>
                  Our preschool and grade school children have age-appropriate classes on Wednesday nights 
                  to help them learn the Bible and grow their faith. We also endeavor to have triannual 
                  children’s events to help them grow together and build friendships in the church.
                </p>
                <p>
                  Our youth group (6th–12th grade) meets once a month in order to share a meal, grow through 
                  bible study, and enjoy fellowship together. The youth also have their own targeted class on 
                  Wednesday nights, and we sometimes have targeted fellowship events for the group in order to 
                  build important Christian friendships.
                </p>
                <p className="pt-2">
                  If you have questions about the Youth Group or would like to learn more, please contact <a href="mailto:dan.smith@providencescottsdale.com" className="text-neutral-900 border-b border-neutral-900/30 hover:border-neutral-900 transition-colors">dan.smith@providencescottsdale.com</a>.
                </p>
              </div>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}