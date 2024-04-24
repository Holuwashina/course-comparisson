export async function GET(request, { params }) {
  const id = params.id;

  try {
    const course = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        institution: true,
        subjects: true,
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return Response.json(course);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
