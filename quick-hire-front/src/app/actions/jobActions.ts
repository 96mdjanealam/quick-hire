"use server";

import {
  deleteJob as apiDeleteJob,
  createJob as apiCreateJob,
} from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function deleteJobAction(id: string) {
  try {
    await apiDeleteJob(id);
    revalidatePath("/dashboard/jobs");
    revalidatePath("/jobs");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete job" };
  }
}

export async function createJobAction(prevState: any, formData: FormData) {
  try {
    await apiCreateJob(formData);
    revalidatePath("/dashboard/jobs");
    revalidatePath("/jobs");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to create job" };
  }
}
