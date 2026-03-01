import React from "react";
import Link from "next/link";
import { PlusCircle, Briefcase, Users } from "lucide-react";
import { fetchJobs, getApplications } from "@/lib/api";

export default async function DashboardPage() {
  let initialJobsCount = 0;
  let initialApplicationsCount = 0;

  try {
    const jobsRes = await fetchJobs();
    initialJobsCount = jobsRes.count || 0;

    // We try to fetch applications to get the count. If it fails (some auth issue or empty), we handle it silently for the dashboard overview.
    const appsRes = await getApplications().catch(() => ({ count: 0 }));
    initialApplicationsCount = appsRes.count || 0;
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 font-clash">
          Dashboard Overview
        </h1>
        <p className="text-zinc-500 mt-2">
          Welcome to your QuickHire admin dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Briefcase size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-500">Total Jobs</p>
            <p className="text-2xl font-bold text-zinc-900">
              {initialJobsCount}
            </p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-500">
              Total Applications
            </p>
            <p className="text-2xl font-bold text-zinc-900">
              {initialApplicationsCount}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/jobs/create"
            className="flex flex-col items-center justify-center gap-3 p-8 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <PlusCircle size={24} />
            </div>
            <span className="font-semibold text-zinc-700">Post a new Job</span>
          </Link>

          <Link
            href="/dashboard/jobs"
            className="flex flex-col items-center justify-center gap-3 p-8 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <Briefcase size={24} />
            </div>
            <span className="font-semibold text-zinc-700">Manage Jobs</span>
          </Link>

          <Link
            href="/dashboard/applications"
            className="flex flex-col items-center justify-center gap-3 p-8 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <span className="font-semibold text-zinc-700">
              View Applications
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
