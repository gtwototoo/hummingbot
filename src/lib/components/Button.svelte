<script lang="ts">
	import type {
		HTMLAnchorAttributes,
		HTMLButtonAttributes,
		MouseEventHandler
	} from 'svelte/elements';

	import { clickHold } from '$lib/hooks/clickHold';
	import { cn } from '$lib/utils/classMerge';

	import Dots from './svg/Dots.svelte';

	let {
		onholdclick,
		disabled = false,
		loading = false,
		class: classname,
		asLink = false,
		ref = $bindable(),
		children,
		onclick,
		...props
	}: {
		asLink?: boolean;
		onholdclick?: MouseEventHandler<HTMLButtonElement>;
		ref?: HTMLButtonElement | HTMLAnchorElement;
		loading?: boolean;
	} & HTMLButtonAttributes &
		HTMLAnchorAttributes = $props();

	const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (disabled) return;

		onclick?.(e);
	};

	const handleHoldClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		if (disabled) return;

		onholdclick?.(e);
	};
</script>

<svelte:element
	this={asLink ? 'a' : 'button'}
	class={cn(
		'relative flex cursor-pointer items-center text-left transition-opacity select-none',
		loading && '!text-transparent *:invisible',
		(disabled || loading) && 'pointer-events-none cursor-default opacity-50',
		classname
	)}
	onclick={handleClick}
	onholdclick={handleHoldClick}
	use:clickHold
	role="button"
	tabindex="0"
	{...props}
	bind:this={ref}
>
	{#if children}
		{@render children()}
	{/if}
	{#if loading}
		<div
			class="!visible absolute top-0 left-0 flex size-full items-center justify-center bg-transparent p-2 text-white"
		>
			<Dots class="h-full w-auto" />
		</div>
	{/if}
</svelte:element>
