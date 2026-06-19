"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroPage = () => {
    // স্লাইডারের ডেটা
    const slides = [
        {
            title: "Discover & Buy Original Art",
            desc: "Connect with independent artists worldwide and find pieces that speak to you.",
            bg: "bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000')]" // এখানে আপনার ছবির লিঙ্ক দিন
        },
        {
            title: "Support Independent Artists",
            desc: "Every purchase directly supports the creator behind the work.",
            bg: "bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2000')]"
        },
        {
            title: "Art For Every Space & Budget",
            desc: "From prints to originals, paintings to digital — curated for every collector.",
            bg: "bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000')]"
        }
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`relative w-full h-[80vh]  bg-cover bg-center  transition-all duration-700 mt-12 ${slides[current].bg}`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative container mx-auto px-10 h-full flex flex-col justify-center text-white">
                <p className="uppercase tracking-widest text-orange-400 font-semibold mb-4">Welcome to ArtHub</p>
                <h1 className="text-6xl font-bold mb-6 max-w-2xl leading-tight">
                    {slides[current].title}
                </h1>
                <p className="text-xl mb-8 max-w-xl text-gray-200">
                    {slides[current].desc}
                </p>
                
                <div className="flex gap-4">
                    <Link href="/browse" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition">
                        Browse Artworks →
                    </Link>
                    <Link href="/signup" className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-md font-semibold transition">
                        Join as Artist
                    </Link>
                </div>

                {/* Slider Dots */}
                <div className="absolute bottom-10 flex gap-2">
                    {slides.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-10 h-2 rounded-full transition-all ${current === index ? 'bg-orange-500' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroPage;