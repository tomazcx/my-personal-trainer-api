/*
  Warnings:

  - Added the required column `startHour` to the `providers_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endHour` to the `providers_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "providers_info" DROP COLUMN "startHour",
ADD COLUMN     "startHour" INTEGER NOT NULL,
DROP COLUMN "endHour",
ADD COLUMN     "endHour" INTEGER NOT NULL;
