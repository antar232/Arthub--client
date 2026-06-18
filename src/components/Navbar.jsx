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
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-orange-500 p-2 rounded text-white">🎨</div>
        <span className="text-2xl font-bold text-gray-900">ArtHub</span>
      </div>

      <div className="flex gap-8 text-lg font-medium">
        <CustomNavLink to="/">Home</CustomNavLink>
        <CustomNavLink to="/browse">Browse Artworks</CustomNavLink>
        
        {user && (
          <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
        )}
      </div>

      
      <div className="flex items-center gap-4">
        {isPending ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="relative flex items-center gap-3">
            <span className="font-semibold text-gray-800">{user.name}</span>
            
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold"
            >
              {user.image ? (
                <img src={user.image} alt="User" className="w-10 h-10 rounded-full" />
              ) : (
                getInitials(user.name)
              )}
            </button>

           
            {isProfileOpen && (
              <div className="absolute right-0 top-12 bg-white shadow-lg border p-2 rounded w-32 z-50">
                <button onClick={handleLogout} className="text-red-500 w-full text-left font-medium">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-700">Log in</Link>
            <Link href="/signup" className="bg-orange-500 text-white px-5 py-2 rounded-md">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;