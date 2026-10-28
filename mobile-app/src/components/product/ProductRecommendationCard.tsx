import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { PriceTag } from '@/components/ui/PriceTag';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, RADIUS, SIZES, UI } from '@/theme';
import { type Product } from '@/types';
import { toImageSource } from '@/utils/image';

interface ProductRecommendationCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductPress?: (product: Product) => void;
}

export function ProductRecommendationCard({ product, onAddToCart, onProductPress }: ProductRecommendationCardProps) {
  return (
    <View style={styles.container}>
      <Touchable style={styles.imageContainer} onPress={onProductPress && (() => onProductPress(product))} label={product.name} hitSlop={0}>
        <Image source={toImageSource(product.imageUrl)} style={styles.image} resizeMode="contain" accessibilityLabel={product.name} />
      </Touchable>
      <View style={styles.info}>
        <AppText style={styles.productTitle} numberOfLines={1}>{product.name}</AppText>
        <AppText style={styles.variantText}>{product.variant}</AppText>
        <PriceTag product={product} variant="card" />
      </View>
      <Touchable onPress={() => onAddToCart(product)} label={CART_COPY.addProduct(product.name)} hitSlop={0} style={styles.addButton}>
        <Ionicons name={ICONS.cart} size={SIZES.recommendationIconWidth} color={COLORS.purple} style={styles.cartIcon} />
        <AppText style={styles.buttonText} numberOfLines={1}>{CART_COPY.addToCart}</AppText>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.recommendationCardWidth,
    height: SIZES.recommendationCardHeight,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: UI.borderWidth,
    borderColor: COLORS.purpleBorder,
    padding: CART_LAYOUT.cardPadding,
    overflow: 'hidden',
  },
  imageContainer: { height: SIZES.recommendationCardImageHeight, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  info: { flex: 1, justifyContent: 'flex-start', gap: CART_LAYOUT.cardPadding, paddingTop: UI.tightGap },
  productTitle: { ...CART_TYPOGRAPHY.recommendationName, color: COLORS.text.black },
  variantText: { ...CART_TYPOGRAPHY.recommendationVariant, color: COLORS.text.dark },
  addButton: {
    width: SIZES.recommendationButtonWidth,
    height: SIZES.recommendationButtonHeight,
    alignSelf: 'center',
    borderRadius: CART_LAYOUT.recommendationButtonRadius,
    paddingVertical: CART_LAYOUT.recommendationButtonPaddingVertical,
    paddingHorizontal: CART_LAYOUT.recommendationButtonPaddingHorizontal,
    borderWidth: UI.fineBorderWidth,
    borderColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: CART_LAYOUT.cardPadding,
    backgroundColor: COLORS.purpleLight,
    marginBottom: CART_LAYOUT.cardContentGap,
  },
  cartIcon: { flexShrink: 0, width: SIZES.recommendationIconWidth, height: SIZES.recommendationIconHeight, lineHeight: SIZES.recommendationIconHeight },
  buttonText: { ...CART_TYPOGRAPHY.recommendationButton, flexShrink: 0, color: COLORS.purple },
});
