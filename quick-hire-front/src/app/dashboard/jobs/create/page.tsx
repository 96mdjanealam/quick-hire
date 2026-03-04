"use client";

import { ChangeEvent, useRef, useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { createJobAction } from "@/app/actions/jobActions";
import toast from "react-hot-toast";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFileName(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
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
      toast.error(result.error);
      setLoading(false);
    } else {
      toast.success("Job published successfully!");
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
                <option value="software">Software</option>
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
                {previewUrl ? (
                  <div className="flex flex-col items-center gap-2 mb-3">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-16 w-16 object-contain rounded-md bg-white border border-zinc-200 p-1"
                    />
                    <p className="text-sm text-zinc-700 font-medium truncate max-w-xs">
                      {fileName}
                    </p>
                  </div>
                ) : (
                  <ImageIcon className="mx-auto h-12 w-12 text-zinc-400 mb-3" />
                )}
                <div className="flex text-sm text-zinc-600 justify-center">
                  <label
                    htmlFor="logo"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-2 py-0.5"
                  >
                    <span>{fileName ? "Change file" : "Upload a file"}</span>
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  {!fileName && <p className="pl-1 py-0.5">or drag and drop</p>}
                </div>
                {!fileName && (
                  <p className="text-xs text-zinc-500 mt-2">
                    PNG, JPG, GIF up to 5MB
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
            <Link
              href="/dashboard/jobs"
              className="px-6 py-3 border border-zinc-200 text-zinc-600 font-bold rounded-[4px] hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-5 md:px-7 py-2.5 md:py-3 rounded-[4px] font-semibold text-sm md:text-base hover:bg-primary-hover transition-all transform hover:-translate-y-px active:translate-y-0 disabled:transform-none disabled:hover:bg-primary disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
