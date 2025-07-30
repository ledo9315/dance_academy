"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Hero } from "@/components/Hero";

interface ScheduleItem {
  id: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  className?: string;
}

const defaultSchedule: ScheduleItem[] = [
  {
    id: 1,
    dayOfWeek: "Monday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
  {
    id: 2,
    dayOfWeek: "Tuesday",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    ageGroup: "Ages 4-7",
  },
  {
    id: 3,
    dayOfWeek: "Tuesday",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    ageGroup: "Ages 8-11",
  },
  {
    id: 4,
    dayOfWeek: "Wednesday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
  {
    id: 5,
    dayOfWeek: "Thursday",
    startTime: "5:00 PM",
    endTime: "6:00 PM",
    ageGroup: "Ages 4-7",
  },
  {
    id: 6,
    dayOfWeek: "Thursday",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    ageGroup: "Ages 8-11",
  },
  {
    id: 7,
    dayOfWeek: "Friday",
    startTime: "5:00 PM",
    endTime: "7:00 PM",
    ageGroup: "Ages 8-12",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(defaultSchedule);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setSchedule(data);
          }
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Group schedule items by day
  const scheduleByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = schedule.filter((item) => item.dayOfWeek === day);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  if (isLoading) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center gap-y-6 pt-6 sm:pt-10 px-4 sm:px-6">
        <div className="w-full max-w-[800px] flex flex-col items-center">
          <p className="text-text font-sans">Loading schedule...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container flex-1 flex flex-col items-center justify-center gap-y-6 pt-6 sm:pt-10 px-4 sm:px-6">
      <Hero imgSrc="/6.jpg" title="Schedule" className="mb-24 px-4 md:px-0" />
      <section className="w-full max-w-[800px] flex flex-col items-center mb-12 sm:mb-16">
        <header className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6">
            Class Schedule
          </h2>
          <div className="border border-accent w-15 mx-auto mb-6 sm:mb-8" />
          <p className="text-text font-sans text-sm sm:text-base max-w-2xl">
            Join us for our weekly dance classes designed for all ages and skill
            levels. Our professional instructors create a supportive environment
            where every dancer can thrive.
          </p>
        </header>

        <div className="w-full space-y-8">
          {daysOfWeek.map((day) => {
            const daySchedule = scheduleByDay[day];
            if (daySchedule.length === 0) return null;

            return (
              <div key={day} className="border border-border">
                <div className="bg-accent-bg px-6 py-4 border-b border-border">
                  <h2 className="text-lg sm:text-xl font-light text-accent">
                    {day}
                  </h2>
                </div>

                <div className="divide-y divide-border">
                  {daySchedule.map((item) => (
                    <div key={item.id} className="px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-sans text-sm sm:text-base">
                            {item.startTime} - {item.endTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-sans text-sm sm:text-base text-text">
                            {item.ageGroup}
                          </span>
                        </div>
                      </div>

                      {item.className && (
                        <div className="mt-2 ml-7 sm:ml-7">
                          <span className="font-sans text-sm text-text">
                            {item.className}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-accent-bg px-6 py-4 border border-border max-w-md mx-auto">
            <h3 className="text-lg font-light mb-2">
              Registration Information
            </h3>
            <p className="font-sans text-sm text-text">
              To register for classes or for more information, please contact us
              at{" "}
              <a
                href="mailto:info@angelasdanceacademy.com"
                className="text-accent underline"
              >
                info@angelasdanceacademy.com
              </a>{" "}
              or call us at (239) 555-0123.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
