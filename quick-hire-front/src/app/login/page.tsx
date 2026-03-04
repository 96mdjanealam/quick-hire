"use client";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

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
      // Refresh router and redirect to dashboard
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold font-clash text-primary">
              QuickHire
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-foreground font-clash tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your QuickHire account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm animate-in fade-in slide-in-from-top-2">
              <p className="font-medium">Authentication Failed</p>
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1.5"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors bg-gray-50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  className="block text-sm font-medium text-gray-700"
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
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
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-colors bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={handleAdminAutocomplete}
                className="text-xs cursor-pointer font-medium text-zinc-500 bg-zinc-100 px-3 py-1.5 rounded-[4px] hover:bg-zinc-200 transition-colors"
              >
                Auto-fill Admin Info
              </button>
            </div>
            <button
              type="submit"
              disabled={pending}
              className={`group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${pending ? "opacity-80 cursor-not-allowed" : "hover:shadow-md"}`}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-6 mt-6 border-t border-gray-100 text-center text-sm">
          <span className="text-gray-500">
            <strong>n.b.</strong> As it is an admin-only app, no registration is
            available.
          </span>
        </div>
      </div>
    </div>
  );
}
