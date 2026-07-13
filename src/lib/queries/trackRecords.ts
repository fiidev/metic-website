import "server-only";

import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getTrackRecords = cache(async () => {
  return prisma.trackRecord.findMany({
    orderBy: { order: "asc" },
  });
});

export const getTrackRecordsByType = cache(async (type: "EVENT" | "INTERNATIONAL" | "ACHIEVEMENT") => {
  return prisma.trackRecord.findMany({
    where: { recordType: type },
    orderBy: { order: "asc" },
  });
});
