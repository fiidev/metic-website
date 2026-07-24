"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import RecordCard from "./RecordCard";

export interface TrackRecordProps {
  name: string;
  desc: string;
  img: string;
  eventDate: string;
  title: string;
  type: string;
  country? : string;
}

const TrackRecord: React.FC<{ datas: TrackRecordProps[] }> = ({ datas }) => {
  const [current, setCurrent] = useState(0);
  const [currentInternational, setCurrentInternational] = useState(0);
  const internationalLength = datas.filter((d) => d.type === 'International').length;
  const length = datas.filter((d) => d.type === 'Event').length;
  const visibleCard = 2;
  const maxIndex = length - visibleCard;
  const maxInternationalIndex = internationalLength - visibleCard;
  const cardWidth = 377;
  const gap = 43;
  
  useEffect(() => {
    const timerInter = setInterval(() => {
      setCurrentInternational((prev) => (prev === maxInternationalIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timerInter);
  }, [internationalLength]);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [length]);
  return (
    <div className="relative bg-secondary w-full mt-31" id="track">
      <div className="absolute -top-[15px] left-0 w-full overflow-hidden leading-none">
        <svg
          width="1440"
          height="60"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
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
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E9E2EA" />
              <stop offset="1" stopColor="#F5F5F5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="text-center pb-[30px] pt-[60px]">
        <h4 className="font-[500] text-[15px] text-white/61">
          Event & Achievements
        </h4>
        <h1 className="font-[700] text-[45px] text-white">Track Record</h1>
      </div>
      <div className="flex items-center max-sm:flex-col w-full mt-[30px] pb-[30px]">
        <div className="max-sm:block min-xl:hidden w-full text-center">
          <h4 className="text-[15px] text-white/61 font-[500]">
            Event & Achievements
          </h4>
          <h1 className="text-white font-[700] text-[45px]">Our Event</h1>
        </div>
        {/* bagian event */}
        <div className="relative shrink-0 min-xl:w-[60%] max-sm:w-full overflow-x-hidden max-sm:px-3.5 max-sm:py-7 rounded-[18px]">
          <div
            className="flex flex-row-reverse gap-[43px] transition-transform duration-300"
            style={{
              transform: `translateX(${current * (cardWidth + gap)}px)`,
            }}
          >
            {datas.filter((d) => d.type === 'Event').map((data, index) => (
              <RecordCard key={index} data={data} />
            ))}
            {datas.filter((d) => d.type === 'Event').slice(0).map((data, index) => (
              <RecordCard key={index} data={data} />
            ))}
          </div>
        </div>
        <div className="w-150 h-127 absolute right-0 mt-[-90px] rotate-[2.17deg] bg-[radial-gradient(ellipse_39.33%_39.33%_at_49.95%_56.31%,_rgba(255,_255,_255,_0.20)_12%,_rgba(255,_255,_255,_0)_100%)]"></div>
        <div className="max-sm:hidden min-xl:block w-[40%] mt-[-150px] text-center">
          <h4 className="text-[15px] text-white/61 font-[500]">
            Event & Achievements
          </h4>
          <h1 className="text-white font-[700] text-[45px]">Our Event</h1>
        </div>
      </div>
      <div className="flex max-sm:flex-col items-center w-full mt-[70px] pb-[30px]">
        <Image
          src="/assets/image/meca-international.png"
          alt="Arrow Down"
          width={490}
          height={390}
          className="max-sm:hidden min-xl:absolute mt-[-58px] drop-shadow-[0_3px_90px_rgba(255,255,255,0.73)] left-0 z-[1]"
        />
        <Image
          src="/assets/image/icon-piala.png"
          alt="Arrow Down"
          width={110}
          height={110}
          className="max-sm:hidden min-xl:absolute mt-[-420px] drop-shadow-[0_3px_90px_rgba(255,255,255,0.73)] left-[360px] z-[1]"
        />
        <Image
          src="/assets/image/icon-global.png"
          alt="Arrow Down"
          width={87}
          height={87}
          className="max-sm:hidden min-xl:absolute mt-[88.5px] drop-shadow-[0_3px_90px_rgba(255,255,255,0.73)] left-[401px] z-[1]"
        />
        <div className="max-sm:hidden min-xl:absolute left-[364px] mt-[-90px] z-[222]">
          <div className="w-[245px] h-[54px] px-[28px] py-[15px] bg-[#ffffff] border-[1px] border-[E04E4E] font-[600] text-secondary-text text-[15px] text-center rounded-[12px_12px_0px_12px]">
            Metic Go Internasional?
          </div>
        </div>
        <div className="min-w-[50%]"></div>
        <div className="max-sm:block min-xl:hidden w-full text-center">
          <h4 className="text-[15px] text-white/61 font-[500]">
            Event & Achievements
          </h4>
          <h1 className="text-white font-[700] text-[45px]">Metic Go International!</h1>
        </div>
        {/* bagian internasional */}
        <div className="relative max-sm:w-full max-sm:px-3.5 max-sm:py-7 rounded-[18px] gap-[43px] shrink-0 w-[50%] overflow-x-hidden">
          <div
            className="flex gap-[43px] transition-transform duration-300"
            style={{
              transform: `translateX(-${currentInternational * (cardWidth + gap)}px)`,
            }}
          >
            {datas.filter((d) => d.type === 'International').map((data, index) => (
                <RecordCard key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className="block bg-[#E9E2EA] h-5"></div>
    </div>
  );
};
export default TrackRecord;
