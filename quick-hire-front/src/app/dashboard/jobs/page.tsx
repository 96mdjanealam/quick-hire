import React from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";
import JobCard from "@/components/JobCard/JobCard";
import DeleteJobButton from "@/components/DeleteJobButton/DeleteJobButton";

export default async function DashboardJobsPage() {
  let jobs: Job[] = [];
  let error = null;

  try {
    const response = await fetchJobs();
    jobs = response.data || [];
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    error = "Failed to load jobs.";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 font-clash">
            Manage Jobs
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            View and manage all posted jobs
          </p>
        </div>
        <Link
          href="/dashboard/jobs/create"
          className="bg-primary text-white px-4 py-2 rounded-[4px] font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <PlusCircle size={18} />
          Post New Job
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
          {error}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              actionButton={<DeleteJobButton id={job._id} />}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-zinc-200 rounded-xl border-dashed">
          <p className="text-zinc-500 mb-4">No jobs found.</p>
          <Link
            href="/dashboard/jobs/create"
            className="text-primary font-bold hover:underline"
          >
            Create your first job posting
          </Link>
        </div>
      )}
    </div>
  );
}
