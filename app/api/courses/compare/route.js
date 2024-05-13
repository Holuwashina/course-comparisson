import prisma from "../../../../prisma/prisma";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const c1 = searchParams.get("c1");
  const c2 = searchParams.get("c2");

  try {
    const courses = await prisma.course.findMany({
      include: {
        institution: true,
      },
    });

    const course1 = await prisma.course.findUnique({
      where: {
        id: c1,
      },
      include: {
        institution: true,
        CoreSubject: true,
        MajorCourse: true,
        Overview: {
          select: {
            award: true,
            vtacCode: true,
            startDate: true,
            duration: true,
            locations: true,
            studyFlex: true,
            prerequisite: true,
            fees: true,
          }
        },
        Pathway: {
          select: {
            overview: true,
            description: true,
          },
          orderBy: {
            overview: "asc",
          },
        },
        LearningOutcome: true,
        CareerOpportunity: true,
        ProfessionalRecognition: true,
        CourseDetail: {
          select: {
            index: true,
            label: true,
            value: true,
            content: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    const course2 = await prisma.course.findUnique({
      where: {
        id: c2,
      },
      include: {
        institution: true,
        CoreSubject: true,
        MajorCourse: true,
        Overview: {
          select: {
            award: true,
            vtacCode: true,
            startDate: true,
            duration: true,
            locations: true,
            studyFlex: true,
            prerequisite: true,
            fees: true,
          }
        },
        Pathway: {
          select: {
            overview: true,
            description: true,
          },
          orderBy: {
            overview: "asc",
          },
        },
        LearningOutcome: true,
        CareerOpportunity: true,
        ProfessionalRecognition: true,
        CourseDetail: {
          select: {
            index: true,
            label: true,
            value: true,
            content: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    return Response.json({
      courses,
      comparison: [course1, course2],
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
