-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" VARCHAR(20) NOT NULL,
    "startTime" VARCHAR(10) NOT NULL,
    "endTime" VARCHAR(10) NOT NULL,
    "ageGroup" VARCHAR(20) NOT NULL,
    "className" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);
