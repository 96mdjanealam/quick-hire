import React from "react";
import { getApplications } from "@/lib/api";
import { Application } from "@/types/job";
import { Mail, Briefcase, FileText, Calendar, Info } from "lucide-react";
import DeleteApplicationButton from "@/components/DeleteApplicationButton/DeleteApplicationButton";

export default async function DashboardApplicationsPage() {
  let applications: Application[] = [];
  let error = null;

  try {
    const response = await getApplications();
    applications = response.data || [];
  } catch (err: any) {
    console.error("Failed to fetch applications:", err);
    error = err.message || "Failed to load applications.";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 font-clash">
          Job Applications
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Review and manage candidates who have applied to your jobs
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
          {error}
        </div>
      ) : applications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">
                    {app.name}
                  </h3>
                  <a
                    href={`mailto:${app.email}`}
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline mt-1"
                  >
                    <Mail size={14} />
                    {app.email}
                  </a>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <DeleteApplicationButton id={app._id} />
                </div>
              </div>

              <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100 mb-4 flex flex-col gap-2">
                <div className="flex items-start gap-2 text-sm text-zinc-600">
                  <Briefcase
                    size={16}
                    className="mt-0.5 text-zinc-400 shrink-0"
                  />
                  <span>
                    Applied for{" "}
                    <span className="font-semibold text-zinc-800">
                      {app.job_id.title}
                    </span>{" "}
                    at {app.job_id.company}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <Calendar size={16} className="text-zinc-400 shrink-0" />
                  <span>
                    {new Date(app.created_at).toLocaleDateString()} at{" "}
                    {new Date(app.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <FileText
                    size={16}
                    className="mt-1 text-emerald-500 shrink-0"
                  />
                  <div>
                    <span className="text-sm font-semibold text-zinc-700 block">
                      Resume Link:
                    </span>
                    <a
                      href={app.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-light-blue hover:underline break-all"
                    >
                      {app.resume_link}
                    </a>
                  </div>
                </div>

                {app.cover_note && (
                  <div className="flex items-start gap-2 pt-2 border-t border-zinc-100">
                    <Info size={16} className="mt-1 text-amber-500 shrink-0" />
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-zinc-700 block mb-1">
                        Cover Note:
                      </span>
                      <p className="text-sm text-zinc-600 bg-amber-50/50 p-3 rounded border border-amber-100/50 whitespace-pre-wrap">
                        {app.cover_note}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-zinc-200 rounded-xl border-dashed">
          <p className="text-zinc-500">No applications found.</p>
        </div>
      )}
    </div>
  );
}
