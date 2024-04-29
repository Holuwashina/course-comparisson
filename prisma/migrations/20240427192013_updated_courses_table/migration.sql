/*
  Warnings:

  - You are about to drop the column `career_opportunities` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `entry_requirement` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `learning_outcomes` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "career_opportunities",
DROP COLUMN "entry_requirement",
DROP COLUMN "learning_outcomes",
DROP COLUMN "overview";

-- CreateTable
CREATE TABLE "CourseDetail" (
    "id" TEXT NOT NULL,
    "course_id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "content" JSON NOT NULL,

    CONSTRAINT "CourseDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseDetail_id_key" ON "CourseDetail"("id");

-- AddForeignKey
ALTER TABLE "CourseDetail" ADD CONSTRAINT "CourseDetail_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
