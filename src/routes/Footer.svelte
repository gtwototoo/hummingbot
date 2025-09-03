<script lang="ts">
	import { CREATOR_TG_LINK } from '../constants';

	let {
		class: classname
	}: {
		class?: string;
	} = $props();
</script>

<footer class={classname}>
	<p class="relative px-5 pt-3 text-sm text-stone-400">
		Made with <span class="absolute top-1.5 left-22 text-2xl">❤️</span> <br />by
		<a href={CREATOR_TG_LINK} class="rounded-full bg-stone-500/50 px-2 py-0.5 text-white">
			@twototoo
		</a>
	</p>
</footer>
