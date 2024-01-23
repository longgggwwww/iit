/*
  Warnings:

  - A unique constraint covering the columns `[placeId]` on the table `Point` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Point_placeId_key" ON "Point"("placeId");
