import type { Metadata } from "next";
import { Clock, Users } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { listActiveSchedule } from "@/lib/queries/schedule";
import { WEEKDAYS, formatTimeLabel, formatWeekday } from "@/lib/schedule";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule – Dance Classes for Kids & Teens 3–18",
  description:
    "Weekly class schedule for kids and teens (ages 3–18) at Angela's Dance Academy in Naples, FL. Find ballet, jazz, hip hop, and more.",
  alternates: { canonical: "/schedule" },
  openGraph: {
    title: "Class Schedule – Angela's Dance Academy Naples, FL | Ages 3–18",
    description: "View our weekly schedule for dance classes tailored to kids and teens ages 3–18.",
    images: [
      {
        url: "/6.jpg",
        width: 1200,
        height: 630,
        alt: "Dance class schedule – Angela's Dance Academy",
      },
    ],
  },
};

// The schedule changes rarely; serve it from the cache and refresh hourly.
export const revalidate = 3600;

export default async function SchedulePage() {
  const schedule = await listActiveSchedule();

  const days = WEEKDAYS.map((day) => ({
    day,
    entries: schedule.filter((entry) => entry.dayOfWeek === day),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <main className="container flex flex-1 flex-col items-center gap-y-6 px-4 pt-6 sm:px-6 sm:pt-10">
      <PageHero
        title="Schedule"
        imageSrc="/6.jpg"
        imageAlt="Dancers during class at Angela's Dance Academy"
        className="mb-24"
      />

      <section className="mb-12 flex w-full max-w-[800px] flex-col items-center sm:mb-16">
        <SectionHeading
          title="Class Schedule"
          className="mb-12 sm:mb-16"
          headingClassName="font-light"
        >
          <p className="max-w-2xl font-sans text-sm text-text sm:text-base">
            Join us for our weekly dance classes designed for all ages and skill levels. Our
            professional instructors create a supportive environment where every dancer can thrive.
          </p>
        </SectionHeading>

        <div className="w-full space-y-8">
          {days.map(({ day, entries }) => (
            <section key={day} className="border border-border">
              <h3 className="bg-accent-bg border-b border-border px-6 py-4 text-lg font-light text-accent sm:text-xl">
                {formatWeekday(day)}
              </h3>

              <ul className="divide-y divide-border">
                {entries.map((entry) => (
                  <li key={entry.id} className="px-6 py-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <p className="flex items-center gap-3">
                        <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <time className="font-sans text-sm sm:text-base">
                          {formatTimeLabel(entry.startsAt)} - {formatTimeLabel(entry.endsAt)}
                        </time>
                      </p>

                      <p className="flex items-center gap-3">
                        <Users className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span className="font-sans text-sm text-text sm:text-base">
                          {entry.ageGroup}
                        </span>
                      </p>
                    </div>

                    {entry.className ? (
                      <p className="mt-2 ml-7 font-sans text-sm text-text">{entry.className}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="mt-12 text-center sm:mt-16">
          <div className="bg-accent-bg mx-auto max-w-md border border-border px-6 py-4">
            <h3 className="mb-2 text-lg font-light">Registration Information</h3>
            <p className="font-sans text-sm text-text">
              To register for classes or for more information, please contact us at{" "}
              <a href="mailto:info@angelasdanceacademy.com" className="text-accent underline">
                info@angelasdanceacademy.com
              </a>{" "}
              or call us at{" "}
              <a href={`tel:${site.phone.e164}`} className="text-accent underline">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
