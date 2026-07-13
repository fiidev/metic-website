/*
  Warnings:

  - You are about to drop the column `divisionId` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,generationId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_divisionId_fkey";

-- DropIndex
DROP INDEX "Member_divisionId_idx";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "divisionId";

-- CreateTable
CREATE TABLE "MemberDivision" (
    "memberId" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MemberDivision_pkey" PRIMARY KEY ("memberId","divisionId")
);

-- CreateIndex
CREATE INDEX "MemberDivision_divisionId_idx" ON "MemberDivision"("divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_name_generationId_key" ON "Member"("name", "generationId");

-- AddForeignKey
ALTER TABLE "MemberDivision" ADD CONSTRAINT "MemberDivision_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberDivision" ADD CONSTRAINT "MemberDivision_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;
