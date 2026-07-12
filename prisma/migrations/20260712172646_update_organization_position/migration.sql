/*
  Warnings:

  - A unique constraint covering the columns `[position]` on the table `OrganizationPosition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `OrganizationPosition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrganizationPosition" DROP CONSTRAINT "OrganizationPosition_memberId_fkey";

-- DropIndex
DROP INDEX "OrganizationPosition_position_idx";

-- AlterTable
ALTER TABLE "OrganizationPosition" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "memberId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationPosition_position_key" ON "OrganizationPosition"("position");

-- AddForeignKey
ALTER TABLE "OrganizationPosition" ADD CONSTRAINT "OrganizationPosition_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
