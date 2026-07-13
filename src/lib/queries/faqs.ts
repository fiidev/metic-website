import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { FAQCardProps } from "@/app/_components/card";

export const getFAQs = cache(async (): Promise<FAQCardProps[]> => {
  const faqs = await prisma.fAQ.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });

  return faqs.map((f) => ({
    profileImg: f.imageUrl ?? "",
    question: f.question,
    response: f.answer.split("\n"),
  }));
});
