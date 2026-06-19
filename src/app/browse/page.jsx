"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Search, SlidersHorizontal, User, DollarSign } from "lucide-react";

const BrowseArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Painting", "Digital", "Sculpture", "Photography", "Drawing", "Mixed Media"];

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artwork");
        const data = await res.json();
        setArtworks(data);
        setFilteredArtworks(data);
      } catch (err) {
        console.error("Error fetching artworks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    let filtered = artworks;

    // ফিল্টার লজিক: ক্যাটাগরি এবং সার্চ একসাথে কাজ করবে
    if (activeCategory !== "All") {
      filtered = filtered.filter((art) => 
        // ডাটাবেজের ক্যাটাগরির সাথে মিলানোর জন্য trim() ও toLowerCase() ব্যবহার করা হয়েছে
        art.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((art) => 
        art.title?.toLowerCase().includes(search.toLowerCase()) ||
        art.artistName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredArtworks(filtered);
  }, [search, activeCategory, artworks]);

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin size-10 text-orange-600" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white min-h-screen">
      <h1 className="text-4xl font-serif font-bold text-black mb-2">Browse Artworks</h1>
      <p className="text-gray-600 mb-8">Explore original art from independent artists</p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by title or artist..." 
            className="w-full bg-gray-50 text-gray-800 pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 transition"
            value={search} // এখানে 'value' কন্ট্রোল করা হয়েছে এরর এড়াতে
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition">Search</button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition border ${
              activeCategory === cat 
                ? "bg-orange-600 text-white border-orange-600" 
                : "bg-transparent text-gray-600 border-gray-200 hover:border-orange-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredArtworks.map((art) => (
          <div key={art._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="h-64 w-full bg-gray-100 overflow-hidden">
              <img src={`http://localhost:5000${art.imageUrl}`} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">{art.artistName}</p>
              <h3 className="font-semibold text-gray-900 text-lg">{art.title}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-orange-600">${art.price}</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[12px] font-medium uppercase tracking-wider">{art.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseArtworks;