import Header from "./_components/Header";
import ProgramKerjaHead from "./_components/ProgramKerjaHead";
import Portofolio from "./_components/Portofolio";
import Team from "./_components/Team";
import { divisi, DivisiProps } from "@/app/_components/const/datas";
import { prisma } from "@/lib/prisma";

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
    const divisions = await prisma.division.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });

    if (divisions.length) {
      return divisions.map((division) => ({ id: division.slug }));
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
    const division = await prisma.division.findFirst({
      where: { slug, isPublished: true },
      include: {
        programs: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
        portfolios: {
          where: { isPublished: true },
          orderBy: { order: "asc" },
        },
        members: {
          include: {
            member: {
              include: {
                generation: true,
                memberRoles: { include: { role: true } },
              },
            },
          },
        },
      },
    });

    if (division) {
      divisionData = {
        id: division.id,
        name: division.name,
        image: division.logoUrl ?? "/assets/image/mecaKeren.png",
        preview: division.preview ?? "",
        alias: division.alias ?? division.name,
        desc: division.description,
        prokja: division.programs.map((program) => ({
          title: program.title,
          desc: program.description,
        })),
        portfolio: division.portfolios.map((portfolio) => ({
          id: portfolio.id,
          title: portfolio.title,
          sosmed: portfolio.socialMedia ?? "",
          image: portfolio.coverImageUrl ?? "/assets/image/mecaKeren.png",
          link: portfolio.link ?? "#",
          date: formatPortfolioDate(portfolio.eventDate),
        })),
        team: division.members
          .sort((a, b) => a.member.order - b.member.order)
          .map(({ member }) => ({
            name: member.name,
            image: member.imageUrl ?? "/assets/image/mecaKeren.png",
            role: `${member.generation.name} | ${member.memberRoles
              .map(({ role }) => role.name)
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
