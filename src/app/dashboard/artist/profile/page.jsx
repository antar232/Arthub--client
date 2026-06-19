"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Loader2, Mail, Edit2, X, Save } from "lucide-react";

const Profile = () => {
  const { data: session, isPending } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfileData({ name: session.user.name, email: session.user.email });
    }
  }, [session]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      // সরাসরি আইডি দিয়ে ডাটাবেজে আপডেট রিকোয়েস্ট পাঠাচ্ছি
      const response = await fetch(`http://localhost:5000/api/user/update/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profileData.name,
          email: profileData.email,
          oldName: session.user.name // আর্টওয়ার্ক আপডেট করার জন্য পুরনো নাম
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        window.location.reload(); // সবচাইতে নিশ্চিত সমাধান: রিফ্রেশ দিয়ে নতুন ডাটা আনা
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) return <div className="flex justify-center p-20"><Loader2 className="animate-spin size-10 text-orange-600" /></div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
           <div className="size-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl font-bold">
             {profileData.name?.charAt(0).toUpperCase()}
           </div>
           <div>
              <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
              <p className="text-gray-500 flex items-center gap-2"><Mail size={16} /> {profileData.email}</p>
           </div>
        </div>
        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition">
          <Edit2 size={16} /> Edit Profile
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-black"><X size={24} /></button>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-orange-500" />
            
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg mb-6 outline-orange-500" />
            
            <button onClick={handleUpdate} disabled={isUpdating} className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition">
              {isUpdating ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;