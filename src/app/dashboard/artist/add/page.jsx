"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Loader2 } from "lucide-react";

const ArtistAddPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    if (selectedFile) formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/artwork", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Artwork published successfully!");
        reset();
        setSelectedFile(null);
        setFileName("");
      } else {
        alert("Failed to publish artwork.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Add New Artwork</h1>
          <p className="text-zinc-400">Upload your work to the gallery.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-[#121212] p-8 rounded-2xl border border-neutral-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Artwork Title</label>
            <input {...register("title")} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl outline-none focus:border-white" required />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Price ($)</label>
            <input type="number" {...register("price")} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl outline-none focus:border-white" required />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-400">Category</label>
            <select {...register("category")} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl outline-none focus:border-white">
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="digital">Digital Art</option>
            </select>
          </div>

          {/* Dummy for alignment */}
          <div></div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-zinc-400">Description</label>
            <textarea {...register("description")} rows={4} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl outline-none focus:border-white" required />
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-zinc-400">Upload Image</label>
            <input type="file" id="file-upload" className="hidden" onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setFileName(e.target.files[0]?.name || "");
            }} />
            <label htmlFor="file-upload" className="border-2 border-dashed border-neutral-800 p-6 text-center cursor-pointer rounded-xl hover:border-neutral-600 transition flex flex-col items-center gap-2">
              <UploadCloud className="text-zinc-600" />
              {fileName || "Click to select an image"}
            </label>
          </div>

          {/* Button */}
          <button disabled={loading} className="md:col-span-2 py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all flex justify-center gap-2">
            {loading ? <><Loader2 className="animate-spin" /> Publishing...</> : "Publish Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default ArtistAddPage;