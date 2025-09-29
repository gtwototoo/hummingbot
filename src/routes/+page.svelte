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

<section class="flex flex-col justify-center px-6 max-md:px-4">
	{#each data.menu as category (category.id)}
		<div class="relative flex flex-col" id={category.id}>
			<h2
				class={cn(
					debugMode && hasTypos(category.name) && 'bg-red-400',
					'w-full bg-amber-50 py-10 text-center text-3xl max-md:py-6 max-md:text-2xl'
				)}
			>
				{category.name}
			</h2>
			<div class="flex flex-col divide-y divide-dotted divide-stone-300">
				{#each category.items as item (item.itemId)}
					<MenuItem {debugMode} {item} />
				{/each}
			</div>
		</div>
	{/each}
</section>
