import { writable, derived, type Writable, type Readable } from 'svelte/store';

// Type definitions
type PerformanceMode = 'low' | 'balanced' | 'high';
type ParallaxIntensity = 'off' | 'subtle' | 'normal' | 'intense';

// Core game flow state
export const currentSection: Writable<string> = writable('hero');
export const progress: Writable<number> = writable(0);
export const depthOfField: Writable<number> = writable(0);
export const focusLocked: Writable<boolean> = writable(false);

// Performance settings
export const performanceMode: Writable<PerformanceMode> = writable('balanced');
export const reducedMotion: Writable<boolean> = writable(false);
export const parallaxIntensity: Writable<ParallaxIntensity> = writable('normal');

// Derived states
export const isFocusActive: Readable<boolean> = derived(
  currentSection,
  ($section) => $section === 'focus'
);

export const isHeroActive: Readable<boolean> = derived(
  currentSection,
  ($section) => $section === 'hero'
);

// Actions
export function setSection(section: string): void {
  currentSection.set(section);
}

export function updateProgress(value: number): void {
  progress.set(value);
}

export function lockFocus(target: any, depth: number): void {
  focusLocked.set(true);
  depthOfField.set(depth);
  console.log('Focus locked:', { target, depth });
}

export function unlockFocus(): void {
  focusLocked.set(false);
}

// Initialize reduced motion from system preference
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.set(mediaQuery.matches);
  
  mediaQuery.addEventListener('change', (e: MediaQueryListEvent) => {
    reducedMotion.set(e.matches);
  });
}