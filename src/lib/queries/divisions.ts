import { cache } from "react";
import { prisma } from "@/lib/prisma";

export interface DivisionCard {
  name: string;
  preview: string;
  image: string;
  slug: string;
}

export interface DivisionDetail {
  id: string;
  name: string;
  image: string;
  preview: string;
  alias: string;
  desc: string;
  prokja: {
    title: string;
    desc: string;
  }[];
  portfolio: {
    id: string;
    title: string;
    sosmed: string;
    image: string;
    link: string;
    date: string;
  }[];
  team: {
    name: string;
    image: string;
    role: string;
  }[];
}

export const getDivisionCards = cache(async (): Promise<DivisionCard[]> => {
  const divisions = await prisma.division.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return divisions.map((d) => ({
    name: d.name,
    preview: d.preview ?? "",
    image: d.logoUrl ?? "",
    slug: d.slug,
  }));
});

function formatPortfolioDate(date: Date | null): string {
  if (!date) return "";
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
}

export const getDivisionDetail = cache(
  async (slug: string): Promise<DivisionDetail | null> => {
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

    if (!division) return null;

    return {
      id: division.id,
      name: division.name,
      image: division.logoUrl ?? "",
      preview: division.preview ?? "",
      alias: division.alias ?? division.name,
      desc: division.description,
      prokja: division.programs.map((p) => ({
        title: p.title,
        desc: p.description,
      })),
      portfolio: division.portfolios.map((p) => ({
        id: p.id,
        title: p.title,
        sosmed: p.socialMedia ?? "",
        image: p.coverImageUrl ?? "",
        link: p.link ?? "#",
        date: formatPortfolioDate(p.eventDate),
      })),
      team: division.members
        .sort((a, b) => a.member.order - b.member.order)
        .map(({ member }) => ({
          name: member.name,
          image: member.imageUrl ?? "",
          role: `${member.generation.name} | ${member.memberRoles
            .map((r) => r.role.name)
            .join(", ")}`,
        })),
    };
  },
);

export const getAllDivisionSlugs = cache(async (): Promise<string[]> => {
  const divisions = await prisma.division.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
  return divisions.map((d) => d.slug);
});
