import React from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY } from '@/theme';
import { type Product } from '@/types';
import { ProductRecommendationCard } from './ProductRecommendationCard';

interface ProductCarouselProps {
  title: string;
  products: readonly Product[];
  onAddToCart?: (product: Product) => void;
  onProductPress?: (product: Product) => void;
  style?: StyleProp<ViewStyle>;
}

/** Titled horizontal list of product cards used on the product details screen. */
export function ProductCarousel({ title, products, onAddToCart, onProductPress, style }: ProductCarouselProps) {
  if (!products.length || !onAddToCart) return null;
  return (
    <View style={style}>
      <AppText style={styles.title}>{title}</AppText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cards}>
        {products.map((item) => <ProductRecommendationCard key={item.id} product={item} onAddToCart={onAddToCart} onProductPress={onProductPress} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...PRODUCT_TYPOGRAPHY.smallSection, color: COLORS.text.black },
  cards: { gap: PRODUCT_LAYOUT.similarCardGap, marginTop: PRODUCT_LAYOUT.similarTitleGap },
});
