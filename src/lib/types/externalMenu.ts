export interface ExternalMenu {
	id: number;
	name: string;
	description: string;
	itemCategories: ItemCategory[];
}

export interface ItemCategory {
	id: string;
	name: string;
	description: string;
	buttonImageUrl: string;
	headerImageUrl: string;
	items: Item[];
}

export interface Item {
	sku: string;
	name: string;
	description: string;
	allergenGroups: AllergenGroup[];
	itemId: string;
	modifierSchemaId: string;
	taxCategory: TaxCategory;
	orderItemType: 'Product' | 'Service' | string;
	itemSizes: ItemSize[];
}

export interface ItemSize {
	sku: string;
	sizeCode: string;
	sizeName: string;
	isDefault: boolean;
	isHidden: boolean;
	portionWeightGrams: number;
	sizeId: string;
	nutritionPerHundredGrams: Record<string, unknown>;
	measureUnitType: string;
	buttonImageUrl: string;
	buttonImageCroppedUrl: string[];
	prices: Price[];
	itemModifierGroups: ItemModifierGroup[];
}

export interface Price {
	organizationId: string;
	price: number;
}

export interface ItemModifierGroup {
	name: string;
	description: string;
	restrictions: Restrictions;
	canBeDivided: boolean;
	itemGroupId: string;
	childModifiersHaveMinMaxRestrictions: boolean;
	sku: string;
	items: ModifierItem[];
}

export interface ModifierItem {
	sku: string;
	name: string;
	description: string;
	buttonImage: string;
	restrictions: Restrictions;
	allergenGroups: AllergenGroup[];
	nutritionPerHundredGrams: Record<string, unknown>;
	portionWeightGrams: number;
	tags: Tag[];
	itemId: string;
	prices: Price[];
}

export interface Restrictions {
	minQuantity: number;
	maxQuantity: number;
	freeQuantity: number;
	byDefault: number;
}

export interface AllergenGroup {
	id: string;
	code: string;
	name: string;
}

export interface Tag {
	id: string;
	name: string;
}

export interface TaxCategory {
	id: string;
	name: string;
	percentage: number;
}
