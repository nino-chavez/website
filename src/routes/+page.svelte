
<script>

import HeroSection from '$lib/components/sections/HeroSection.svelte';
import Lazy from '$lib/components/util/Lazy.svelte';
import { lockFocus } from '$lib/stores/gameFlow';

function handleFocusLock(target, depth) {
	lockFocus(target, depth);
	console.log('Focus locked from page:', { target, depth });
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
	 <HeroSection />

			 <Lazy loader={() => import('$lib/components/sections/FocusSection.svelte')} onFocusLock={handleFocusLock}>
				 <div class="lazy-placeholder"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/FrameSection.svelte')} mode="visible">
				 <div class="lazy-placeholder"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/ExposureSection.svelte')} mode="visible">
				 <div class="lazy-placeholder"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/GallerySection.svelte')} mode="idle">
				 <div class="lazy-placeholder"></div>
			 </Lazy>

			 <Lazy loader={() => import('$lib/components/sections/PortfolioSection.svelte')} mode="idle">
				 <div class="lazy-placeholder"></div>
			 </Lazy>

</main>