import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ProductCard } from '@/components/category/ProductCard';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS } from '@/theme';
import { type Product } from '@/types';
import { type ProductItem } from '@/types/product';

function toProductItem(product: Product): ProductItem {
  const image = typeof product.imageUrl === 'string' ? { uri: product.imageUrl } : product.imageUrl;
  const discountPercentage = product.discountPercent ?? Math.round(
    ((product.mrpPaise - product.pricePaise) / product.mrpPaise) * 100,
  );

  return {
    id: product.id,
    name: product.name,
    specs: product.variant,
    pricePaise: product.pricePaise,
    originalPricePaise: product.mrpPaise,
    discountPercentage,
    image,
    category: product.category,
  };
}

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
        {onViewMore ? (
          <Touchable onPress={onViewMore} title={CART_COPY.viewMore} textStyle={styles.viewMoreText} />
        ) : null}
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={toProductItem(item)}
              onPress={() => onProductPress?.(item)}
              onAddToCart={() => onAddToCart(item)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  listContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: CART_LAYOUT.recommendationGap,
    paddingHorizontal: CART_LAYOUT.sectionPadding,
  },
  cardWrapper: { width: 165 },
});
