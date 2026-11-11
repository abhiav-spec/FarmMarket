import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { Product } from '@/types';
import { useHomeHeader } from '@/hooks/useHomeHeader';
import { shortLocationLabel, useAddress } from '@/context/AddressContext';

import {
  CategorySection,
  CropAdvisorBanner,
  EmptyState,
  HomeHeader,
  HomeSearchBar,
  ProductCard,
  ProductSection,
} from '@/components';

import {
  EQUIPMENT_PRODUCTS,
  FERTILIZER_PRODUCTS,
  HOME_CATEGORIES,
  HOME_HEADER_DATA,
  HOME_TOP_COMPANIES,
  PESTICIDE_PRODUCTS,
  SEEDS_PRODUCTS,
} from '@/constants';
import { COLORS, SEARCH_LAYOUT, SPACING } from '@/theme';
import { MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import { useCart } from '@/context/CartContext';
function toCartProduct(product: (typeof SEEDS_PRODUCTS)[number]): Product {
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
export function HomeScreen() {
  const router = useRouter();

  const header = useHomeHeader();
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = useMemo(
    () => [
      ...SEEDS_PRODUCTS,
      ...FERTILIZER_PRODUCTS,
      ...PESTICIDE_PRODUCTS,
      ...EQUIPMENT_PRODUCTS,
    ],
    [],
  );

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(trimmedQuery),
    );
  }, [allProducts, trimmedQuery, isSearching]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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
          onVoicePress={() => {}}
          onScanPress={() => {}}
          onWishlistPress={() => router.push('/wishlist')}
        />

        {isSearching ? (
          searchResults.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.grid}>
              {searchResults.map((product) => (
                <View key={product.id} style={styles.cardWrapper}>
                  <ProductCard
                    product={product}
                    onPress={() => router.push(`/product/${product.id}`)}
                    onAddToCart={() => cart.addItem(toCartProduct(product))}
                  />
                </View>
              ))}
            </View>
          )
        ) : (
          <>
            <CategorySection
              title="Shop by Category"
              categories={HOME_CATEGORIES}
              onCategoryPress={(category) => {
                if (category.id === 'farming-tools') {
                  router.push('/category/equipments');
                } else if (
                  category.id === 'pesticides' ||
                  category.id === 'fungicides'
                ) {
                  router.push('/category/pesticides');
                } else if (category.id === 'fertilizers') {
                  router.push('/category/fertilizers');
                } else if (category.id === 'seeds') {
                  router.push('/category/seeds');
                }
              }}
            />

            <CropAdvisorBanner
              onPress={() => router.push('/(main)/crop-advisor')}
            />

            <CategorySection
              title="Top Companies"
              categories={HOME_TOP_COMPANIES}
              marginTop={-70}
            />

            <ProductSection
              title="Recommended for you"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
              onAddToCart={(product) => cart.addItem(product)}
            />

            <ProductSection
              title="Seeds Section"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
              onViewAllPress={() => router.push('/category/seeds')}
              onAddToCart={(product) => cart.addItem(product)}
            />

            <ProductSection
              title="Fertilizers"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
              onViewAllPress={() => router.push('/category/fertilizers')}
              onAddToCart={(product) => cart.addItem(product)}
            />

            <ProductSection
              title="Pesticides"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
              onViewAllPress={() => router.push('/category/pesticides')}
              onAddToCart={(product) => cart.addItem(product)}
            />

            <ProductSection
              title="Equipment and Tools"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
              onViewAllPress={() => router.push('/category/equipments')}
              onAddToCart={(product) => cart.addItem(product)}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xxxl,
    flexGrow: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.xxxl,
  },
  cardWrapper: {
    width: SEARCH_LAYOUT.cardWidthPercent,
  },
});
