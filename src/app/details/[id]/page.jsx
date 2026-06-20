"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Tag, Calendar, User } from "lucide-react";
import Link from "next/link";

const DetailsPage = () => {
  const { id } = useParams(); // URL থেকে ID সংগ্রহ করা
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/artwork/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArtwork(data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (loading) return <div className="text-center p-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-8">
      {/* Back Button */}
      <Link href="/browse" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black mb-8">
        <ArrowLeft size={16} /> Back to Browse
      </Link>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="bg-neutral-100 rounded-2xl overflow-hidden h-[500px]">
          <img 
            src={`http://localhost:5000${artwork.imageUrl}`} 
            alt={artwork.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div>
          <span className="bg-neutral-100 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">{artwork.category}</span>
          <h1 className="text-5xl font-bold mt-4 mb-2">{artwork.title}</h1>
          <p className="text-lg text-neutral-500 flex items-center gap-2 mb-6">
            by {artwork.artistName}
          </p>

          <p className="text-neutral-600 mb-8 leading-relaxed">
            {artwork.description || "No description provided."}
          </p>

          <div className="bg-neutral-50 p-6 rounded-xl space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-neutral-500 flex items-center gap-2"><Tag size={16} /> Category</span>
              <span className="font-medium">{artwork.category}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-4">
              <span className="text-neutral-500 flex items-center gap-2"><Calendar size={16} /> Date Listed</span>
              <span className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-orange-600 mb-6">${artwork.price.toFixed(2)}</h2>

          <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition">
            Buy Now via Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;