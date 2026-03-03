import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
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

interface JobCardProps {
  job: Job;
  actionButton?: React.ReactNode;
}

export default function JobCard({ job, actionButton }: JobCardProps) {
  const catStyle = getCategoryStyle(job.category);

  return (
    <div className="p-6 border border-card-border rounded-sm flex flex-col gap-3 transition-all hover:shadow-lg hover:border-primary/20 bg-white group relative">
      <Link href={`/jobs/${job._id}`} className="absolute inset-0 z-0"></Link>

      <div className="flex items-center justify-between z-10">
        <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-zinc-50 flex items-center justify-center">
          {job.company_logo ? (
            <Image
              src={job.company_logo}
              alt={job.company}
              fill
              sizes="48px"
              className="object-contain"
            />
          ) : (
            <Shield size={24} className="text-primary" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="border border-primary text-primary text-xs font-semibold px-4 py-1.5 rounded-[4px]">
            Full Time
          </span>
          {actionButton}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-zinc-900 group-hover:text-primary transition-colors z-10 pointer-events-none">
        {job.title}
      </h3>

      {/* Company + Location */}
      <p className="text-sm text-zinc-500 z-10 pointer-events-none">
        {job.company} <span className="mx-1">·</span> {job.location}
      </p>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 z-10 pointer-events-none">
        {job.description}
      </p>

      {/* Category Tag */}
      <div className="flex flex-wrap gap-2 z-10 pointer-events-none">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${catStyle.bg} ${catStyle.text} capitalize`}
        >
          {job.category}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50 z-10 pointer-events-none">
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
