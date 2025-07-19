import prisma from "@/lib/prisma";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string }> }
) {
  try {
    const { albumId } = await params;

    const photos = await prisma.photo.findMany({
      where: { albumId: Number(albumId) },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({ success: true, photos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photos", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string }> }
) {
  try {
    const formData = await request.formData();
    const photos = formData.getAll("photos") as File[];
    const { albumId } = await params;

    console.log("albumId:", albumId);

    for (const photo of photos) {
      const bytes = await photo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${photo.name}`;
      const filePath = `/photos/${albumId}/${fileName}`;

      const photosDir = join(process.cwd(), "public", "photos", `${albumId}`);
      await mkdir(photosDir, { recursive: true });

      await writeFile(join(photosDir, fileName), buffer);

      const image = await prisma.photo.create({
        data: {
          filename: fileName,
          originalName: photo.name,
          path: filePath,
          size: photo.size,
          mimeType: photo.type,
          albumId: Number(albumId),
        },
      });
    }

    return NextResponse.json(
      { success: true, message: "Photos uploaded" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading photos:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error uploading photos",
      },
      { status: 500 }
    );
  }
}
