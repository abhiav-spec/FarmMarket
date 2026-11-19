import React from 'react';
import { FlatList, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ProductCard } from '@/components/category/ProductCard';
import { AppText } from '@/components/common/AppText';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY, SPACING } from '@/theme';
import { type Product } from '@/types';
import { type ProductItem } from '@/types/product';

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
  const toProductItem = (product: Product): ProductItem => ({
    id: product.id,
    name: product.name,
    specs: product.variant,
    pricePaise: product.pricePaise,
    originalPricePaise: product.mrpPaise,
    discountPercentage: product.discountPercent ?? 0,
    image: typeof product.imageUrl === 'string' ? { uri: product.imageUrl } : product.imageUrl,
    category: product.category,
  });

  return (
    <View style={style}>
      <AppText style={styles.title}>{title}</AppText>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cards}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
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
  title: { ...PRODUCT_TYPOGRAPHY.smallSection, color: COLORS.text.black, marginBottom: PRODUCT_LAYOUT.similarTitleGap },
  cards: { paddingBottom: SPACING.xs },
  cardWrapper: { width: 165 },
  cardGap: { width: SPACING.md },
});
