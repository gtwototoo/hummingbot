<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import type { ItemCategory } from '$lib/types/iiko';
	import Footer from './Footer.svelte';

	import award2gis from '$lib/images/Award2gis.png';

	type Category = Pick<ItemCategory, 'id' | 'name'>;

	let {
		categories
	}: {
		categories: Category[];
	} = $props();
</script>

<div
	class="sticky top-4 z-10 flex max-w-4xl items-start rounded-2xl bg-amber-50 p-2 pt-4 max-lg:pb-4 max-md:flex-col lg:flex-col lg:gap-4"
>
	<div class="absolute inset-0 -z-1 size-full rounded-[inherit] bg-stone-500/10"></div>
	<header class="flex justify-center self-center px-2">
		<Logo class="size-20" />
	</header>
	<div class="flex flex-wrap px-2 max-lg:justify-center lg:flex-col">
		{#each categories as category (category.id)}
			<Button
				class="rounded-full border border-transparent px-3 py-1 text-lg hover:border-stone-600"
			>
				{category.name}
			</Button>
		{/each}
	</div>
	<Footer class="max-lg:hidden" />
	<div
		class="relative z-1 flex w-full items-center gap-4 rounded-2xl bg-gradient-to-br from-yellow-700 to-yellow-500 py-3 pr-5 pl-5 max-lg:hidden"
	>
		<div class="absolute inset-0.5 -z-1 rounded-xl bg-blue-900/80"></div>
		<img src={award2gis} alt="Award 2GIS" class="h-10 w-auto shrink-0" />
		<div class="flex flex-col">
			<p class="text-lg/6 font-bold text-white">Премия 2GIS</p>
			<p class="text-stone-300">Лучший ресторан</p>
		</div>
	</div>
</div>
