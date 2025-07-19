import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { rm, unlink } from "fs/promises";
import { writeFile, mkdir } from "fs/promises";
import path, { join } from "path";

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
      include: {
        photos: true,
      },
    });

    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    // First delete all photos from the database
    if (album.photos.length > 0) {
      await prisma.photo.deleteMany({
        where: { albumId: Number(albumId) },
      });
    }

    // Delete cover image if it exists
    if (album?.coverImage) {
      try {
        const imagePath = path.join(process.cwd(), "public", album.coverImage);
        await unlink(imagePath);
      } catch (e) {
        console.warn("Could not delete cover image:", e);
      }
    }

    // Delete the album folder if it exists
    try {
      const albumFolder = path.join(process.cwd(), "public", "photos", albumId);
      await rm(albumFolder, { recursive: true, force: true });
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
        // Delete old image if it exists
        if (album.coverImage) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            album.coverImage
          );
          await unlink(oldImagePath);
        }

        // Save new file locally
        const bytes = await coverImage.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${coverImage.name}`;
        coverImagePath = `/photos/${fileName}`;

        // Ensure photos directory exists
        const photosDir = join(process.cwd(), "public", "photos");
        await mkdir(photosDir, { recursive: true });

        // Write file to public directory
        await writeFile(join(photosDir, fileName), buffer);
      } catch (e) {
        console.warn("Could not process cover image:", e);
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
