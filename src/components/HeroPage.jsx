"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

/* ✅ moved OUTSIDE component = hydration safe */
const slides = [
  {
    title: "Discover & Buy Original Art",
    desc: "Connect with independent artists worldwide and find pieces that speak to you.",
    bg: "bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000')]",
  },
  {
    title: "Support Independent Artists",
    desc: "Every purchase directly supports the creator behind the work.",
    bg: "bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2000')]",
  },
  {
    title: "Art For Every Space & Budget",
    desc: "From prints to originals, paintings to digital — curated for every collector.",
    bg: "bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000')]",
  },
];

export default function HeroPage() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  /* ✅ avoids SSR hydration mismatch issues */
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section className="relative w-full h-[80vh] mt-12 overflow-hidden">

      {/* Background layer */}
      <div
        className={`
          absolute inset-0 bg-cover bg-center transition-all duration-700
          ${slides[current].bg}
        `}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 h-full flex flex-col justify-center text-white">

        <p className="uppercase tracking-widest text-orange-400 font-semibold mb-4">
          Welcome to ArtHub
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-2xl leading-tight">
          {slides[current].title}
        </h1>

        <p className="text-base md:text-xl mb-8 max-w-xl text-gray-200">
          {slides[current].desc}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">

          <Link
            href="/browse"
            className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-lg font-semibold transition"
          >
            Browse Artworks →
          </Link>

          <Link
            href="/signup"
            className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-lg font-semibold transition"
          >
            Join as Artist
          </Link>

        </div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                h-2 rounded-full transition-all
                ${index === current ? "w-8 bg-orange-500" : "w-3 bg-gray-500/60"}
              `}
            />
          ))}

        </div>

      </div>
    </section>
  );
}