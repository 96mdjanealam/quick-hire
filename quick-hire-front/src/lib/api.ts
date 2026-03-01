import {
  JobsApiResponse,
  JobApiResponse,
  ApplicationsApiResponse,
  GenericApiResponse,
} from "@/types/job";
import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

// --- JOBS ---

export async function fetchJobs(): Promise<JobsApiResponse> {
  const res = await fetch(`${BASE_URL}/api/jobs/`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return res.json();
}

export async function getJobById(id: string): Promise<JobApiResponse> {
  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Job not found");
    }
    throw new Error(`Failed to fetch job: ${res.status}`);
  }

  return res.json();
}

export async function createJob(
  formData: FormData,
): Promise<GenericApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}/api/jobs/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create job: ${res.status}`);
  }

  return res.json();
}

export async function deleteJob(id: string): Promise<GenericApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to delete job: ${res.status}`);
  }

  return res.json();
}

// --- APPLICATIONS ---

export async function submitApplication(
  applicationData: Record<string, string>,
): Promise<GenericApiResponse> {
  const res = await fetch(`${BASE_URL}/api/applications/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to submit application: ${res.status}`,
    );
  }

  return res.json();
}

export async function getApplications(): Promise<ApplicationsApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}/api/applications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("Unauthorized to view applications");
    }
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to fetch applications: ${res.status}`,
    );
  }

  return res.json();
}

export async function deleteApplication(
  id: string,
): Promise<GenericApiResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Failed to delete application: ${res.status}`,
    );
  }

  return res.json();
}
