import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import {
  CategoryHeroBanner,
  HomeHeader,
  HomeSearchBar,
  ProductCard,
} from '@/components';
import { CATEGORY_STRINGS } from '@/constants/categoryStrings';
import { HOME_HEADER_DATA } from '@/constants/home';
import {
  SEEDS_BANNER,
  SEEDS_PRODUCTS,
} from '@/constants/seeds';
import { COLORS, SEARCH_LAYOUT, SPACING } from '@/theme';
import type { ProductItem } from '@/types/product';

export function SeedsCategoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = SEEDS_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product: ProductItem) => {
    // Navigate / handle product press
  };

  const handleAddToCart = (product: ProductItem) => {
    // Add to cart handler
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={filteredProducts.length > 0 ? styles.row : undefined}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            <HomeHeader
              location={HOME_HEADER_DATA.location}
              walletBalance={HOME_HEADER_DATA.walletBalance}
              onLocationPress={() => {}}
              onNotificationPress={() => {}}
              onWalletPress={() => {}}
              onCartPress={() => {}}
            />

            <HomeSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={CATEGORY_STRINGS.searchPlaceholder}
              onVoicePress={() => {}}
              onScanPress={() => {}}
              onWishlistPress={() => {}}
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
