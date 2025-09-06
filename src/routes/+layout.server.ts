import IikoClient from '$lib/iiko';
import type { ExternalMenu } from '$lib/types/iiko';
import { error } from '@sveltejs/kit';
import { IIKO_API_KEY, MENU_ID, ORGANIZATION_ID } from '../constants';

const createFormattedMenu = (menu: ExternalMenu) => {
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

export const load = async () => {
	const iikoClient = new IikoClient(IIKO_API_KEY);

	const menu = await iikoClient.post<ExternalMenu>('menu/by_id', {
		externalMenuId: MENU_ID,
		organizationIds: [ORGANIZATION_ID]
	});

	if (menu)
		return {
			menu: createFormattedMenu(menu)
		};

	error(404, 'Not found');
};
