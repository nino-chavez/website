
<script>
import { onMount } from 'svelte';
import { fly, fade } from 'svelte/transition';
import { currentSection } from '$lib/stores/gameFlow';
import { inView } from '$lib/actions/inView';
import { base } from '$app/paths';
import ThesisModal from '$lib/components/ui/ThesisModal.svelte';

	export let className = '';

	let mounted = false;
	let isThesisModalOpen = false;

	onMount(() => {
		mounted = true;
	});

	function onSectionEnter() {
		currentSection.set('hero');
	}
</script>

<section
	id="hero"
	data-section="hero"
	data-testid="hero-section"
	class={`relative pt-20 md:pt-24 ${className}`}
	use:inView={{ threshold: 0.3, once: true }}
	on:enter={onSectionEnter}
	aria-label="Hero section - Introduction"
>
	<div class="flex flex-col lg:flex-row h-auto lg:h-[700px]">
		<!-- Left Gradient Sidebar -->
		<div class="lg:w-5/12 relative bg-gradient-to-br from-violet-900 via-purple-900 to-neutral-900 flex items-center justify-center p-8 lg:p-12">
			<div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.3),transparent_70%)]"></div>

				{#if mounted}
					<div class="relative z-10 max-w-lg">

					<h1
						in:fly={{ y: 30, duration: 800, delay: 200 }}
						class="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
					>
						Nino<br/>Chavez
					</h1>

					<p
						in:fly={{ y: 30, duration: 800, delay: 300 }}
						class="text-2xl lg:text-3xl text-white mb-6 font-light leading-tight"
					>
						I see in systems.<br/>I capture in moments.
					</p>

					<div
						in:fly={{ y: 30, duration: 800, delay: 400 }}
						class="space-y-6"
					>
						<p class="text-base text-white/90 leading-relaxed">
							You don't hire a title; you hire a perspective. Mine is forged in enterprise architecture, action photography, coaching, and engineering.
						</p>
						<p class="text-sm text-white/70 leading-relaxed">
							Each discipline reveals patterns the others couldn't see. AI has let me move at the speed of learning—and everything I learn compounds.
						</p>

						<!-- Primary CTAs: Blog, Photography, CV -->
						<div class="pt-4 space-y-3">
							<div class="flex flex-col sm:flex-row sm:items-center sm:gap-3">
								<a
									href="https://blog.ninochavez.co"
									target="_blank"
									rel="noopener noreferrer"
									class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-base font-semibold rounded-lg shadow-lg transition-all duration-200"
									aria-label="Open blog — opens in new tab"
								>
									<!-- blog icon -->
									<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5V6a2 2 0 012-2h12a2 2 0 012 2v13.5l-7-3-7 3z"/></svg>
									<span>Read the Blog</span>
								</a>
								<a
									href="https://photography.ninochavez.co"
									target="_blank"
									rel="noopener noreferrer"
									class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium rounded-lg transition-all duration-200"
									aria-label="Open photography portfolio — opens in new tab"
								>
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h4l2-3h6l2 3h4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
									<span>Photography</span>
								</a>
							</div>
							<div>
								<a
									href="/cv"
									class="inline-block mt-2 text-sm text-white/80 hover:text-white underline"
									aria-label="View professional credentials (CV)"
								>
									View CV & Credentials
								</a>
							</div>
						</div>

						<!-- Subtle inline CTA (existing) -->
						<div class="pt-2 border-t border-white/10">
							<button
								on:click={() => (isThesisModalOpen = true)}
								class="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
								aria-label="Read: The Architect's Principle"
							>
								<span class="text-sm font-medium tracking-wide">Read: The Architect's Principle</span>
								<svg
									class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Right Image Panel (hidden on small screens) -->
		<div class="lg:w-7/12 relative h-full hidden lg:block">
			<img
				src={`${base}/images/hero.webp`}
				alt="Nino Chavez - Systems thinker and photographer"
				class="w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-r from-neutral-900/30 to-transparent"></div>
		</div>
	</div>
</section>

<!-- Thesis Modal -->
<ThesisModal bind:isOpen={isThesisModalOpen} />

<style>
	/* No additional styles needed */
</style>
