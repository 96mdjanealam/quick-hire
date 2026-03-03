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

        {/* On mobile: just text. On desktop: text + arrow in a flex row */}
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

      {/* Mobile-only arrow (sits on the far right of the card) */}
      <ArrowRight
        size={20}
        className="sm:hidden transform group-hover:translate-x-1 transition-all text-zinc-400 group-hover:text-white shrink-0"
      />
    </div>
  );
};

const Category: React.FC = () => {
  const categories = [
    { icon: Palette, title: "Design", jobsCount: 235 },
    { icon: BarChart2, title: "Sales", jobsCount: 756 },
    { icon: Megaphone, title: "Marketing", jobsCount: 140 },
    { icon: Wallet, title: "Finance", jobsCount: 325 },
    { icon: Monitor, title: "Technology", jobsCount: 436 },
    { icon: Code, title: "Engineering", jobsCount: 542 },
    { icon: Briefcase, title: "Business", jobsCount: 211 },
    { icon: Users, title: "Human Resource", jobsCount: 346 },
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
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
