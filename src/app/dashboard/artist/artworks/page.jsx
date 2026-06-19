"use client";
import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Loader2, DollarSign, Tag, User } from "lucide-react";

const ArtWorksPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artwork");
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    const res = await fetch(`http://localhost:5000/api/artwork/${id}`, { method: "DELETE" });
    if (res.ok) setArtworks((prev) => prev.filter((art) => art._id !== id));
  };

  if (loading) return (
    <div className="flex justify-center p-20 bg-[#2b313d] min-h-screen">
      <Loader2 className="animate-spin size-10 text-white" />
    </div>
  );

  return (
    <div className="p-8 bg-[#2b313d] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-10 tracking-tight">Manage My Artworks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artworks.map((art) => (
          <div key={art._id} className="bg-[#1f2533] rounded-2xl overflow-hidden group transition-all duration-300 shadow-xl flex flex-col hover:shadow-orange-950/30">
            
            {/* Image section */}
            <div className="h-56 w-full bg-[#181d29] flex items-center justify-center overflow-hidden">
              {art.imageUrl ? (
                <img 
                  src={`http://localhost:5000${art.imageUrl}`} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              ) : (
                <span className="text-[#687087]">No Image</span>
              )}
            </div>

            {/* Content section */}
            <div className="p-6 flex-grow">
              <h2 className="text-2xl font-semibold mb-1 text-white tracking-tight truncate">{art.title}</h2>
              
              {/* Artist Name with Orange accent */}
              <div className="flex items-center gap-2 text-sm text-[#f1974d] mb-4">
                <User size={15} />
                <span className="font-medium">{art.artistName || "Unknown Artist"}</span>
              </div>

              {/* Description */}
              <p className="text-[#a4aabe] text-sm mb-5 leading-relaxed line-clamp-3">
                {art.description || "No description provided. Add one to help buyers understand your work."}
              </p>

              <div className="flex items-center justify-between gap-4 mt-auto">
                <span className="flex items-center gap-1 text-xl font-semibold text-white">
                  <DollarSign size={18} />
                  {art.price}
                </span>
                
                {/* Category badge with orange text */}
                <span className="flex items-center gap-1.5 bg-[#2b3140] text-[#f1974d] px-3.5 py-1.5 rounded-full text-xs font-medium capitalize">
                  <Tag size={13} /> 
                  {art.category}
                </span>
              </div>
            </div>

            {/* Buttons section */}
            <div className="px-6 pb-6 pt-0 flex gap-4 mt-auto">
              <button className="flex-1 py-3 bg-[#2b3140] rounded-xl hover:bg-[#383f51] flex items-center justify-center gap-2.5 transition-colors text-white font-semibold text-sm">
                <Edit2 size={16} /> 
                Edit
              </button>
              <button 
                onClick={() => handleDelete(art._id)} 
                className="px-5 py-3 bg-[#3d2121] text-red-300 rounded-xl hover:bg-[#522929] transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {artworks.length === 0 && (
        <div className="text-center text-[#a4aabe] mt-24 py-12 bg-[#1f2533] rounded-2xl border border-[#30384a]">
          <User size={40} className="mx-auto mb-4 text-[#687087]"/>
          No artworks found. Use the add page to upload your first creation!
        </div>
      )}
    </div>
  );
};

export default ArtWorksPage;