import { JobsApiResponse } from "@/types/job";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function fetchJobs(): Promise<JobsApiResponse> {
  const res = await fetch(`${BASE_URL}/api/jobs/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
}
