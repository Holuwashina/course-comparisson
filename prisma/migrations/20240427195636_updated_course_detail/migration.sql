/*
  Warnings:

  - You are about to drop the column `description` on the `CourseDetail` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `CourseDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseDetail" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "label" VARCHAR(255),
ADD COLUMN     "value" VARCHAR(255);
