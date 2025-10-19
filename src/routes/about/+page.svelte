<script>
	import { fade } from 'svelte/transition';

	const expertise = [
		{
			area: 'Enterprise Architecture',
			description: '25+ years designing Fortune 500 commerce platforms',
			keywords: ['SAP Commerce Cloud', 'Headless Architecture', 'Microservices']
		},
		{
			area: 'AI-Native Platforms',
			description: 'Strategic Gen AI adoption for Fortune 500 clients',
			keywords: ['AI Transformation', 'Platform Strategy', 'Innovation']
		},
		{
			area: 'Cloud-Native Systems',
			description: 'Distributed, scalable, API-first architecture',
			keywords: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'DevOps']
		},
		{
			area: 'Strategic Advisory',
			description: 'Executive alignment and organizational transformation',
			keywords: ['Roadmap Planning', 'Agile Operating Models', 'Change Management']
		},
		{
			area: 'Action Sports Photography',
			description: 'Tournament and event coverage with 20,000+ image portfolio',
			keywords: ['Volleyball Photography', 'Sports Events', 'Team Photography']
		}
	];

	const timeline = [
		{
			year: '2023 - Present',
			company: 'Accenture Song',
			role: 'Enterprise Architect & Strategic Advisor',
			location: 'Chicago, IL'
		},
		{
			year: '2021 - 2023',
			company: 'Capgemini',
			role: 'Managing Delivery Architect',
			location: 'Chicago, IL'
		},
		{
			year: '2020 - 2021',
			company: 'Peapod Digital Labs',
			role: 'Domain Architect',
			location: 'Chicago, IL'
		},
		{
			year: '2018 - 2020',
			company: 'Accenture Interactive',
			role: 'Managing Enterprise Architect',
			location: 'Chicago, IL',
			highlight: '$25M multi-brand commerce platform, 100+ global resources'
		},
		{
			year: '2015 - 2018',
			company: 'Gorilla Group',
			role: 'Managing Enterprise Architect',
			location: 'Chicago, IL'
		},
		{
			year: '1999 - 2015',
			company: 'Various Companies',
			role: 'Software Engineer & Engineering Lead',
			location: 'Chicago, IL'
		}
	];
</script>

<svelte:head>
	<title>About Nino Chavez | Enterprise Architect & Strategic Advisor | Chicago</title>
	<meta
		name="description"
		content="Nino Chavez is an enterprise architect with 25+ years building Fortune 500 commerce platforms. Based in Chicago, specializing in AI transformation, SAP Commerce Cloud, and action sports photography."
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="About Nino Chavez - Enterprise Architect & Photographer" />
	<meta
		property="og:description"
		content="25+ years architecting Fortune 500 commerce platforms. Strategic advisor at Accenture Song. Chicago-based action sports photographer."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/about" />

	<!-- Schema.org Breadcrumbs -->
	{@html `
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": "https://ninochavez.co"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "About",
				"item": "https://ninochavez.co/about"
			}
		]
	}
	</script>
	`}
</svelte:head>

