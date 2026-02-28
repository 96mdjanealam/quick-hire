import React from "react";
import Image from "next/image";

const CTABanner: React.FC = () => {
  return (
    <section className="w-full py-14 bg-white flex justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-10">
        <div className="relative rounded-lg overflow-hidden flex flex-col md:flex-row items-center min-h-[300px] md:min-h-[400px]">
          {/* Background Image */}
          <Image
            src="/assets/images/Rectangle 2742.png"
            alt=""
            fill
            className="object-cover z-0"
          />
          {/* Left Content */}
          <div className="flex-1 p-8 md:p-16 z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-clash text-white leading-tight mb-4 md:mb-6">
              Start posting <br />
              jobs today
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Start posting jobs for only $10.
            </p>
            <button className="bg-white text-primary font-semibold text-base px-8 py-4 rounded-[4px] hover:bg-zinc-100 transition-all transform hover:-translate-y-0.5">
              Sign Up For Free
            </button>
          </div>

          {/* Right Dashboard Image */}
          <div className="flex-1 relative flex items-center justify-center md:justify-end p-6 md:p-0">
            <div className="relative w-full max-w-[550px] md:mr-8">
              <Image
                src="/assets/images/dashboard-img.png"
                alt="QuickHire Dashboard"
                width={550}
                height={380}
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
