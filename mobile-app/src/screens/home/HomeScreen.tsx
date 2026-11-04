import React, { useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import {
  CategorySection,
  CropAdvisorBanner,
  HomeHeader,
  HomeSearchBar,
  ProductSection,
} from '@/components';
import { RecommendationCarousel } from '@/components/cart';
import { CART_COPY } from '@/constants/config';
import {
  HOME_CATEGORIES,
  HOME_HEADER_DATA,
  HOME_TOP_COMPANIES,
} from '@/constants/home';
import { MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import { useCart } from '@/context/CartContext';
import { COLORS, SPACING } from '@/theme';

export function HomeScreen() {
  const router = useRouter();
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = MOCK_RECOMMENDATION_PRODUCTS.filter((product) => product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));

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
          onCartPress={() => router.push('/(main)/cart')}
          cartCount={cart.itemCount}
        />

        <HomeSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onVoicePress={() => Alert.alert('Voice search', 'Please type your search in the search bar.')}
          onScanPress={() => Alert.alert('QR scanner', 'QR scanning will be available when camera access is enabled.')}
          onWishlistPress={() => router.push('/wishlist')}
        />

        {searchQuery.trim() ? (
          <ProductSection
            title="Search results"
            products={searchResults}
            onProductPress={(product) => router.push(`/product/${product.id}`)}
            onAddToCart={(product) => cart.addItem(product)}
          />
        ) : <CategorySection
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
        />}

        <CropAdvisorBanner
          onPress={() => router.push('/(main)/crop-advisor')}
        />

        <CategorySection
          title="Top Companies"
          categories={HOME_TOP_COMPANIES}
          marginTop={-70}
        />

        {!searchQuery.trim() && <ProductSection
          title="Recommended for you"
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          onAddToCart={(product) => cart.addItem(product)}
        />}

        {!searchQuery.trim() && <ProductSection
          title="Seeds Section"
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          onViewAllPress={() => router.push('/category/seeds')}
          onAddToCart={(product) => cart.addItem(product)}
        />}

        {!searchQuery.trim() && <ProductSection
          title="Fertilizers"
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          onViewAllPress={() => router.push('/category/fertilizers')}
          onAddToCart={(product) => cart.addItem(product)}
        />}

        {!searchQuery.trim() && <ProductSection
          title="Pesticides"
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          onViewAllPress={() => router.push('/category/pesticides')}
          onAddToCart={(product) => cart.addItem(product)}
        />}

        {!searchQuery.trim() && <ProductSection
          title="Equipment and Tools"
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          onViewAllPress={() => router.push('/category/equipments')}
          onAddToCart={(product) => cart.addItem(product)}
        />}

        {!searchQuery.trim() && <RecommendationCarousel
          title={CART_COPY.recommendations}
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onAddToCart={cart.addItem}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
        />}
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
  },
});
