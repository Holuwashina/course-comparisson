-- DropForeignKey
ALTER TABLE "MajorCourse" DROP CONSTRAINT "MajorCourse_course_id_fkey";

-- CreateTable
CREATE TABLE "_CourseToMajorCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToMajorCourse_AB_unique" ON "_CourseToMajorCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToMajorCourse_B_index" ON "_CourseToMajorCourse"("B");

-- AddForeignKey
ALTER TABLE "_CourseToMajorCourse" ADD CONSTRAINT "_CourseToMajorCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToMajorCourse" ADD CONSTRAINT "_CourseToMajorCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "MajorCourse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
