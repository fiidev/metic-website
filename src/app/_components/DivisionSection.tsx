import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { divisi } from "./const/datas";
import AnimatedContent from "./AnimatedContent";
import { prisma } from "@/lib/prisma";


<AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={1.0}
>
  <div>join now</div>
</AnimatedContent>

export default async function DivisionSection() {
  let divisions = divisi.map((division) => ({
    name: division.name,
    preview: division.preview,
    image: division.image,
    slug: division.name.toLowerCase().replace(/\s+/g, "-"),
  }));

  try {
    const dbDivisions = await prisma.division.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });

    if (dbDivisions.length) {
      divisions = dbDivisions.map((division: { name: string; preview: string | null; logoUrl: string | null; slug: string }) => ({
        name: division.name,
        preview: division.preview ?? "",
        image: division.logoUrl ?? "/assets/image/mecaKeren.png",
        slug: division.slug,
      }));
    }
  } catch (error) {
    console.error("Unable to load divisions from the database:", error);
  }

  return (
    <>
      <div className="bg-white w-full mt-16 pb-10" id="divisi">
        <div className="text-center max-sm:px-3">
          <h4 className="text-[15px] font-[500] text-[#B8B8B8]">
            Our Division
          </h4>
          <h4 className="text-[#333333] mt-[-10px] font-[700] text-[45px] max-sm:text-[35px]">
            Meet Our Division
          </h4>
          <p className="text-[15px] mt-[25px] font-[400] text-black leading-[21px]">
            METIC punya tiga divisi utama: Moklet Dev, Metic Merch, dan
            MediaCom—semuanya bergerak aktif bikin karya nyata dan <br /> impact
            di sekolah maupun luar. Di METIC, kamu bisa belajar, bikin proyek,
            kolaborasi tim, sampai dapet pengalaman <br /> profesional yang real
            banget.
          </p>
        </div>
        <div className="mt-[38px] max-sm:flex-col flex justify-center gap-[87px] px-[124.5px] mx-auto items-center">
          {divisions.map((d) => (
            <div
              key={d.slug}
              className="flex drop-shadow-[1px_2px_8px_rgba(0,0,0,0.25)] bg-white flex-col items-center justify-center w-[339px] h-[496px] rounded-[26.42px] py-[39px] px-[46px] gap-[18px]">
              <div className="block w-[247px] h-[247px] bg-primary rounded-full">
                <div className="flex w-full h-full justify-center items-center">
                  <Image
                    src={`${d.image}`}
                    alt={`${d.name}`}
                    width={93}
                    height={119}
                    className="object-contain object-center"
                  />
                </div>
              </div>
              <div className="text-center w-[292px]">
                <h1 className="text-[22.5px] font-[700] text-[#333333]">
                  {d.name}
                </h1>
                <p className="font-[400] mt-[1px] text-[15px] text-[#515050]">
                  {d.preview}
                </p>
                <a
                  href={`/divisi/${d.slug}`}
                  className="block mt-[10px] mx-auto py-[9px] w-[172px] text-center h-[39px] rounded-[20px] bg-primary text-white font-[500] text-[12px] ">
                  Read More
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
          {/* <div className="flex drop-shadow-[1px_2px_8px_rgba(0,0,0,0.25)] bg-white flex-col items-center justify-center w-[339px] h-[496px] rounded-[26.42px] py-[39px] px-[46px] gap-[18px]">
            <div className="block w-[247px] h-[247px] bg-primary rounded-full">
              <Image
                src="/assets/image/logo-medcom.png"
                alt="Moklet Dev"
                width={123}
                height={88}
                className="mx-auto py-20"
              />
            </div>
            <div className="text-center w-[292px]">
              <h1 className="text-[22.5px] font-[700] text-[#333333]">Medcom</h1>
              <p className="font-[400] mt-[1px] text-[15px] text-[#515050]">Berfokus pada pengelolaan konten kreatif, manajemen media sosial, publikasi, serta komunikasi digital</p>
              <a href="" className="block mt-[10px] mx-auto py-[9px] w-[172px] text-center h-[39px] rounded-[20px] bg-primary text-white font-[500] text-[12px] ">
                Read More
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </a>
            </div>
          </div>
          <div className="flex drop-shadow-[1px_2px_8px_rgba(0,0,0,0.25)] bg-white flex-col items-center justify-center w-[339px] h-[496px] rounded-[26.42px] py-[39px] px-[46px] gap-[18px]">
            <div className="block w-[247px] h-[247px] bg-primary rounded-full">
              <Image
                src="/assets/image/logo-meticmerch.png"
                alt="Moklet Dev"
                width={127}
                height={71}
                className="mx-auto py-22"
              />
            </div>
            <div className="text-center w-[292px]">
              <h1 className="text-[22.5px] font-[700] text-[#333333]">Metic Merch</h1>
              <p className="font-[400] mt-[1px] text-[15px] text-[#515050]">Unit bisnis yang menjalankan produksi dan penjualan merchandise</p>
              <a href="" className="block mt-[10px] mx-auto py-[9px] w-[172px] text-center h-[39px] rounded-[20px] bg-primary text-white font-[500] text-[12px] ">
                Read More
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
