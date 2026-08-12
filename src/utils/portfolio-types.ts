import type { IconType } from "react-icons";

export type ImpactStory = {
  company: string;
  kicker: string;
  title: string;
  metrics: Array<{ value: string; label: string }>;
  productUrl?: string;
  productLabel?: string;
  galleryFormat?: "landscape" | "square" | "bookapo";
  images?: Array<{ src: string; alt: string; caption: string }>;
};

export type Technology = {
  name: string;
  icon: IconType;
};

export type SkillLane = {
  title: string;
  technologies: Technology[];
  duration: string;
};

export type Theme = "light" | "dark";
export type SectionId = "top" | "skills" | "resume" | "contact";
