"use client";

import { ChangeEvent, useRef, useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Image as ImageIcon,
  Briefcase,
  Building2,
  FileText,
  Upload,
  Loader2,
  Send,
} from "lucide-react";
import { createJobAction } from "@/app/actions/jobActions";
import toast from "react-hot-toast";

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      const input = document.getElementById("logo") as HTMLInputElement;
      if (input) {
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
      }
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

  const inputClasses =
    "w-full border border-zinc-200 rounded-[4px] px-4 py-3 text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-zinc-400";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-all duration-200 mb-6 text-sm font-semibold group"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Jobs
        </Link>
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-primary/25">
            <Briefcase className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 font-clash tracking-tight">
              Post a New Job
            </h1>
            <p className="text-zinc-500 mt-1.5 text-[15px] leading-relaxed">
              Fill out the details below to publish your job opportunity and
              reach top candidates.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/50 overflow-hidden">
        <form ref={formRef} onSubmit={handleSubmit} className="divide-y divide-zinc-100">
          {error && (
            <div className="p-6 bg-red-50/80 border-b border-red-100">
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {error}
              </p>
            </div>
          )}

          {/* Job Details Section */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900 text-base">
                  Job Details
                </h2>
                <p className="text-sm text-zinc-500">Basic information about the role</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-semibold text-zinc-700">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-semibold text-zinc-700">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className={inputClasses}
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

              <div className="md:col-span-2 space-y-2">
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
                  placeholder="Describe the role, key responsibilities, and requirements..."
                  className={`${inputClasses} resize-y min-h-[180px]`}
                />
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="p-6 md:p-8 bg-zinc-50/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-semibold text-zinc-900 text-base">
                  Company Information
                </h2>
                <p className="text-sm text-zinc-500">Who&apos;s hiring?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-semibold text-zinc-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  placeholder="e.g. Acme Corp"
                  className={inputClasses}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-semibold text-zinc-700">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Remote, New York, etc."
                  className={inputClasses}
                />
              </div>

              {/* Logo Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-zinc-700">
                  Company Logo <span className="font-normal text-zinc-500">(Optional)</span>
                </label>
                <label
                  htmlFor="logo"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    mt-2 flex flex-col items-center justify-center min-h-[160px] px-6 py-8
                    rounded-[4px] border-2 border-dashed cursor-pointer
                    transition-all duration-200
                    ${
                      isDragging
                        ? "border-primary bg-primary/5 scale-[1.01]"
                        : previewUrl
                        ? "border-zinc-200 bg-white hover:border-zinc-300"
                        : "border-zinc-200 bg-white/60 hover:border-primary/40 hover:bg-primary/5"
                    }
                  `}
                >
                  {previewUrl ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="h-20 w-20 object-contain rounded-xl bg-zinc-50 border border-zinc-200 p-2 shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Upload className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <p className="text-sm text-zinc-600 font-medium truncate max-w-[280px]">
                        {fileName}
                      </p>
                      <span className="text-xs text-primary font-semibold">
                        Click or drag to replace
                      </span>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                          isDragging ? "bg-primary/10" : "bg-zinc-100"
                        }`}
                      >
                        <ImageIcon
                          className={`w-7 h-7 ${isDragging ? "text-primary" : "text-zinc-400"}`}
                        />
                      </div>
                      <p className="text-sm font-medium text-zinc-600 mb-1">
                        {isDragging ? "Drop your logo here" : "Drag and drop or click to upload"}
                      </p>
                      <p className="text-xs text-zinc-500">PNG, JPG, GIF up to 5MB</p>
                    </>
                  )}
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 md:p-8 bg-white flex flex-col sm:flex-row justify-end gap-3">
            <Link
              href="/dashboard/jobs"
              className="px-6 py-3 border border-zinc-200 text-zinc-600 font-semibold rounded-[4px] hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-[4px] hover:bg-primary-hover transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publish Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
