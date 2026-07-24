import Header from "./_components/Header";
import ProgramKerjaHead from "./_components/ProgramKerjaHead";
import Portofolio from "./_components/Portofolio";
import Team from "./_components/Team";
import { divisi, DivisiProps } from "@/app/_components/const/datas";
import { getDivisions, getDivisionBySlug } from "@/lib/queries";

type Params = Promise<{ id: string }>;

const legacyDivisionSlugs: Record<string, string> = {
  "1": "mokletdev",
  "2": "medcom",
  "3": "metic-merch",
};

function formatPortfolioDate(date: Date | null) {
  if (!date) return "";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
}

export async function generateStaticParams() {
  try {
    const divisions = await getDivisions();

    if (divisions.length) {
      return divisions.map((division: { slug: string }) => ({ id: division.slug }));
    }
  } catch (error) {
    console.error("Unable to generate division routes from the database:", error);
  }

  return divisi.map((division) => ({ id: division.id }));
}

export default async function DivisionPage({ params }: { params: Params }) {
  const { id } = await params;
  const slug = legacyDivisionSlugs[id] ?? id;
  let divisionData: DivisiProps | undefined;

  try {
    const division = await getDivisionBySlug(slug);

    if (division) {
      divisionData = {
        id: division.id,
        name: division.name,
        image: division.logoUrl ?? "https://res.cloudinary.com/stt7o3mb/image/upload/v1784892655/assets/image/mecaKeren.png",
        preview: division.preview ?? "",
        alias: division.alias ?? division.name,
        desc: division.description,
        prokja: division.programs.map((program: { title: string; description: string }) => ({
          title: program.title,
          desc: program.description,
        })),
        portfolio: division.portfolios.map((portfolio: { id: string; title: string; socialMedia: string | null; coverImageUrl: string | null; link: string | null; eventDate: Date | null }) => ({
          id: portfolio.id,
          title: portfolio.title,
          sosmed: portfolio.socialMedia ?? "",
          image: portfolio.coverImageUrl ?? "https://res.cloudinary.com/stt7o3mb/image/upload/v1784892655/assets/image/mecaKeren.png",
          link: portfolio.link ?? "#",
          date: formatPortfolioDate(portfolio.eventDate),
        })),
        team: division.members
          .sort((a: { member: { order: number } }, b: { member: { order: number } }) => a.member.order - b.member.order)
          .map(({ member }: { member: { name: string; imageUrl: string | null; generation: { name: string }; memberRoles: { role: { name: string } }[] } }) => ({
            name: member.name,
            image: member.imageUrl ?? "https://res.cloudinary.com/stt7o3mb/image/upload/v1784892655/assets/image/mecaKeren.png",
            role: `${member.generation.name} | ${member.memberRoles
              .map(({ role }: { role: { name: string } }) => role.name)
              .join(", ")}`,
          })),
      };
    }
  } catch (error) {
    console.error(`Unable to load division \"${slug}\" from the database:`, error);
  }

  const fallbackId = Object.entries(legacyDivisionSlugs).find(
    ([, legacySlug]) => legacySlug === slug
  )?.[0];
  const division = divisionData ?? divisi.find((item) => item.id === (fallbackId ?? id));

  if (!division) {
    return <div>Division not found</div>;
  }

  return (
    <>
      <Header data={division} />
      <ProgramKerjaHead name={division.name} prokja={division.prokja} />
      <Portofolio divisi={division} />
      <Team divisi={division} />
    </>
  );
}