<main class="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900">
	<!-- Hero Section -->
	<section class="relative px-6 py-24 md:py-32">
		<div class="max-w-4xl mx-auto">
			<div in:fade={{ duration: 600 }}>
				<h1 class="text-5xl md:text-7xl font-bold text-white mb-6">About Nino Chavez</h1>
				<p class="text-2xl md:text-3xl text-cyan-400 mb-8 font-light">
					Enterprise Architect & Strategic Advisor
				</p>
				<p class="text-xl text-neutral-300 leading-relaxed mb-6">
					For over 25 years, I have built commerce infrastructure that holds up when it matters—from
					early-stage platforms to Fortune 500 transformations.
				</p>
				<p class="text-lg text-neutral-400 leading-relaxed">
					Based in <strong class="text-white">Chicago, IL</strong>, I work at the intersection of
					strategic vision and technical execution, helping organizations navigate AI transformation,
					cloud-native architecture, and enterprise-scale digital commerce.
				</p>
			</div>
		</div>
	</section>

	<!-- Current Role -->
	<section class="px-6 py-16 bg-neutral-800/50">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Current Role</h2>
			<div class="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-8">
				<h3 class="text-2xl font-semibold text-cyan-400 mb-2">
					Enterprise Architect & Strategic Advisor
				</h3>
				<p class="text-xl text-neutral-300 mb-4">Accenture Song</p>
				<p class="text-neutral-400 leading-relaxed mb-4">
					I architect AI-native platforms and advise on cloud transformation roadmaps for Fortune 500
					clients. My work focuses on aligning executive vision with technical execution while
					leading Agile operating models and organizational redesign.
				</p>
				<div class="flex flex-wrap gap-2">
					<span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
						>AI Strategy</span
					>
					<span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
						>Cloud Architecture</span
					>
					<span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
						>Executive Advisory</span
					>
				</div>
			</div>
		</div>
	</section>

	<!-- Areas of Expertise -->
	<section class="px-6 py-16">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-12">Areas of Expertise</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each expertise as item}
					<div
						class="bg-neutral-800/80 border border-neutral-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors"
					>
						<h3 class="text-xl font-semibold text-white mb-3">{item.area}</h3>
						<p class="text-neutral-400 mb-4">{item.description}</p>
						<div class="flex flex-wrap gap-2">
							{#each item.keywords as keyword}
								<span class="text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded"
									>{keyword}</span
								>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Career Timeline -->
	<section class="px-6 py-16 bg-neutral-800/30">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-12">Career Timeline</h2>
			<div class="space-y-8">
				{#each timeline as item}
					<div class="border-l-2 border-cyan-500/30 pl-6 pb-6">
						<div class="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
							<span class="text-cyan-400 font-mono text-sm">{item.year}</span>
							<span class="text-neutral-500 hidden md:inline">•</span>
							<span class="text-neutral-400 text-sm">{item.location}</span>
						</div>
						<h3 class="text-xl font-semibold text-white mb-1">{item.role}</h3>
						<p class="text-neutral-300 mb-2">{item.company}</p>
						{#if item.highlight}
							<p class="text-sm text-cyan-400 italic">{item.highlight}</p>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Key Projects -->
	<section class="px-6 py-16">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Key Projects</h2>
			<div class="grid gap-6">
				<div class="bg-neutral-800/80 border border-neutral-700 rounded-lg p-6">
					<h3 class="text-xl font-semibold text-white mb-2">
						$25M Multi-Brand Commerce Transformation
					</h3>
					<p class="text-neutral-400 mb-4">
						Led end-to-end architecture for Fortune 500 retail transformation using SAP Commerce
						Cloud. Managed 100+ global resources across system integration, performance, QA, and
						CI/CD workstreams.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">SAP Commerce</span>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Omni-Channel</span>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">100+ Resources</span>
					</div>
				</div>

				<div class="bg-neutral-800/80 border border-neutral-700 rounded-lg p-6">
					<h3 class="text-xl font-semibold text-white mb-2">Gen AI Platform Adoption</h3>
					<p class="text-neutral-400 mb-4">
						Strategic advisor for Fortune 500 AI transformation initiatives. Designed AI-native
						platform architecture and organizational change strategies for large-scale adoption.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded"
							>AI Transformation</span
						>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Platform Strategy</span
						>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Fortune 500</span>
					</div>
				</div>

				<div class="bg-neutral-800/80 border border-neutral-700 rounded-lg p-6">
					<h3 class="text-xl font-semibold text-white mb-2">
						Cloud-Native Microservices Architecture
					</h3>
					<p class="text-neutral-400 mb-4">
						Designed scalable microservices architecture for high-volume online grocery platform.
						Real-time fulfillment integration with squad-based delivery model.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Microservices</span>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Cloud-Native</span>
						<span class="text-xs text-white bg-neutral-700 px-2 py-1 rounded">Real-Time Systems</span
						>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Photography Work -->
	<section class="px-6 py-16 bg-neutral-800/50">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-8">Photography Work</h2>
			<div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-8">
				<h3 class="text-2xl font-semibold text-purple-400 mb-4">Action Sports Photography</h3>
				<p class="text-neutral-300 leading-relaxed mb-6">
					Beyond enterprise architecture, I capture action sports through the lens. Specializing in
					volleyball and tournament coverage, I've built a portfolio of 20,000+ images documenting
					athletes at their peak performance.
				</p>
				<p class="text-neutral-400 mb-6">
					This work applies the same systems thinking from my consulting practice—anticipating
					moments, reading patterns, and executing with precision under pressure.
				</p>
				<a
					href="/gallery"
					class="inline-block px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 rounded-lg transition-colors"
				>
					View Photography Portfolio →
				</a>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="px-6 py-16">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Get in Touch</h2>
			<p class="text-xl text-neutral-300 mb-8">
				Available for enterprise consulting, speaking engagements, and photography projects.
			</p>
			<div class="flex flex-col md:flex-row gap-4 justify-center items-center">
				<a
					href="mailto:abelino.chavez@gmail.com"
					class="px-8 py-4 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 rounded-lg transition-colors font-semibold"
				>
					Email: abelino.chavez@gmail.com
				</a>
				<a
					href="https://linkedin.com/in/nino-chavez"
					target="_blank"
					rel="noopener noreferrer"
					class="px-8 py-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-colors font-semibold"
				>
					Connect on LinkedIn
				</a>
			</div>
			<p class="text-neutral-500 mt-8">
				<strong>Location:</strong> Chicago, IL • <strong>Availability:</strong> Global (Remote Consulting)
			</p>
		</div>
	</section>

	<!-- Back to Home -->
	<section class="px-6 py-12 text-center">
		<a href="/" class="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
			← Back to Home
		</a>
	</section>
</main>

<style>
	:global(body) {
		background: #171717;
	}
</style>
