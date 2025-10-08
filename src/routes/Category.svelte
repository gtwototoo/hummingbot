<script lang="ts">
	import { carouselStore } from '$lib/stores/carousel.svelte';
	import { cn } from '$lib/utils/classMerge';
	import { hasTypos } from '$lib/utils/debug';
	import MenuItem from './MenuItem.svelte';

	interface ItemSize {
		sizeName: string;
		isHidden: boolean;
		price: number;
	}

	interface Item {
		itemId: string;
		name: string;
		description: string;
		subitems: ItemSize[];
	}

	interface Category {
		id: string;
		name: string;
		items: Item[];
	}

	let {
		category
	}: {
		category: Category;
	} = $props();

	let element = $state<HTMLDivElement>();

	const debugMode = false;

	const handleScroll = () => {
		const carouselId = `carousel-${category.id}`;
		const position = element?.getBoundingClientRect();
		const menuElement = document.getElementById(`menu-${category.id}`);
		const carouselElement = document.getElementById(carouselId);

		const fromTop = position && position.y <= 10 && position.y > 0;
		const fromBottom = position && position.y < 0 && position.y + position.height >= 10;

		if (carouselElement && (fromTop || fromBottom)) {
			const index = carouselStore.carousel?.slideNodes().findIndex((c) => c.id === carouselId);

			document.querySelectorAll('.menu-item').forEach((el) => el.classList.remove('bg-amber-50'));

			carouselStore.carousel?.scrollTo(index!);
			carouselElement.classList.add('bg-amber-50');
			menuElement?.classList.add('bg-amber-50');
		}
	};
</script>

<svelte:window on:scroll={handleScroll} />

<div class="relative flex flex-col" id={category.id} bind:this={element}>
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
