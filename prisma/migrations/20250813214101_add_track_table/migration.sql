-- CreateTable
CREATE TABLE "track" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);
