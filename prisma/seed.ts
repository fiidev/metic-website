import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import { divisi } from "../src/app/_components/const/datas";
import { LeadersData, TrackData, dataFAQ } from "../src/app/_components/const/datas";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

// Parse Roles
function parseRoles(raw: string): string[] {
  const [, rolePart] = raw.split("|");

  if (!rolePart) {
    return [];
  }

  return rolePart
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean);
}

// Parse Generation
function parseGeneration(raw: string): number {
  const [generation] = raw.split("|");

  return Number(
    generation.replace("Metizen", "").trim()
  );
}

// Parse Member
function parseMember(rawRole: string) {
  const [generationPart, rolePart] = rawRole
    .split("|")
    .map((value) => value.trim());

  const generationNumber = Number(
    generationPart.replace("Metizen", "").trim()
  );

  const roles =
    rolePart
      ?.split(",")
      .map((role) => role.trim())
      .filter(Boolean) ?? [];

  return {
    generationNumber,
    roles,
  };
}

// Parse tanggal
function parseDate(date: string): Date | null {
  if (!date) {
    return null;
  }

  // Format: 07/07/2024
  if (date.includes("/")) {
    const [day, month, year] = date.split("/").map(Number);

    if (!day || !month || !year) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  // Format: Aug 28, 2024
  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

const leaderMemberMap: Record<string, string> = {
  "Sauqy Rahmatul Ramadhan": "Sauqy Rahmatul Ramadhan",
  "Muhammad Syamil Muwahhid": "M Syamil Muwahhid",
  "Naufal Nabil R.": "Naufal Nabil Ramadhan",
  "Muhammad Radika A. B.": "M. Radika Afwa Bimalaksa",
  "Arsyad Ali M.": "Arsyad Ali Mahardika",
};

async function main() {
  console.log("Memulai proses seeding database...");

  // Cek koneksi ke db
  await prisma.$queryRaw`SELECT 1`;

  console.log("Koneksi ke database berhasil.");

  // Generation

  await prisma.generation.createMany({
    data: [
      {
        number: 32,
        name: "Metizen 32",
      },
      {
        number: 33,
        name: "Metizen 33",
      },
    ],
    skipDuplicates: true,
  });

  const generationCount = await prisma.generation.count();

  console.log("Data generation berhasil ditambahkan.");
  console.log(`Total data generation: ${generationCount}`);

  // Division

  for (const division of divisi) {
    await prisma.division.upsert({
      where: {
        slug: slugify(division.name),
      },
      update: {
        name: division.name,
        alias: division.alias,
        description: division.desc,
        preview: division.preview,
        logoUrl: division.image,
      },
      create: {
        slug: slugify(division.name),
        name: division.name,
        alias: division.alias,
        description: division.desc,
        preview: division.preview,
        logoUrl: division.image,
      },
    });
  }

  const divisionCount = await prisma.division.count();

  console.log("Data division berhasil ditambahkan.");
  console.log(`Total data division: ${divisionCount}`);

  // Role

  const roles = new Set<string>();

for (const division of divisi) {
  for (const member of division.team) {
    const parsedRoles = parseRoles(member.role);

    parsedRoles.forEach((role) => roles.add(role));
  }
}
for (const role of roles) {
  await prisma.role.upsert({
    where: {
      name: role,
    },
    update: {},
    create: {
      name: role,
    },
  });
}

const roleCount = await prisma.role.count();

console.log("Data role berhasil ditambahkan.");
console.log(`Total data role: ${roleCount}`);

// Member

for (const division of divisi) {
  const dbDivision = await prisma.division.findUnique({
    where: {
      slug: slugify(division.name),
    },
  });

  if (!dbDivision) continue;

  for (let index = 0; index < division.team.length; index++) {
    const member = division.team[index];

    const parsed = parseMember(member.role);

    const generation = await prisma.generation.findUnique({
      where: {
        number: parsed.generationNumber,
      },
    });

    if (!generation) continue;

    await prisma.member.upsert({
      where: {
        name_generationId: {
          name: member.name.trim(),
          generationId: generation.id,
        },
      },
      update: {
        imageUrl: member.image,
        order: index,
      },
      create: {
        name: member.name.trim(),
        imageUrl: member.image,
        generationId: generation.id,
        order: index,
      },
    });
  }
}

const memberCount = await prisma.member.count();

console.log("Data member berhasil ditambahkan.");
console.log(`Total data member: ${memberCount}`);

// Member Division

for (const division of divisi) {
  const dbDivision = await prisma.division.findUnique({
    where: {
      slug: slugify(division.name),
    },
  });

  if (!dbDivision) continue;

  for (const member of division.team) {
    const generationNumber = parseGeneration(member.role);

    const generation = await prisma.generation.findUnique({
      where: {
        number: generationNumber,
      },
    });

    if (!generation) continue;

    const dbMember = await prisma.member.findUnique({
      where: {
        name_generationId: {
          name: member.name.trim(),
          generationId: generation.id,
        },
      },
    });

    if (!dbMember) continue;

    await prisma.memberDivision.upsert({
      where: {
        memberId_divisionId: {
          memberId: dbMember.id,
          divisionId: dbDivision.id,
        },
      },
      update: {},
      create: {
        memberId: dbMember.id,
        divisionId: dbDivision.id,
      },
    });
  }
}

const memberDivisionCount = await prisma.memberDivision.count();

console.log("Relasi member dan division berhasil ditambahkan.");
console.log(`Total relasi member-division: ${memberDivisionCount}`);

// MemberRole

for (const division of divisi) {
  for (const member of division.team) {
    const parsed = parseMember(member.role);

    if (parsed.roles.length === 0) {
      continue;
    }

    const generation = await prisma.generation.findUnique({
  where: {
    number: parsed.generationNumber,
  },
});

if (!generation) continue;

const dbMember = await prisma.member.findUnique({
  where: {
    name_generationId: {
      name: member.name.trim(),
      generationId: generation.id,
    },
  },
});

if (!dbMember) continue;
for (const roleName of parsed.roles) {
const dbRole = await prisma.role.findUnique({
  where: {
    name: roleName,
  },
});

if (!dbRole) continue;
await prisma.memberRole.upsert({
  where: {
    memberId_roleId: {
      memberId: dbMember.id,
      roleId: dbRole.id,
    },
  },
  update: {},
  create: {
    memberId: dbMember.id,
    roleId: dbRole.id,
  },
});
}

  }
}

const memberRoleCount = await prisma.memberRole.count();

console.log("Relasi member dan role berhasil ditambahkan.");
console.log(`Total relasi member-role: ${memberRoleCount}`);

// Program

for (const division of divisi) {
  const dbDivision = await prisma.division.findUnique({
    where: {
      slug: slugify(division.name),
    },
  });

  if (!dbDivision) {
    continue;
  }

  for (let index = 0; index < division.prokja.length; index++) {
    const program = division.prokja[index];

    await prisma.program.upsert({
      where: {
        divisionId_title: {
          divisionId: dbDivision.id,
          title: program.title,
        },
      },
      update: {
        description: program.desc,
        order: index,
      },
      create: {
        divisionId: dbDivision.id,
        title: program.title,
        description: program.desc,
        order: index,
      },
    });
  }
}

const programCount = await prisma.program.count();

console.log("Data program berhasil ditambahkan.");
console.log(`Total data program: ${programCount}`);

// Portfolio

for (const division of divisi) {
  const dbDivision = await prisma.division.findUnique({
    where: {
      slug: slugify(division.name),
    },
  });

  if (!dbDivision) {
    continue;
  }

  for (let index = 0; index < division.portfolio.length; index++) {
    const portfolio = division.portfolio[index];

    await prisma.portfolio.upsert({
      where: {
        divisionId_title: {
          divisionId: dbDivision.id,
          title: portfolio.title,
        },
      },
      update: {
        socialMedia: portfolio.sosmed,
        coverImageUrl: portfolio.image,
        link: portfolio.link,
        eventDate: parseDate(portfolio.date),
        order: index,
      },
      create: {
        divisionId: dbDivision.id,
        title: portfolio.title,
        description: null,
        socialMedia: portfolio.sosmed,
        coverImageUrl: portfolio.image,
        link: portfolio.link,
        eventDate: parseDate(portfolio.date),
        order: index,
      },
    });
  }
}

const portfolioCount = await prisma.portfolio.count();

console.log("Data portofolio berhasil ditambahkan.");
console.log(`Total data portofolio: ${portfolioCount}`);

// Portfolio Image

for (const division of divisi) {
  const dbDivision = await prisma.division.findUnique({
    where: {
      slug: slugify(division.name),
    },
  });

  if (!dbDivision) {
    continue;
  }

  for (const portfolio of division.portfolio) {
    const dbPortfolio = await prisma.portfolio.findUnique({
      where: {
        divisionId_title: {
          divisionId: dbDivision.id,
          title: portfolio.title.trim(),
        },
      },
    });

    if (!dbPortfolio) {
      continue;
    }

    await prisma.portfolioImage.upsert({
      where: {
        portfolioId_imageUrl: {
          portfolioId: dbPortfolio.id,
          imageUrl: portfolio.image,
        },
      },
      update: {
        alt: portfolio.title.trim(),
      },
      create: {
        portfolioId: dbPortfolio.id,
        imageUrl: portfolio.image,
        alt: portfolio.title.trim(),
      },
    });
  }
}

const portfolioImageCount = await prisma.portfolioImage.count();

console.log("Data portfolio image berhasil ditambahkan.");
console.log(`Total data portfolio image: ${portfolioImageCount}`);

// Organization Position

for (let index = 0; index < LeadersData.length; index++) {
  const leader = LeadersData[index];

  const memberName = leaderMemberMap[leader.name];

  let memberId: string | null = null;

  if (memberName) {
    const dbMember = await prisma.member.findFirst({
      where: {
        name: memberName,
      },
    });

    memberId = dbMember?.id ?? null;
  }

  await prisma.organizationPosition.upsert({
    where: {
      position: leader.role,
    },
    update: {
      memberId,
      name: leader.name,
      imageUrl: leader.image,
      order: index,
    },
    create: {
      memberId,
      name: leader.name,
      imageUrl: leader.image,
      position: leader.role,
      order: index,
    },
  });
}

const organizationPositionCount =
  await prisma.organizationPosition.count();

console.log("Data organization position berhasil ditambahkan.");
console.log(
  `Total data organization position: ${organizationPositionCount}`
);

// Track Record

for (let index = 0; index < TrackData.length; index++) {
  const record = TrackData[index];

  await prisma.trackRecord.upsert({
    where: {
      title_recordType: {
        title: record.title.trim(),
        recordType: record.type.toUpperCase() as any,
      },
    },
    update: {
      displayName: record.name,
      description: record.desc,
      imageUrl: record.img,
      country: record.country ?? null,
      recordDate: parseDate(record.eventDate),
      order: index,
    },
    create: {
      title: record.title.trim(),
      displayName: record.name,
      description: record.desc,
      imageUrl: record.img,
      recordType: record.type.toUpperCase() as any,
      country: record.country ?? null,
      recordDate: parseDate(record.eventDate),
      order: index,
    },
  });
}

const trackRecordCount = await prisma.trackRecord.count();

console.log("Data track record berhasil ditambahkan.");
console.log(`Total data track record: ${trackRecordCount}`);

// FAQ

for (let index = 0; index < dataFAQ.length; index++) {
  const faq = dataFAQ[index];

  await prisma.fAQ.upsert({
    where: {
      question: faq.question,
    },
    update: {
      answer: faq.response.join("\n"),
      imageUrl: faq.profileImg,
      order: index,
    },
    create: {
      question: faq.question,
      answer: faq.response.join("\n"),
      imageUrl: faq.profileImg,
      order: index,
    },
  });
}

const faqCount = await prisma.fAQ.count();

console.log("Data FAQ berhasil ditambahkan.");
console.log(`Total data FAQ: ${faqCount}`);

  console.log("Proses seeding selesai.");
}

main()
  .catch((error) => {
    console.error("Terjadi kesalahan saat menjalankan proses seeding.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });