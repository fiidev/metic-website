import Image from "next/image";
import { LeaderComponent } from "./Leader";
import Link from "next/link";

export const CardLeader: React.FC<{ data: LeaderComponent }> = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-28 h-28 rounded-full overflow-hidden mb-4 shadow-md">
        <Image
          src={data.image}
          alt={data.name}
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-md font-semibold">{data.name}</h3>
      <p className="text-sm mt-1 bg-red-100 text-red-600 px-3 py-1 rounded-full">
        {data.role}
      </p>
    </div>
  );
};

export const CardTeam: React.FC<{
  data: { name: string; role: string; image: string };
}> = ({ data }) => {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 shadow-md border border-[#E2E8F0]">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          width={64}
          height={64}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-[#A10000]">{data.name}</h3>
        <p className="text-sm text-[#A10000] opacity-70">{data.role}</p>
      </div>
    </div>
  );
};

interface PortfolioProps {
  id: string;
  title: string;
  sosmed: string;
  image: string;
  link: string;
  date: string;
}

export function PortfolioCard({ portfolio }: { portfolio: PortfolioProps }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-md h-[450px] flex flex-col my-5">
      {/* Image with Caption Overlay */}
      <div className="relative h-[55%] w-full overflow-hidden">
        <Image
          src={portfolio.image}
          alt={portfolio.title}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="px-6 pt-4 pb-6 flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <div className="flex justify-between items-center gap-2 py-2 break-words">
            <h3 className="text-[18px] text-[#A2181C] w-[70%] font-semibold leading-snug">
              {portfolio.title}
            </h3>
            <p className="text-sm text-gray-400 z-10">{portfolio.date}</p>
          </div>
        </div>

        {/* Instagram Info + Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-md overflow-hidden">
              <Image
                src="/assets/image/ig-logo.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </div>
            <span className="text-gray-800 font-medium">
              {portfolio.sosmed}
            </span>
          </div>

          <Link
            href={portfolio.link}
            className="bg-[#A2181C] hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ml-3 flex items-center gap-2">
            Explore more
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface FAQCardProps {
  profileImg: string;
  question: string;
  response: string[];
}

export function FAQCard({ profileImg, question, response }: FAQCardProps) {
  return (
    <div className="flex flex-col items-end gap-3 max-w-xl mx-auto">
      {/* Question bubble */}
      <div className="flex items-center gap-2">
        <p className="bg-white/30 text-white px-4 py-2 rounded-2xl text-sm">
          {question}
        </p>
        <Image
          src={profileImg}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Response card */}
      <div className="flex items-start gap-3">
        <Image
          src="/assets/image/mecaKeren.png" // ganti dengan path yang sesuai
          alt="Mascot"
          width={40}
          height={40}
          className="rounded-md"
        />
        <div className="flex flex-col gap-y-2">

        {response.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md">
            <p
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
