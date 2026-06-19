"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, UploadCloud, User } from "lucide-react";

const EditArtworkPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "painting",
    description: "",
    artistName: "",
  });

  useEffect(() => {
    // Fetch existing data
    fetch(`http://localhost:5000/api/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:5000/api/artwork/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Artwork updated successfully!");
        // এখানে আপনার সঠিক পাথটি দিন, যেমন: router.push("/manage-artworks")
        window.location.href = "/dashboard/artist/artworks";
      } else {
        alert("Failed to update. Server returned an error.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-20 text-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#2b313d] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Artwork</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f2533] p-8 rounded-2xl border border-[#30384a] grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#a4aabe]">Artwork Title</label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-3 bg-[#181d29] border border-[#30384a] rounded-xl outline-none focus:border-[#f1974d]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#a4aabe]">Artist Name</label>
            <input
              value={formData.artistName}
              onChange={(e) =>
                setFormData({ ...formData, artistName: e.target.value })
              }
              className="p-3 bg-[#181d29] border border-[#30384a] rounded-xl outline-none focus:border-[#f1974d]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#a4aabe]">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="p-3 bg-[#181d29] border border-[#30384a] rounded-xl outline-none focus:border-[#f1974d]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#a4aabe]">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="p-3 bg-[#181d29] border border-[#30384a] rounded-xl outline-none focus:border-[#f1974d]"
            >
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="digital">Digital Art</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-[#a4aabe]">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="p-3 bg-[#181d29] border border-[#30384a] rounded-xl outline-none focus:border-[#f1974d]"
            />
          </div>

          <button
            disabled={submitting}
            className="md:col-span-2 py-4 bg-[#f1974d] text-white font-bold rounded-xl hover:bg-[#e08940] transition"
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArtworkPage;
