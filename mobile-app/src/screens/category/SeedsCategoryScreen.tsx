import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useHomeHeader } from '@/hooks/useHomeHeader';
import {
  CategoryHeroBanner,
  HomeHeader,
  HomeSearchBar,
  ProductCard,
} from '@/components';
import { CATEGORY_STRINGS } from '@/constants/categoryStrings';
import { SEEDS_BANNER, SEEDS_PRODUCTS } from '@/constants/seeds';
import { COLORS, SEARCH_LAYOUT, SPACING } from '@/theme';
import { useCart } from '@/context/CartContext';

import type { ProductItem } from '@/types/product';

function toCartProduct(product: ProductItem) {
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.image as number,
    variant: product.specs,
    pricePaise: product.pricePaise,
    mrpPaise: product.originalPricePaise,
    discountPercent: product.discountPercentage,
    category: product.category,
  };
}

export function SeedsCategoryScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const header = useHomeHeader();
  const filteredProducts = SEEDS_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleProductPress = (product: ProductItem) => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (product: ProductItem) => {
    addItem(toCartProduct(product));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={
          filteredProducts.length > 0 ? styles.row : undefined
        }
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <HomeHeader
              location={header.location}
              walletBalance={header.walletBalance}
              onLocationPress={header.onLocationPress}
              onNotificationPress={header.onNotificationPress}
              onWalletPress={header.onWalletPress}
              onCartPress={header.onCartPress}
              cartCount={header.cartCount}
            />

            <HomeSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={CATEGORY_STRINGS.searchPlaceholder}
              onVoicePress={() => {}}
              onScanPress={() => {}}
              onWishlistPress={() => router.push('/wishlist')}
            />

            <CategoryHeroBanner
              title={SEEDS_BANNER.title}
              subtitle={SEEDS_BANNER.subtitle}
              image={SEEDS_BANNER.image}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={item}
              onPress={handleProductPress}
              onAddToCart={handleAddToCart}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerArea: {
    marginBottom: SPACING.sm,
  },
  content: {
    paddingBottom: SPACING.xxxl,
    flexGrow: 1,
  },
  row: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: SEARCH_LAYOUT.cardWidthPercent,
  },
});
