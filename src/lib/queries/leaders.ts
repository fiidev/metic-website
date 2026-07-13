import "server-only";

import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getLeaders = cache(async () => {
  return prisma.organizationPosition.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
    include: {
      member: {
        include: {
          generation: true,
          memberDivisions: {
            include: {
              division: true,
            },
          },
        },
      },
    },
  });
});
