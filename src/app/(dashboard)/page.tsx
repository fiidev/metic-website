import DivisionSection from "../_components/DivisionSection";
import Header from "../_components/Header";
import Visi from "../_components/Visi";
import Leader from "../_components/Leader";
import { dataFAQ, LeadersData, TrackData } from "../_components/const/datas";
import TrackRecord from "../_components/TrackRecord";
import Faq from "../_components/FAQ";
import { getTrackRecords, getLeaders, getFAQs } from "@/lib/queries";

const MASCOT_IMAGE = "https://res.cloudinary.com/stt7o3mb/image/upload/v1784892655/assets/image/mecaKeren.png";

function formatShortDate(date: Date | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

const recordTypeLabels = {
  EVENT: "Event",
  INTERNATIONAL: "International",
  ACHIEVEMENT: "Achievement",
} as const;

export default async function Home() {
  let trackRecords = TrackData;
  let leaders = LeadersData;
  let faqs = dataFAQ;

  try {
    const [dbTrackRecords, dbLeaders, dbFaqs] = await Promise.all([
      getTrackRecords(),
      getLeaders(),
      getFAQs(),
    ]);

    if (dbTrackRecords.length) {
      trackRecords = dbTrackRecords.map((record: { displayName: string | null; description: string; imageUrl: string | null; recordDate: Date | null; title: string; recordType: string; country: string | null }) => ({
        name: record.displayName ?? "",
        desc: record.description,
        img: record.imageUrl ?? "",
        eventDate: formatShortDate(record.recordDate),
        title: record.title,
        type: recordTypeLabels[record.recordType as keyof typeof recordTypeLabels],
        country: record.country ?? undefined,
      }));
    }

    if (dbLeaders.length) {
      leaders = dbLeaders.map((leader: { name: string; position: string; imageUrl: string | null }) => ({
        name: leader.name,
        role: leader.position,
        image: leader.imageUrl ?? MASCOT_IMAGE,
      }));
    }

    if (dbFaqs.length) {
      faqs = dbFaqs.map((faq: { imageUrl: string | null; question: string; answer: string }) => ({
        profileImg: faq.imageUrl ?? MASCOT_IMAGE,
        question: faq.question,
        response: faq.answer.split("\n"),
      }));
    }
  } catch (error) {
    console.error("Unable to load home content from the database:", error);
  }

  return (
    <>
      <Header />
      <Visi />
      <DivisionSection />
      <TrackRecord datas={trackRecords} />
      <Leader datas={leaders} />
      <Faq datas={faqs} />
    </>
  );
}
