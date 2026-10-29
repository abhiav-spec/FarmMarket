import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { CART_COPY } from '@/constants/config';
import { CART_TYPOGRAPHY, COLORS, PRODUCT_TYPOGRAPHY, UI } from '@/theme';
import { type Product } from '@/types';
import { formatPaise, getProductDiscountPercent } from '@/utils/price';

const VARIANTS = {
  cart: { price: CART_TYPOGRAPHY.itemPrice, mrp: CART_TYPOGRAPHY.itemMrp, discount: CART_TYPOGRAPHY.itemDiscount, mrpColor: COLORS.originalPrice },
  card: { price: CART_TYPOGRAPHY.recommendationPrice, mrp: CART_TYPOGRAPHY.recommendationMrp, discount: CART_TYPOGRAPHY.recommendationDiscount, mrpColor: COLORS.originalPrice },
  detail: { price: PRODUCT_TYPOGRAPHY.price, mrp: PRODUCT_TYPOGRAPHY.mrp, discount: PRODUCT_TYPOGRAPHY.discount, mrpColor: COLORS.productPackBorder },
} as const;

interface PriceTagProps {
  product: Product;
  variant: keyof typeof VARIANTS;
  style?: StyleProp<ViewStyle>;
}

/** Selling price, struck-through MRP and "% off" for a product. */
export function PriceTag({ product, variant, style }: PriceTagProps) {
  const typography = VARIANTS[variant];
  return (
    <View style={[styles.row, style]}>
      <AppText style={[typography.price, styles.accent]}>{formatPaise(product.pricePaise, variant !== 'cart')}</AppText>
      {product.mrpPaise > product.pricePaise && (
        <>
          <AppText style={[typography.mrp, styles.mrp, { color: typography.mrpColor }]}>{formatPaise(product.mrpPaise, true)}</AppText>
          <AppText style={[typography.discount, styles.accent]}>{CART_COPY.discount(getProductDiscountPercent(product))}</AppText>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: UI.compactGap },
  accent: { color: COLORS.purple },
  mrp: { textDecorationLine: 'line-through' },
});
