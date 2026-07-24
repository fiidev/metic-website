import { DivisiProps } from "@/app/_components/const/datas";
import Image from "next/image";

interface ProgramKerjaHeadProps {
  name: string;
  prokja?: DivisiProps["prokja"];
}

export default function ProgramKerjaHead({ prokja, name }: ProgramKerjaHeadProps) {
  // Position configurations for different numbers of items
  const getPositionClasses = (index: number, total: number) => {
    if (total === 1) {
      return "top-[200px] right-[150px]";
    }

    if (total === 2) {
      return index === 0
        ? "top-[150px] left-[100px]"
        : "top-[300px] right-[150px]";
    }

    if (total === 3) {
      const positions = [
        "top-[120px] right-[150px]",
        "top-[280px] left-[80px]",
        "top-[450px] right-[120px]",
      ];
      return positions[index];
    }

    if (total === 4) {
      const positions = [
        "top-[100px] right-[150px]",
        "top-[400px] left-[80px]",
        "top-[400px] right-[120px]",
        "top-[100px] left-[140px]",
      ];
      return positions[index];
    }

    // For 5 or more items (like in the design)
    const positions = [
      "top-[80px] left-[120px]", // Top left
      "top-[100px] right-[150px]", // Top right
      "top-[320px] left-[80px]", // Middle left
      "top-[310px] right-[120px]", // Middle right
      "top-[520px] right-[200px]", // Bottom right
    ];

    // For more than 5 items, cycle through positions or add new ones
    if (index < 5) {
      return positions[index];
    } else {
      // Additional positions for more items
      const extraPositions = [
        "top-[450px] left-[150px]",
        "top-[350px] right-[300px]",
        "top-[550px] left-[250px]",
      ];
      return extraPositions[(index - 5) % extraPositions.length];
    }
  };

  return (
    <>
      <div className="relative bg-secondary w-full mt-71 max-sm:mt-41 min-h-[700px]">
        <div className="absolute -top-[15px] left-0 w-full overflow-hidden leading-none">
          <svg
            width="1440"
            height="60"
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto">
            <path
              d="M0 20 Q720 50 1440 20 L1440 0 Q720 10 0 0 Z"
              fill="url(#gradienName)"
            />
            <defs>
              <linearGradient
                id="gradienName"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9E2EA" />
                <stop offset="1" stopColor="#F5F5F5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="pt-30 relative ">
          {/* Text boxes positioned around the character */}
          {prokja?.map((item, index) => (
            <div
              className={`min-xl:absolute z-[222] max-sm:px-15 max-sm:mt-3 ${getPositionClasses(
                index,
                prokja.length
              )}`}
              key={index}>
              <div className="px-[16px] py-[12px] bg-white/90 backdrop-blur-sm border-[2px] border-primary/20 rounded-[16px] shadow-lg max-w-[280px] hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h5 className="text-primary text-[18px] font-[700] mb-2 leading-tight">
                  {item.title}
                </h5>
                <p className="text-primary/80 font-[400] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

          {/* Decorative stars */}
          <Image
            src="/assets/image/stars-multipage.png"
            alt="Decorative Stars"
            width={519}
            height={401}
            className="absolute left-[430px] mt-[170px] drop-shadow-[0_3px_90px_rgba(255,255,255,0.73)] right-0 z-[1]"
          />

          {/* Main character */}
          <Image
            src="/assets/image/noir-multipage.png"
            alt="METIC Mascot"
            width={572}
            height={628}
            className="mt-[22.5px] block mx-auto drop-shadow-[0_3px_90px_rgba(255,255,255,0.73)] right-0 z-[1]"
          />
        </div>

        <h1 className="mt-[25px] pb-[43px] text-center text-white text-[49px] font-[700] drop-shadow-[0_6px_9px_rgba(0,0,0,0.25)]">
          Program Kerja Sobat {name} !
        </h1>
      </div>
    </>
  );
}
