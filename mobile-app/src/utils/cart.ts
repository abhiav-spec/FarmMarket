import type { Product } from '@/types';

export type CartProductRef = Product | string;

export function normalizeVariant(variant: string): string {
  return variant.toLowerCase().replace(/\s+/g, '');
}

export function isSameCartProduct(product: Product, reference: CartProductRef): boolean {
  if (typeof reference === 'string') return product.id === reference;
  return product.id === reference.id && normalizeVariant(product.variant) === normalizeVariant(reference.variant);
}

export function cartProductKey(product: Product): string {
  return `${product.id}:${normalizeVariant(product.variant)}`;
}
