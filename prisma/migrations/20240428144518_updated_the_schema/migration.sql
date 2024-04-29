-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_capstoneSubjectId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_coreSubjectId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_majorCourseId_fkey";

-- CreateTable
CREATE TABLE "_CourseToMajorCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoreSubjectToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CapstoneSubjectToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToMajorCourse_AB_unique" ON "_CourseToMajorCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToMajorCourse_B_index" ON "_CourseToMajorCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoreSubjectToCourse_AB_unique" ON "_CoreSubjectToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CoreSubjectToCourse_B_index" ON "_CoreSubjectToCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CapstoneSubjectToCourse_AB_unique" ON "_CapstoneSubjectToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CapstoneSubjectToCourse_B_index" ON "_CapstoneSubjectToCourse"("B");

-- AddForeignKey
ALTER TABLE "_CourseToMajorCourse" ADD CONSTRAINT "_CourseToMajorCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToMajorCourse" ADD CONSTRAINT "_CourseToMajorCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "MajorCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoreSubjectToCourse" ADD CONSTRAINT "_CoreSubjectToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "CoreSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoreSubjectToCourse" ADD CONSTRAINT "_CoreSubjectToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CapstoneSubjectToCourse" ADD CONSTRAINT "_CapstoneSubjectToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "CapstoneSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CapstoneSubjectToCourse" ADD CONSTRAINT "_CapstoneSubjectToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
