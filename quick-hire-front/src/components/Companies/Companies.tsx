import React from "react";
import Image from "next/image";

const Companies: React.FC = () => {
  const logos = [
    {
      src: "/assets/images/logos/vodafone-2017-logo.png",
      alt: "Vodafone",
      width: 140,
      height: 40,
    },
    {
      src: "/assets/images/logos/intel-3.png",
      alt: "Intel",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/images/logos/tesla-9 1.png",
      alt: "Tesla",
      width: 120,
      height: 40,
    },
    {
      src: "/assets/images/logos/amd-logo-1.png",
      alt: "AMD",
      width: 100,
      height: 40,
    },
    {
      src: "/assets/images/logos/talkit 1.png",
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
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
