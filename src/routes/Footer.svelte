<script lang="ts">
	import { cn } from '$lib/utils/classMerge';
	import { CREATOR_TG_LINK } from '../constants';
	import Award2Gis from './Award2Gis.svelte';

	let {
		class: classname
	}: {
		class?: string;
	} = $props();
</script>

<footer
	class={cn('flex w-full justify-center gap-3 pt-4 max-lg:items-center lg:flex-col', classname)}
>
	<p class="relative mx-5 my-2 text-sm text-stone-400">
		Made with <span class="absolute -top-2 left-17 text-2xl">❤️</span> <br />by
		<a href={CREATOR_TG_LINK} class="rounded-full bg-stone-500/50 px-2 py-0.5 text-white">
			@twototoo
		</a>
	</p>
	<Award2Gis />
</footer>
