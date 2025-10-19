
<script>
import HeroSection from '$lib/components/sections/HeroSection.svelte';
import Header from '$lib/components/layout/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import Lazy from '$lib/components/util/Lazy.svelte';
import ScrollDetector from '$lib/components/ScrollDetector.svelte';
import ErrorBoundary from '$lib/components/ErrorBoundary.svelte';
import { lockFocus } from '$lib/stores/gameFlow';

// Receive server data
export let data;

function handleFocusLock(target, depth) {
	lockFocus(target, depth);
	console.log('Focus locked from page:', { target, depth });
}

async function handleNavigate(sectionId) {
	// Try immediate scroll; if the section isn't mounted yet (lazy), retry a few times.
	const tryScroll = () => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' });
			return true;
		}
		return false;
	};

	if (tryScroll()) return;

	// Retry with small backoff to allow lazy components to mount
	for (let i = 0; i < 5; i++) {
		await new Promise((r) => setTimeout(r, 120 + i * 80));
		if (tryScroll()) return;
	}
}
</script>

<svelte:head>
	<title>Nino Chavez | Enterprise Architect & Action Photographer | Chicago</title>
	<meta
		name="description"
		content="Nino Chavez is an enterprise architect with 25 years building Fortune 500 commerce platforms and strategic advisor at Accenture Song. Action sports photographer specializing in tournament coverage based in Chicago."
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Nino Chavez - Enterprise Architect & Strategic Advisor" />
	<meta
		property="og:description"
		content="25 years building AI-native platforms and enterprise commerce infrastructure. Strategic advisor at Accenture Song."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co" />
	<meta property="profile:first_name" content="Nino" />
	<meta property="profile:last_name" content="Chavez" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Nino Chavez - Enterprise Architect & Strategic Advisor" />
	<meta
		name="twitter:description"
		content="25 years building AI-native platforms and enterprise commerce infrastructure."
	/>

	<!-- Schema.org JSON-LD for Answer Engine Optimization (AEO) -->
	<!-- This structured data helps AI models (ChatGPT, Claude, Gemini) answer queries about "Who is Nino Chavez?" -->
	{@html `
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Nino Chavez",
		"alternateName": "Antonino Chavez",
		"url": "https://ninochavez.co",
		"image": "https://ninochavez.co/images/nino-chavez.jpg",
		"jobTitle": ["Enterprise Architect", "Strategic Advisor", "Action Sports Photographer"],
		"description": "Enterprise architect with 25+ years building Fortune 500 commerce platforms and strategic advisor at Accenture Song. Specializes in AI-native platform architecture, SAP Commerce Cloud implementations, and enterprise transformation. Action sports photographer capturing tournament and event coverage.",
		"email": "abelino.chavez@gmail.com",
		"worksFor": {
			"@type": "Organization",
			"name": "Accenture Song",
			"url": "https://www.accenture.com/us-en/services/song-index"
		},
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Chicago",
			"addressRegion": "IL",
			"addressCountry": "US"
		},
		"sameAs": [
			"https://linkedin.com/in/nino-chavez",
			"https://github.com/nino-chavez"
		],
		"knowsAbout": [
			"Enterprise Architecture",
			"AI-Native Platform Architecture",
			"SAP Commerce Cloud",
			"Cloud-Native Platforms",
			"Strategic Advisory",
			"Action Sports Photography"
		],
		"hasOccupation": [
			{
				"@type": "Occupation",
				"name": "Enterprise Architect",
				"occupationLocation": {
					"@type": "City",
					"name": "Chicago"
				},
				"experienceRequirements": "25+ years",
				"responsibilities": "Design and implement Fortune 500 commerce platforms, AI transformation strategy, technical architecture"
			},
			{
				"@type": "Occupation",
				"name": "Action Sports Photographer",
				"occupationLocation": {
					"@type": "City",
					"name": "Chicago"
				},
				"responsibilities": "Tournament photography, action sports event coverage, team photography"
			}
		]
	}
	</script>
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Nino Chavez",
		"url": "https://ninochavez.co",
		"description": "Professional portfolio and contact information for Nino Chavez - Enterprise Architect and Action Sports Photographer",
		"author": {
			"@type": "Person",
			"name": "Nino Chavez"
		},
		"potentialAction": {
			"@type": "SearchAction",
			"target": "https://ninochavez.co/?q={search_term_string}",
			"query-input": "required name=search_term_string"
		}
	}
	</script>
	`}
</svelte:head>

<main id="main-content" class="relative">
	<Header onNavigate={handleNavigate}></Header>

	 <HeroSection />

			 <Lazy loader={() => import('$lib/components/sections/FocusSection.svelte')} onFocusLock={handleFocusLock}>
			  <div slot="placeholder" class="min-h-screen bg-neutral-800/20 animate-pulse"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/FrameSection.svelte')} mode="visible">
			  <div slot="placeholder" class="min-h-screen bg-neutral-800/20 animate-pulse"></div>
			 </Lazy>

			 <ErrorBoundary>
			  <Lazy loader={() => import('$lib/components/sections/ExposureSection.svelte')} mode="idle" data={data}>
			 	 <div slot="placeholder" class="min-h-[600px] bg-neutral-800/20 animate-pulse"></div>
			  </Lazy>
			 </ErrorBoundary>

			 <Lazy loader={() => import('$lib/components/sections/GallerySection.svelte')} mode="idle">
			  <div slot="placeholder" class="min-h-screen bg-neutral-800/20 animate-pulse"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/PortfolioSection.svelte')} mode="idle">
			  <div slot="placeholder" class="min-h-screen bg-neutral-800/20 animate-pulse"></div>
			 </Lazy>

	<ScrollDetector />
	<Footer></Footer>
</main>