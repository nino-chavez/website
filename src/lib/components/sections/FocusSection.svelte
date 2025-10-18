<script>
	import { onMount } from 'svelte';
	import { currentSection, progress as progressStore, depthOfField as dof } from '$lib/stores/gameFlow';
	import { inView } from '$lib/actions/inView';
		import { CAREER_MILESTONES, FOCUS_AREAS, TECHNICAL_DEPTH } from '$lib/constants';
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

	// Entry transition state
	let entered = false;

	// Subscribe to progress store
	const unsubProgress = progressStore.subscribe(v => (localProgress = v));

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
			<div class="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 space-y-12 md:space-y-16">
				<!-- Section Title -->
				<div class="transition-all duration-1000 opacity-100 translate-y-0">
										<div class="text-base md:text-sm text-white/60 uppercase tracking-wider mb-2 md:mb-3">About</div>
										<h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
											{focusCopy.heading}
										</h2>
										<p class="text-base md:text-lg lg:text-xl text-white/70 mt-4 leading-relaxed">{focusCopy.subhead}</p>
				</div>

				<!-- Narrative + CTA -->
				<div data-testid="about-narrative">
								<div class="max-w-4xl mx-auto">
													<p class="text-lg md:text-xl text-white/90 leading-[1.7] mb-6">{focusCopy.narrative1}</p>
													<p class="text-base md:text-lg text-white/80 leading-[1.8] mb-8">{focusCopy.narrative2}</p>

						<div class="bg-black/10 border border-white/5 rounded-lg p-6 md:p-8 mb-8">
											<ul class="space-y-4 text-base md:text-lg text-white/85 mb-8">
																	{#each focusCopy.bullets as b}
																		<li class="flex items-start">
																			<span class="text-violet-400 mr-4 mt-1 flex-shrink-0">✓</span>
																			<span>{b}</span>
																		</li>
																	{/each}
											</ul>

							<div class="flex justify-center md:justify-start">
								<button
									class="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
									data-testid="architect-principle-button"
									aria-label="Read: The Architect's Principle"
									on:click={() => (isThesisModalOpen = true)}
								>
									<span class="flex items-center gap-3">
										<span>{focusCopy.cta}</span>
										<svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
										</svg>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				<!-- Two Column Layout: Focus Areas + Technical Depth -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 mt-14 px-2 md:px-6 lg:px-8">
					<!-- Focus Areas -->
					<div>
						<div class="bg-black/10 border border-white/5 rounded-lg p-6">
							<h3 class="text-xl font-semibold text-white mb-6">Areas of Focus</h3>
							<div class="space-y-6">
								{#each FOCUS_AREAS as area}
									<div class="group">
										<div class="flex items-start gap-4">
											<div
												class={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
													area.color === 'violet'
														? 'bg-violet-400'
														: area.color === 'cyan'
														? 'bg-cyan-400'
														: area.color === 'green'
														? 'bg-green-400'
														: 'bg-gray-400'
												}`}
										/>
										<div class="flex-1">
											<h4 class="text-white font-semibold text-lg mb-2">{area.area}</h4>
											<p class="text-white/80 leading-relaxed">{area.description}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Architectural Domains -->
				<div data-testid="integrated-stats-card">
					<div class="bg-black/10 border border-white/5 rounded-lg p-6">
						<h3 class="text-xl font-semibold text-white mb-6">Architectural Domains</h3>
						<div class="grid gap-6">
							{#each TECHNICAL_DEPTH as domain}
								<div class="border-b border-white/5 pb-5 last:border-b-0">
									<h4 class="text-white font-semibold text-lg mb-2">{domain.area}</h4>
									<p class="text-white/70 text-sm mb-4 leading-relaxed">{domain.description}</p>
									<ul class="space-y-2">
										{#each domain.capabilities as capability}
											<li class="flex items-start text-sm text-white/80">
												<span class="text-violet-400 mr-3 mt-0.5 flex-shrink-0">✓</span>
												<span class="leading-relaxed">{capability}</span>
											</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- Career Timeline -->
			<div class="relative">
				<div
					class="transition-all duration-1000 delay-500 opacity-100 translate-y-0"
					data-testid="career-timeline-card"
				>
					<div class="bg-white/5 border border-white/5 rounded-lg p-6 md:p-8">
						<!-- Current Role Highlight -->
						{#if currentRole}
							<div
								class="mb-12 p-8 bg-gradient-to-br from-athletic-brand-violet/10 via-purple-500/5 to-athletic-brand-violet/10 border border-athletic-brand-violet/20 rounded-2xl"
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
						<div class="mb-10">
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
							<div class="mt-3 w-full bg-white/10 rounded-full h-1">
								<div
									class="bg-gradient-to-r from-athletic-brand-violet to-violet-400 h-1 rounded-full transition-all duration-300"
									style={`width: ${timelineScrollProgress * 100}%`}
								/>
							</div>
						</div>

						<!-- Timeline Items -->
						<div class="space-y-4">
							{#each timelineMilestones as milestone, idx (milestone.year)}
								<div class="relative" data-timeline-index={idx}>
									<div class="flex items-start gap-6">
										<!-- Timeline Dot + Year -->
										<div class="flex-shrink-0 flex flex-col items-center pt-1">
											<button
												class="relative w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-athletic-brand-violet/50 group bg-white/20 border-white/30 hover:bg-white/40"
												aria-label="Toggle details for {milestone.year}"
												on:click={() => toggleExpand(idx)}
											/>
											<div class="text-lg font-bold mt-2 text-white">{milestone.year}</div>
											<div class="text-xs text-white/50 mt-1 font-medium">{milestone.era}</div>
										</div>

										<!-- Content -->
										<div class="flex-1 min-w-0 pt-1 pb-4">
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
