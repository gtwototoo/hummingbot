<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Logo from '$lib/components/svg/Logo.svelte';
	import type { ItemCategory } from '$lib/types/iiko';
	import Footer from './Footer.svelte';

	type Category = Pick<ItemCategory, 'id' | 'name'>;

	let {
		categories
	}: {
		categories: Category[];
	} = $props();
</script>

<div
	class="sticky top-4 z-10 flex max-w-4xl items-start rounded-3xl bg-amber-50 p-2 pt-4 max-lg:pb-4 max-md:flex-col lg:flex-col"
>
	<div class="absolute inset-0 -z-1 size-full rounded-[inherit] bg-stone-500/10"></div>
	<header class="flex justify-center self-center p-2">
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
</div>
