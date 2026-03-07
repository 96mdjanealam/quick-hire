"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminAutocomplete = () => {
    setEmail("admin@gmail.com");
    setPassword("123456");
  };

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(null, formData);

    if (result?.error) {
      setError(result.error);
      setPending(false);
    } else if (result?.success) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  const inputClasses =
    "block w-full pl-11 pr-4 py-3 border border-zinc-200 rounded-[4px] text-sm bg-white/80 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white placeholder:text-zinc-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-zinc-200/80 shadow-xl shadow-zinc-200/50 overflow-hidden">
        {/* Header */}
        <div className="p-8 md:p-10 pb-6 text-center">
          <Link
            href="/"
            className="inline-block mb-8 group"
          >
            <span className="text-2xl font-bold font-clash text-primary group-hover:text-primary-hover transition-colors">
              QuickHire
            </span>
          </Link>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 font-clash tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-1.5 text-[15px] text-zinc-500 leading-relaxed">
            Sign in to your QuickHire account to continue
          </p>
        </div>

        <form
          className="px-8 md:px-10 pb-8 md:pb-10 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-50/80 p-4 rounded-[4px] border border-red-100">
              <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                {error}
              </p>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                className="block text-sm font-semibold text-zinc-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  className={inputClasses}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="block text-sm font-semibold text-zinc-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="font-medium text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className={inputClasses}
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAdminAutocomplete}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 bg-zinc-100 hover:bg-zinc-200 px-3 py-2 rounded-[4px] transition-colors"
              >
                <Sparkles size={14} />
                Auto-fill Admin Info
              </button>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="group w-full flex justify-center items-center gap-2 py-3 px-6 rounded-[4px] text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              {pending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={18}
                    className="shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="px-8 md:px-10 pb-8 md:pb-10 pt-6 border-t border-zinc-100">
          <p className="text-center text-sm text-zinc-500">
            <strong className="font-semibold text-zinc-600">Note:</strong> This
            is an admin-only app. No registration is available.
          </p>
        </div>
      </div>
    </div>
  );
}
