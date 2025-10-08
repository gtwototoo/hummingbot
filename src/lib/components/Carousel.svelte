<script lang="ts">
	import type { Snippet } from 'svelte';

	import { carouselStore } from '$lib/stores/carousel.svelte';
	import { cn } from '$lib/utils/classMerge';
	import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
	import emblaCarouselSvelte from 'embla-carousel-svelte';

	let {
		children,
		class: classname
	}: {
		children: Snippet;
		class: string;
	} = $props();

	const options: EmblaOptionsType = {
		align: 'start',
		dragFree: true
	};

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		carouselStore.init(event.detail);
	}
</script>

<div
	class={cn('overflow-hidden py-1', classname)}
	use:emblaCarouselSvelte={{ options, plugins: [] }}
	onemblaInit={onInit}
>
	{@render children?.()}
</div>
