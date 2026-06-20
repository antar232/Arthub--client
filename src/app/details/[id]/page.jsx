"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Tag, Calendar, User } from "lucide-react";
import Link from "next/link";

const DetailsPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  // আর্টওয়ার্ক লোড করা
  const fetchArtwork = async () => {
    if (!id) return;
    try {
      const res = await fetch(`http://localhost:5000/api/artwork/${id}`);
      const data = await res.json();
      setArtwork(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching artwork:", err);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  // কমেন্ট সাবমিট করা
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/artwork/comment/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: "Visitor", comment }),
        },
      );

      if (res.ok) {
        setComment("");
        fetchArtwork(); // নতুন কমেন্টসহ ডেটা রিফ্রেশ করা
        alert("Comment added successfully!");
      }
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading)
    return <div className="text-center p-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-8">
      {/* Back Button */}
      <Link
        href="/browse"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black mb-8"
      >
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
          <span className="bg-neutral-100 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
            {artwork.category}
          </span>
          <h1 className="text-5xl font-bold mt-4 mb-2">{artwork.title}</h1>
          <p className="text-lg text-neutral-500 flex items-center gap-2 mb-6">
            by {artwork.artistName}
          </p>

          <p className="text-neutral-600 mb-8 leading-relaxed">
            {artwork.description || "No description provided."}
          </p>

          <div className="bg-neutral-50 p-6 rounded-xl space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-neutral-500 flex items-center gap-2">
                <Tag size={16} /> Category
              </span>
              <span className="font-medium">{artwork.category}</span>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-4">
              <span className="text-neutral-500 flex items-center gap-2">
                <Calendar size={16} /> Date Listed
              </span>
              <span className="font-medium">
                {new Date(artwork.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-orange-600 mb-6">
            ${artwork.price?.toFixed(2)}
          </h2>

          <Link href="/dashboard/buyer/purchase-history">
            <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition">
              Buy Now via Stripe
            </button>
          </Link>
        </div>
      </div>

      {/* উন্নত ডিজাইন করা কমেন্ট সেকশন */}
      <div className="mt-16 border-t border-neutral-200 pt-10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">
          Comments ({artwork.comments?.length || 0})
        </h3>

        <div className="flex flex-col gap-3 mb-10">
          <textarea
            className="w-full border border-neutral-200 p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            placeholder="Share your thoughts about this artwork..."
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="self-end bg-neutral-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-neutral-800 transition"
          >
            Post Comment
          </button>
        </div>

        <div className="space-y-6">
          {artwork.comments && artwork.comments.length > 0 ? (
            artwork.comments.map((c, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-100"
              >
                <div className="size-10 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-500">
                  {c.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-neutral-900">{c.user}</p>
                    <span className="text-xs text-neutral-400">
                      {new Date(c.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {c.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-400 italic">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
