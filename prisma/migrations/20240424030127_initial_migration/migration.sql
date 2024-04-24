-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "institution_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "duration" VARCHAR(255) NOT NULL,
    "overview" JSON NOT NULL,
    "entry_requirement" JSON NOT NULL,
    "learning_outcomes" JSON NOT NULL,
    "career_opportunities" JSON NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "content" JSON NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CourseToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Institution_id_key" ON "Institution"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_id_key" ON "Subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToSubject_AB_unique" ON "_CourseToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToSubject_B_index" ON "_CourseToSubject"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSubject" ADD CONSTRAINT "_CourseToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSubject" ADD CONSTRAINT "_CourseToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
