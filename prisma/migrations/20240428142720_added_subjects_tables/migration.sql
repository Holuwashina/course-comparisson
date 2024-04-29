/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToSubject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CourseToSubject" DROP CONSTRAINT "_CourseToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToSubject" DROP CONSTRAINT "_CourseToSubject_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "capstoneSubjectId" TEXT,
ADD COLUMN     "coreSubjectId" TEXT,
ADD COLUMN     "majorCourseId" TEXT;

-- DropTable
DROP TABLE "Subject";

-- DropTable
DROP TABLE "_CourseToSubject";

-- CreateTable
CREATE TABLE "CoreSubject" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "year" INTEGER,
    "credit" INTEGER,
    "content" TEXT NOT NULL,

    CONSTRAINT "CoreSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MajorCourse" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "MajorCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapstoneSubject" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "year" INTEGER,
    "credit" INTEGER,
    "content" TEXT NOT NULL,

    CONSTRAINT "CapstoneSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoreSubject_id_key" ON "CoreSubject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CoreSubject_code_key" ON "CoreSubject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "MajorCourse_id_key" ON "MajorCourse"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MajorCourse_code_key" ON "MajorCourse"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CapstoneSubject_id_key" ON "CapstoneSubject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CapstoneSubject_code_key" ON "CapstoneSubject"("code");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_coreSubjectId_fkey" FOREIGN KEY ("coreSubjectId") REFERENCES "CoreSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_majorCourseId_fkey" FOREIGN KEY ("majorCourseId") REFERENCES "MajorCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_capstoneSubjectId_fkey" FOREIGN KEY ("capstoneSubjectId") REFERENCES "CapstoneSubject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
