import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const allAlbums = await prisma.album.findMany();

    return NextResponse.json({ sucess: true, allAlbums }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const coverImage = formData.get("coverImage") as File;

    if (!title || !coverImage) {
      return NextResponse.json(
        { error: "Title and coverImage are required" },
        { status: 400 }
      );
    }

    // Save file locally
    const bytes = await coverImage.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${coverImage.name}`;
    const filePath = `/photos/album_covers/${fileName}`;

    // Ensure photos directory exists
    const photosDir = join(process.cwd(), "public", "photos", "album_covers");
    await mkdir(photosDir, { recursive: true });

    // Write file to public directory
    await writeFile(join(photosDir, fileName), buffer);

    const album = await prisma.album.create({
      data: {
        title,
        coverImage: filePath,
      },
    });

    return NextResponse.json({ success: true, album }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
