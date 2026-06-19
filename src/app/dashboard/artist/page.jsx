import React from "react";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import {
  Briefcase,
  Envelope,
  Person,
  Plus,
  ChartColumn,
  ListUl,
  Gear,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

const ArtistDashboard = () => {
  // Artist-er jonno mock dashboard stats data
  const artistStats = [
    {
      id: 1,
      title: "Total Artworks",
      value: "24",
      icon: Briefcase,
    },
    {
      id: 2,
      title: "Artworks Sold",
      value: "15",
      icon: ChartColumn,
    },
    {
      id: 3,
      title: "Total Revenue",
      value: "$4,250",
      icon: Envelope,
    },
    {
      id: 4,
      title: "Profile Views",
      value: "1.2k",
      icon: Person,
    },
  ];

  // Recent sales er mock data (Snapshot of Sales History)
  const recentSales = [
    {
      id: 101,
      title: "Abstract Sunset",
      buyer: "John Doe",
      price: "$450",
      date: "18 Jun, 2026",
    },
    {
      id: 102,
      title: "Ocean Waves",
      buyer: "Sarah Smith",
      price: "$300",
      date: "15 Jun, 2026",
    },
    {
      id: 103,
      title: "Urban Dreams",
      buyer: "Mike Johnson",
      price: "$800",
      date: "10 Jun, 2026",
    },
    {
      id: 104,
      title: "Neon City",
      buyer: "Alice Brown",
      price: "$550",
      date: "05 Jun, 2026",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto text-white-600 p-4">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Artist Dashboard</h1>
        <p className="text-white-600">
          Welcome back! Manage your gallery, track sales, and update your
          profile from here.
        </p>
      </div>

      {/* Dashboard Stats Cards */}
      <DashboardStats statsData={artistStats} />

      {/* Main Content: Recent Sales & Hub Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales Table (Snapshot of Sales History) */}
        <div className="lg:col-span-2 bg-[#18181d] border border-neutral-800 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg text-neutral-400 font-semibold">
                Recent Sales
              </h3>
              <p className="text-sm text-neutral-400">
                Your latest artwork purchases
              </p>
            </div>
            <Link
              href="/dashboard/artist/sales"
              className="text-sm text-blue-400 hover:text-blue-300 font-medium"
            >
              View Full History
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="pb-3 font-medium">Artwork</th>
                  <th className="pb-3 font-medium">Buyer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white-800">
                {recentSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="hover:bg-neutral-900/50 transition-colors"
                  >
                    <td className="py-4 text-neutral-400 font-medium">
                      {sale.title}
                    </td>
                    <td className="py-4 text-neutral-400">{sale.buyer}</td>
                    <td className="py-4 text-neutral-400">{sale.date}</td>
                    <td className="py-4 font-semibold text-right text-green-400">
                      {sale.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dashboard Hub / Quick Links Panel */}
        <div className="bg-[#18181b] border border-neutral-800 rounded-2xl p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold">Management Hub</h3>
            <p className="text-sm text-neutral-400">
              Quick access to your tools
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* 1. Add Artwork */}
            <Link href="/dashboard/artist/add" className="w-full block">
                <Button 
                    className="w-full flex items-center justify-start pl-4 gap-3 bg-white text-black hover:bg-neutral-200 font-medium py-6 rounded-xl transition-colors"
                    >
                         <Plus className="size-5" />
                        <span>Publish New Artwork</span>
                </Button>
            </Link>

            {/* 2. Manage Artworks (CRUD) */}
            <Link href="/dashboard/artist/artworks" className="w-full block">
              <Button
                variant="secondary"
                className="w-full flex items-center justify-start pl-4 gap-3 bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-6 rounded-xl transition-colors"
              >
                <Briefcase className="size-5 text-neutral-400" />
                <span>Manage Gallery (Edit/Delete)</span>
              </Button>
            </Link>

            {/* 3. Sales History */}
            <Link href="/dashboard/artist/sales" className="w-full block">
              <Button
                variant="secondary"
                className="w-full flex items-center justify-start pl-4 gap-3 bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-6 rounded-xl transition-colors"
              >
                <ListUl className="size-5 text-neutral-400" />
                <span>Full Sales History</span>
              </Button>
            </Link>

            {/* 4. Profile Management */}
            <Link href="/dashboard/artist/profile" className="w-full block">
              <Button
                variant="secondary"
                className="w-full flex items-center justify-start pl-4 gap-3 bg-neutral-800 text-white hover:bg-neutral-700 font-medium py-6 rounded-xl transition-colors"
              >
                <Gear className="size-5 text-neutral-400" />
                <span>Profile Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
