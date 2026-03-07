"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import JobCard from "@/components/JobCard/JobCard";
import { Job } from "@/types/job";
import { ChevronDown } from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  software: "Software",
  engineering: "Engineering",
  marketing: "Marketing",
  design: "Design",
  business: "Business",
  technology: "Technology",
  finance: "Finance",
  sales: "Sales",
};

interface JobsListWithFilterProps {
  jobs: Job[];
  error?: string | null;
}

export function JobsListWithFilterContent({
  jobs,
  error,
}: JobsListWithFilterProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
      router.replace(pathname, { scroll: false });
    }
  }, [categoryParam, router, pathname]);

  const categories = useMemo(() => {
    const unique = new Set(
      jobs.map((j) => j.category?.toLowerCase()).filter(Boolean),
    );
    return Array.from(unique).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (selectedCategory === "all") return jobs;
    return jobs.filter(
      (j) => j.category?.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [jobs, selectedCategory]);

  const displayLabel =
    selectedCategory === "all"
      ? "All categories"
      : CATEGORY_LABELS[selectedCategory] || selectedCategory;

  return (
    <div className="space-y-6">
      {jobs.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-zinc-500">Filter by:</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            >
              {displayLabel}
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden="true"
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute left-0 top-full mt-1 z-20 w-48 py-1 bg-white border border-zinc-200 rounded-lg shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm ${
                      selectedCategory === "all"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-zinc-700 hover:bg-zinc-50"
                    }`}
                  >
                    All categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm capitalize ${
                        selectedCategory === cat
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {CATEGORY_LABELS[cat] || cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <span className="text-sm text-zinc-400">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100">
          {error}
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
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
      ) : (
        <div className="text-center py-24 bg-white rounded-xl border border-zinc-100">
          <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">
            No jobs in this category
          </h3>
          <p className="text-zinc-500">
            Try selecting a different category or check back later.
          </p>
        </div>
      )}
    </div>
  );
}

export default function JobsListWithFilter(props: JobsListWithFilterProps) {
  return (
    <Suspense
      fallback={<div className="text-center py-12">Loading filters...</div>}
    >
      <JobsListWithFilterContent {...props} />
    </Suspense>
  );
}
