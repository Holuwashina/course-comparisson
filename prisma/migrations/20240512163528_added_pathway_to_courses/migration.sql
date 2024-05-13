-- CreateTable
CREATE TABLE "Pathway" (
    "id" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "description" TEXT,
    "course_id" VARCHAR(255),

    CONSTRAINT "Pathway_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningOutcome" (
    "id" TEXT NOT NULL,
    "overview" TEXT,
    "course_id" VARCHAR(255),

    CONSTRAINT "LearningOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerOpportunity" (
    "id" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "description" TEXT,
    "course_id" VARCHAR(255),

    CONSTRAINT "CareerOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalRecognition" (
    "id" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "course_id" VARCHAR(255),

    CONSTRAINT "ProfessionalRecognition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pathway_id_key" ON "Pathway"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LearningOutcome_id_key" ON "LearningOutcome"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CareerOpportunity_id_key" ON "CareerOpportunity"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalRecognition_id_key" ON "ProfessionalRecognition"("id");

-- AddForeignKey
ALTER TABLE "Pathway" ADD CONSTRAINT "Pathway_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningOutcome" ADD CONSTRAINT "LearningOutcome_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerOpportunity" ADD CONSTRAINT "CareerOpportunity_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalRecognition" ADD CONSTRAINT "ProfessionalRecognition_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
