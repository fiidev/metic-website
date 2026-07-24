import { PortfolioCard } from "@/app/_components/card";
import { DivisiProps } from "@/app/_components/const/datas";
import Image from "next/image";

export default function Portofolio({ divisi }: { divisi: DivisiProps }) {
  return (
    <>
      <div className="pt-48 pb-20">
        <div className="flex mx-auto items-center justify-center gap-2">
          <Image
            src="/assets/image/kardus.png"
            alt="kardus"
            width={49}
            height={54}
            className="max-sm:hidden min-xl:block"
          />
          <h1 className="">
            <span className="text-primary font-[700] max-sm:text-[21px] min-xl:text-[49px]">
              Yuk intip intip portofolio kita!
            </span>
          </h1>
          <Image
            src="/assets/image/kardus.png"
            alt="kardus"
            width={49}
            height={54}
            className="max-sm:hidden min-xl:block"
          />
        </div>
        <div className="overflow-x-auto bg-white custom-scrollbar px-10 mt-6 sm:mt-8">
            <div className="flex justify-start w-full">
              <div className="flex gap-x-10 sm:gap-x-5 w-max">
                {Array.from({
                  length: Math.ceil(divisi.portfolio.length),
                }).map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className="flex flex-col gap-4 sm:gap-6 min-w-[280px] sm:min-w-[320px] flex-shrink-0">
                    {divisi.portfolio
                      .slice(colIndex * 1, colIndex * 1 + 1)
                      .map((t, i) => (
                        <PortfolioCard key={i} portfolio={t} />
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </>
  );
}
