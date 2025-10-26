<script>
	import { onMount } from 'svelte';
	import { currentSection } from '$lib/stores/gameFlow';

	let scrollProgress = 0;
	let isVisible = true;
	let lastScrollY = 0;

	const sections = [
		{ id: 'hero', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
		{ id: 'focus', label: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
		{ id: 'exposure', label: 'Essays', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
		{ id: 'portfolio', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
	];

	function scrollToSection(sectionId) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onMount(() => {
		const updateScroll = () => {
			const winScroll = window.scrollY;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const scrolled = (winScroll / height) * 100;
			scrollProgress = scrolled;

			// Auto-hide on scroll down, show on scroll up
			if (winScroll > lastScrollY && winScroll > 100) {
				isVisible = false;
			} else {
				isVisible = true;
			}
			lastScrollY = winScroll;
		};

		window.addEventListener('scroll', updateScroll, { passive: true });
		updateScroll();

		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	});
</script>

<!-- Mobile-only sticky navigation (hidden on md and up) -->
<nav
	class="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300"
	class:translate-y-full={!isVisible}
	aria-label="Mobile navigation"
>
	<!-- Progress bar -->
	<div class="h-1 bg-neutral-800">
		<div
			class="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-150"
			style="width: {scrollProgress}%"
		></div>
	</div>

	<!-- Navigation buttons -->
	<div class="bg-neutral-900/95 backdrop-blur-lg border-t border-white/10 px-2 py-2 safe-area-bottom">
		<div class="flex items-center justify-around max-w-md mx-auto">
			{#each sections as section}
				<button
					on:click={() => scrollToSection(section.id)}
					class="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 {$currentSection === section.id ? 'text-violet-400 bg-violet-500/10' : 'text-white/60 hover:text-white/90 hover:bg-white/5'}"
					aria-label="Navigate to {section.label}"
					aria-current={$currentSection === section.id ? 'true' : 'false'}
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d={section.icon} />
					</svg>
					<span class="text-xs font-medium">{section.label}</span>
				</button>
			{/each}
		</div>
	</div>
</nav>

<style>
	/* Safe area for devices with notches/home indicators */
	.safe-area-bottom {
		padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
	}
</style>
