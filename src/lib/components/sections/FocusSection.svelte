<script>
	import { onMount } from 'svelte';
	import { currentSection, progress as progressStore, depthOfField as dof } from '$lib/stores/gameFlow';
	import { inView } from '$lib/actions/inView';
	import { CAREER_MILESTONES, CAPABILITY_SYSTEM, CAPABILITY_IDS } from '$lib/constants';
	import { focusCopy } from '$lib/copy';
	import ThesisModal from '$lib/components/ui/ThesisModal.svelte';
	import { fade, fly } from 'svelte/transition';

	export let className = '';
	export let onFocusLock = (target, depth) => {};

	let sectionEl;
	let focusTargetLocked = false;
	let isThesisModalOpen = false;

	// Local state
	let expanded = new Set();
	let timelineScrollProgress = 0;
	let localProgress = 0;
	let activeCapability = 'enterprise-commerce';

	// Entry transition state
	let entered = false;

	// Reactive: Get current capability item
	$: currentCapability = CAPABILITY_SYSTEM[activeCapability];

	// Subscribe to progress store
	const unsubProgress = progressStore.subscribe(v => (localProgress = v));

	function setActive(id) {
		activeCapability = id;
	}

	function toggleExpand(idx) {
		const next = new Set(expanded);
		next.has(idx) ? next.delete(idx) : next.add(idx);
		expanded = next;
	}

	function onSectionEnter() {
		focusTargetLocked = true;
		currentSection.set('focus');
		entered = true;

		if (localProgress > 0.2 && focusTargetLocked && sectionEl) {
			let depthValue = 0;
			const unsub = dof.subscribe(v => (depthValue = v));
			onFocusLock({ element: sectionEl, section: 'focus', depthOfField: depthValue }, depthValue);
			unsub();
		}
	}

	onMount(() => {
		const onScroll = () => {
			const card = sectionEl?.querySelector('[data-testid="career-timeline-card"]');
			if (!card) return;

			const rect = card.getBoundingClientRect();
			const winH = window.innerHeight;
			const visible = Math.min(rect.bottom, winH) - Math.max(rect.top, 0);
			const progress = Math.max(0, Math.min(1, visible / rect.height));
			timelineScrollProgress = progress;

			const items = card.querySelectorAll('[data-timeline-index]');
			items.forEach((item, index) => {
				const top = item.getBoundingClientRect().top;
				const itemProgress = Math.max(0, (winH - top) / winH);
				
				if (itemProgress > 0.8 && progress > 0.2 && !expanded.has(index)) {
					setTimeout(() => {
						const next = new Set(expanded);
						next.add(index);
						expanded = next;
					}, index * 200);
				}
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
			unsubProgress();
		};
	});

	$: timelineMilestones = CAREER_MILESTONES.filter(m => !m.current);
	$: currentRole = CAREER_MILESTONES.find(m => m.current);
</script>


<section
	bind:this={sectionEl}
	id="focus"
	data-testid="focus-section"
	data-section="focus"
	class={`min-h-screen relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 ${className}`}
	use:inView={{ threshold: 0.1, rootMargin: '0px 0px -10% 0px', once: true }}
	on:enter={onSectionEnter}
	aria-label="Focus section - About and expertise details"
>
	{#if entered}
			<div
				in:fly={{ y: 32, duration: 700, opacity: 0.2 }}
				class="relative z-20 py-16 md:py-20 lg:py-24"
			>
			<div class="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 space-y-10 md:space-y-14">
				<!-- Section Title -->
				<div class="transition-all duration-1000 opacity-100 translate-y-0">
					<div class="text-base md:text-sm text-white/60 uppercase tracking-wider mb-2 md:mb-3">About</div>
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
						{focusCopy.heading}
					</h2>
					<p class="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-4xl">
						{focusCopy.subhead}
					</p>
				</div>

				<!-- Hero Grid: Diagnosis + CTA (2-column on desktop, stacks on mobile) -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12" data-testid="about-narrative">
					<!-- Left: The Diagnosis -->
					<div class="space-y-6">
						<p class="text-lg md:text-xl text-white/90 leading-[1.7] max-w-prose">
							{focusCopy.narrative1}
						</p>
						<p class="text-base md:text-lg text-white/80 leading-[1.8] max-w-prose">
							{focusCopy.narrative2}
						</p>
					</div>

					<!-- Right: The Call to Action -->
					<div class="flex items-start lg:justify-end">
						<button
							class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group w-full lg:w-auto"
							data-testid="architect-principle-button"
							aria-label="Read: The Architect's Principle"
							on:click={() => (isThesisModalOpen = true)}
						>
							<span class="flex items-center justify-center gap-3">
								<span>{focusCopy.cta}</span>
								<svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
								</svg>
							</span>
						</button>
					</div>
				</div>

				<!-- Interactive Capability System -->
				<div>
					<h3 class="text-3xl md:text-4xl font-bold text-white mb-8">
						Areas of Focus & Capabilities
					</h3>
					
					<!-- Desktop: Side-by-side -->
					<div class="hidden lg:grid lg:grid-cols-[320px_1fr] gap-8">
						<!-- Focus Index (Left) -->
						<nav
							class="sticky top-24 self-start bg-black/5 border border-white/5 rounded-xl p-2 space-y-1"
							aria-label="Focus areas navigation"
						>
							{#each CAPABILITY_IDS as id}
								{@const item = CAPABILITY_SYSTEM[id]}
								<button
									on:click={() => setActive(id)}
									class="w-full text-left px-6 py-4 rounded-lg transition-all duration-200 group
												 {activeCapability === id
													 ? 'bg-violet-500/10 border-l-2 border-violet-400 text-violet-400'
													 : 'text-white/60 hover:text-white hover:bg-white/5'}"
									aria-pressed={activeCapability === id}
								>
									<div class="font-semibold text-base mb-1
															{activeCapability === id ? 'text-violet-300' : 'group-hover:text-white'}">
										{item.focusArea.title}
									</div>
									<div class="text-sm opacity-80 line-clamp-2">
										{item.focusArea.description}
									</div>
								</button>
							{/each}
						</nav>

						<!-- Domain Panel (Right) -->
						<div class="min-h-[400px]" data-testid="integrated-stats-card">
							{#key activeCapability}
								<div
									in:fade={{ duration: 300, delay: 100 }}
									out:fade={{ duration: 200 }}
									class="bg-black/5 border border-white/5 rounded-xl p-8 md:p-10"
								>
									<div class="flex items-start justify-between mb-6">
										<div>
											<div class="text-sm text-violet-400 font-semibold uppercase tracking-wide mb-2">
												Domain
											</div>
											<h4 class="text-white font-bold text-3xl mb-3">
												{currentCapability.domain.area}
											</h4>
										</div>
												<div class={`w-4 h-4 rounded-full ${
													currentCapability.focusArea.color === 'violet' ? 'bg-violet-400' :
													currentCapability.focusArea.color === 'cyan' ? 'bg-cyan-400' :
													currentCapability.focusArea.color === 'green' ? 'bg-green-400' : 'bg-gray-400'
												}`}></div>
									</div>
									
									<p class="text-white/70 text-lg mb-8 leading-relaxed">
										{currentCapability.domain.description}
									</p>
									
									<div>
										<div class="text-sm text-white/50 uppercase tracking-wide mb-4">
											Core Capabilities
										</div>
										<ul class="space-y-4">
											{#each currentCapability.domain.capabilities as capability, i}
												<li
													class="flex items-start text-base text-white/90"
													in:fly={{ y: 10, duration: 300, delay: 200 + (i * 100) }}
												>
													<span class="text-violet-400 mr-3 mt-0.5 flex-shrink-0 text-lg">✓</span>
													<span class="leading-relaxed">{capability}</span>
												</li>
											{/each}
										</ul>
									</div>
								</div>
							{/key}
						</div>
					</div>

					<!-- Mobile: Accordion -->
					<div class="lg:hidden space-y-2">
						{#each CAPABILITY_IDS as id}
							{@const item = CAPABILITY_SYSTEM[id]}
							<details
								class="bg-black/5 border border-white/5 rounded-xl overflow-hidden group"
								open={activeCapability === id}
							>
								<summary
									class="px-6 py-4 cursor-pointer list-none hover:bg-white/5 transition-colors"
									on:click={() => setActive(id)}
								>
									<div class="flex items-center justify-between">
										<div>
											<div class="font-semibold text-white text-lg mb-1">
												{item.focusArea.title}
											</div>
											<div class="text-sm text-white/60">
												{item.focusArea.description}
											</div>
										</div>
										<svg
											class="w-5 h-5 text-white/60 transform transition-transform group-open:rotate-180"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								</summary>
								
								<div class="px-6 pb-6 pt-2 border-t border-white/5">
									<div class="text-sm text-violet-400 font-semibold uppercase tracking-wide mb-2">
										{item.domain.area}
									</div>
									<p class="text-white/70 text-base mb-4 leading-relaxed">
										{item.domain.description}
									</p>
									<ul class="space-y-3">
										{#each item.domain.capabilities as capability}
											<li class="flex items-start text-sm text-white/80">
												<span class="text-violet-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
												<span class="leading-relaxed">{capability}</span>
											</li>
										{/each}
									</ul>
								</div>
							</details>
						{/each}
					</div>
				</div>
			</div>

			<!-- Career Timeline -->
			<div class="relative">
				<div
					class="transition-all duration-1000 delay-500 opacity-100 translate-y-0 max-w-6xl mx-auto px-6 md:px-8 lg:px-12"
					data-testid="career-timeline-card"
				>
					<div class="bg-white/5 border border-white/5 rounded-lg p-6 md:p-8">
						<div class="max-w-6xl lg:max-w-7xl mx-auto">
						<!-- Current Role Highlight -->
						{#if currentRole}
							<div
								class="mb-8 md:mb-10 p-6 md:p-8 bg-gradient-to-br from-athletic-brand-violet/10 via-purple-500/5 to-athletic-brand-violet/10 border border-athletic-brand-violet/20 rounded-2xl"
							>
								<div class="flex items-start justify-between mb-4">
									<div>
										<div class="text-sm text-athletic-brand-violet font-semibold mb-2 uppercase tracking-wide">
											Current Role
										</div>
										<h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
											{currentRole.role}
										</h3>
										<div class="text-lg text-white/80 font-medium">{currentRole.scale}</div>
									</div>
									<div class="text-right">
										<div class="text-3xl font-black text-athletic-brand-violet">{currentRole.year}</div>
										<div class="text-sm text-white/60 mt-1">{currentRole.era}</div>
									</div>
								</div>
								<p class="text-base text-white/90 leading-relaxed">{currentRole.achievement}</p>
							</div>
						{/if}

						<!-- Timeline Header -->
						<div class="mb-8 md:mb-10">
							<div class="flex items-center justify-between mb-2">
								<h3 class="text-xl md:text-2xl font-semibold text-white">Career Progression</h3>
								<div class="text-xs text-white/50 font-mono">
									{expanded.size}/{timelineMilestones.length} explored
								</div>
							</div>
							  <p class="text-sm text-white/60">{focusCopy.timelineLabel}</p>
							<p class="text-xs text-white/40 mt-2">
								Click timeline dots or scroll to explore career progression
							</p>
							<div class="mt-4 w-full bg-white/10 rounded-full h-1">
										<div
											class="bg-gradient-to-r from-athletic-brand-violet to-violet-400 h-1 rounded-full transition-all duration-300"
											style={`width: ${timelineScrollProgress * 100}%`}
										></div>
							</div>
						</div>

						<!-- Timeline Items -->
						<div class="space-y-6 md:space-y-7">
							{#each timelineMilestones as milestone, idx (milestone.year)}
								<div class="relative" data-timeline-index={idx}>
									<div class="flex items-start gap-6">
										<!-- Timeline Dot + Year -->
										<div class="flex-shrink-0 flex flex-col items-center pt-1">
										<button
											class="relative p-4 -m-4 md:p-0 md:m-0 focus:outline-none focus:ring-2 focus:ring-athletic-brand-violet/50 group"
											aria-label="Toggle details for {milestone.year}"
											on:click={() => toggleExpand(idx)}
										>
													<span
														class="block w-3 h-3 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 bg-white/20 border-white/30 group-hover:bg-white/40"
														aria-hidden="true"
													></span>
										</button>
											<div class="text-lg font-bold mt-2 text-white">{milestone.year}</div>
											<div class="text-xs text-white/50 mt-1 font-medium">{milestone.era}</div>
										</div>

										<!-- Content -->
										<div class="flex-1 min-w-0 pt-1 pb-5">
											<div class="text-base font-semibold text-white mb-2">{milestone.role}</div>
											<div class="text-sm text-athletic-brand-violet font-medium mb-3">
												{milestone.scale}
											</div>

											<!-- Expandable Content -->
											<div
												class="overflow-hidden transition-all duration-500 ease-in-out"
												style={`max-height: ${expanded.has(idx) ? '24rem' : '0'}; opacity: ${
													expanded.has(idx) ? 1 : 0
												}`}
											>
												<div class="text-sm text-white/90 leading-relaxed mb-3 max-w-none pt-2">
													{milestone.achievement}
												</div>
												{#if milestone.details}
													<div
														class="text-sm text-white/70 leading-relaxed pl-4 border-l-2 border-athletic-brand-violet/20 pt-2"
													>
														{milestone.details}
													</div>
												{/if}
											</div>

											<!-- Toggle Button -->
											<button
												class={`mt-3 text-xs transition-all duration-200 flex items-center gap-2 px-3 py-1 rounded-full ${
													expanded.has(idx)
														? 'text-violet-300 bg-violet-500/20'
														: 'text-athletic-brand-violet hover:text-violet-300 hover:bg-athletic-brand-violet/10'
												}`}
												aria-expanded={expanded.has(idx)}
												on:click={() => toggleExpand(idx)}
											>
												<span>{expanded.has(idx) ? 'Show less' : 'Learn more'}</span>
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					</div>
				</div>
			</div>

			<!-- Thesis Modal -->
			<ThesisModal bind:isOpen={isThesisModalOpen} />
		</div>
	{/if}
</section>
