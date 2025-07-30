import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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
      // Upload file to Vercel Blob
      const blob = await put(photo.name, photo, {
        access: "public",
      });

      const image = await prisma.photo.create({
        data: {
          filename: photo.name,
          originalName: photo.name,
          path: blob.url,
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
