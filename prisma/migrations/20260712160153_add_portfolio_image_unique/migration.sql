/*
  Warnings:

  - A unique constraint covering the columns `[portfolioId,imageUrl]` on the table `PortfolioImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PortfolioImage_portfolioId_imageUrl_key" ON "PortfolioImage"("portfolioId", "imageUrl");
