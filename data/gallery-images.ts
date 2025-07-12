interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const GALERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "/photos/1.jpg",
    alt: "Dance Class 2018",
    title: "Competition 2018",
    category: "Competition",
  },
  {
    id: 2,
    src: "/photos/2.jpg",
    alt: "Dance Class 2018",
    title: "Competition 2017",
    category: "Competition",
  },
  {
    id: 3,
    src: "/photos/3.jpg",
    alt: "Dance Class 2018",
    title: "Dance Class 2015",
    category: "Competition",
  },
  {
    id: 4,
    src: "/photos/4.jpg",
    alt: "Dance Class 2018",
    title: "Studio Moments 2018",
    category: "Competition",
  },
  {
    id: 5,
    src: "/photos/5.jpg",
    alt: "Dance Class 2018",
    title: "Annual Recital 2019",
    category: "Competition",
  },
  {
    id: 6,
    src: "/photos/6.jpg",
    alt: "Dance Class 2018",
    title: "Special Event 2020",
    category: "Competition",
  },
];
