import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm";
import { getJobById } from "@/lib/api";
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 bg-zinc-50/50">
        <div className="max-w-[1000px] w-full mx-auto px-5">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back to jobs
          </Link>

          {error || !job ? (
            <div className="bg-red-50 text-red-600 p-6 rounded-lg border border-red-100">
              {error || "Job not found."}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div className="bg-white p-8 rounded-xl border border-zinc-100">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100">
                      {job.company_logo ? (
                        <Image
                          src={job.company_logo}
                          alt={job.company}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary">
                          {job.company.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
                        {job.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                        <span className="font-semibold text-primary">
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} /> {job.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white p-8 rounded-xl border border-zinc-100">
                  <h2 className="text-xl font-bold text-zinc-900 mb-4 font-clash">
                    About the role
                  </h2>
                  <div className="prose prose-zinc max-w-none">
                    <p className="whitespace-pre-wrap text-zinc-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar -> Application Form */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl border border-zinc-100 sticky top-24">
                  <h3 className="text-lg font-bold text-zinc-900 mb-6 font-clash border-b border-zinc-100 pb-4">
                    Apply for this job
                  </h3>
                  <ApplicationForm jobId={job._id} />

                  <div className="mt-8 pt-6 border-t border-zinc-100 text-xs text-zinc-400 flex items-center gap-2">
                    <Calendar size={14} />
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
