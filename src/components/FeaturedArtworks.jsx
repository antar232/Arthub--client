"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, DollarSign, Tag, User } from "lucide-react";

const FeaturedArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artwork"); 
        const data = await res.json();
        setArtworks(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured artworks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin size-8 text-violet-400" />
      </div>
    );
  }

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Featured Artworks</h2>
          <p className="text-gray-400 mt-1">Handpicked originals from our community</p>
        </div>
        <Link href="/browse" className="text-sm font-medium text-violet-400 hover:text-violet-300">
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {artworks.map((art) => (
          <div
            key={art._id}
            className="bg-[#1f2533] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-violet-900/20 transition-all border border-white/5"
          >
            {/* Image */}
            <div className="h-48 w-full bg-[#181d29] overflow-hidden">
              <img
                src={`http://localhost:5000${art.imageUrl}`}
                alt={art.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white truncate">{art.title}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1 mb-3">
                <User size={12} />
                {art.artistName}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="flex items-center font-bold text-white">
                  <DollarSign size={14} />
                  {art.price}
                </span>
                <span className="flex items-center gap-1 bg-[#2b3140] text-[#f1974d] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                  <Tag size={10} />
                  {art.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArtworks;