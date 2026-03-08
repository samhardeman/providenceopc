"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Search, BookOpen } from "lucide-react";
import { BOOKS } from "@/data/books";

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search input (now checking title, author, AND tags)
  const filteredBooks = BOOKS.filter((book) => {
    const term = searchTerm.toLowerCase();

    // Check if term matches title or author
    const matchesText =
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term);

    // Check if term matches any of the tags
    const matchesTags =
      book.tags && book.tags.some((tag) => tag.toLowerCase().includes(term));

    return matchesText || matchesTags;
  });

  const bannerImage = "image6.jpg";

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
                alt="Library Header Background"
                fill
                priority
                className="object-cover blur-[3px]"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-[#FAFAF7]/80 backdrop-blur-sm" />
          </>
        )}

        {/* Content Layer */}
        <div className="relative z-20 max-w-[1000px] mx-auto px-6 md:px-12 pt-12 pb-10 md:pt-20 md:pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-serif leading-tight pb-2">
            Library
          </h1>
          <p className="mt-4 text-neutral-600 uppercase tracking-widest text-xs md:text-sm max-w-2xl mx-auto">
            Enriching books for congregant edification
          </p>
        </div>
      </section>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="relative z-10 flex-grow w-full max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Search Bar */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-lg">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search authors, titles, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900/5 border border-neutral-900/10 rounded-full pl-12 pr-6 py-4 text-lg focus:outline-none focus:border-neutral-900/30 focus:bg-neutral-900/10 transition-colors font-serif placeholder:font-sans placeholder:text-base placeholder:text-neutral-500 text-neutral-900 shadow-sm"
            />
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-neutral-900/5 border border-neutral-900/10 p-4 md:p-6 flex flex-col items-center justify-center text-center rounded-sm aspect-[3/4] hover:bg-neutral-900/10 hover:border-neutral-900/20 transition-all cursor-default group"
                >
                  <BookOpen
                    className="text-neutral-300 mb-4 group-hover:text-neutral-400 transition-colors"
                    size={24}
                  />

                  <h3 className="font-serif text-lg md:text-xl leading-tight mb-2 line-clamp-3">
                    {book.title}
                  </h3>

                  <p className="text-neutral-500 text-[10px] uppercase tracking-widest mb-4 line-clamp-2 border-b border-neutral-900/10 pb-2 w-full">
                    {book.author}
                  </p>

                  {/* Map through the tags (showing up to 3) */}
                  <div className="mt-auto flex flex-wrap justify-center gap-1 w-full">
                    {book.tags?.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] uppercase tracking-wider bg-neutral-900/10 px-2 py-1 rounded-sm text-neutral-600 truncate max-w-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-24 text-neutral-500 font-serif text-2xl flex flex-col items-center gap-4"
              >
                <Search size={48} className="opacity-20" />
                No books found matching "{searchTerm}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
