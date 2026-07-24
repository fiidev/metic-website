import { CardTeam } from "@/app/_components/card";
import { DivisiProps } from "@/app/_components/const/datas";
import Image from "next/image";

export default function Team({ divisi }: { divisi: DivisiProps }) {
  return (
    <>
      <div className="relative pb-35 bg-secondary">
        <div className="text-center pt-21">
          <Image
            src="/assets/image/cakar-kiri.png"
            width={92}
            height={102}
            alt="Cakar Kiri"
            className="absolute left-4 sm:left-[424px] mt- w-16 h-16 sm:w-[92px] sm:h-[102px]"
          />
          <Image
            src="/assets/image/cakar-kanan.png"
            width={92}
            height={102}
            alt="Cakar Kiri"
            className="absolute right-4 sm:right-[433px] mt- w-16 h-16 sm:w-[92px] sm:h-[102px]"
          />
          <h6 className="text-[#FDFDFD] text-[12px] sm:text-[15px] font-[500]">
            Our Team
          </h6>
          <h1 className="text-white text-[28px] sm:text-[45px] font-[700] px-4">
            Meet Our Team
          </h1>

          {/* Container dengan scroll custom */}
          <div className="overflow-x-auto custom-scrollbar px-10 mt-6 sm:mt-8">
            <div className="flex justify-start w-full">
              <div className="flex gap-x-10 sm:gap-x-5 w-max">
                {Array.from({ length: Math.ceil(divisi.team.length / 2) }).map(
                  (_, colIndex) => (
                    <div
                      key={colIndex}
                      className="flex flex-col gap-4 sm:gap-6 min-w-[280px] sm:min-w-[320px] flex-shrink-0">
                      {divisi.team
                        .slice(colIndex * 2, colIndex * 2 + 2)
                        .map((t, i) => (
                          <CardTeam key={i} data={t} />
                        ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block bg-[#E9E2EA] h-5"></div>
    </>
  );
}
