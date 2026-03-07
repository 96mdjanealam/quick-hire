"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitApplicationAction } from "@/app/actions/applicationActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await submitApplicationAction({
      ...formData,
      job_id: jobId,
    });

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      setSuccess(true);
      setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        router.push("/jobs");
      }, 3000);
    }
    setLoading(false);
  };

  const inputClasses =
    "w-full border border-zinc-200 rounded-[4px] px-4 py-3 text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-zinc-400";

  if (success) {
    return (
      <div className="bg-green-50/80 p-8 rounded-2xl border border-green-100 text-center">
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <CheckCircle2 className="w-9 h-9 text-green-600" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2 font-clash">
          Application Submitted!
        </h3>
        <p className="text-green-700 leading-relaxed">
          We will review your application and get back to you soon.
        </p>
        <p className="text-sm text-green-600 mt-4 flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          Redirecting to jobs page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-50/80 p-4 rounded-xl border border-red-100">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            {error}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-zinc-700">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="resume_link"
          className="text-sm font-semibold text-zinc-700"
        >
          Resume Link *
        </label>
        <input
          type="url"
          id="resume_link"
          name="resume_link"
          required
          value={formData.resume_link}
          onChange={handleChange}
          className={inputClasses}
          placeholder="https://docs.google.com/... or Dropbox, etc."
        />
        <p className="text-xs text-zinc-500">
          Google Drive, Dropbox, or other shareable link
        </p>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="cover_note"
          className="text-sm font-semibold text-zinc-700"
        >
          Cover Note *
        </label>
        <textarea
          id="cover_note"
          name="cover_note"
          required
          value={formData.cover_note}
          onChange={handleChange}
          rows={4}
          className={`${inputClasses} resize-y min-h-[100px]`}
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-primary text-white font-semibold py-3 px-6 rounded-[4px] hover:bg-primary-hover transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 shrink-0" />
            Submit Application
          </>
        )}
      </button>
    </form>
  );
}
