// This file defines TypeScript types and interfaces used throughout the application.

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  technologies: string[];
  featured?: boolean;
  isShowcase?: boolean;
  demo?: string;
  repository?: string;
  image?: string;
  imageUrl?: string;
  link?: string;
  year?: number;
  status?: string;
  outcomes?: string[];
  challenges?: string[];
  architecture?: string[];
  metrics?: {
    performance?: string;
    scale?: string;
    timeline?: string;
  };
  tags?: string[];
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

export interface InsightArticle {
  // Core fields
  title: string;
  platform: 'Blog' | 'LinkedIn';
  excerpt: string;
  imageUrl: string;
  link: string;

  // Extended fields for ExposureSection compatibility
  id?: string;
  subtitle?: string;
  readTime?: string;
  date?: string;
  category?: string;
  tags?: string[];
  insights?: string[];
}