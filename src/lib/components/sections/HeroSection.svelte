
<script>
import { onMount } from 'svelte';
import { fly, fade } from 'svelte/transition';
import { currentSection } from '$lib/stores/gameFlow';
import { inView } from '$lib/actions/inView';
import { base } from '$app/paths';

	export let className = '';

	let mounted = false;
	let mousePosition = { x: 50, y: 50 };
	let sectionEl;

	function handleMouseMove(e) {
		if (!sectionEl) return;
		const rect = sectionEl.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		mousePosition = { x, y };
	}

	function scrollToSection(sectionId) {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onMount(() => {
		mounted = true;
	});

	function onSectionEnter() {
		currentSection.set('hero');
	}
</script>

<section
	bind:this={sectionEl}
	id="hero"
	data-section="hero"
	data-testid="hero-section"
	class={`relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900 ${className}`}
	on:mousemove={handleMouseMove}
	use:inView={{ threshold: 0.3, once: true }}
	on:enter={onSectionEnter}
	aria-label="Hero section - Introduction"
>
	<!-- Responsive hero background image (mobile first) with explicit dimensions -->
	<picture class="absolute inset-0 z-0">
		<source srcset={`${base}/images/hero.webp`} media="(min-width: 640px)" type="image/webp" />
		<source srcset={`${base}/images/hero-mobile.webp`} media="(max-width: 639px)" type="image/webp" />
		<img
			src={`${base}/images/hero.jpg`}
			alt=""
			aria-hidden="true"
			width="1920"
			height="1080"
			class="w-full h-full object-cover opacity-60"
			style="aspect-ratio: 16/9;"
			decoding="async"
			loading="eager"
			fetchpriority="high"
		/>
	</picture>
	<!-- Animated brand glow layered over image -->
	<div
		class="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out z-10"
		style={`background: radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.20), transparent 55%)`}
	/>

	<!-- Subtle grid overlay for texture -->
	<div class="absolute inset-0 pointer-events-none opacity-[0.02] z-10" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;" />

	<!-- Content -->
	<div class="relative z-20 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 text-center">
		{#if mounted}
			<div
				in:fly={{ y: 30, duration: 800, delay: 100 }}
				class="mb-6"
			>
				<span class="inline-block px-4 py-2 bg-athletic-brand-violet/10 border border-athletic-brand-violet/20 rounded-full text-athletic-brand-violet text-sm font-semibold uppercase tracking-wider">
					Enterprise Architect
				</span>
			</div>

			<h1
				in:fly={{ y: 30, duration: 800, delay: 200 }}
				class="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
			>
				Nino Chavez
			</h1>

			<p
				in:fly={{ y: 30, duration: 800, delay: 300 }}
				class="text-xl md:text-2xl lg:text-3xl text-white mb-4 font-light"
			>
				Strategic Advisor & Technical Leader
			</p>

			<p
				in:fly={{ y: 30, duration: 800, delay: 400 }}
				class="text-base md:text-lg text-white max-w-3xl mx-auto mb-12 leading-relaxed"
			>
				Building commerce infrastructure that holds up when it matters. 25 years designing systems that process billions in revenue, serve millions of users, and adapt to whatever comes next.
			</p>

			<!-- CTA Buttons -->
			<div
				in:fade={{ duration: 800, delay: 500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center items-center"
			>
				<button
					on:click={() => scrollToSection('focus')}
					class="group px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
				>
					<span class="flex items-center gap-3">
						<span>View My Work</span>
						<svg
							class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
				</button>

				<button
					on:click={() => scrollToSection('portfolio')}
					class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-lg transition-all duration-300"
				>
					View Portfolio
				</button>
			</div>

					<!-- Scroll indicator: relative to section bottom -->
					<div in:fade={{ duration: 800, delay: 800 }} class="pointer-events-none w-full flex justify-center mt-12">
						<button
							on:click={() => scrollToSection('focus')}
							class="pointer-events-auto flex flex-col items-center gap-1 rounded-md px-3 py-2 text-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
							aria-label="Scroll to explore"
							type="button"
						>
							<span class="text-[11px] uppercase tracking-wider">Scroll to explore</span>
							<svg class="w-5 h-5 motion-safe:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
							</svg>
						</button>
					</div>
		{/if}
	</div>

	<!-- Floating elements for visual interest -->
	<div class="absolute top-20 left-10 w-2 h-2 bg-violet-400/30 rounded-full animate-pulse" />
	<div class="absolute top-40 right-20 w-3 h-3 bg-cyan-400/20 rounded-full animate-pulse delay-500" />
	<div class="absolute bottom-32 left-1/4 w-2 h-2 bg-green-400/20 rounded-full animate-pulse delay-1000" />
</section>

<style>
	.delay-500 {
		animation-delay: 500ms;
	}
	.delay-1000 {
		animation-delay: 1000ms;
	}
</style>
