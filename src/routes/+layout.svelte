<script>
	import '../app.css';
	// Import self-hosted Inter font weights
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/900.css';
	
	import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
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
		
		// Track scroll position and update current section
		const handleScroll = () => {
			const sections = document.querySelectorAll('[data-section]');
			const scrollPos = window.scrollY + window.innerHeight / 2;

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				const sectionTop = rect.top + window.scrollY;
				const sectionBottom = sectionTop + rect.height;

				if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
					const sectionId = section.getAttribute('data-section');
					currentSection.set(sectionId);
				}
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	 <link rel="preconnect" href="https://fonts.googleapis.com" />
	 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	 <link
			 href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
			 rel="stylesheet"
	 />
	 <!-- Preload hero images without triggering large JPEG fallback; scope by media -->
	 <link rel="preload" as="image" href="/images/hero.webp" media="(min-width: 640px)" fetchpriority="high" />
	 <link rel="preload" as="image" href="/images/hero-mobile.webp" media="(max-width: 639px)" fetchpriority="high" />
	 <title>Nino Chavez - Enterprise Architect & Strategic Advisor</title>
	 <meta name="description" content="25 years building commerce infrastructure that holds up when it matters" />
	 <style>
		 /* Critical CSS for above-the-fold HeroSection */
		 #hero {
			 min-height: 100vh;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 position: relative;
			 overflow: hidden;
			 background: #0a0a0f;
		 }
		 #hero .object-cover {
			 width: 100%;
			 height: 100%;
			 object-fit: cover;
			 opacity: 0.6;
		 }
		 #hero h1 {
			 font-size: 2.5rem;
			 font-weight: 900;
			 color: #fff;
			 margin-bottom: 1.5rem;
		 }
		 @media (min-width: 768px) {
			 #hero h1 { font-size: 4rem; }
		 }
		 @media (min-width: 1024px) {
			 #hero h1 { font-size: 6rem; }
		 }
		 #hero .text-white\/70 { color: rgba(255,255,255,0.7); }
		 #hero .text-white\/60 { color: rgba(255,255,255,0.6); }
		 #hero .rounded-lg { border-radius: 0.5rem; }
		 #hero .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05); }
		 #hero .font-black { font-weight: 900; }
		 #hero .font-semibold { font-weight: 600; }
		 #hero .font-light { font-weight: 300; }
		 #hero .bg-gradient-to-r { background: linear-gradient(to right, #8b5cf6, #a78bfa); }
	 </style>
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