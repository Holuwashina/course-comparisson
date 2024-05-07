-- CreateTable
CREATE TABLE "Ranking" (
    "id" TEXT NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,
    "cost" INTEGER NOT NULL,
    "student_reviews" DOUBLE PRECISION NOT NULL,
    "employment_outcomes" INTEGER NOT NULL,
    "course_duration" INTEGER NOT NULL,
    "salary_range" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_id_key" ON "Ranking"("id");

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
