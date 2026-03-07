import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from "lucide-react";
import quickHireLogoDark from "@/assets/images/logos/quickhire-logo-dark.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#202430] text-white">
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="relative block w-[140px] h-[36px]">
              <Image
                src={quickHireLogoDark}
                alt="QuickHire Logo"
                fill
                sizes="140px"
                className="object-contain"
              />
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold mb-2">About</h4>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Companies
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Advice
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold mb-2">Resources</h4>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Help Docs
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Guide
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Updates
            </Link>
            <Link
              href="#"
              className="text-zinc-400 text-sm hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold mb-2">Get job notifications</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white text-zinc-800 text-sm px-4 py-3 rounded-[4px] outline-none placeholder:text-zinc-400 sm:max-w-30 md:max-w-full"
              />
              <button className="bg-primary text-white text-sm font-semibold px-6 py-3 rounded-[4px] hover:bg-primary-hover transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-700">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            2021 @ QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Facebook size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Instagram size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Dribbble size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Linkedin size={14} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Twitter size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
