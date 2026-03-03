import React from "react";
import Image from "next/image";

import VodafoneLogo from "@/assets/images/logos/vodafone-2017-logo.png";
import IntelLogo from "@/assets/images/logos/intel-3.png";
import TeslaLogo from "@/assets/images/logos/tesla-9 1.png";
import AmdLogo from "@/assets/images/logos/amd-logo-1.png";
import TalkitLogo from "@/assets/images/logos/talkit 1.png";

const Companies: React.FC = () => {
  const logos = [
    {
      src: VodafoneLogo,
      alt: "Vodafone",
      width: 140,
      height: 40,
    },
    {
      src: IntelLogo,
      alt: "Intel",
      width: 100,
      height: 40,
    },
    {
      src: TeslaLogo,
      alt: "Tesla",
      width: 120,
      height: 40,
    },
    {
      src: AmdLogo,
      alt: "AMD",
      width: 100,
      height: 40,
    },
    {
      src: TalkitLogo,
      alt: "Talkit",
      width: 110,
      height: 40,
    },
  ];

  return (
    <section className="w-full py-16 bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-[1200px] px-5 md:px-10">
        <p className="text-zinc-400 font-medium text-base md:text-lg mb-6 md:mb-10">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-10 opacity-40 grayscale">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <div
                className="relative"
                style={{ width: logo.width, height: logo.height }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="140px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
