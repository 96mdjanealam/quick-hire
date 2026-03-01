"use client";

import React, { useState } from "react";
import { submitApplicationAction } from "@/app/actions/applicationActions";
import { useRouter } from "next/navigation";

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
    } else {
      setSuccess(true);
      setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
      // Optionally redirect or show a success message
      setTimeout(() => {
        router.push("/jobs");
      }, 3000);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-xl text-green-600">✓</span>
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-2">
          Application Submitted!
        </h3>
        <p className="text-green-600">
          We will review your application and get back to you soon.
        </p>
        <p className="text-sm text-green-500 mt-2">
          Redirecting to jobs page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-zinc-700">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border border-zinc-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          placeholder="John Doe"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-zinc-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="border border-zinc-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          placeholder="john@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="resume_link"
          className="text-sm font-semibold text-zinc-700"
        >
          Resume Link (Google Drive, Dropbox, etc.)
        </label>
        <input
          type="url"
          id="resume_link"
          name="resume_link"
          required
          value={formData.resume_link}
          onChange={handleChange}
          className="border border-zinc-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          placeholder="https://docs.google.com/..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cover_note"
          className="text-sm font-semibold text-zinc-700"
        >
          Cover Note
        </label>
        <textarea
          id="cover_note"
          name="cover_note"
          required
          value={formData.cover_note}
          onChange={handleChange}
          rows={4}
          className="border border-zinc-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
          placeholder="Tell us why you're a great fit for this role..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-primary text-white font-bold py-3 px-6 rounded-[4px] hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
