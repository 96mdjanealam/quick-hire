import React from "react";
import {
  Palette,
  BarChart2,
  Megaphone,
  Wallet,
  Monitor,
  Code,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";

interface CategoryCardProps {
  icon: React.ElementType;
  title: string;
  jobsCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon: Icon,
  title,
  jobsCount,
}) => {
  return (
    <div className="p-4 sm:p-8 border border-card-border rounded-sm flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 transition-all cursor-pointer group hover:shadow-lg hover:bg-primary hover:border-primary">
      <div className="p-3 rounded-lg sm:mb-6 bg-transparent text-primary group-hover:bg-white/10 group-hover:text-white transition-colors">
        <Icon size={28} strokeWidth={1.5} className="sm:w-8 sm:h-8" />
      </div>
      <div className="flex-1 w-full min-w-0 flex flex-col sm:justify-between">
        <h3 className="text-base sm:text-xl font-bold sm:mb-auto font-clash text-zinc-800 group-hover:text-white transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between w-full sm:mt-4">
          <span className="text-xs sm:text-sm text-zinc-500 group-hover:text-white/80 transition-colors">
            {jobsCount} jobs available
          </span>
          <ArrowRight
            size={20}
            className="hidden sm:block transform group-hover:translate-x-1 transition-all text-zinc-400 group-hover:text-white shrink-0"
          />
        </div>
      </div>

      <ArrowRight
        size={20}
        className="sm:hidden transform group-hover:translate-x-1 transition-all text-zinc-400 group-hover:text-white shrink-0"
      />
    </div>
  );
};

const Category = async () => {
  let jobs: Job[] = [];
  try {
    const response = await fetchJobs();
    jobs = response.data || [];
  } catch (error) {
    console.error("Failed to fetch jobs in Category component:", error);
  }

  const getJobCount = (categoryTitle: string) => {
    return jobs.filter(
      (job) => job.category?.toLowerCase() === categoryTitle.toLowerCase(),
    ).length;
  };

  const categories = [
    { icon: Palette, title: "Design", jobsCount: getJobCount("Design") },
    { icon: BarChart2, title: "Sales", jobsCount: getJobCount("Sales") },
    {
      icon: Megaphone,
      title: "Marketing",
      jobsCount: getJobCount("Marketing"),
    },
    { icon: Wallet, title: "Finance", jobsCount: getJobCount("Finance") },
    {
      icon: Monitor,
      title: "Technology",
      jobsCount: getJobCount("Technology"),
    },
    { icon: Code, title: "Engineering", jobsCount: getJobCount("Engineering") },
    { icon: Briefcase, title: "Business", jobsCount: getJobCount("Business") },
    { icon: Users, title: "Software", jobsCount: getJobCount("Software") },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-clash text-zinc-900">
            Explore by <span className="text-light-blue">category</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all group"
          >
            Show all jobs
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={`/jobs?category=${cat.title.toLowerCase()}`}
              className="block"
            >
              <CategoryCard {...cat} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
