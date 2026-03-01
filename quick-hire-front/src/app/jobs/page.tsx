import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import JobCard from "@/components/JobCard/JobCard";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";

export default async function JobsPage() {
  let jobs: Job[] = [];
  let error = null;

  try {
    const response = await fetchJobs();
    jobs = response.data || [];
  } catch (err) {
    console.error("Failed to fetch jobs:", err);
    error = "Failed to load jobs. Please try again later.";
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-10 md:py-16 bg-zinc-50/50">
        <div className="max-w-[1200px] w-full mx-auto px-5 md:px-10">
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-clash text-zinc-900 mb-4">
              All <span className="text-light-blue">opportunities</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl">
              Browse our complete list of open roles and find your next great
              opportunity.
            </p>
          </div>

          {error ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100 mb-8">
              {error}
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-xl border border-zinc-100">
              <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">
                No jobs found
              </h3>
              <p className="text-zinc-500">
                Check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
