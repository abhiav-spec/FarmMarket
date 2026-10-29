import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AddressBar, CartBottomBar, CartItemCard, CouponBanner, PriceBreakdown, RecommendationCarousel } from '@/components/cart';
import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { useCart } from '@/context/CartContext';
import { MOCK_ADDRESS } from '@/data/mockAddress';
import { MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import { CART_LAYOUT, COLORS, SIZES, SPACING } from '@/theme';

export function CartScreen() {
  const router = useRouter();
  const { items, priceSummary, config, addItem, removeItem, deleteItem } = useCart();

  const header = (
    <ScreenHeader
      title={CART_COPY.title}
      onBack={() => router.replace('/home')}
      actions={<>
        <Touchable label={CART_COPY.search}><Image source={IMAGES.headerSearch} style={styles.headerIcon} resizeMode="contain" accessible={false} /></Touchable>
        <Touchable label={CART_COPY.wishlist}><Image source={IMAGES.headerHeart} style={styles.headerIcon} resizeMode="contain" accessible={false} /></Touchable>
      </>}
    />
  );

  if (items.length === 0) {
    return (
      <View style={styles.screen}>
        {header}
        <View style={styles.emptyContainer}>
          <AppIcon name="cart" size="lg" color={COLORS.text.muted} />
          <AppText variant="subheading" color={COLORS.text.secondary} style={styles.emptyText}>{CART_COPY.emptyTitle}</AppText>
          <AppText variant="caption" color={COLORS.text.muted}>{CART_COPY.emptyDescription}</AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {header}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AddressBar address={MOCK_ADDRESS} />
        {items.map((item) => (
          <CartItemCard
            key={item.product.id}
            item={item}
            minQuantity={config.MIN_QUANTITY_PER_ITEM}
            maxQuantity={config.MAX_QUANTITY_PER_ITEM}
            onIncrement={() => addItem(item.product)}
            onDecrement={() => removeItem(item.product.id)}
            onDelete={() => deleteItem(item.product.id)}
          />
        ))}
        <CouponBanner />
        <RecommendationCarousel title={CART_COPY.recommendations} products={MOCK_RECOMMENDATION_PRODUCTS} onAddToCart={addItem} onProductPress={(product) => router.push(`/product/${product.id}`)} />
        <PriceBreakdown summary={priceSummary} />
      </ScrollView>
      <CartBottomBar totalPaise={priceSummary.orderTotalPaise} onContinue={() => router.push('/checkout/payment')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  headerIcon: { width: SIZES.cartHeaderIconSize, height: SIZES.cartHeaderIconSize },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: CART_LAYOUT.footerWhitespace },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.background, paddingHorizontal: SPACING.xxxl },
  emptyText: { marginTop: SPACING.lg, marginBottom: SPACING.sm },
});
