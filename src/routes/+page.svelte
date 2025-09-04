<script lang="ts">
	import { cn } from '$lib/utils/classMerge';
	import { hasTypos } from '$lib/utils/debug.js';
	import MenuItem from './MenuItem.svelte';

	let { data } = $props();

	const debugMode = false;
</script>

<svelte:head>
	<title>TK13 (Кофейня Новокузнецка)</title>
	<meta name="description" content="Лучшие десерты и еда" />
</svelte:head>

<section class="flex flex-col justify-center gap-12 pt-6 max-lg:pt-2 max-md:gap-8 max-md:pt-0">
	{#each data.menu as category (category.id)}
		<div class="relative flex flex-col gap-1 rounded-3xl border border-stone-500 p-6 max-md:p-4">
			<h2
				class={cn(
					debugMode && hasTypos(category.name) && 'bg-red-400',
					'absolute -top-6 bg-amber-50 px-2 text-3xl max-md:-top-5 max-md:text-2xl'
				)}
			>
				{category.name}
			</h2>
			{#each category.items as item (item.itemId)}
				<MenuItem {debugMode} {item} />
			{/each}
		</div>
	{/each}
</section>
