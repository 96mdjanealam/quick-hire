import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  Send,
} from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm";
import { getJobById } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { JobApiResponse } from "@/types/job";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let jobData: JobApiResponse | null = null;
  let error = null;

  try {
    const { id } = await params;
    jobData = await getJobById(id);
  } catch (err: any) {
    error = err.message || "Failed to load job details.";
  }

  const job = jobData?.data;
  const token = await getToken();
  const backHref = token ? "/dashboard/jobs" : "/jobs";

  return (
    <div className="max-w-[1200px] w-full mx-auto pt-[100px] pb-[50px] px-5 md:px-10">
      <div className="mb-10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-all duration-200 mb-8 text-sm font-semibold group"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to jobs
        </Link>

        {error || !job ? (
          <div className="bg-red-50/80 p-6 rounded-2xl border border-red-100">
            <p className="text-red-600 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {error || "Job not found."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header Card */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/50 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      <div className="w-16 h-16 relative rounded-2xl overflow-hidden bg-zinc-50 flex items-center justify-center border border-zinc-200/80 shadow-sm">
                        {job.company_logo ? (
                          <Image
                            src={job.company_logo}
                            alt={job.company}
                            fill
                            sizes="64px"
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-primary">
                            {job.company.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2 font-clash tracking-tight">
                        {job.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-500">
                        <span className="font-semibold text-primary">
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="shrink-0" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 capitalize">
                          <Briefcase size={14} className="shrink-0" />
                          {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About the Role */}
              <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/50 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText
                        className="w-5 h-5 text-primary"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 font-clash">
                        About the role
                      </h2>
                      <p className="text-sm text-zinc-500">
                        Role details and requirements
                      </p>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none">
                    <p className="whitespace-pre-wrap text-zinc-600 leading-relaxed text-[15px]">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/50 overflow-hidden sticky top-24">
                <div className="p-6 md:p-8 border-b border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
                      <Send className="w-6 h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 font-clash">
                        Apply for this job
                      </h3>
                      <p className="text-sm text-zinc-500 mt-0.5">
                        Submit your application below
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <ApplicationForm jobId={job._id} />
                </div>
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Calendar size={14} className="shrink-0" />
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
