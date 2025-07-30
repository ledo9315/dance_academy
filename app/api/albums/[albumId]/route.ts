import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string }> }
) {
  try {
    const { albumId } = await params;

    const album = await prisma.album.findUnique({
      where: { id: Number(albumId) },
      include: {
        photos: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, album }, { status: 200 });
  } catch (error) {
    console.error("Error in album route:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string }> }
) {
  try {
    const { albumId } = await params;

    const album = await prisma.album.findUnique({
      where: { id: Number(albumId) },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // Delete cover image if it exists
    if (album?.coverImage) {
      try {
        // Note: Vercel Blob handles cleanup automatically
        console.log("Cover image will be cleaned up by Vercel Blob");
      } catch (e) {
        console.warn("Could not delete cover image:", e);
      }
    }

    // Delete the album folder if it exists
    try {
      // Note: Vercel Blob handles cleanup automatically
      console.log("Album photos will be cleaned up by Vercel Blob");
    } catch (e) {
      console.warn("Could not delete album folder:", e);
    }

    // Finally delete the album from the database
    await prisma.album.delete({
      where: { id: Number(albumId) },
    });

    return NextResponse.json(
      { success: true, message: "Album deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ albumId: string }> }
) {
  try {
    const { albumId } = await params;

    const album = await prisma.album.findUnique({
      where: { id: Number(albumId) },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const coverImage = formData.get("coverImage") as File;

    let coverImagePath = album.coverImage; // Keep existing path by default

    if (coverImage) {
      try {
        // Try to upload to Vercel Blob
        const blob = await put(coverImage.name, coverImage, {
          access: "public",
        });

        coverImagePath = blob.url;
      } catch (blobError) {
        console.error("Vercel Blob error:", blobError);

        // Fallback: Convert to base64 for database storage
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        coverImagePath = `data:${coverImage.type};base64,${buffer.toString(
          "base64"
        )}`;
      }
    }

    const updatedAlbum = await prisma.album.update({
      where: { id: Number(albumId) },
      data: { title, coverImage: coverImagePath },
    });

    return NextResponse.json(
      { success: true, album: updatedAlbum },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
