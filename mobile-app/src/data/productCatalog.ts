import { EQUIPMENT_PRODUCTS } from '@/constants/equipment';
import { FERTILIZER_PRODUCTS } from '@/constants/fertilizer';
import { PESTICIDE_PRODUCTS } from '@/constants/pesticide';
import { SEEDS_PRODUCTS } from '@/constants/seeds';
import { MOCK_CART_PRODUCTS, MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import type { Product } from '@/types';

const CATEGORY_PRODUCTS: Product[] = [
  ...SEEDS_PRODUCTS,
  ...PESTICIDE_PRODUCTS,
  ...FERTILIZER_PRODUCTS,
  ...EQUIPMENT_PRODUCTS,
].map((item) => ({
  id: item.id,
  name: item.name,
  imageUrl: item.image as number,
  variant: item.specs,
  pricePaise: item.pricePaise,
  mrpPaise: item.originalPricePaise,
  discountPercent: item.discountPercentage,
  category: item.category,
}));

export const PRODUCT_CATALOG: Product[] = [
  ...MOCK_CART_PRODUCTS,
  ...MOCK_RECOMMENDATION_PRODUCTS,
  ...CATEGORY_PRODUCTS,
];
