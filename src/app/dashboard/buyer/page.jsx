"use client";

import React from "react";
import { History, ShoppingBag, User, CreditCard, DollarSign } from "lucide-react";

const BuyerPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 bg-neutral-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">Buyer Dashboard</h1>
        <p className="text-lg text-neutral-400">Manage your account and view your collection in one place.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Stats & Artworks */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Card */}
          <div className="bg-[#18181b] p-6 rounded-2xl border border-neutral-800 flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <DollarSign className="text-green-500 size-8" />
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Total Amount Spent</p>
              <h2 className="text-3xl font-bold">$4,250.00</h2>
            </div>
          </div>

          {/* Purchased Artworks Gallery Placeholder */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShoppingBag className="size-6" /> Your Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#18181b] border border-neutral-800 p-4 rounded-xl text-center">
                <p className="text-neutral-500">No artworks purchased yet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Purchase History */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="size-5" /> Recent Transactions
          </h2>
          <div className="space-y-4">
            {/* Transaction Item */}
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div>
                <p className="font-semibold">Abstract Sunset</p>
                <p className="text-xs text-neutral-400">18 Jun, 2026</p>
              </div>
              <span className="text-green-400 font-medium">-$450</span>
            </div>
            {/* Add more items here */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuyerPage;