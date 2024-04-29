/*
  Warnings:

  - You are about to drop the column `capstoneSubjectId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `coreSubjectId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `majorCourseId` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "capstoneSubjectId",
DROP COLUMN "coreSubjectId",
DROP COLUMN "majorCourseId";
