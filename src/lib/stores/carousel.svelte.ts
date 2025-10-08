import type { EmblaCarouselType } from 'embla-carousel';

const getCarouselStore = () => {
	let _carousel = $state<EmblaCarouselType>();

	return {
		init(carousel: EmblaCarouselType) {
			_carousel = carousel;
		},
		get carousel() {
			return _carousel;
		}
	};
};

export const carouselStore = getCarouselStore();
