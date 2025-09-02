import IikoClient from '$lib/iiko';
import type { ExternalMenu } from '$lib/types/iiko';
import { error } from '@sveltejs/kit';
import { IIKO_API_KEY, MENU_ID, ORGANIZATION_ID } from '../constants';
import type { PageServerLoad } from './$types';

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

	return list;
};

export const load: PageServerLoad = async () => {
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
