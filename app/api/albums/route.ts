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

    let coverImageUrl: string;

    try {
      // Try to upload to Vercel Blob
      const blob = await put(coverImage.name, coverImage, {
        access: "public",
      });
      coverImageUrl = blob.url;
    } catch (blobError) {
      console.error("Vercel Blob error:", blobError);

      // Fallback: Convert to base64 for database storage
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      coverImageUrl = `data:${coverImage.type};base64,${buffer.toString(
        "base64"
      )}`;
    }

    const album = await prisma.album.create({
      data: {
        title,
        coverImage: coverImageUrl,
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
