import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProductRecommendationCard } from '@/components/product/ProductRecommendationCard';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS } from '@/theme';
import { type Product } from '@/types';

interface RecommendationCarouselProps {
  title: string;
  products: readonly Product[];
  onViewMore?: () => void;
  onAddToCart: (product: Product) => void;
  onProductPress?: (product: Product) => void;
}

export function RecommendationCarousel({ title, products, onViewMore, onAddToCart, onProductPress }: RecommendationCarouselProps) {
  if (products.length === 0) return null;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.titleText}>{title}</AppText>
        <Touchable onPress={onViewMore} title={CART_COPY.viewMore} textStyle={styles.viewMoreText} />
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => <ProductRecommendationCard product={item} onAddToCart={onAddToCart} onProductPress={onProductPress} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CART_LAYOUT.recommendationHeight,
    marginTop: CART_LAYOUT.recommendationTopGap,
    backgroundColor: COLORS.purpleSurface,
    paddingTop: CART_LAYOUT.recommendationPaddingTop,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: CART_LAYOUT.sectionPadding,
    marginBottom: CART_LAYOUT.recommendationHeaderGap,
  },
  titleText: { ...CART_TYPOGRAPHY.sectionTitle, color: COLORS.text.black },
  viewMoreText: { ...CART_TYPOGRAPHY.viewMore, color: COLORS.text.purple },
  listContent: { paddingHorizontal: CART_LAYOUT.sectionPadding, gap: CART_LAYOUT.recommendationGap },
});
