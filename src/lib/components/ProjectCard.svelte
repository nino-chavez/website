<script>
	export let title = '';
	export let description = '';
	export let technologies = [];
	export let className = '';
</script>

<div class={`bg-white/5 border border-white/10 rounded-lg p-6 hover:border-athletic-brand-violet/30 transition-all ${className}`}>
	<h3 class="text-xl font-bold text-white mb-3">{title}</h3>
	<p class="text-white/70 mb-4">{description}</p>
	{#if technologies.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each technologies as tech}
				<span class="px-3 py-1 bg-athletic-brand-violet/10 text-athletic-brand-violet border border-athletic-brand-violet/20 rounded-md text-sm">
					{tech}
				</span>
			{/each}
		</div>
	{/if}
</div>
