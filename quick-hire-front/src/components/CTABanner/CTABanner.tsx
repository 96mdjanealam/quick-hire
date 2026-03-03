import React from "react";
import Image from "next/image";
import BannerBG from "@/assets/images/Rectangle 2742.png";
import DashboardImg from "@/assets/images/dashboard-img.png";
import Link from "next/link";

const CTABanner: React.FC = () => {
  return (
    <section className="w-full py-14 bg-white flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-10">
        <div className="relative rounded-lg overflow-hidden flex flex-col md:flex-row items-center">
          {/* Background Image */}
          <Image
            src={BannerBG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover z-0"
          />
          {/* Left Content */}
          <div className="flex-1 p-8 md:p-16 z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-clash text-white leading-tight mb-4 md:mb-6">
              Start posting <br />
              jobs today
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/login"
              className="bg-white text-primary font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-[4px] hover:bg-zinc-100"
            >
              Login Now
            </Link>
          </div>

          {/* Right Dashboard Image */}
          <div className="flex-1 z-10 p-6 md:p-0 w-full md:w-auto flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-[400px] md:max-w-[550px] md:mr-8">
              <Image
                src={DashboardImg}
                alt="QuickHire Dashboard"
                width={550}
                height={380}
                sizes="(max-width: 768px) 90vw, 550px"
                className="w-full h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
