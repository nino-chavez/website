
<script>

import HeroSection from '$lib/components/sections/HeroSection.svelte';
import Header from '$lib/components/layout/Header.svelte';
import Footer from '$lib/components/Footer.svelte';
import Lazy from '$lib/components/util/Lazy.svelte';
import ScrollDetector from '$lib/components/ScrollDetector.svelte';
import { lockFocus } from '$lib/stores/gameFlow';

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
	<title>Nino Chavez - Enterprise Architect & Strategic Advisor</title>
	<meta name="description" content="25 years building commerce infrastructure that holds up when it matters" />
	<meta property="og:title" content="Nino Chavez - Enterprise Architect & Strategic Advisor" />
	<meta property="og:description" content="25 years building commerce infrastructure that holds up when it matters" />
	<meta property="og:type" content="website" />
</svelte:head>

<main class="relative">
	<Header onNavigate={handleNavigate} />

	 <HeroSection />

			 <Lazy loader={() => import('$lib/components/sections/FocusSection.svelte')} onFocusLock={handleFocusLock}>
				 <div slot="placeholder" style="min-height:1px"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/FrameSection.svelte')} mode="visible">
				 <div slot="placeholder" style="min-height:1px"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/ExposureSection.svelte')} mode="idle">
				 <div slot="placeholder" style="min-height:1px"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/GallerySection.svelte')} mode="idle">
				 <div slot="placeholder" style="min-height:1px"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/PortfolioSection.svelte')} mode="idle">
				 <div slot="placeholder" style="min-height:1px"></div>
			 </Lazy>

	<ScrollDetector />
	<Footer />
</main>