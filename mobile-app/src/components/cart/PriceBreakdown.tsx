import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, SIZES, UI } from '@/theme';
import { type CartPriceSummary } from '@/types';
import { formatPaise, formatPaiseCompact } from '@/utils/price';

export function PriceBreakdown({ summary }: { summary: CartPriceSummary }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{CART_COPY.priceDetails}</AppText>
      <View style={styles.row}>
        <AppText style={styles.body}>{CART_COPY.productPrice}</AppText>
        <AppText style={styles.body}>{CART_COPY.pricePrefix}{formatPaiseCompact(summary.productTotalPaise)}</AppText>
      </View>
      <View style={styles.row}>
        <AppText style={styles.shipping}>{CART_COPY.shipping}</AppText>
        {summary.isShippingFree ? (
          <View style={styles.shippingValue}>
            <AppText style={styles.shipping}>{CART_COPY.freeShipping}</AppText>
            <AppText style={styles.shippingStrikethrough}>{CART_COPY.pricePrefix}{formatPaiseCompact(summary.shippingOriginalPaise, true)}</AppText>
          </View>
        ) : (
          <AppText style={styles.body}>{CART_COPY.pricePrefix}{formatPaiseCompact(summary.shippingPaise)}</AppText>
        )}
      </View>
      <View style={styles.dashedDivider} />
      <View style={styles.row}>
        <AppText style={styles.body}>{CART_COPY.orderTotal}</AppText>
        <AppText style={styles.orderTotalValue}>{formatPaise(summary.orderTotalPaise)}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.priceDetailsHeight,
    backgroundColor: COLORS.priceSurface,
    marginTop: CART_LAYOUT.priceTopGap,
    paddingHorizontal: CART_LAYOUT.sectionPadding,
    paddingTop: CART_LAYOUT.pricePaddingTop,
  },
  title: { ...CART_TYPOGRAPHY.priceTitle, color: COLORS.text.black, marginBottom: CART_LAYOUT.priceTitleGap, alignSelf: 'flex-start' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: CART_LAYOUT.priceRowGap },
  body: { ...CART_TYPOGRAPHY.body },
  shipping: { ...CART_TYPOGRAPHY.shipping, color: COLORS.stepperGreen },
  shippingValue: { flexDirection: 'row', alignItems: 'center', gap: CART_LAYOUT.shippingPriceGap },
  shippingStrikethrough: { ...CART_TYPOGRAPHY.body, color: COLORS.originalPrice, textDecorationLine: 'line-through' },
  dashedDivider: { borderBottomWidth: UI.borderWidth, borderBottomColor: COLORS.cardBorder, borderStyle: 'dashed', marginVertical: CART_LAYOUT.priceDividerGap },
  orderTotalValue: { ...CART_TYPOGRAPHY.itemPrice, color: COLORS.purple },
});
