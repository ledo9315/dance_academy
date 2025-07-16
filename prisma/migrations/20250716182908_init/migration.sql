-- CreateTable
CREATE TABLE "albums" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "coverImage" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
