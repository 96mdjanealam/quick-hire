"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { createJobAction } from "@/app/actions/jobActions";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a ref for the form to reset it if needed
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const logoFile = formData.get("logo") as File;
    if (logoFile && logoFile.size === 0) {
      formData.delete("logo");
    }

    const result = await createJobAction(null, formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard/jobs");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-4 text-sm font-semibold"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900 font-clash">
          Post a New Job
        </h1>
        <p className="text-zinc-500 mt-2">
          Fill out the details below to publish a new job opportunity.
        </p>
      </div>

      <div className="bg-white p-8 border border-zinc-200 rounded-xl shadow-sm">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-zinc-700"
              >
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="e.g. Senior Frontend Engineer"
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="company"
                className="text-sm font-semibold text-zinc-700"
              >
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                placeholder="e.g. Acme Corp"
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-zinc-700"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-white"
              >
                <option value="">Select a category</option>
                <option value="software">Software Development</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="sales">Sales</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="location"
                className="text-sm font-semibold text-zinc-700"
              >
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="e.g. Remote, New York, etc."
                className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-zinc-700"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={8}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="logo"
              className="text-sm font-semibold text-zinc-700"
            >
              Company Logo (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-200 border-dashed rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <div className="space-y-1 text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-zinc-400" />
                <div className="flex text-sm text-zinc-600 justify-center">
                  <label
                    htmlFor="logo"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2"
                  >
                    <span>Upload a file</span>
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
            <Link
              href="/dashboard/jobs"
              className="px-6 py-3 border border-zinc-200 text-zinc-600 font-bold rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-secondary font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
