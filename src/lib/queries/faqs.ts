import "server-only";

import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getFAQs = cache(async () => {
  return prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });
});
