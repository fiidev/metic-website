/*
  Warnings:

  - A unique constraint covering the columns `[divisionId,title]` on the table `Program` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Program_divisionId_title_key" ON "Program"("divisionId", "title");
