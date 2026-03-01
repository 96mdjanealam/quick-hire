import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard, Briefcase, PlusCircle, Users } from "lucide-react";
import LogoutBtn from "@/components/Navbar/LogoutBtn";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-zinc-200 md:min-h-screen p-6 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logos/quickhire-logo.png"
              alt="QuickHire Logo"
              width={160}
              height={40}
              className="w-[120px] md:w-[160px] h-auto"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors font-semibold text-sm"
          >
            <LayoutDashboard size={20} />
            Overview
          </Link>
          <Link
            href="/dashboard/jobs"
            className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors font-semibold text-sm"
          >
            <Briefcase size={20} />
            Manage Jobs
          </Link>
          <Link
            href="/dashboard/jobs/create"
            className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors font-semibold text-sm"
          >
            <PlusCircle size={20} />
            Post a Job
          </Link>
          <Link
            href="/dashboard/applications"
            className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-lg transition-colors font-semibold text-sm"
          >
            <Users size={20} />
            Applications
          </Link>
        </nav>

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
