import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 flex items-center justify-center px-5 md:px-10 bg-white/80 backdrop-blur-md border-b border-zinc-100 z-[1000]">
      <div className="w-full max-w-[1200px] flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logos/quickhire-logo.png"
              alt="QuickHire Logo"
              width={160}
              height={40}
              className="w-[120px] md:w-[160px] h-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex gap-8">
            <Link
              href="/find-jobs"
              className="text-zinc-600 font-medium text-base hover:text-zinc-900 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/browse-companies"
              className="text-zinc-600 font-medium text-base hover:text-zinc-900 transition-colors"
            >
              Browse Companies
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="bg-primary text-white px-5 md:px-7 py-2.5 md:py-3 rounded-[4px] font-semibold text-sm md:text-base hover:bg-primary-hover transition-all transform hover:-translate-y-px active:translate-y-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
