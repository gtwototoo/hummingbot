<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { fade, fly } from 'svelte/transition';

	import { cn } from '$lib/utils/classMerge';

	type EventHandler = MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>;

	let {
		active = $bindable(),
		class: classname,
		children,
		onclick
	}: {
		active: boolean;
		class?: string;
		children?: Snippet<[{ onclick: EventHandler }]>;
		onclick?: EventHandler;
	} = $props();

	let previouslyFocused = $state<Element | null>(null);
	let offsetHeight = $state(0);
	let innerHeight = $state(0);

	const createPortal = (node: HTMLElement, parent?: HTMLElement) => {
		(parent || document.body).appendChild(node);

		return {
			destroy() {
				node.remove();
				document.body.classList.remove('overflow-hidden');
			}
		};
	};

	const handleClose: EventHandler = (e) => {
		active = false;

		onclick?.(e);
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key !== 'Escape' || !active) return;

		active = false;
	};

	const switchBodyOverflow = (active: boolean) => {
		const body = document.body;

		if (active) {
			body.classList.add('overflow-hidden');

			previouslyFocused = document.activeElement;
		} else {
			body.classList.remove('overflow-hidden');

			if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
		}
	};

	$effect(() => {
		switchBodyOverflow(active);
	});
</script>

<svelte:window on:keydown={handleKeydown} bind:innerHeight />

{#if active}
	<div
		transition:fade
		use:createPortal
		class="fixed top-0 left-0 z-[1000] flex size-full items-center justify-center bg-stone-400/20 select-none"
	>
		<div
			class={cn(
				'flex size-full justify-center overflow-auto bg-transparent',
				innerHeight < offsetHeight ? 'items-start' : 'items-center'
			)}
			in:fly={{ y: 100 }}
		>
			<button class="fixed size-full" aria-label="Close" onclick={handleClose}></button>
			<div
				bind:offsetHeight
				class={cn('relative z-10 m-6 rounded-2xl bg-amber-50 max-sm:m-4', classname)}
			>
				{@render children?.({ onclick: handleClose })}
			</div>
		</div>
	</div>
{/if}
