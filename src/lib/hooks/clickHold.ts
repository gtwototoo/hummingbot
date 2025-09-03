import type { ActionReturn } from 'svelte/action';
import type { MouseEventHandler } from 'svelte/elements';

interface ClickHoldProps {
	onholdclick: MouseEventHandler<HTMLButtonElement>;
}

export const clickHold = (node: HTMLElement): ActionReturn<null, ClickHoldProps> => {
	const holdTime = 500;
	let mouseDown: boolean;
	let timer: number;

	const handleDown = (e: MouseEvent | TouchEvent) => {
		mouseDown = true;

		timer = window.setTimeout(() => {
			if (mouseDown) {
				node.dispatchEvent(new CustomEvent('holdclick', e));
			}
		}, holdTime);
	};

	const handleUp = () => {
		mouseDown = false;

		clearTimeout(timer);
	};

	node.addEventListener('mousedown', handleDown, true);
	node.addEventListener('mouseup', handleUp, true);
	node.addEventListener('touchstart', handleDown, true);
	node.addEventListener('touchend', handleUp, true);

	return {
		destroy() {
			node.removeEventListener('mousedown', handleDown, true);
			node.removeEventListener('mouseup', handleUp, true);
			node.removeEventListener('touchstart', handleDown, true);
			node.removeEventListener('touchend', handleUp, true);
		}
	};
};
