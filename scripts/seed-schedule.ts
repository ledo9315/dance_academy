import prisma from "../lib/prisma";

const defaultSchedule = [
  {
    dayOfWeek: "Monday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
  {
    dayOfWeek: "Tuesday",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    ageGroup: "Ages 4-7",
  },
  {
    dayOfWeek: "Tuesday",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    ageGroup: "Ages 8-11",
  },
  {
    dayOfWeek: "Wednesday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
  {
    dayOfWeek: "Thursday",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    ageGroup: "Ages 4-7",
  },
  {
    dayOfWeek: "Thursday",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    ageGroup: "Ages 8-11",
  },
  {
    dayOfWeek: "Friday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
];

async function seedSchedule() {
  try {
    console.log("Seeding schedule data...");

    // Clear existing schedule data
    await prisma.schedule.deleteMany();

    // Insert default schedule
    for (const item of defaultSchedule) {
      await prisma.schedule.create({
        data: item,
      });
    }

    console.log("Schedule data seeded successfully!");
  } catch (error) {
    console.error("Error seeding schedule data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSchedule();
