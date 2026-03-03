import React from "react";
import Image from "next/image";
import Link from "next/link";
import HeroPattern from "@/assets/images/hero_pattern.png";
import Underline from "@/assets/images/horizontal_line.png";
import Person1 from "@/assets/images/person_1.png";

const Header: React.FC = () => {
  return (
    <header className="w-full min-h-0 md:min-h-screen flex items-center justify-center px-5 md:px-10 pt-24 pb-10 md:pb-0 bg-light-bg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[80%] md:w-[50%] h-full z-0 opacity-30 md:opacity-60 pointer-events-none">
        <Image
          src={HeroPattern}
          alt=""
          fill
          sizes="50vw"
          className="object-contain"
        />
      </div>
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 z-10">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold font-clash leading-tight text-zinc-800 mb-8 md:mb-12 relative">
            Discover <br />
            more than <br />
            <span className="relative inline-block">
              <span className="text-light-blue">5000+ Jobs</span>
              <div className="absolute -bottom-8 md:-bottom-10 left-0 w-full h-[12px] md:h-[24px]">
                <div className="relative w-full h-full">
                  <Image
                    src={Underline}
                    alt="Underline"
                    fill
                    sizes="400px"
                    className="object-fill"
                  />
                </div>
              </div>
            </span>
          </h1>
          <p className="text-base md:text-xl leading-relaxed text-zinc-500 max-w-[480px] mb-6 md:mb-10 mt-16">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
          <Link
            href="/jobs"
            className="bg-primary text-white text-base md:text-lg font-semibold px-8 md:px-12 py-4 md:py-5 rounded-[4px] hover:bg-primary-hover transition-all transform hover:-translate-y-0.5"
          >
            Browse Jobs
          </Link>

          <div className="mt-8 text-sm text-zinc-400">
            <span>Popular: </span>
            <strong className="text-zinc-600 ml-2">
              UI Designer, UX Researcher, Android, Admin
            </strong>
          </div>
        </div>
        <div className="hidden md:flex flex-1 relative justify-center md:justify-end items-center">
          <div className="relative z-10 md:translate-x-5 w-[500px] h-[600px]">
            <Image
              src={Person1}
              alt="Person pointing at jobs"
              fill
              sizes="500px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
