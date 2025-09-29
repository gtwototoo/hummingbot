<script lang="ts">
	import type { Snippet } from 'svelte';

	import { cn } from '$lib/utils/classMerge';
	import type { EmblaOptionsType } from 'embla-carousel';
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
</script>

<div
	class={cn('overflow-hidden py-1', classname)}
	use:emblaCarouselSvelte={{ options, plugins: [] }}
>
	{@render children?.()}
</div>
