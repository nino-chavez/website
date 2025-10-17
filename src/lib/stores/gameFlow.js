import { writable, derived } from 'svelte/store';

// Core game flow state
export const currentSection = writable('hero');
export const progress = writable(0);
export const depthOfField = writable(0);
export const focusLocked = writable(false);

// Performance settings
export const performanceMode = writable('balanced'); // 'low' | 'balanced' | 'high'
export const reducedMotion = writable(false);
export const parallaxIntensity = writable('normal'); // 'off' | 'subtle' | 'normal' | 'intense'

// Derived states
export const isFocusActive = derived(currentSection, $section => $section === 'focus');
export const isHeroActive = derived(currentSection, $section => $section === 'hero');

// Actions
export function setSection(section) {
	currentSection.set(section);
}

export function updateProgress(value) {
	progress.set(value);
}

export function lockFocus(target, depth) {
	focusLocked.set(true);
	depthOfField.set(depth);
	console.log('Focus locked:', { target, depth });
}

export function unlockFocus() {
	focusLocked.set(false);
}

// Initialize reduced motion from system preference
if (typeof window !== 'undefined') {
	const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
	reducedMotion.set(mediaQuery.matches);
	
	mediaQuery.addEventListener('change', (e) => {
		reducedMotion.set(e.matches);
	});
}
