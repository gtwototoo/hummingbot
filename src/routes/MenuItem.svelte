<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { Item, ItemSize } from '$lib/types/externalMenu';
	import { cn } from '$lib/utils/classMerge';
	import { hasTypos } from '$lib/utils/debug';

	type CustomItemSize = Pick<ItemSize, 'sizeName' | 'isHidden'> & { price: number };

	let {
		debugMode,
		item
	}: {
		debugMode: boolean;
		item: Pick<Item, 'name' | 'itemId'> & { subitems: CustomItemSize[] };
	} = $props();

	let active = $state(false);

	const calculateAdditionalPrice = (subitems: CustomItemSize[], currentPrice: number) => {
		const lowestPrice = subitems.reduce((acc, item) => Math.min(acc, item.price), currentPrice);

		return currentPrice - lowestPrice;
	};

	const initPrice = $derived(item.subitems[0].price);
	const priceString = $derived(initPrice ? `${initPrice}₽` : 'Нет цены');
	const visibleSubitems = $derived(item.subitems.filter(({ isHidden }) => !isHidden));
</script>

<Button
	class="flex items-center justify-between gap-3 p-3 font-light"
	onclick={() => (active = true)}
>
	<div class="flex flex-1 flex-col">
		<p class={cn('text-xl/8 max-md:text-lg', debugMode && hasTypos(item.name) && 'bg-red-400')}>
			{item.name}
		</p>
		{#if !(visibleSubitems.length === 1 && visibleSubitems[0].sizeName === '')}
			<div class="inline-flex flex-wrap text-stone-400 max-md:text-sm">
				{#each visibleSubitems as subitem, index (subitem.sizeName)}
					{@const additionalPrice = calculateAdditionalPrice(item.subitems, subitem.price)}
					<span
						class={cn('whitespace-nowrap', debugMode && hasTypos(subitem.sizeName) && 'bg-red-400')}
					>
						{subitem.sizeName}{additionalPrice ? ` (+${additionalPrice}₽)` : ''}
					</span>
					{#if index !== visibleSubitems.length - 1}
						<span class="mx-1.5">/</span>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<p class={cn('text-xl max-md:text-lg', !initPrice && debugMode && 'bg-red-400')}>
		{priceString}
	</p>
</Button>
<Modal bind:active class="flex gap-4 p-6 max-md:flex-col max-md:items-center max-md:p-4">
	<div
		class="flex size-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-stone-600"
	>
		<img class="bg-stone-100 bg-cover" alt={item.name} src="/coffee.jpg" />
	</div>
	<div class="flex flex-col gap-2 px-4 max-md:items-center">
		<h2 class="text-3xl max-md:text-2xl">{item.name}</h2>
		<p class="text-2xl text-stone-700">{priceString}</p>
		{#if item.subitems.length !== 1}
			<div class="flex flex-col items-center gap-1">
				<p class="text-lg text-stone-950">Вариации:</p>
				<div
					class="grid grid-flow-col grid-rows-4 gap-x-4 gap-y-1 text-lg text-stone-500 max-md:justify-items-center"
				>
					{#each item.subitems as subitem (subitem.sizeName)}
						{@const additionalPrice = calculateAdditionalPrice(item.subitems, subitem.price)}
						<p>
							{subitem.sizeName}{additionalPrice ? ` (+${additionalPrice}₽)` : ''}
						</p>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</Modal>
