<script>
	export let className = '';
	
	const currentYear = new Date().getFullYear();
</script>

<footer class={`py-12 px-6 bg-neutral-900 border-t border-white/10 ${className}`}>
	<div class="max-w-7xl mx-auto">
		<div class="text-center text-white/60 text-sm">
			<p>&copy; {currentYear} Nino Chavez. All rights reserved.</p>
		</div>
	</div>
</footer>
