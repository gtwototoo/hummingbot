<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { ItemSize } from '$lib/types/iiko';
	import { cn } from '$lib/utils/classMerge';

	let { data } = $props();

	const debugMode = false;

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
				{@const initPrice = item.subitems[0].price}
				<Button class="flex items-start justify-between gap-3 font-light">
					<div class="flex flex-1 flex-col">
						<p
							class={cn('text-xl max-md:text-lg', debugMode && hasTypos(item.name) && 'bg-red-400')}
						>
							{item.name}
						</p>
						{#if item.subitems.length !== 1}
							<div class="inline-flex flex-wrap text-stone-400 max-md:text-sm">
								{#each item.subitems as subitem, index (subitem.sizeName)}
									{@const additionalPrice = calculateAdditionalPrice(item.subitems, subitem.price)}
									<span
										class={cn(
											'whitespace-nowrap',
											debugMode && hasTypos(subitem.sizeName) && 'bg-red-400'
										)}
									>
										{subitem.sizeName}{additionalPrice ? ` (+${additionalPrice}₽)` : ''}
									</span>
									{#if index !== item.subitems.length - 1}
										<span class="mx-1.5 text-stone-400">/</span>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
					<p class={cn('text-xl max-md:text-lg', !initPrice && debugMode && 'bg-red-400')}>
						{initPrice ? `${initPrice}₽` : 'Нет цены'}
					</p>
				</Button>
			{/each}
		</div>
	{/each}
</section>
