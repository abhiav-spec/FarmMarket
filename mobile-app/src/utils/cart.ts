import type { Product } from '@/types';

type ProductVariantRef = { id: string; variant?: string; specs?: string };

export type CartProductRef = ProductVariantRef | string;

export function normalizeVariant(variant?: string): string {
  return (variant ?? '').toLowerCase().replace(/\s+/g, '');
}

export function isSameCartProduct(product: ProductVariantRef, reference: CartProductRef): boolean {
  if (typeof reference === 'string') return product.id === reference;
  const productVariant = product.variant ?? product.specs;
  const referenceVariant = reference.variant ?? reference.specs;
  return product.id === reference.id && normalizeVariant(productVariant) === normalizeVariant(referenceVariant);
}

export function cartProductKey(product: Product): string {
  return `${product.id}:${normalizeVariant(product.variant)}`;
}
