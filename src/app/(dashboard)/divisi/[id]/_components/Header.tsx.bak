import { DivisiProps } from "@/app/_components/const/datas";
import Image from "next/image";
export default function Header({ data }: { data: DivisiProps }) {
  return (
    <>
      <Image
        src="/assets/image/polygon-multipage.png"
        alt="Division Header"
        width={204}
        height={183}
        className="max-sm:hidden min-xl:absolute left-[98px] top-[370px] rotate-[-34deg]"
      />
      <Image
        src="/assets/image/polygon-multipage.png"
        alt="Division Header"
        width={204}
        height={183}
        className="max-sm:hidden min-xl:absolute right-[85px] top-[248px]"
      />
      <Image
        src="/assets/image/panah-kiri-multipage.png"
        alt="triangle kiri"
        width={161}
        height={32}
        className="max-sm:hidden min-xl:absolute left-[347px] top-[540px]"
      />
      <Image
        src="/assets/image/panah-kanan-multipage.png"
        alt="Server Rack"
        width={161}
        height={32}
        className="max-sm:hidden min-xl:absolute right-[315px] top-[421px]"
      />
      <Image
        src="/assets/image/server-rack.png"
        alt="Server Rack"
        width={72}
        height={72}
        className="max-sm:hidden min-xl:absolute left-[380px] top-[696px] rotate-[-5deg]"
      />
      <Image
        src="/assets/image/desktop.png"
        alt="desktop"
        width={65}
        height={65}
        className="max-sm:hidden min-xl:absolute right-[311px] top-[778px]"
      />
      <Image
        src="/assets/image/cakar.png"
        alt="Division Header"
        width={58}
        height={55}
        className="max-sm:hidden min-xl:absolute top-[784px] left-[205px]"
      />
      <Image
        src="/assets/image/cakar.png"
        alt="Division Header"
        width={58}
        height={55}
        className="max-sm:hidden min-xl:absolute right-[204px] top-[559px] rotate-[-41deg]"
      />
      <Image
        src="/assets/image/pen-tool.png"
        alt="Division Header"
        width={67}
        height={67}
        className="max-sm:hidden min-xl:absolute left-[505px] top-[768px]"
      />
      <Image
        src="/assets/image/verified-handphone.png"
        alt="Server Rack"
        width={72}
        height={72}
        className="max-sm:hidden min-xl:absolute left-[643px] top-[699px] rotate-[-5deg]"
      />
      <Image
        src="/assets/image/kamera.png"
        alt="desktop"
        width={65}
        height={65}
        className="max-sm:hidden min-xl:absolute right-[590px] top-[784px]"
      />
      <Image
        src="/assets/image/laptop.png"
        alt="desktop"
        width={65}
        height={65}
        className="max-sm:hidden min-xl:absolute right-[449px] top-[694px]"
      />
      <div className="mt-28 pb-10">
        <div className="text-center">
          <h1 className="font-[700] text-primary leading-[54px] max-sm:text-[40px] min-xl:text-[48.75px]">
            {data.alias}
          </h1>
          <p
            className="text-[#515050] mt-[17px] font-[400] text-[15px]"
            dangerouslySetInnerHTML={{ __html: data.desc }}
          />
        </div>
        <div className="block drop-shadow-[0_6px_61px_#E15F60] mx-auto w-[247px] h-[247px] mt-[73px] bg-primary rounded-full">
          <div className="flex w-full h-full justify-center items-center">
            <Image
              src={`${data.image}`}
              alt={`${data.name}`}
              width={93}
              height={119}
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}
