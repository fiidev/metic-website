import "server-only";

import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getDivisions = cache(async () => {
  return prisma.division.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: {
      members: {
        include: {
          member: {
            include: {
              generation: true,
              memberRoles: {
                include: {
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          member: { order: "asc" },
        },
      },
      programs: {
        orderBy: { order: "asc" },
      },
      portfolios: {
        orderBy: { order: "asc" },
        include: {
          images: true,
        },
      },
    },
  });
});

export const getDivisionBySlug = cache(async (slug: string) => {
  return prisma.division.findFirst({
    where: { slug, isPublished: true },
    include: {
      members: {
        include: {
          member: {
            include: {
              generation: true,
              memberRoles: {
                include: {
                  role: true,
                },
              },
            },
          },
        },
        orderBy: {
          member: { order: "asc" },
        },
      },
      programs: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
      },
      portfolios: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          images: true,
        },
      },
    },
  });
});
