<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import type { ItemCategory } from '$lib/types/externalMenu';
	import Footer from './Footer.svelte';

	type Category = Pick<ItemCategory, 'id' | 'name'>;

	let {
		categories
	}: {
		categories: Category[];
	} = $props();

	const scrollToCategory = (categoryId: string) => {
		const element = document.getElementById(categoryId);

		if (element) element.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<div
	class="sticky top-4 z-10 flex max-w-4xl items-start rounded-3xl bg-amber-50 p-2 pt-4 max-lg:pb-4 max-md:w-full max-md:flex-col max-md:pb-2 lg:flex-col"
>
	<div class="absolute inset-0 -z-1 size-full rounded-[inherit] bg-stone-500/10"></div>
	<header class="flex justify-center self-center p-2">
		<Logo class="size-20 text-stone-800 max-md:size-14" />
	</header>
	<Carousel class="w-full px-2 md:hidden">
		<div class="flex justify-start">
			{#each categories as category (category.id)}
				<Button
					class="menu-item rounded-full px-3 py-2 text-base whitespace-nowrap transition-colors hover:bg-amber-50"
					id="carousel-{category.id}"
					onclick={() => scrollToCategory(category.id)}
				>
					{category.name}
				</Button>
			{/each}
		</div>
	</Carousel>
	<div class="flex flex-wrap px-2 max-lg:justify-center max-md:hidden lg:flex-col">
		{#each categories as category (category.id)}
			<Button
				class="menu-item rounded-full px-4 py-2 text-base transition-colors hover:bg-amber-50"
				id="menu-{category.id}"
				onclick={() => scrollToCategory(category.id)}
			>
				{category.name}
			</Button>
		{/each}
	</div>
	<Footer class="max-lg:hidden" />
</div>
