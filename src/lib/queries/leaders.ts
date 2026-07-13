import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { LeaderComponent } from "@/app/_components/Leader";

export const getOrganizationPositions = cache(
  async (): Promise<LeaderComponent[]> => {
    const positions = await prisma.organizationPosition.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });

    return positions.map((p) => ({
      name: p.name,
      role: p.position,
      image: p.imageUrl ?? "",
    }));
  },
);
