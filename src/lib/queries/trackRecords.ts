import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { TrackRecordProps } from "@/app/_components/TrackRecord";

const RECORD_TYPE_LABELS: Record<string, "Event" | "International" | "Achievement"> = {
  EVENT: "Event",
  INTERNATIONAL: "International",
  ACHIEVEMENT: "Achievement",
};

function formatShortDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export const getTrackRecords = cache(async (): Promise<TrackRecordProps[]> => {
  const records = await prisma.trackRecord.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return records.map((r) => ({
    name: r.displayName ?? "",
    desc: r.description,
    img: r.imageUrl ?? "",
    eventDate: formatShortDate(r.recordDate),
    title: r.title,
    type: RECORD_TYPE_LABELS[r.recordType] ?? "Event",
    country: r.country ?? undefined,
  }));
});
