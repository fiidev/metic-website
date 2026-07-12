-- CreateEnum
CREATE TYPE "TrackRecordType" AS ENUM ('EVENT', 'INTERNATIONAL', 'ACHIEVEMENT');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "Generation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "year" INTEGER,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Generation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT,
    "description" TEXT NOT NULL,
    "preview" TEXT,
    "logoUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "imageUrl" TEXT,
    "bio" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "website" TEXT,
    "isAlumni" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRole" (
    "memberId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberRole_pkey" PRIMARY KEY ("memberId","roleId")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "socialMedia" TEXT,
    "link" TEXT,
    "eventDate" TIMESTAMP(3),
    "coverImageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioImage" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "divisionId" TEXT,
    "memberId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "country" TEXT,
    "imageUrl" TEXT,
    "achievementDate" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackRecord" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "recordType" "TrackRecordType" NOT NULL,
    "country" TEXT,
    "recordDate" TIMESTAMP(3),
    "link" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationPosition" (
    "id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationPosition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Generation_name_key" ON "Generation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Generation_number_key" ON "Generation"("number");

-- CreateIndex
CREATE INDEX "Generation_number_idx" ON "Generation"("number");

-- CreateIndex
CREATE INDEX "Generation_name_idx" ON "Generation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Division_slug_key" ON "Division"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Division_name_key" ON "Division"("name");

-- CreateIndex
CREATE INDEX "Division_name_idx" ON "Division"("name");

-- CreateIndex
CREATE INDEX "Division_slug_idx" ON "Division"("slug");

-- CreateIndex
CREATE INDEX "Division_order_idx" ON "Division"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Role_name_idx" ON "Role"("name");

-- CreateIndex
CREATE INDEX "Member_divisionId_idx" ON "Member"("divisionId");

-- CreateIndex
CREATE INDEX "Member_generationId_idx" ON "Member"("generationId");

-- CreateIndex
CREATE INDEX "Member_name_idx" ON "Member"("name");

-- CreateIndex
CREATE INDEX "Member_order_idx" ON "Member"("order");

-- CreateIndex
CREATE INDEX "MemberRole_roleId_idx" ON "MemberRole"("roleId");

-- CreateIndex
CREATE INDEX "Program_divisionId_idx" ON "Program"("divisionId");

-- CreateIndex
CREATE INDEX "Program_order_idx" ON "Program"("order");

-- CreateIndex
CREATE INDEX "Portfolio_divisionId_idx" ON "Portfolio"("divisionId");

-- CreateIndex
CREATE INDEX "Portfolio_eventDate_idx" ON "Portfolio"("eventDate");

-- CreateIndex
CREATE INDEX "Portfolio_order_idx" ON "Portfolio"("order");

-- CreateIndex
CREATE INDEX "PortfolioImage_portfolioId_idx" ON "PortfolioImage"("portfolioId");

-- CreateIndex
CREATE INDEX "PortfolioImage_order_idx" ON "PortfolioImage"("order");

-- CreateIndex
CREATE INDEX "Achievement_divisionId_idx" ON "Achievement"("divisionId");

-- CreateIndex
CREATE INDEX "Achievement_memberId_idx" ON "Achievement"("memberId");

-- CreateIndex
CREATE INDEX "Achievement_category_idx" ON "Achievement"("category");

-- CreateIndex
CREATE INDEX "Achievement_achievementDate_idx" ON "Achievement"("achievementDate");

-- CreateIndex
CREATE INDEX "Achievement_order_idx" ON "Achievement"("order");

-- CreateIndex
CREATE INDEX "TrackRecord_recordType_idx" ON "TrackRecord"("recordType");

-- CreateIndex
CREATE INDEX "TrackRecord_recordDate_idx" ON "TrackRecord"("recordDate");

-- CreateIndex
CREATE INDEX "TrackRecord_order_idx" ON "TrackRecord"("order");

-- CreateIndex
CREATE INDEX "Highlight_order_idx" ON "Highlight"("order");

-- CreateIndex
CREATE INDEX "Benefit_order_idx" ON "Benefit"("order");

-- CreateIndex
CREATE INDEX "FAQ_order_idx" ON "FAQ"("order");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPosition_memberId_key" ON "OrganizationPosition"("memberId");

-- CreateIndex
CREATE INDEX "OrganizationPosition_position_idx" ON "OrganizationPosition"("position");

-- CreateIndex
CREATE INDEX "OrganizationPosition_order_idx" ON "OrganizationPosition"("order");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioImage" ADD CONSTRAINT "PortfolioImage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationPosition" ADD CONSTRAINT "OrganizationPosition_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
