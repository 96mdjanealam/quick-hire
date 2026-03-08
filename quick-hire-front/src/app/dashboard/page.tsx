import Link from "next/link";
import {
  PlusCircle,
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  ArrowRight,
  Clock,
  MapPin,
  Building2,
  Zap,
} from "lucide-react";
import { fetchJobs, getApplications } from "@/lib/api";

export default async function DashboardPage() {
  let jobsData: { count: number; data: any[] } = { count: 0, data: [] };
  let applicationsData: { count: number; data: any[] } = { count: 0, data: [] };
  let userName = "Admin";

  try {
    const jobsRes = await fetchJobs();
    jobsData = jobsRes;

    const appsRes = await getApplications().catch(() => ({
      count: 0,
      data: [],
    }));
    applicationsData = appsRes;
  } catch (error) {
    console.error("Failed to fetch dashboard stats", error);
  }

  // Get recent jobs (last 5)
  const recentJobs = jobsData.data?.slice(0, 5) || [];

  // Get recent applications (last 5)
  const recentApplications = applicationsData.data?.slice(0, 5) || [];

  // Calculate jobs this month
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const jobsThisMonth =
    jobsData.data?.filter((job) => new Date(job.created_at) >= startOfMonth)
      .length || 0;

  // Format date
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 font-clash">
            Welcome back, <span className="text-primary">{userName}!</span>
          </h1>
          <p className="text-zinc-500 mt-2 flex items-center gap-2">
            <Calendar size={16} />
            {formattedDate}
          </p>
        </div>
        <Link
          href="/dashboard/jobs/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          <PlusCircle size={20} />
          Post New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Jobs */}
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Jobs</p>
              <p className="text-3xl font-bold text-zinc-900 mt-1">
                {jobsData.count}
              </p>
            </div>
            <div className="w-11 h-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <Briefcase size={22} />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-emerald-600 text-sm font-medium">
            <TrendingUp size={14} />
            <span>{jobsThisMonth} this month</span>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Applications</p>
              <p className="text-3xl font-bold text-zinc-900 mt-1">
                {applicationsData.count}
              </p>
            </div>
            <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Users size={22} />
            </div>
          </div>
          <div className="mt-3 text-zinc-400 text-sm">Total received</div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Active Listings
              </p>
              <p className="text-3xl font-bold text-zinc-900 mt-1">
                {jobsData.count}
              </p>
            </div>
            <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={22} />
            </div>
          </div>
          <div className="mt-3 text-zinc-400 text-sm">Currently active</div>
        </div>

        {/* Avg Applications per Job */}
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Avg. Applications
              </p>
              <p className="text-3xl font-bold text-zinc-900 mt-1">
                {jobsData.count > 0
                  ? (applicationsData.count / jobsData.count).toFixed(1)
                  : 0}
              </p>
            </div>
            <div className="w-11 h-11 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={22} />
            </div>
          </div>
          <div className="mt-3 text-zinc-400 text-sm">Per job listing</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">Recent Jobs</h2>
            <Link
              href="/dashboard/jobs"
              className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/jobs/${job._id}`}
                  className="p-4 hover:bg-zinc-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {job.company_logo ? (
                      <img
                        src={job.company_logo}
                        alt={job.company}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Building2 size={18} className="text-zinc-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Building2 size={12} />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(job.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-zinc-500">
                <Briefcase size={32} className="mx-auto mb-3 text-zinc-300" />
                <p>No jobs posted yet</p>
                <Link
                  href="/dashboard/jobs/create"
                  className="text-primary text-sm font-medium hover:underline mt-2 inline-block"
                >
                  Post your first job
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">
              Recent Applications
            </h2>
            <Link
              href="/dashboard/applications"
              className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <Link
                  key={app._id}
                  href="/dashboard/applications"
                  className="p-4 hover:bg-zinc-50 transition-colors flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold shrink-0">
                    {app.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-900 truncate">
                      {app.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} />
                        {app.job_id?.title || "Unknown Job"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 size={12} />
                        {app.job_id?.company || "Unknown Job"}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(app.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center text-zinc-500">
                <Users size={32} className="mx-auto mb-3 text-zinc-300" />
                <p>No applications yet</p>
                <p className="text-sm text-zinc-400 mt-1">
                  Applications will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2 mb-4">
            <Zap size={20} className="text-primary" />
            Quick Actions
          </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/dashboard/jobs/create"
            className="flex items-center gap-4 p-5 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <PlusCircle size={24} />
            </div>
            <div>
              <span className="font-semibold text-zinc-700 block">
                Post a new Job
              </span>
              <span className="text-sm text-zinc-500">
                Create a new listing
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard/jobs"
            className="flex items-center gap-4 p-5 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <Briefcase size={24} />
            </div>
            <div>
              <span className="font-semibold text-zinc-700 block">
                Manage Jobs
              </span>
              <span className="text-sm text-zinc-500">
                View & edit listings
              </span>
            </div>
          </Link>

          <Link
            href="/dashboard/applications"
            className="flex items-center gap-4 p-5 bg-zinc-50 border border-zinc-200 border-dashed rounded-xl hover:bg-zinc-100 hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div>
              <span className="font-semibold text-zinc-700 block">
                View Applications
              </span>
              <span className="text-sm text-zinc-500">Review candidates</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
