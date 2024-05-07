import prisma from "../../../../prisma/prisma";

export async function GET() {
  try {
    const ranking = await prisma.ranking.findMany({
      include: {
        course: true
      },
    });

    return Response.json(ranking);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" });
  }
}
