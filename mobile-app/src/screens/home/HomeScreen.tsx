import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';

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

export function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = useMemo(
    () => [
      ...SEEDS_PRODUCTS,
      ...FERTILIZER_PRODUCTS,
      ...PESTICIDE_PRODUCTS,
      ...EQUIPMENT_PRODUCTS,
    ],
    []
  );

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(trimmedQuery)
    );
  }, [allProducts, trimmedQuery, isSearching]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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
          onVoicePress={() => {}}
          onScanPress={() => {}}
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
                    onPress={() => {}}
                    onAddToCart={() => {}}
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
                } else if (category.id === 'pesticides' || category.id === 'fungicides') {
                  router.push('/category/pesticides');
                } else if (category.id === 'fertilizers') {
                  router.push('/category/fertilizers');
                } else if (category.id === 'seeds') {
                  router.push('/category/seeds');
                }
              }}
            />

            <CropAdvisorBanner onPress={() => router.push('/(main)/crop-advisor')} />

            <CategorySection
              title="Top Companies"
              categories={HOME_TOP_COMPANIES}
              marginTop={-70}
            />

            <ProductSection
              title="Recommended for you"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onAddToCart={(product) => {
                // connect to CartContext here
              }}
            />

            <ProductSection
              title="Seeds Section"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onViewAllPress={() => router.push('/category/seeds')}
              onAddToCart={(product) => {
                // connect to CartContext here
              }}
            />

            <ProductSection
              title="Fertilizers"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onViewAllPress={() => router.push('/category/fertilizers')}
              onAddToCart={(product) => {
                // connect to CartContext here
              }}
            />

            <ProductSection
              title="Pesticides"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onViewAllPress={() => router.push('/category/pesticides')}
              onAddToCart={(product) => {
                // connect to CartContext here
              }}
            />

            <ProductSection
              title="Equipment and Tools"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onViewAllPress={() => router.push('/category/equipments')}
              onAddToCart={(product) => {
                // connect to CartContext here
              }}
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
