import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroPattern from "@/assets/images/hero_pattern.png";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  software: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  engineering: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    border: "border-violet-200",
  },
  marketing: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  design: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
  },
  business: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
  technology: {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    border: "border-cyan-200",
  },
  finance: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    border: "border-orange-200",
  },
  sales: {
    bg: "bg-indigo-50",
    text: "text-indigo-600",
    border: "border-indigo-200",
  },
};

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  return (
    categoryColors[key] || {
      bg: "bg-zinc-50",
      text: "text-zinc-600",
      border: "border-zinc-200",
    }
  );
}

function JobRow({ job }: { job: Job }) {
  const catStyle = getCategoryStyle(job.category);

  return (
    <div className="flex items-start sm:items-center gap-4 md:gap-6 p-4 md:p-6 bg-white border border-card-border rounded-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
      {/* Logo */}
      <div className="w-12 h-12 md:w-16 md:h-16 relative rounded-lg overflow-hidden bg-zinc-50 shrink-0 flex items-center justify-center">
        {job.company_logo ? (
          <Image
            src={job.company_logo}
            alt={job.company}
            fill
            sizes="64px"
            className="object-contain"
          />
        ) : (
          <span className="text-2xl font-bold text-primary">
            {job.company.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors">
          {job.title}
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
            Full-Time
          </span>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text} capitalize`}
          >
            {job.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function LatestJobs() {
  let jobs: Job[] = [];

  try {
    const response = await fetchJobs();
    jobs = response.data.slice(0, 8);
  } catch (error) {
    console.error("Failed to fetch latest jobs:", error);
  }

  return (
    <section className="w-full py-14 bg-light-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-30 pointer-events-none">
        <Image
          src={HeroPattern}
          alt=""
          fill
          sizes="500px"
          className="object-contain"
        />
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-clash text-zinc-900">
            Latest <span className="text-light-blue">jobs open</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobRow key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-400">
            <p className="text-lg">No jobs available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
