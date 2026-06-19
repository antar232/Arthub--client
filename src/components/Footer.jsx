import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white border-t border-gray-500 py-12 rounded-2xl mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#E67E67] p-2 rounded text-white text-lg">🎨</div>
            <span className="text-2xl font-bold text-white">ArtHub</span>
          </div>

          <p className="text-gray-200 mb-6 text-sm">
            Connecting art lovers with independent artists around the world.
            Discover, collect, and celebrate original art.
          </p>

          <div className="flex gap-4 text-gray-200 text-sm">
            <a href="#" className="hover:text-orange-300">Instagram</a>
            <a href="#" className="hover:text-orange-300">Twitter</a>
            <a href="#" className="hover:text-orange-300">Facebook</a>
            <a href="#" className="hover:text-orange-300">Pinterest</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><Link href="/" className="hover:text-orange-300">Home</Link></li>
            <li><Link href="/browse" className="hover:text-orange-300">Browse Artworks</Link></li>
            <li><Link href="/about" className="hover:text-orange-300">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-300">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li><Link href="/privacy" className="hover:text-orange-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-300">Terms of Service</Link></li>
            <li><Link href="/cookies" className="hover:text-orange-300">Cookie Policy</Link></li>
            <li><Link href="/agreement" className="hover:text-orange-300">Artist Agreement</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="font-bold text-white mb-4">Stay Inspired</h3>
          <p className="text-gray-200 text-sm mb-4">
            Get curated art picks and exclusive drops in your inbox.
          </p>

          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-gray-500 border border-gray-400 rounded px-3 py-2 text-sm text-white placeholder-gray-300 focus:outline-none focus:border-orange-300"
            />

            <button className="bg-[#E67E67] text-white px-4 py-2 rounded hover:bg-orange-500 transition text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-gray-500 text-center text-gray-200 text-sm">
        © 2026 ArtHub. All rights reserved. Made with care for artists everywhere.
      </div>
    </footer>
  );
};

export default Footer;