<script>
	export let className = '';
</script>

<header class={`py-4 px-6 ${className}`}>
	<nav class="max-w-7xl mx-auto flex items-center justify-between">
		<a href="/" class="text-xl font-bold text-white">NC</a>
			<div class="flex gap-x-8">
				<a href="#focus" class="text-white/70 hover:text-white transition-colors">About</a>
				<a href="#frame" class="text-white/70 hover:text-white transition-colors">Approach</a>
				<a href="#exposure" class="text-white/70 hover:text-white transition-colors">Experience</a>
				<a href="#portfolio" class="text-white/70 hover:text-white transition-colors">Work</a>
			</div>
	</nav>
</header>
