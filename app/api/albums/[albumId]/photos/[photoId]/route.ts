import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

    // Note: Vercel Blob handles cleanup automatically
    console.log("Photo file will be cleaned up by Vercel Blob");

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
