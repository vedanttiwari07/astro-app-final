import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return Response.json({ services });
  } catch (error) {
    console.error("Failed to fetch services", error);

    return Response.json(
      {
        error:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}
