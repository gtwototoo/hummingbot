<script lang="ts">
	import '../app.css';
	import { CREATOR_TG_LINK } from '../constants';

	let { children } = $props();
</script>

<div class="flex min-h-screen gap-6 p-10">
	<div class="flex flex-col items-center">
		<header>
			<p class="text-5xl font-bold">TK13</p>
		</header>
		<div class="flex flex-col"></div>
		<footer>
			<p class="rounded-lg bg-gray-100 px-2 py-1 text-sm/4 font-bold">
				Made with ❤️ <br />by
				<a href={CREATOR_TG_LINK} class="rounded-full bg-gray-950 px-2 py-0.5 text-white">
					@twototoo
				</a>
			</p>
		</footer>
	</div>
	<main class="mx-auto box-border flex max-w-5xl flex-1 flex-col">
		{@render children()}
	</main>
</div>
