/**
 * Modern transition system for 2024-2025 web animations
 * Features: staggered animations, scroll-driven effects, reduced motion support
 */

import { get } from 'svelte/store';
import { reducedMotion } from '$lib/stores/gameFlow';

/**
 * Enhanced intersection observer with modern animation patterns
 * @param {HTMLElement} node 
 * @param {Object} options 
 */
export function modernInView(node, options = {}) {
	const {
		threshold = 0.15,
		rootMargin = '-10% 0px -10% 0px',
		once = true,
		stagger = false,
		staggerDelay = 100,
		animationClass = 'animate-in',
		fallbackDelay = 0
	} = options;

	let hasEntered = false;
	const isReducedMotion = get(reducedMotion);

	// Enhanced entry animation with staggered children
	function triggerEntrance() {
		if (isReducedMotion) {
			// Immediate show for reduced motion
			node.style.opacity = '1';
			node.style.transform = 'none';
			return;
		}

		// Add the main animation class
		node.classList.add(animationClass);
		
		// Handle staggered child animations
		if (stagger) {
			const children = node.querySelectorAll('[data-stagger]');
			children.forEach((child, index) => {
				setTimeout(() => {
					child.classList.add('animate-in-stagger');
				}, index * staggerDelay);
			});
		}

		// Dispatch custom event with enhanced data
		node.dispatchEvent(new CustomEvent('modernenter', {
			detail: { 
				hasStagger: stagger,
				childCount: stagger ? node.querySelectorAll('[data-stagger]').length : 0,
				reducedMotion: isReducedMotion
			}
		}));
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && (!once || !hasEntered)) {
					hasEntered = true;
					// Add a small delay for more natural feel
					setTimeout(triggerEntrance, fallbackDelay);
				}
			});
		},
		{ threshold, rootMargin }
	);

	// Initial setup - set initial state for animation
	if (!isReducedMotion) {
		node.style.opacity = '0';
		node.style.transform = 'translateY(2rem)';
	}

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
		update(newOptions) {
			observer.disconnect();
			Object.assign(options, newOptions);
			observer.observe(node);
		}
	};
}

/**
 * Scroll-driven animation for parallax and scroll effects
 * @param {HTMLElement} node 
 * @param {Object} options 
 */
export function scrollDriven(node, options = {}) {
	const {
		speed = 0.5,
		direction = 'y',
		ease = 'ease-out',
		start = 0,
		end = 1
	} = options;

	const isReducedMotion = get(reducedMotion);
	if (isReducedMotion) return { destroy: () => {} };

	let ticking = false;

	function updateTransform() {
		const rect = node.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		
		// Calculate scroll progress (0 to 1)
		const scrollProgress = Math.max(0, Math.min(1, 
			(windowHeight - rect.top) / (windowHeight + rect.height)
		));

		// Apply easing and constraints
		const constrainedProgress = Math.max(start, Math.min(end, scrollProgress));
		const easedProgress = easeOutCubic(constrainedProgress);
		
		// Calculate transform value
		const transformValue = (easedProgress - 0.5) * speed * 100;

		// Apply transform based on direction
		if (direction === 'y') {
			node.style.transform = `translateY(${transformValue}px)`;
		} else if (direction === 'x') {
			node.style.transform = `translateX(${transformValue}px)`;
		} else if (direction === 'scale') {
			const scaleValue = 1 + (easedProgress * speed * 0.1);
			node.style.transform = `scale(${scaleValue})`;
		}

		ticking = false;
	}

	function handleScroll() {
		if (!ticking) {
			requestAnimationFrame(updateTransform);
			ticking = true;
		}
	}

	// Cubic easing function
	function easeOutCubic(t) {
		return 1 - Math.pow(1 - t, 3);
	}

	window.addEventListener('scroll', handleScroll, { passive: true });
	updateTransform(); // Initial call

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
		}
	};
}

/**
 * Enhanced hover interactions with modern micro-animations
 * @param {HTMLElement} node 
 * @param {Object} options 
 */
export function modernHover(node, options = {}) {
	const {
		scale = 1.02,
		translateY = -2,
		duration = 200,
		easing = 'cubic-bezier(0.4, 0, 0.2, 1)'
	} = options;

	const isReducedMotion = get(reducedMotion);
	if (isReducedMotion) return { destroy: () => {} };

	// Set up transition
	node.style.transition = `transform ${duration}ms ${easing}`;
	node.style.willChange = 'transform';

	function handleMouseEnter() {
		node.style.transform = `scale(${scale}) translateY(${translateY}px)`;
	}

	function handleMouseLeave() {
		node.style.transform = 'scale(1) translateY(0)';
	}

	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			node.style.transition = '';
			node.style.willChange = '';
		}
	};
}

/**
 * Text reveal animation with typewriter or fade-in effects
 * @param {HTMLElement} node 
 * @param {Object} options 
 */
export function textReveal(node, options = {}) {
	const {
		type = 'fade', // 'fade', 'typewriter', 'slide'
		duration = 800,
		delay = 0,
		stagger = 50
	} = options;

	const isReducedMotion = get(reducedMotion);
	if (isReducedMotion) {
		// Immediate show for reduced motion
		setTimeout(() => {
			node.style.opacity = '1';
		}, delay);
		return { destroy: () => {} };
	}

	const text = node.textContent;
	
	if (type === 'typewriter') {
		node.textContent = '';
		node.style.opacity = '1';
		
		setTimeout(() => {
			let i = 0;
			const timer = setInterval(() => {
				if (i < text.length) {
					node.textContent += text.charAt(i);
					i++;
				} else {
					clearInterval(timer);
				}
			}, duration / text.length);
		}, delay);
	} else if (type === 'slide') {
		node.style.opacity = '0';
		node.style.transform = 'translateY(1rem)';
		node.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
		
		setTimeout(() => {
			node.style.opacity = '1';
			node.style.transform = 'translateY(0)';
		}, delay);
	} else {
		// Default fade
		node.style.opacity = '0';
		node.style.transition = `opacity ${duration}ms ease-out`;
		
		setTimeout(() => {
			node.style.opacity = '1';
		}, delay);
	}

	return {
		destroy: () => {}
	};
}