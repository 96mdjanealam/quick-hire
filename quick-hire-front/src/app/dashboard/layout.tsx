import React from "react";
import Link from "next/link";
import { getUserData } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarNav from "@/components/SidebarNav/SidebarNav";
import LogoutBtn from "@/components/Navbar/LogoutBtn";
import Image from "next/image";
import Logo from "@/assets/images/logos/quickhire-logo.png";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-zinc-200 md:h-screen md:sticky md:top-0 p-6 flex flex-col overflow-y-auto shrink-0">
        <div className="mb-8">
          <Link
            href="/"
            className="relative block w-[120px] md:w-[160px] h-[30px] md:h-[40px]"
          >
            <Image
              src={Logo}
              alt="QuickHire Logo"
              fill
              sizes="160px"
              className="object-contain"
            />
          </Link>
        </div>

        <SidebarNav />

        <div className="mt-auto pt-8 border-t border-zinc-100">
          <LogoutBtn />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full max-w-[1200px] mx-auto">
        {children}
      </main>
    </div>
  );
}
