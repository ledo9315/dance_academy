import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { from, to } = await request.json();

    await prisma.track.create({
      data: {
        from,
        to,
      },
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error("Error creating track:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
