import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import {
  CategorySection,
  CropAdvisorBanner,
  HomeHeader,
  HomeSearchBar,
} from '@/components';
import { RecommendationCarousel } from '@/components/cart';
import { CART_COPY } from '@/constants/config';
import { useCart } from '@/context/CartContext';
import { MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import {
  HOME_CATEGORIES,
  HOME_HEADER_DATA,
  HOME_TOP_COMPANIES,
} from '@/constants/home';
import { COLORS, SPACING } from '@/theme';

export function HomeScreen() {
  const router = useRouter();
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState('');

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

        <CategorySection
          title="Shop by Category"
          categories={HOME_CATEGORIES}
        />
        <CropAdvisorBanner />
        <CategorySection
          title="Top Companies"
          categories={HOME_TOP_COMPANIES}
          marginTop={-70}
        />
        <RecommendationCarousel
          title={CART_COPY.recommendations}
          products={MOCK_RECOMMENDATION_PRODUCTS}
          onAddToCart={cart.addItem}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
        />
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
