import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";

const categoryColors: Record<string, { bg: string; text: string }> = {
  software: { bg: "bg-emerald-50", text: "text-emerald-600" },
  engineering: { bg: "bg-violet-50", text: "text-violet-600" },
  marketing: { bg: "bg-amber-50", text: "text-amber-600" },
  design: { bg: "bg-rose-50", text: "text-rose-600" },
  business: { bg: "bg-blue-50", text: "text-blue-600" },
  technology: { bg: "bg-cyan-50", text: "text-cyan-600" },
  finance: { bg: "bg-orange-50", text: "text-orange-600" },
  sales: { bg: "bg-indigo-50", text: "text-indigo-600" },
};

function getCategoryStyle(category: string) {
  const key = category.toLowerCase();
  return categoryColors[key] || { bg: "bg-zinc-100", text: "text-zinc-600" };
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

function JobCard({ job }: { job: Job }) {
  const catStyle = getCategoryStyle(job.category);

  return (
    <div className="p-6 border border-zinc-100 rounded-sm flex flex-col gap-3 transition-all cursor-pointer hover:shadow-lg hover:border-primary/20 bg-white group">
      {/* Top: Logo + Category */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-50 flex items-center justify-center">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-primary">
              {job.company.charAt(0)}
            </span>
          )}
        </div>
        <span className="border border-primary text-primary text-xs font-semibold px-4 py-1.5 rounded-[4px]">
          Full Time
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors">
        {job.title}
      </h3>

      {/* Company + Location */}
      <p className="text-sm text-zinc-500">
        {job.company} <span className="mx-1">·</span> {job.location}
      </p>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
        {job.description}
      </p>

      {/* Category Tag */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full ${catStyle.bg} ${catStyle.text}`}
        >
          {job.category}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50">
        <span className="text-xs text-zinc-400">
          {formatDate(job.created_at)}
        </span>
        <ArrowRight
          size={16}
          className="text-zinc-300 group-hover:text-primary group-hover:translate-x-1 transition-all"
        />
      </div>
    </div>
  );
}

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
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="min-w-[280px] sm:min-w-0 shrink-0 snap-start"
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
