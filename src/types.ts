// This file defines TypeScript types and interfaces used throughout the application.

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl: string;
}

export interface HeaderProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export interface FooterProps {
  copyright: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}