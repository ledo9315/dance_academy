import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

    // Upload file to Vercel Blob
    const blob = await put(coverImage.name, coverImage, {
      access: "public",
    });

    const album = await prisma.album.create({
      data: {
        title,
        coverImage: blob.url,
      },
    });

    return NextResponse.json({ success: true, album }, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 }
    );
  }
}
