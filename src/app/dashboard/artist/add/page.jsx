"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UploadCloud, Loader2, User } from "lucide-react"; // User আইকন যোগ করেছি

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
    // নতুন ফিল্ড: artistName
    formData.append("artistName", data.artistName); 

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
    <div className="min-h-screen bg-gray-700 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Add New Artwork</h1>
          <p className="text-gray-300">Upload your work to the gallery.</p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800 p-8 rounded-2xl border border-gray-600 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Artwork Title</label>
            <input
              {...register("title")}
              required
              className="p-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-400 outline-none"
            />
          </div>

          {/* Artist Name - নতুন ফিল্ড */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Artist Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-500" size={18} />
              <input
                {...register("artistName")}
                required
                placeholder="Enter your name"
                className="w-full p-3 pl-10 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-400 outline-none"
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Price ($)</label>
            <input
              type="number"
              {...register("price")}
              required
              className="p-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-400 outline-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Category</label>
            <select
              {...register("category")}
              className="p-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-400 outline-none"
            >
              <option value="painting">Painting</option>
              <option value="sculpture">Sculpture</option>
              <option value="digital">Digital Art</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              {...register("description")}
              required
              rows={4}
              className="p-3 bg-gray-900 border border-gray-600 rounded-xl text-white focus:border-orange-400 outline-none"
            />
          </div>

          {/* Upload */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm text-gray-300">Upload Image</label>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setFileName(file.name);
                }
              }}
            />
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-gray-500 p-6 text-center rounded-xl cursor-pointer hover:border-orange-400 transition flex flex-col items-center gap-2 text-gray-300"
            >
              <UploadCloud className="text-gray-300" />
              {fileName || "Click to select an image"}
            </label>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="md:col-span-2 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition flex justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Artwork"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtistAddPage;