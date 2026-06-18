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
    <nav className="flex items-center justify-between container mx-auto rounded-2xl px-10 py-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-orange-500 p-2 rounded text-white">🎨</div>
        <span className="text-2xl font-bold text-gray-900">ArtHub</span>
      </div>

      {/* Nav Links */}
      <div className="flex gap-8 text-lg font-medium">
        <CustomNavLink to="/">Home</CustomNavLink>
        <CustomNavLink to="/browse">Browse Artworks</CustomNavLink>
        {user && <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>}
      </div>

      {/* Auth/Profile */}
      <div className="flex items-center gap-4">
        {isPending ? (
          <div className="text-gray-500">Loading...</div>
        ) : user ? (
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-1 font-semibold text-gray-800 hover:text-orange-600 transition-colors"
            >
              {user.name}
              <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold overflow-hidden"
            >
              {user.image ? (
                <img src={user.image} alt="User" className="w-10 h-10 object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-14 bg-white shadow-lg border border-gray-100 p-2 rounded-xl w-48 z-50 animate-in fade-in zoom-in duration-200">
                <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  Dashboard
                </Link>
                <div className="border-t my-1"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-500 w-full text-left font-medium hover:bg-red-50 rounded-lg transition-colors">
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-700 hover:text-orange-600">Log in</Link>
            <Link href="/signup" className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition-colors">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;