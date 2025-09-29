export interface Nomenclature {
	correlationId: string;
	groups: Group[];
	productCategories: ProductCategory[];
	products: Product[];
	sizes: Size[];
	revision: number;
}

export interface Group {
	imageLinks: string[];
	parentGroup: string | null;
	order: number;
	isIncludedInMenu: boolean;
	isGroupModifier: boolean;
	id: string;
	code: string | null;
	name: string;
	description: string | null;
	additionalInfo: string | null;
	tags: string[] | null;
	isDeleted?: boolean;
	seoDescription: string | null;
	seoText: string | null;
	seoKeywords: string | null;
	seoTitle: string | null;
}

export interface ProductCategory {
	id: string;
	name: string;
	isDeleted: boolean;
}

export interface Product {
	fatAmount: number | null;
	proteinsAmount: number | null;
	carbohydratesAmount: number | null;
	energyAmount: number | null;
	fatFullAmount: number | null;
	proteinsFullAmount: number | null;
	carbohydratesFullAmount: number | null;
	energyFullAmount: number | null;
	weight: number | null;
	groupId: string | null;
	productCategoryId: string | null;
	type: 'Dish' | 'Good' | 'Modifier' | null;
	orderItemType: 'Product' | 'Compound';
	modifierSchemaId: string | null;
	modifierSchemaName: string | null;
	splittable: boolean;
	measureUnit: string;
	sizePrices: SizePrice[];
	modifiers: Modifier[];
	groupModifiers: GroupModifier[];
	imageLinks: string[];
	doNotPrintInCheque: boolean;
	parentGroup: string | null;
	order: number;
	fullNameEnglish: string | null;
	useBalanceForSell: boolean;
	canSetOpenPrice: boolean;
	paymentSubject: string | null;
	id: string;
	code: string | null;
	name: string;
	description: string | null;
	additionalInfo: string | null;
	tags: string[] | null;
	isDeleted?: boolean;
	seoDescription: string | null;
	seoText: string | null;
	seoKeywords: string | null;
	seoTitle: string | null;
}

export interface SizePrice {
	sizeId: string;
	price: Price;
}

export interface Price {
	currentPrice: number;
	isIncludedInMenu: boolean;
	nextPrice: number;
	nextIncludedInMenu: boolean;
	nextDatePrice: string;
}

export interface Modifier {
	id: string;
	defaultAmount: number;
	minAmount: number;
	maxAmount: number;
	required: boolean;
	hideIfDefaultAmount: boolean;
	splittable: boolean;
	freeOfChargeAmount: number;
}

export interface GroupModifier {
	id: string;
	minAmount: number;
	maxAmount: number;
	required: boolean;
	childModifiersHaveMinMaxRestrictions: boolean;
	childModifiers: Modifier[];
	hideIfDefaultAmount: boolean;
	defaultAmount: number;
	splittable: boolean;
	freeOfChargeAmount: number;
}

export interface Size {
	id: string;
	name: string;
	priority: number | null;
	isDefault: boolean | null;
}
