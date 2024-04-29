/*
  Warnings:

  - You are about to drop the `_CapstoneSubjectToCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CoreSubjectToCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToMajorCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CapstoneSubjectToCourse" DROP CONSTRAINT "_CapstoneSubjectToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CapstoneSubjectToCourse" DROP CONSTRAINT "_CapstoneSubjectToCourse_B_fkey";

-- DropForeignKey
ALTER TABLE "_CoreSubjectToCourse" DROP CONSTRAINT "_CoreSubjectToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoreSubjectToCourse" DROP CONSTRAINT "_CoreSubjectToCourse_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToMajorCourse" DROP CONSTRAINT "_CourseToMajorCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToMajorCourse" DROP CONSTRAINT "_CourseToMajorCourse_B_fkey";

-- AlterTable
ALTER TABLE "CapstoneSubject" ADD COLUMN     "course_id" VARCHAR(255);

-- AlterTable
ALTER TABLE "CoreSubject" ADD COLUMN     "course_id" VARCHAR(255);

-- AlterTable
ALTER TABLE "MajorCourse" ADD COLUMN     "course_id" VARCHAR(255);

-- DropTable
DROP TABLE "_CapstoneSubjectToCourse";

-- DropTable
DROP TABLE "_CoreSubjectToCourse";

-- DropTable
DROP TABLE "_CourseToMajorCourse";

-- AddForeignKey
ALTER TABLE "CoreSubject" ADD CONSTRAINT "CoreSubject_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MajorCourse" ADD CONSTRAINT "MajorCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapstoneSubject" ADD CONSTRAINT "CapstoneSubject_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
