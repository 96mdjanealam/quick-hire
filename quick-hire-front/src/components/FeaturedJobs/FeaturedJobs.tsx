import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";

import JobCard from "@/components/JobCard/JobCard";

export default async function FeaturedJobs() {
  let jobs: Job[] = [];

  try {
    const response = await fetchJobs();
    jobs = response.data.slice(0, 8);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }

  return (
    <section className="w-full py-10 md:py-14 bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-clash text-zinc-900">
            Featured <span className="text-light-blue">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            Show all jobs
            <ArrowRight size={20} />
          </Link>
        </div>

        {jobs.length > 0 ? (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory hide-scrollbar px-5 sm:px-0">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="w-[280px] sm:w-auto sm:min-w-0 shrink-0 snap-start"
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-lg">No featured jobs available at the moment.</p>
            <p className="text-sm mt-2">
              Check back soon for new opportunities!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
