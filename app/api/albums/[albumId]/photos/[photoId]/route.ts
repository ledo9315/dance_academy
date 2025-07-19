import prisma from "@/lib/prisma";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string; photoId: string }> }
) {
  try {
    const { photoId, albumId } = await params;

    const photo = await prisma.photo.findUnique({
      where: { id: Number(photoId), albumId: Number(albumId) },
    });

    if (!photo)
      return NextResponse.json(
        { success: false, message: "Photo not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, photo }, { status: 200 });
  } catch (error) {
    console.error("Error fetching photo:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching photo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string; photoId: string }> }
) {
  try {
    const { albumId, photoId } = await params;

    const photo = await prisma.photo.delete({
      where: { id: Number(photoId), albumId: Number(albumId) },
    });

    if (!photo) {
      return NextResponse.json(
        { success: false, message: "Photo not found" },
        { status: 404 }
      );
    }

    const photoPath = join(process.cwd(), "public", photo.path);
    await unlink(photoPath);

    return NextResponse.json(
      { success: true, message: "Photo deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting photo" },
      { status: 500 }
    );
  }
}
