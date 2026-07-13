/*
  Warnings:

  - A unique constraint covering the columns `[title,recordType]` on the table `TrackRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "TrackRecord" ADD COLUMN     "displayName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TrackRecord_title_recordType_key" ON "TrackRecord"("title", "recordType");
