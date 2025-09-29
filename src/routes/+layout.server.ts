import IikoClient from '$lib/iiko';
import type { ExternalMenu } from '$lib/types/externalMenu';
import { getFormattedMenuByExternalMenu } from '$lib/utils/formatting';
import { IIKO_API_KEY, MENU_ID, ORGANIZATION_ID } from '../constants';

export const load = async () => {
	const iikoClient = new IikoClient(IIKO_API_KEY);

	try {
		const menu = await iikoClient.post<ExternalMenu>('menu/by_id', {
			externalMenuId: MENU_ID,
			organizationIds: [ORGANIZATION_ID]
		});

		return {
			menu: getFormattedMenuByExternalMenu(menu)
		};
	} catch {
		return {
			menu: []
		};
	}
};
