import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

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

    // Upload to Vercel Blob
    const fileName = `${Date.now()}-${coverImage.name}`;
    const { url } = await put(fileName, coverImage, {
      access: "public",
    });

    const album = await prisma.album.create({
      data: {
        title,
        coverImage: url,
      },
    });

    return NextResponse.json({ success: true, album }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
