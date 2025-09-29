<script lang="ts">
	import '../app.css';
	import Footer from './Footer.svelte';
	import LeftSide from './LeftSide.svelte';

	import '../fonts/Montserrat.css';

	let { children, data } = $props();
</script>

<div
	class="flex min-h-screen items-start gap-10 max-lg:flex-col max-lg:items-center max-md:gap-6 max-md:p-6 max-sm:p-4 md:p-10"
>
	<LeftSide categories={data.menu} />
	<main class="mx-auto box-border flex max-w-4xl flex-1 flex-col">
		{@render children()}
	</main>
	<Footer class="lg:hidden" />
</div>
