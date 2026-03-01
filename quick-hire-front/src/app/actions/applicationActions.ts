"use server";

import {
  deleteApplication as apiDeleteApplication,
  submitApplication,
} from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function submitApplicationAction(
  applicationData: Record<string, string>,
) {
  try {
    const result = await submitApplication(applicationData);
    revalidatePath("/dashboard/applications");
    return { success: true, data: result };
  } catch (error: any) {
    return { error: error.message || "Failed to submit application" };
  }
}

export async function deleteApplicationAction(id: string) {
  try {
    await apiDeleteApplication(id);
    revalidatePath("/dashboard/applications");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to delete application" };
  }
}
