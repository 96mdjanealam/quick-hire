import JobsListWithFilter from "@/components/JobsListWithFilter/JobsListWithFilter";
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
    <div className="max-w-[1200px] w-full mx-auto pt-[100px] pb-[50px] px-5 md:px-10">
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-bold font-clash text-zinc-900 mb-4">
          All <span className="text-light-blue">opportunities</span>
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          Browse our complete list of open roles and find your next great
          opportunity.
        </p>
      </div>

      <JobsListWithFilter jobs={jobs} error={error} />
    </div>
  );
}
