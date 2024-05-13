-- CreateTable
CREATE TABLE "Overview" (
    "id" TEXT NOT NULL,
    "award" TEXT NOT NULL,
    "vtacCode" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "locations" TEXT NOT NULL,
    "studyFlex" TEXT NOT NULL,
    "prerequisite" TEXT NOT NULL,
    "fees" TEXT NOT NULL,
    "course_id" VARCHAR(255),

    CONSTRAINT "Overview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Overview_id_key" ON "Overview"("id");

-- AddForeignKey
ALTER TABLE "Overview" ADD CONSTRAINT "Overview_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
