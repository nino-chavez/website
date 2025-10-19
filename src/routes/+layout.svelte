<script>
	import '../app.css';
	// Import self-hosted Inter font weights
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/900.css';

	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	let mounted = false;

	onMount(() => {
		mounted = true;

		// Initialize performance monitoring (production only)
		if (!dev && typeof window !== 'undefined') {
			// Vercel Analytics
			import('@vercel/analytics').then(({ inject }) => inject());

			// Web Vitals monitoring
			import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
				onCLS((metric) => console.log('CLS:', metric));
				onFID((metric) => console.log('FID:', metric));
				onLCP((metric) => console.log('LCP:', metric));
				onFCP((metric) => console.log('FCP:', metric));
				onTTFB((metric) => console.log('TTFB:', metric));
			});
		}
	});
</script>

<svelte:head>
	 <!-- Preload hero images for performance -->
	 <link rel="preload" as="image" href="/images/hero.webp" media="(min-width: 640px)" fetchpriority="high" />
	 <link rel="preload" as="image" href="/images/hero-mobile.webp" media="(max-width: 639px)" fetchpriority="high" />
	 <title>Nino Chavez - Enterprise Architect & Strategic Advisor</title>
	 <meta name="description" content="25 years building commerce infrastructure that holds up when it matters" />
</svelte:head>

<div class="min-h-screen bg-neutral-900 text-white" class:mounted>
	<slot />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.mounted {
		opacity: 1;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>