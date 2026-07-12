/*
  Warnings:

  - A unique constraint covering the columns `[divisionId,title]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_divisionId_title_key" ON "Portfolio"("divisionId", "title");
