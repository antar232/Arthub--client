import { getUserSession } from "@/lib/core/session";
import {
  LayoutDashboard,
  History,
  Image,
  UserSquare2,
  PlusCircle,
  Palette,
  DollarSign,
  Users,
  Receipt,
  Settings,
} from "lucide-react";
import { Button, Drawer, DrawerTrigger } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const userNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/buyer", label: "Dashboard" },
    { icon: History, href: "/dashboard/buyer/purchase-history", label: "Purchase History" },
    { icon: Image, href: "/dashboard/buyer/bought-artworks", label: "Bought Art" },
    { icon: UserSquare2, href: "/dashboard/buyer/profile", label: "Profile Setup" },
    { icon: Settings, href: "/settings", label: "Settings" },
  ];

  const artistNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/artist", label: "Studio Dashboard" },
    { icon: Palette, href: "/dashboard/artist/artworks", label: "Manage Artworks" },
    { icon: PlusCircle, href: "/dashboard/artist/add", label: "Add Artwork" },
    { icon: DollarSign, href: "/dashboard/artist/sales", label: "Sales History" },
    { icon: UserSquare2, href: "/dashboard/artist/profile", label: "Profile Setup" },
  ];

  const adminNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/admin", label: "Admin Panel" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    { icon: Palette, href: "/dashboard/admin/artworks", label: "Manage Artworks" },
    { icon: Receipt, href: "/dashboard/admin/transactions", label: "Transactions" },
    { icon: Settings, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const navLinksMap = {
    user: userNavLinks,
    artist: artistNavLinks,
    admin: adminNavLinks,
  };

  const cleanedRole = user?.role?.toLowerCase() || "user";
  const navItems = navLinksMap[cleanedRole] || navLinksMap.user;

  const navContent = (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item, index) => (
        <Link
          key={`${item.label}-${index}`}
          href={item.href}
          className="
            flex items-center gap-3 rounded-xl px-4 py-3 text-sm
            text-gray-200
            hover:bg-gray-600
            hover:text-white
            transition-all duration-200
            hover:translate-x-1
          "
        >
          <item.icon className="size-5 text-gray-300" />
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-600 bg-gray-700 p-4 lg:block min-h-[calc(100vh-5rem)] text-white">

        <div className="mb-4 px-4 py-2">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            {cleanedRole} Mode
          </p>
        </div>

        {navContent}
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <Drawer placement="left">
          <DrawerTrigger>
            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-white shadow-lg">
              <LayoutSideContentLeft />
              <span>Menu</span>
            </div>
          </DrawerTrigger>

          <Drawer.Backdrop />

          <Drawer.Content
            placement="left"
            className="w-[280px] bg-gray-800 text-white"
          >
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="font-bold capitalize text-white">
                  {cleanedRole} Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer>
      </div>
    </>
  );
}