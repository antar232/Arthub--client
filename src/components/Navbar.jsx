"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
  };

  const baseLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Artworks", href: "/browse" },
  ];

  const dashboardLinks = {
    buyer: "/dashboard/buyer",
    artist: "/dashboard/artist",
    admin: "/dashboard/admin",
  };

  const userRole = user?.role || "buyer";
  const dashboardHref = dashboardLinks[userRole] || "/dashboard/buyer";

  const finalNavLinks = [
    ...baseLinks,
    ...(user?.email ? [{ label: "Dashboard", href: dashboardHref }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg">
            <span className="text-xl font-bold text-white font-serif">A</span>
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-lg font-bold text-white tracking-tight">
              Art<span className="text-violet-400 italic font-normal">Hub</span>
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE (Desktop Menu & Auth) */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {finalNavLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li key={`${link.label}-${index}`}>
                    <Link
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-gray-300">
                    Hi, {user.name}!
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="text-white border-white/20 hover:bg-white/10"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Sign In
                  </Link>
                  {/* বাটনটি ঠিক এভাবে লিখুন */}
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center h-10 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white md:hidden"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] p-6 md:hidden space-y-4">
          {finalNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block text-gray-300 hover:text-white py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            {user ? (
              <Button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-white/10 text-white"
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-center text-violet-400 py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center h-10 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
