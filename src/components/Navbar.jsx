"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomNavLink from "./CustomNavLink";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setIsProfileOpen(false);
    router.push("/login");
  };

  return (
   
    <nav className="flex items-center justify-between px-10 py-4 bg-[#1f2533] border-b border-[#30384a] shadow-lg sticky top-0 z-50">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-[#f1974d] p-2 rounded-lg text-white font-bold">🎨</div>
        <span className="text-2xl font-bold text-white tracking-tight">ArtHub</span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-8 text-lg font-medium text-[#f5f7fc]">
        <CustomNavLink to="/">Home</CustomNavLink>
        <CustomNavLink to="/browse">Browse Artworks</CustomNavLink>
        {user && <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>}
      </div>

      {/* Auth / Profile */}
      <div className="flex items-center gap-4">
        {isPending ? (
          <div className="text-[#a4aabe]">Loading...</div>
        ) : user ? (
          <div className="relative flex items-center gap-3">
            {/* Name */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 font-semibold text-white hover:text-[#f1974d] transition-colors"
            >
              {user.name}
              <svg
                className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Avatar */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-[#f1974d] text-white flex items-center justify-center font-bold overflow-hidden border-2 border-[#2b3140]"
            >
              {user.image ? (
                <img src={user.image} alt="User" className="w-10 h-10 object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-14 bg-[#2b313d] shadow-2xl border border-[#30384a] p-2 rounded-xl w-48 z-50">
                <Link
                  href="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[#e2e8f0] hover:bg-[#383f51] rounded-lg font-medium transition"
                >
                  Dashboard
                </Link>
                <div className="border-t border-[#30384a] my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-red-300 w-full text-left font-medium hover:bg-[#3d2121] rounded-lg transition"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="text-[#a4aabe] hover:text-white transition font-medium">
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#f1974d] text-white px-5 py-2 rounded-xl font-semibold hover:bg-[#e08940] transition shadow-md"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;