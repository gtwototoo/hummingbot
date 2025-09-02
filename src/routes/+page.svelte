<script lang="ts">
	import { cn } from '$lib/helpers/classes';
	import type { ItemSize } from '$lib/types/iiko.js';

	let { data } = $props();

	const calculateAdditionalPrice = (
		subitems: (Pick<ItemSize, 'sizeName' | 'isHidden'> & { price: number })[],
		currentPrice: number
	) => {
		const lowestPrice = subitems.reduce((acc, item) => Math.min(acc, item.price), currentPrice);

		return currentPrice - lowestPrice;
	};

	function hasTypos(name: string): boolean {
		return / {2,}/.test(name) || /^\s/.test(name) || /\s$/.test(name) || /^[a-zа-я]/.test(name);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center gap-3">
	{#each data.menu as category (category.id)}
		<div class="flex flex-col gap-1 rounded-2xl border border-gray-600 p-4">
			<h2 class={cn(hasTypos(category.name) && 'bg-red-400')}>{category.name}</h2>
			{#each category.items as item (item.itemId)}
				<div class="flex justify-between font-light">
					<div class="flex flex-col">
						<p class={cn('text-xl', hasTypos(item.name) && 'bg-red-400')}>{item.name}</p>
						{#if item.subitems.length !== 1}
							<p class="text-gray-400">
								{item.subitems
									.map(({ sizeName, price }) => {
										const additionalPrice = calculateAdditionalPrice(item.subitems, price);

										return sizeName + (additionalPrice ? ` (+${additionalPrice}₽)` : '');
									})
									.join(' / ')}
							</p>
						{/if}
					</div>
					<p class="text-xl">{item.subitems[0].price}₽</p>
				</div>
			{/each}
		</div>
	{/each}
</section>
