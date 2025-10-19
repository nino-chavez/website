<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { inView } from '$lib/actions/inView';

	let mounted = false;
	let expandedProject = null;
	let expandedExperience = null;

	const keyProjects = [
		{
			number: '01',
			client: 'Multi-Brand Specialty Retail',
			role: 'Enterprise Architect',
			duration: '3 years',
			budget: '$10M+',
			team: '100+ global resources',
			objective: 'Architected enterprise omnichannel transformation spanning 6+ brands with unified commerce platform, in-store technology ecosystem, distributed order management, and marketplace integration',
			details: 'Led end-to-end SAP Commerce Cloud replatform with integrated POS systems, store associate mobile tools, distributed warehouse fulfillment, and marketplace capabilities. Orchestrated 50+ system integrations through MuleSoft ESB layer and Informatica-based PIM, enabling real-time inventory visibility across 2,000+ retail locations and online channels.',
			outcomes: [
				'Unified 6 brand storefronts on single platform instance',
				'Enabled BOPIS, ship-from-store, and distributed fulfillment',
				'Integrated 50+ first and third-party systems',
				'Delivered real-time inventory across 2,000+ locations'
			]
		},
		{
			number: '02',
			client: 'National Home Furnishings Retailer',
			role: 'Solution Architect',
			duration: '14 months',
			team: '25+ resources',
			objective: 'Migrated legacy commerce platform to SAP Commerce Cloud with headless Spartacus SPA framework, custom Bloomreach search and content integrations, and cloud-native architecture',
			details: 'Designed and delivered headless commerce migration from on-premise to SAP Commerce Cloud, implementing Spartacus (Angular-based composable storefront) with custom Bloomreach Discovery search and Content CMS integrations. Decoupled front-end enabled independent release cycles and 3x faster feature deployment.',
			outcomes: [
				'Achieved 75% improvement in business agility',
				'Reduced time-to-market by 3x with decoupled architecture',
				'Improved search conversion by 15% with Bloomreach AI',
				'Enabled marketing autonomy without IT dependency'
			]
		},
		{
			number: '03',
			client: 'Canadian Multi-Brand Retail Enterprise',
			role: 'Lead Architect',
			duration: '18 months',
			team: '40+ resources',
			objective: 'Designed composable commerce architecture with Adobe Experience Manager CMS, custom React storefront, and headless SAP Commerce Cloud backend serving full brand portfolio',
			details: 'Architected fully composable, API-first commerce ecosystem leveraging Adobe AEM for content orchestration, headless SAP Commerce Cloud for commerce services via GraphQL, and custom React storefronts. Enabled brand teams to independently manage content and campaigns while sharing commerce infrastructure and integration layer.',
			outcomes: [
				'Launched 4 brand experiences on shared infrastructure',
				'Reduced content deployment time from weeks to hours',
				'Achieved 99.9% uptime during peak seasonal traffic',
				'Enabled independent brand innovation on common platform'
			]
		},
	];

	const experience = [
		{
			period: '2023 - Present',
			year: '2023',
			company: 'Accenture Song',
			location: 'Chicago, IL',
			title: 'Enterprise Architect & Strategic Advisor',
			current: true,
			focus: [
				'Architecting AI-native platforms and Gen AI adoption strategies',
				'Cloud architecture roadmaps for autonomous enterprise',
				'Leading Agile operating models and organizational redesign',
				'Aligning executive vision with technical execution',
			],
		},
		{
			period: '2021 - 2023',
			year: '2021',
			company: 'Capgemini',
			location: 'Chicago, IL',
			title: 'Managing Delivery Architect',
			focus: [
				'End-to-end delivery for enterprise commerce (SAP, Salesforce, Adobe)',
				'Architectural alignment across distributed teams',
				'Technical standards across global delivery centers',
				'Stabilized at-risk programs in high-pressure environments',
			],
		},
		{
			period: '2020 - 2021',
			year: '2020',
			company: 'Peapod Digital Labs',
			location: 'Chicago, IL',
			title: 'Domain Architect',
			focus: [
				'Scalable microservices for online grocery platforms',
				'Architecture strategy for mobile, web, and fulfillment',
				'Squad-based delivery model improvements',
			],
		},
		{
			period: '2018 - 2020',
			year: '2018',
			company: 'Accenture Interactive',
			location: 'Chicago, IL',
			title: 'Managing Enterprise Architect',
			focus: [
				'$10M multi-brand omni-channel commerce solution (SAP Commerce)',
				'Managed 100+ global resources',
				'Led system integration, performance, QA, CI/CD streams',
			],
		},
		{
			period: '2015 - 2018',
			year: '2015',
			company: 'Gorilla Group',
			location: 'Chicago, IL',
			title: 'Managing Enterprise Architect',
			focus: [
				'Cross-functional eCommerce builds (SAP, Magento, Salesforce)',
				'Technical advisor for pre-sales and strategy',
				'Architectural frameworks for engineering execution',
			],
		},
		{
			period: '1999 - 2015',
			year: '1999',
			company: 'Various Roles',
			location: 'Chicago, IL',
			title: 'Software Engineering & Engineering Lead',
			focus: [
				'Full-stack development (Java, .NET, open-source frameworks)',
				'Solution architecture for retail, B2B, CMS platforms',
				'Agile delivery across multi-vendor teams',
			],
		},
	];

	const capabilities = [
		{
			area: 'AI-Native Architecture',
			evidence: 'Led Gen AI platform adoption for Fortune 500 clients',
			scale: '5+ enterprise implementations',
		},
		{
			area: 'Enterprise Transformation',
			evidence: 'Architected $10M+ multi-brand commerce platforms',
			scale: '100+ global resources managed',
		},
		{
			area: 'Cloud-Native Platforms',
			evidence: 'Microservices architecture for high-scale grocery platform',
			scale: 'Real-time fulfillment integration',
		},
		{
			area: 'Digital Commerce',
			evidence: 'SAP, Salesforce, Adobe ecosystem expertise',
			scale: '25+ years delivery experience',
		},
		{
			area: 'Strategic Advisory',
			evidence: 'Executive alignment & organizational redesign',
			scale: 'Accenture Song principal-level advisor',
		},
		{
			area: 'Technical Leadership',
			evidence: 'CI/CD, system integration, performance optimization',
			scale: 'Global distributed team coordination',
		},
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>CV - Nino Chavez | Enterprise Architect & Strategic Advisor</title>
	<meta name="description" content="Digital CV for Nino Chavez - 25+ years architecting AI-native platforms and leading enterprise transformation" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
	<!-- Hero Section - Streamlined -->
	<section class="pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-12 bg-white">
		<div class="max-w-6xl mx-auto">
			{#if mounted}
				<!-- Availability Badge -->
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full mb-8"
				>
					<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
					<span class="text-sm font-medium text-green-700">Available for Strategic Engagement</span>
				</div>

				<!-- Name & Title -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-5xl md:text-7xl font-bold mb-4 text-gray-900"
				>
					Nino Chavez
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-2xl md:text-3xl font-light text-gray-600 mb-8"
				>
					Enterprise Architect & Strategic Advisor
				</p>

				<!-- Professional Statement -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="max-w-3xl mb-12"
				>
					<p class="text-xl md:text-2xl leading-relaxed text-gray-700 mb-4">
						I help teams find clarity in complexity—architecting AI-native platforms that dismantle legacy constraints and unlock new business models.
					</p>
				</div>

				<!-- Key Stats Grid -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
				>
					<div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
						<div class="text-4xl font-bold text-blue-600 mb-2">25+</div>
						<div class="text-sm font-medium text-blue-700">Years Experience</div>
					</div>
					<div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
						<div class="text-4xl font-bold text-green-600 mb-2">$10M</div>
						<div class="text-sm font-medium text-green-700">Largest Project</div>
					</div>
					<div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
						<div class="text-4xl font-bold text-purple-600 mb-2">100+</div>
						<div class="text-sm font-medium text-purple-700">Team Resources</div>
					</div>
					<div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
						<div class="text-4xl font-bold text-orange-600 mb-2">6</div>
						<div class="text-sm font-medium text-orange-700">Major Platforms</div>
					</div>
				</div>

				<!-- Contact Quick Access -->
				<div
					in:fade={{ duration: 800, delay: 600 }}
					class="flex flex-wrap gap-4"
				>
					<a
						href="mailto:abelino.chavez@gmail.com"
						class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Email Me
					</a>
					<a
						href="https://linkedin.com/in/abelinochavez"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors duration-200"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
						</svg>
						LinkedIn
					</a>
					<span class="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-lg">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						Chicago, IL
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Capabilities - Evidence-Based -->
	<section class="py-16 px-6 md:px-12 bg-white border-t border-gray-200">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Core Capabilities</h2>

			<div class="grid md:grid-cols-2 gap-6">
				{#each capabilities as capability}
					<div
						use:inView={{ threshold: 0.3, once: true }}
						class="opacity-0 translate-y-4 transition-all duration-700 bg-gray-50 hover:bg-white border-2 border-gray-200 hover:border-gray-300 rounded-lg p-6"
						style="opacity: 1; transform: translateY(0);"
					>
						<h3 class="text-xl font-bold text-gray-900 mb-3">{capability.area}</h3>
						<p class="text-gray-700 mb-2">{capability.evidence}</p>
						<div class="text-sm font-medium text-gray-500">{capability.scale}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Experience Timeline -->
	<section class="py-16 px-6 md:px-12 bg-gray-50">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold mb-16 text-gray-900">Experience Timeline</h2>

			<div class="relative">
				<!-- Timeline Line -->
				<div class="absolute left-8 md:left-24 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-400 to-gray-200" />

				<!-- Experience Items -->
				<div class="space-y-12">
					{#each experience as exp, index}
						<div
							use:inView={{ threshold: 0.2, once: true }}
							class="relative pl-20 md:pl-40 opacity-0 translate-y-8 transition-all duration-700"
							style="opacity: 1; transform: translateY(0);"
						>
							<!-- Timeline Marker - Current role is filled, past roles are outlined -->
							<div
								class="absolute left-5 md:left-20 top-2 w-8 h-8 rounded-full border-4 border-white shadow-lg transition-colors duration-300"
								class:bg-gray-900={exp.current}
								class:bg-white={!exp.current}
								class:ring-2={!exp.current}
								class:ring-gray-400={!exp.current}
							/>

							<!-- Year Label -->
							<div class="absolute left-0 md:left-0 top-2 text-sm font-bold text-gray-400 w-16 text-right mr-4">
								{exp.year}
							</div>

							<!-- Content Card -->
							<div
								class="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-l-4 border-gray-300 hover:border-gray-600"
								on:click={() => expandedExperience = expandedExperience === index ? null : index}
							>
								<!-- Header -->
								<div class="flex justify-between items-start mb-4">
									<div class="flex-1">
										<div class="flex items-center gap-3 mb-2">
											<h3 class="text-xl font-bold text-gray-900">{exp.company}</h3>
											{#if exp.current}
												<span class="text-xs px-3 py-1 rounded-full font-medium bg-green-100 text-green-700 border border-green-300">
													Current
												</span>
											{/if}
										</div>
										<p class="text-lg font-medium text-gray-700">{exp.title}</p>
									</div>
									<div class="text-right">
										<div class="text-sm font-semibold text-gray-600">{exp.period}</div>
										<div class="text-xs text-gray-500">{exp.location}</div>
									</div>
								</div>

								<!-- Expandable Details -->
								{#if expandedExperience === index}
									<div
										in:fly={{ y: -10, duration: 300 }}
										class="mt-4 pt-4 border-t border-gray-200"
									>
										<ul class="space-y-2">
											{#each exp.focus as item}
												<li class="flex items-start gap-3 text-gray-700">
													<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
													</svg>
													<span>{item}</span>
												</li>
											{/each}
										</ul>
									</div>
								{:else}
									<div class="mt-3 text-sm text-blue-600 font-medium flex items-center gap-1">
										Click to expand details
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Key Projects -->
	<section class="py-16 px-6 md:px-12 bg-white">
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Key Projects</h2>

			<div class="space-y-6">
				{#each keyProjects as project, idx}
					<div
						use:inView={{ threshold: 0.2, once: true }}
						class="bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 hover:border-gray-400 p-6 md:p-8 transition-all duration-300 hover:shadow-lg opacity-0 translate-y-8 cursor-pointer"
						style="opacity: 1; transform: translateY(0);"
						on:click={() => expandedProject = expandedProject === idx ? null : idx}
						on:keydown={(e) => e.key === 'Enter' && (expandedProject = expandedProject === idx ? null : idx)}
						role="button"
						tabindex="0"
						aria-expanded={expandedProject === idx}
					>
						<!-- Header -->
						<div class="flex items-start gap-6">
							<div class="text-6xl font-bold text-gray-300 flex-shrink-0">{project.number}</div>
							<div class="flex-1">
								<div class="flex items-start justify-between mb-3">
									<div>
										<h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-1">{project.client}</h3>
										<p class="text-base font-medium text-gray-600 mb-3">{project.role}</p>
									</div>
									<svg
										class="w-6 h-6 text-gray-400 flex-shrink-0 transition-transform duration-300"
										class:rotate-180={expandedProject === idx}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</div>

								<p class="text-gray-700 leading-relaxed mb-4">{project.objective}</p>

								<div class="flex flex-wrap gap-2 text-xs mb-4">
									{#if project.duration}
										<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{project.duration}</span>
									{/if}
									{#if project.budget}
										<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{project.budget}</span>
									{/if}
									<span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">{project.team}</span>
								</div>

								<!-- Expandable Details -->
								{#if expandedProject === idx}
									<div
										class="pt-4 border-t border-gray-200 space-y-4"
										in:fade={{ duration: 200 }}
									>
										<div>
											<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Solution Details</h4>
											<p class="text-sm text-gray-700 leading-relaxed">{project.details}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Key Outcomes</h4>
											<ul class="space-y-2">
												{#each project.outcomes as outcome}
													<li class="flex items-start text-sm text-gray-700">
														<svg class="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
														</svg>
														<span>{outcome}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{:else}
									<div class="text-sm text-gray-500 font-medium flex items-center gap-1">
										Click to view details and outcomes
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
										</svg>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 bg-gray-900 text-white">
		<div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-400">
				© 2025 Nino Chavez. All rights reserved.
			</p>
			<a
				href="/"
				class="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Back to Portfolio
			</a>
		</div>
	</footer>
</div>

<style>
	/* Print styles */
	@media print {
		.bg-gradient-to-b,
		.bg-gradient-to-br {
			background: white !important;
		}

		section {
			page-break-inside: avoid;
		}
	}

	/* Smooth animations */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
