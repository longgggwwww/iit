/*
  Warnings:

  - You are about to drop the column `placeId` on the `Point` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Point` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Point` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Point_placeId_key";

-- AlterTable
ALTER TABLE "Point" DROP COLUMN "placeId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Point_name_key" ON "Point"("name");
