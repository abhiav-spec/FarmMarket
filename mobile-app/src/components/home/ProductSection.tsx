import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ProductCard } from '@/components/common/ProductCard';
import { AppText } from '@/components/common/AppText';
import { COLORS, FONT_SIZE, LINE_HEIGHT, SPACING } from '@/theme';
import type { Product, ProductItem } from '@/types/product';

interface ProductSectionProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductPress?: (product: Product) => void;
  onViewAllPress?: () => void;
  marginTop?: number;
}

function toProductItem(product: Product): ProductItem {
  const image =
    typeof product.imageUrl === 'string'
      ? { uri: product.imageUrl }
      : product.imageUrl;

  const discountPercentage =
    product.discountPercent ??
    (product.mrpPaise > 0
      ? Math.round(
          ((product.mrpPaise - product.pricePaise) / product.mrpPaise) * 100,
        )
      : 0);

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

export function ProductSection({
  title,
  products,
  onAddToCart,
  onProductPress,
  onViewAllPress,
  marginTop = SPACING.lg,
}: ProductSectionProps) {
  return (
    <View style={[styles.container, { marginTop }]}>
      <View style={styles.header}>
        <AppText variant="body" style={styles.heading}>
          {title}
        </AppText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View all ${title}`}
          onPress={onViewAllPress}

          hitSlop={8}
        >
          <AppText
            variant="bodyMedium"
            style={[
              styles.viewAll,
              {
                fontSize: FONT_SIZE.sm,
                lineHeight: LINE_HEIGHT.sm,
              },
            ]}
          >
            View All
          </AppText>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  heading: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.text.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xs,
  },
  cardWrapper: {
    width: 165,
  },
  cardGap: {
    width: SPACING.md,
  },
  viewAll: {
    color: COLORS.purple,
  },
});
