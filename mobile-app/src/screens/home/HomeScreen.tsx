import { RecommendationCarousel } from '@/components/cart';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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
import { RecommendationCarousel } from '@/components/cart';
import { CART_COPY } from '@/constants/config';
const CATEGORY_BANNERS = [
  {
    id: 'smart-tools',
    image: require('../../../assets/images/categories/smarttoolsbanner.png'),
    route: '/category/equipments',
  },
  {
    id: 'fertilizers',
    image: require('../../../assets/images/categories/fertilizerbanner.png'),
    route: '/category/fertilizers',
  },
  {
    id: 'pesticides',
    image: require('../../../assets/images/categories/pesticidebanner.png'),
    route: '/category/pesticides',
  },
  {
    id: 'seeds',
    image: require('../../../assets/images/categories/seedsbanner.png'),
    route: '/category/seeds',
  },
];
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
  const { width } = useWindowDimensions();
  const bannerWidth = width - SPACING.md * 2;
  const bannerScrollRef = useRef<ScrollView>(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((previousIndex) => {
        const nextIndex =
          previousIndex >= CATEGORY_BANNERS.length - 1 ? 0 : previousIndex + 1;

        bannerScrollRef.current?.scrollTo({
          x: nextIndex * (bannerWidth + SPACING.md),
          animated: nextIndex !== 0,
        });

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerWidth]);
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
          onVoicePress={() =>
            Alert.alert(
              'Voice search',
              'Please type your search in the search bar.',
            )
          }
          onScanPress={() =>
            Alert.alert(
              'QR scanner',
              'QR scanning will be available when camera access is enabled.',
            )
          }
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
            {/* Auto-scrolling Category Banner Carousel */}
            <ScrollView
              ref={bannerScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={bannerWidth + SPACING.md}
              decelerationRate="fast"
              contentContainerStyle={styles.bannerContainer}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x /
                    (bannerWidth + SPACING.md),
                );

                setCurrentBannerIndex(
                  Math.min(index, CATEGORY_BANNERS.length - 1),
                );
              }}
            >
              {CATEGORY_BANNERS.map((banner) => (
                <Pressable
                  key={banner.id}
                  style={{ width: bannerWidth }}
                  onPress={() => router.push(banner.route)}
                  accessibilityRole="button"
                  accessibilityLabel={`Explore ${banner.id}`}
                >
                  <Image
                    source={banner.image}
                    style={styles.categoryBanner}
                    resizeMode="contain"
                  />
                </Pressable>
              ))}
            </ScrollView>
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

            <RecommendationCarousel
              title="Recommended products"
              products={MOCK_RECOMMENDATION_PRODUCTS}
              onAddToCart={cart.addItem}
              onProductPress={(product) =>
                router.push(`/product/${product.id}`)
              }
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
  bannerContainer: {
    paddingHorizontal: SPACING.md,
    gap: SPACING.md,
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },

  categoryBanner: {
    width: '100%',
    height: 155,
    borderRadius: 12,
  },
});
