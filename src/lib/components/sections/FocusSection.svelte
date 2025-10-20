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
	let timelineScrollProgress = 0;
	let localProgress = 0;
	let activeCapability = 'enterprise-commerce';
	let selectedMilestone = 0; // Index of selected timeline milestone

	// Entry transition state
	let entered = false;

	// Reactive: Get current capability item and displayed milestone
	$: currentCapability = CAPABILITY_SYSTEM[activeCapability];
	$: currentMilestoneData = timelineMilestones[selectedMilestone];

	// Subscribe to progress store
	const unsubProgress = progressStore.subscribe(v => (localProgress = v));

	function setActive(id) {
		activeCapability = id;
	}

	function selectMilestone(idx) {
		selectedMilestone = idx;
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
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		return () => {
			window.removeEventListener('scroll', onScroll);
			unsubProgress();
		};
	});

	$: timelineMilestones = CAREER_MILESTONES.filter(m => !m.current).reverse();
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
			<div class="max-w-7xl mx-auto px-4 md:px-8 space-y-10 md:space-y-14">
				<!-- Section Title -->
				<div class="transition-all duration-1000 opacity-100 translate-y-0">
					<p class="text-violet-400 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">About</p>
					<h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight">
						{focusCopy.heading}
					</h2>
					<p class="text-base md:text-lg text-white/70 leading-relaxed max-w-4xl">
						{focusCopy.subhead}
					</p>
				</div>

				<!-- Narrative Content -->
				<div class="max-w-4xl" data-testid="about-narrative">
					<div class="space-y-6">
						<p class="text-lg md:text-xl text-white/90 leading-[1.7]">
							{focusCopy.narrative1}
						</p>
						<p class="text-base md:text-lg text-white/80 leading-[1.8]">
							{focusCopy.narrative2}
						</p>
					</div>
				</div>

				<!-- Interactive Capability System -->
				<div class="bg-white/5 border border-white/5 rounded-lg p-6 md:p-10">
					<div class="mb-8">
						<h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
							Areas of Focus & Capabilities
						</h3>
						<p class="text-sm text-white/60">Click to explore each focus area</p>
					</div>

					<!-- Horizontal Focus Areas -->
					<div class="mb-10">
						<div class="flex flex-wrap gap-3">
							{#each CAPABILITY_IDS as id}
								{@const item = CAPABILITY_SYSTEM[id]}
								<button
									on:click={() => setActive(id)}
									class={`px-5 py-3 rounded-lg transition-all duration-300 text-left
										${activeCapability === id
											? 'bg-violet-500/20 border-2 border-violet-400 text-violet-300 shadow-lg shadow-violet-500/20'
											: 'bg-white/5 border-2 border-white/10 text-white/80 hover:border-violet-400/50 hover:bg-violet-500/10'}`}
									aria-pressed={activeCapability === id}
								>
									<div class="font-semibold text-base mb-1">
										{item.focusArea.title}
									</div>
									<div class="text-xs opacity-80">
										{item.focusArea.description}
									</div>
								</button>
							{/each}
						</div>
					</div>

					<!-- Domain Detail Panel -->
					<div class="min-h-[300px]" data-testid="integrated-stats-card">
						{#key activeCapability}
							<div
								in:fade={{ duration: 200, delay: 100 }}
								out:fade={{ duration: 150 }}
								class="bg-neutral-800/50 border border-white/10 rounded-xl p-6 md:p-8"
							>
								<div class="flex items-start justify-between mb-6">
									<div>
										<div class="text-sm text-violet-400 font-semibold uppercase tracking-wide mb-2">
											Domain
										</div>
										<h4 class="text-white font-bold text-2xl md:text-3xl mb-3">
											{currentCapability.domain.area}
										</h4>
									</div>
									<div class={`w-4 h-4 rounded-full ${
										currentCapability.focusArea.color === 'violet' ? 'bg-violet-400' :
										currentCapability.focusArea.color === 'cyan' ? 'bg-cyan-400' :
										currentCapability.focusArea.color === 'green' ? 'bg-green-400' : 'bg-gray-400'
									}`}></div>
								</div>
								
								<p class="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
									{currentCapability.domain.description}
								</p>
								
								<div>
									<div class="text-sm text-white/50 uppercase tracking-wide mb-4">
										Core Capabilities
									</div>
									<ul class="space-y-3">
										{#each currentCapability.domain.capabilities as capability}
											<li class="flex items-start text-base text-white/90">
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
			</div>

			<!-- Career Timeline -->
			<div class="relative">
				<div
					class="transition-all duration-1000 delay-500 opacity-100 translate-y-0 max-w-7xl mx-auto px-4 md:px-8"
					data-testid="career-timeline-card"
				>
					<div class="bg-white/5 border border-white/5 rounded-lg p-6 md:p-10">
						<!-- Current Role Highlight -->
						{#if currentRole}
							<div
								class="mb-10 md:mb-12 p-6 md:p-8 bg-gradient-to-br from-athletic-brand-violet/10 via-purple-500/5 to-athletic-brand-violet/10 border border-athletic-brand-violet/20 rounded-2xl"
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
						<div class="mb-8">
							<h3 class="text-xl md:text-2xl font-semibold text-white mb-2">Career Progression</h3>
							<p class="text-sm text-white/60">{focusCopy.timelineLabel}</p>
							<p class="text-xs text-white/40 mt-2">
								Click timeline milestones to explore
							</p>
						</div>

						<!-- Horizontal Timeline -->
						<div class="relative mb-10">
							<!-- Timeline Line -->
							<div class="absolute top-5 left-0 right-0 h-0.5 bg-white/10" aria-hidden="true"></div>
							
							<!-- Timeline Milestones -->
							<div class="relative flex justify-between items-start">
								{#each timelineMilestones as milestone, idx (milestone.year)}
									<button
										class="flex flex-col items-center group relative z-10 focus:outline-none focus:ring-2 focus:ring-athletic-brand-violet/50 rounded-lg p-2"
										on:click={() => selectMilestone(idx)}
										aria-label="View {milestone.year} milestone"
										aria-pressed={selectedMilestone === idx}
									>
										<!-- Dot -->
										<div class="relative">
											<span
												class={`block w-3 h-3 rounded-full border-2 transition-all duration-300
													${selectedMilestone === idx
														? 'bg-athletic-brand-violet border-athletic-brand-violet scale-125'
														: 'bg-neutral-800 border-white/30 group-hover:border-athletic-brand-violet group-hover:bg-athletic-brand-violet/20 group-hover:scale-110'}`}
												aria-hidden="true"
											></span>
										</div>
										
										<!-- Year & Era -->
										<div class="mt-3 text-center min-w-[80px]">
											<div class={`text-lg font-bold transition-colors duration-300
												${selectedMilestone === idx ? 'text-athletic-brand-violet' : 'text-white group-hover:text-athletic-brand-violet'}`}>
												{milestone.year}
											</div>
											<div class="text-xs text-white/50 mt-1 font-medium">
												{milestone.era}
											</div>
										</div>
									</button>
								{/each}
							</div>
						</div>

						<!-- Detail Panel -->
						{#if currentMilestoneData}
							{#key selectedMilestone}
								<div
									class="bg-neutral-800/50 border border-white/10 rounded-xl p-6 md:p-8"
									in:fade={{ duration: 200, delay: 100 }}
									out:fade={{ duration: 150 }}
								>
									<div class="mb-4">
										<h4 class="text-xl md:text-2xl font-bold text-white mb-2">
											{currentMilestoneData.role}
										</h4>
										<div class="text-base md:text-lg text-athletic-brand-violet font-medium">
											{currentMilestoneData.scale}
										</div>
									</div>
									
									<div class="space-y-4">
										<p class="text-base text-white/90 leading-relaxed">
											{currentMilestoneData.achievement}
										</p>
										
										{#if currentMilestoneData.details}
											<div class="text-sm text-white/70 leading-relaxed pl-4 border-l-2 border-athletic-brand-violet/20 pt-2">
												{currentMilestoneData.details}
											</div>
										{/if}
									</div>
								</div>
							{/key}
						{/if}
					</div>
				</div>
			</div>

			<!-- Thesis Modal -->
			<ThesisModal bind:isOpen={isThesisModalOpen} />
		</div>
	{/if}
</section>
