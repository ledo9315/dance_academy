export type Program = {
  id: string;
  ageRange: string;
  title: string;
  description: string;
  skills: string[];
  imageSrc: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "pre-dance",
    ageRange: "AGES 3-5",
    title: "Pre-Dance Program",
    description:
      "Our foundational program helps preschoolers develop a love for dance through fun, age-appropriate activities. Students learn essential classroom skills while exploring movement, rhythm, and creativity in a nurturing environment.",
    skills: [
      "Basic movement skills",
      "Listening and following directions",
      "Social interaction",
      "Creative expression",
    ],
    imageSrc: "/item1.jpg",
  },
  {
    id: "fundamentals",
    ageRange: "AGES 6-18",
    title: "Fundamentals Program",
    description:
      "New students learn the fundamentals of Jazz, Hip Hop, Contemporary, and Ballet through structured, progressive curricula. Our age-appropriate programs focus on establishing a strong technical foundation while keeping classes engaging and fun.",
    skills: [
      "Multi-style training",
      "Progressive skill building",
      "Age-appropriate choreography",
      "Performance opportunities",
    ],
    imageSrc: "/item2.jpg",
  },
  {
    id: "competition-team",
    ageRange: "Competitive",
    title: "Competition Team",
    description:
      "Our elite program for dedicated dancers progressing from late beginner through advanced levels. Students develop exceptional technique and artistry while competing at regional and national competitions, building discipline and performance excellence.",
    skills: [
      "Advanced technique training",
      "Competition travel opportunities",
      "Solo and group performances",
      "Teamwork and collaboration",
    ],
    imageSrc: "/classes-3.jpg",
  },
  {
    id: "learning-in-movement",
    ageRange: "All Ages",
    title: "Learning in Movement",
    description:
      "Our innovative approach combines dance with educational development. Through movement, students enhance teamwork, focus, and improvisational skills while developing new perceptions that support learning and creative thinking.",
    skills: [
      "Educational integration",
      "Teamwork development",
      "Improvisational skills",
      "Creative thinking",
    ],
    imageSrc: "/item4.jpg",
  },
];
