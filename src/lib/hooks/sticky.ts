import type { ActionReturn } from 'svelte/action';

interface StickyProps {
	onchangevisible: (event: CustomEvent<IntersectionObserverEntry>) => void;
}

export const sticky = (node: HTMLElement): ActionReturn<null, StickyProps> => {
	const observer = new IntersectionObserver(
		([entry]) => {
			node.dispatchEvent(new CustomEvent('changevisible', { detail: entry }));
		},
		{ threshold: [1] }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
