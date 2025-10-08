<script lang="ts">
	import Category from './Category.svelte';

	let { data } = $props();
	let container = $state<HTMLElement>();
</script>

<svelte:head>
	<title>TK13 (Кофейня Новокузнецка)</title>
	<meta name="description" content="Лучшие десерты и еда" />
</svelte:head>

<section class="flex flex-col justify-center px-6 max-md:px-4" bind:this={container}>
	{#each data.menu as category (category.id)}
		<Category {category} />
	{/each}
</section>
