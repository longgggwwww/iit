-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "status" INTEGER;

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "location" geography(Point, 4326) NOT NULL,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);
