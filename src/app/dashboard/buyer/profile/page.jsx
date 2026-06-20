"use client";

import React, { useState } from "react";
import { useSession, updateUser, changePassword } from "@/lib/auth-client";
import { User, Mail, Lock, Loader2, Save } from "lucide-react";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // প্রোফাইল আপডেট করার ফাংশন
  const handleUpdateProfile = async () => {
    // ১. সেশন আইডি চেক করুন
    if (!session?.user?.id) {
      console.error("Session User ID is missing!", session);
      alert("Session expired. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update/${session.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name, // স্টেট থেকে নাম
            email: email, // স্টেট থেকে ইমেইল
            oldName: session.user.name, // সেশন থেকে পুরনো নাম
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
        window.location.reload();
      } else {
        // যদি সার্ভার "User not found" দেয়, তবে কনসোলে আইডিটি দেখুন
        console.error("Server responded with error:", data.message);
        console.log("Sending ID:", session.user.id);
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Connection error!");
    } finally {
      setLoading(false);
    }
  };
  // পাসওয়ার্ড পরিবর্তনের ফাংশন
  const handleChangePassword = async () => {
    setLoading(true);
    await changePassword({ currentPassword, newPassword });
    setLoading(false);
    alert("Password changed successfully!");
  };

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-10" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 bg-neutral-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="bg-[#18181b] border border-neutral-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="size-5" /> Personal Details
          </h2>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              placeholder="Full Name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              placeholder="Email"
            />
            <button
              onClick={handleUpdateProfile}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-lg font-bold"
            >
              {loading ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <Save className="size-5" />
              )}{" "}
              Save Changes
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#18181b] border border-neutral-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Lock className="size-5" /> Security
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              placeholder="Current Password"
            />
            <input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              placeholder="New Password"
            />
            <button
              onClick={handleChangePassword}
              className="w-full bg-neutral-800 text-white py-3 rounded-lg font-bold hover:bg-neutral-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
