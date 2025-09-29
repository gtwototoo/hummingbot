import type { ExternalMenu } from '$lib/types/externalMenu';
import type { Nomenclature, Product, Size } from '$lib/types/nomenclature';

export const getFormattedMenuByExternalMenu = (menu: ExternalMenu) => {
	const list = menu.itemCategories.map(({ items, name, id }) => {
		return {
			id,
			name,
			items: items.map(({ name, description, itemSizes, itemId }) => {
				return {
					itemId,
					name,
					description,
					subitems: itemSizes
						.map(({ sizeName, prices, isHidden }) => {
							return {
								sizeName,
								isHidden,
								price: prices[0].price
							};
						})
						.sort((a, b) => a.price - b.price)
				};
			})
		};
	});

	for (const category of list) {
		if (category.items.length === 1 && category.name === category.items[0].name) {
			category.items = category.items[0].subitems.map(({ sizeName, price }, index) => {
				return {
					itemId: `${category.id}-${index}`,
					name: sizeName,
					description: '',
					subitems: [
						{
							sizeName: '',
							isHidden: false,
							price
						}
					]
				};
			});
		}
	}

	return list;
};

export const getFormattedMenuByNomenclature = (menu: Nomenclature) => {
	const list = menu.productCategories.map(({ id, name }) => {
		const itemsInCategory = menu.products.filter((p) => p.productCategoryId === id && !p.isDeleted);

		return {
			id,
			name,
			items: itemsInCategory.map((product: Product) => {
				return {
					itemId: product.id,
					name: product.name,
					description: product.description ?? '',
					subitems: product.sizePrices
						.map(({ sizeId, price }) => {
							const size: Size | undefined = menu.sizes.find((s) => s.id === sizeId);
							return {
								sizeName: size?.name ?? '',
								isHidden: size?.isDefault === false,
								price: price.currentPrice
							};
						})
						.sort((a, b) => a.price - b.price)
				};
			})
		};
	});

	for (const category of list) {
		if (category.items.length === 1 && category.name === category.items[0].name) {
			category.items = category.items[0].subitems.map(({ sizeName, price }, index) => {
				return {
					itemId: `${category.id}-${index}`,
					name: sizeName,
					description: '',
					subitems: [
						{
							sizeName: '',
							isHidden: false,
							price
						}
					]
				};
			});
		}
	}

	return list;
};
