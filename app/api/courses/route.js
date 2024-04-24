import prisma from "../../../prisma/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        institution: true,
        subjects: true,
      },
    });

    return Response.json(courses);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
