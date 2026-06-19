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

  // 1. Regular User / Buyer Nav Links
  const userNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
    {
      icon: History,
      href: "/dashboard/user/purchase-history",
      label: "Purchase History",
    },
    {
      icon: Image,
      href: "/dashboard/user/bought-artworks",
      label: "Bought Art",
    },
    {
      icon: UserSquare2,
      href: "/dashboard/user/profile",
      label: "Profile Setup",
    },
    { icon: Settings, href: "/settings", label: "Settings" },
  ];

  const artistNavLinks = [
    {
      icon: LayoutDashboard,
      href: "/dashboard/artist",
      label: "Studio Dashboard",
    },
    {
      icon: Palette,
      href: "/dashboard/artist/artworks",
      label: "Manage Artworks",
    },
    { icon: PlusCircle, href: "/dashboard/artist/add", label: "Add Artwork" },
    { icon: Palette, href: "/dashboard/artist/edit", label: "Edit Artwork" },
    {
      icon: DollarSign,
      href: "/dashboard/artist/sales",
      label: "Sales History",
    },
    {
      icon: UserSquare2,
      href: "/dashboard/artist/profile",
      label: "Profile Setup",
    },
  ];

  // 3. Admin Nav Links
  const adminNavLinks = [
    { icon: LayoutDashboard, href: "/dashboard/admin", label: "Admin Panel" },
    { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
    {
      icon: Palette,
      href: "/dashboard/admin/artworks",
      label: "Manage Artworks",
    },
    {
      icon: Receipt,
      href: "/dashboard/admin/transactions",
      label: "Transactions",
    },
    { icon: Settings, href: "/dashboard/admin/settings", label: "Settings" },
  ];

  
  const navLinksMap = {
    user: userNavLinks,
    artist: artistNavLinks,
    admin: adminNavLinks,
  };

  // better-auth থেকে প্রাপ্ত রোল ফিল্টারিং (fallback: user)
  const cleanedRole = user?.role?.toLowerCase() || "user";
  const navItems = navLinksMap[cleanedRole] || navLinksMap["user"];

  const navContent = (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item, index) => (
        <Link
          key={`${item.label}-${index}`}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-foreground transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:translate-x-1"
          href={item.href}
        >
          <item.icon className="size-5 text-zinc-500" />
          <span className="font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Aside Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-divider p-4 lg:block min-h-[calc(100vh-5rem)]">
        <div className="mb-4 px-4 py-2">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {cleanedRole} Mode
          </p>
        </div>
        {navContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {/* <Drawer placement="left">
                <Button className="lg:hidden fixed bottom-6 right-6 z-50 rounded-full shadow-lg" color="black" variant="solid">
                    <LayoutSideContentLeft />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading className="text-base font-bold capitalize">
                                    {cleanedRole} Navigation
                                </Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer> */}
      <div className="lg:hidden">
        <Drawer placement="left">
          <DrawerTrigger>
            <div
              className="
          fixed
          bottom-6
          left-6
          z-50
          flex
          items-center
          gap-2
          rounded-full
          bg-black
          px-4
          py-3
          text-white
          cursor-pointer
          shadow-lg
        "
            >
              <LayoutSideContentLeft />
              <span>Menu</span>
            </div>
          </DrawerTrigger>

          <Drawer.Backdrop />

          <Drawer.Content
            placement="left"
            className="w-[280px] bg-[#121212] text-white"
          >
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="font-bold capitalize">
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
