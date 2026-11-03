import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  CategoryHeroBanner,
  HomeHeader,
  HomeSearchBar,
  ProductCard,
} from '@/components';
import { CATEGORY_STRINGS } from '@/constants/categoryStrings';
import { HOME_HEADER_DATA } from '@/constants/home';
import {
  PESTICIDE_BANNER,
  PESTICIDE_PRODUCTS,
} from '@/constants/pesticide';
import { COLORS, SPACING } from '@/theme';
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

export function PesticideCategoryScreen() {
  const router = useRouter();
  const { addItem, itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PESTICIDE_PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        columnWrapperStyle={styles.row}
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
              cartCount={itemCount}
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
              title={PESTICIDE_BANNER.title}
              subtitle={PESTICIDE_BANNER.subtitle}
              image={PESTICIDE_BANNER.image}
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
  },
  row: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
});
