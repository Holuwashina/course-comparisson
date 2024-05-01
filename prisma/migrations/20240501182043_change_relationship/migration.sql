-- DropForeignKey
ALTER TABLE "CoreSubject" DROP CONSTRAINT "CoreSubject_course_id_fkey";

-- CreateTable
CREATE TABLE "_CoreSubjectToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoreSubjectToCourse_AB_unique" ON "_CoreSubjectToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_CoreSubjectToCourse_B_index" ON "_CoreSubjectToCourse"("B");

-- AddForeignKey
ALTER TABLE "_CoreSubjectToCourse" ADD CONSTRAINT "_CoreSubjectToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "CoreSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoreSubjectToCourse" ADD CONSTRAINT "_CoreSubjectToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
