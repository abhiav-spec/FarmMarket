import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { ProductCarousel, ProductDeliveryAddress, ProductGallery, ProductPackSelector, ProductReviews, RatingStars } from '@/components/product';
import { Accordion } from '@/components/ui/Accordion';
import { PriceTag } from '@/components/ui/PriceTag';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY, PRODUCT_BENEFITS, PRODUCT_DETAIL_ADDRESS, PRODUCT_DETAIL_COPY, PRODUCT_DETAIL_SECTIONS, PRODUCT_FAQS, PRODUCT_PACKS, PRODUCT_REVIEWS } from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { IMAGES, PRODUCT_DETAIL_GALLERY } from '@/constants/images';
import { useCart } from '@/context/CartContext';
import { MOCK_CART_PRODUCTS, MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY, RADIUS, SIZES, UI } from '@/theme';
import { toImageSource } from '@/utils/image';
import { useGoBack } from '@/utils/navigation';

const ALL_PRODUCTS = [...MOCK_CART_PRODUCTS, ...MOCK_RECOMMENDATION_PRODUCTS];

export function ProductDetailsScreen() {
  const router = useRouter();
  const { addItem } = useCart();
  const { id } = useLocalSearchParams<{ id: string }>();
  const goBack = useGoBack('/cart');
  const [saved, setSaved] = useState(false);
  const product = ALL_PRODUCTS.find((item) => item.id === id) ?? MOCK_CART_PRODUCTS[0];
  const rating = product.rating ?? 0;
  const images = product.imageUrl === IMAGES.saaf ? PRODUCT_DETAIL_GALLERY : [toImageSource(product.imageUrl)];
  const openProduct = (item: typeof product) => router.push(`/product/${item.id}`);
  const toggleSaved = () => setSaved(!saved);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={PRODUCT_DETAIL_COPY.title}
          onBack={goBack}
          flat
          style={styles.header}
          actions={<>
            <Touchable label={CART_COPY.search}><Image source={IMAGES.headerSearch} style={styles.headerIcon} /></Touchable>
            <Touchable onPress={toggleSaved} label={PRODUCT_DETAIL_COPY.wishlist} accessibilityState={{ selected: saved }}>
              <Ionicons name={saved ? ICONS.heartFilled : ICONS.heart} size={SIZES.cartHeaderIconSize} color={saved ? COLORS.purple : COLORS.text.black} />
            </Touchable>
            <Touchable onPress={() => router.navigate('/cart')} label={PRODUCT_DETAIL_COPY.cart}><Image source={IMAGES.productHeaderCart} style={styles.headerIcon} resizeMode="contain" accessible={false} /></Touchable>
          </>}
        />
        <ProductGallery key={product.id} images={images} name={product.name} saved={saved} onSave={toggleSaved} />
        <View style={styles.content}>
          <AppText style={styles.name}>{product.name}</AppText>
          <View style={styles.rating}>
            <RatingStars size={SIZES.productStarSize} filledStars={rating} />
            <AppText style={styles.reviews}>{PRODUCT_DETAIL_COPY.reviews}</AppText>
          </View>
          <PriceTag product={product} variant="detail" style={styles.priceRow} />
          <ProductPackSelector packs={PRODUCT_PACKS} />
          <View style={styles.benefits}>
            {PRODUCT_BENEFITS.map((benefit) => <Image key={benefit.label} source={IMAGES[benefit.imageKey]} style={styles.benefitImage} resizeMode="contain" accessibilityLabel={benefit.label} />)}
          </View>
          <PurchaseActions onAddToCart={() => addItem(product)} onBuyNow={() => { addItem(product); router.push('/checkout/payment'); }} />
          <ProductDeliveryAddress address={PRODUCT_DETAIL_ADDRESS} />
          <View style={styles.detailsSection}>
            <AppText style={styles.sectionTitle}>{PRODUCT_DETAIL_COPY.productDetails}</AppText>
            <Accordion items={PRODUCT_DETAIL_SECTIONS} style={styles.detailRows} rowStyle={styles.detailRow} titleStyle={styles.detailRowText} contentStyle={styles.detailContent} iconSize={SIZES.productActionIconSize} iconColor={COLORS.text.black} />
          </View>
          <View style={styles.videoSection}>
            <AppText style={styles.videoTitle}>{PRODUCT_DETAIL_COPY.watchVideo}</AppText>
            <AppText style={styles.videoDescription}>{PRODUCT_DETAIL_COPY.videoDescription}</AppText>
            <Touchable label={PRODUCT_DETAIL_COPY.watchVideo} hitSlop={0} style={styles.videoPreview} />
          </View>
          <View style={styles.returnsSection}>
            <Touchable title={PRODUCT_DETAIL_COPY.returns} textStyle={styles.returnsTitle} hitSlop={0} />
            <AppText style={styles.returnsDescription}>{PRODUCT_DETAIL_COPY.returnsDescription}</AppText>
          </View>
          <ProductCarousel title={PRODUCT_DETAIL_COPY.similarProducts} products={MOCK_RECOMMENDATION_PRODUCTS} onAddToCart={addItem} onProductPress={openProduct} style={styles.similarSection} />
          <ProductReviews rating={rating} reviews={PRODUCT_REVIEWS} />
          <ProductCarousel title={PRODUCT_DETAIL_COPY.recommendedProducts} products={MOCK_RECOMMENDATION_PRODUCTS} onAddToCart={addItem} onProductPress={openProduct} style={styles.recommendedSection} />
          <View style={styles.faqSection}>
            <AppText style={styles.faqTitle}>{PRODUCT_DETAIL_COPY.faq}</AppText>
            <Accordion items={PRODUCT_FAQS} style={styles.faqRows} rowStyle={styles.faqRow} titleStyle={styles.faqQuestion} contentStyle={styles.faqAnswer} iconSize={SIZES.reviewStarSize} iconColor={COLORS.text.secondary} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function PurchaseActions({ onAddToCart, onBuyNow }: { onAddToCart: () => void; onBuyNow: () => void }) {
  const [buttonWidth, setButtonWidth] = useState<number>(SIZES.productPurchaseButtonWidth);
  return (
    <View style={styles.purchaseActions} onLayout={({ nativeEvent }) => setButtonWidth((nativeEvent.layout.width - PRODUCT_LAYOUT.purchaseGap) / 2)}>
      <Touchable onPress={onAddToCart} label={PRODUCT_DETAIL_COPY.addToCart} hitSlop={0} style={[styles.purchaseButton, styles.addButton, { width: buttonWidth }]}>
        <AppText style={styles.addButtonText} numberOfLines={1}>{PRODUCT_DETAIL_COPY.addToCart}</AppText>
      </Touchable>
      <Touchable onPress={onBuyNow} label={PRODUCT_DETAIL_COPY.buyNow} hitSlop={0} style={[styles.purchaseButton, styles.buyButton, { width: buttonWidth }]}>
        <AppText style={styles.buyButtonText} numberOfLines={1}>{PRODUCT_DETAIL_COPY.buyNow}</AppText>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: { height: SIZES.productHeaderHeight, paddingTop: PRODUCT_LAYOUT.headerTopInset, paddingHorizontal: PRODUCT_LAYOUT.contentPadding, gap: PRODUCT_LAYOUT.headerTitleGap, backgroundColor: 'transparent' },
  headerIcon: { width: SIZES.cartHeaderIconSize, height: SIZES.cartHeaderIconSize },
  content: { paddingHorizontal: PRODUCT_LAYOUT.contentPadding, paddingBottom: PRODUCT_LAYOUT.contentPadding },
  name: { ...PRODUCT_TYPOGRAPHY.name, color: COLORS.text.black },
  rating: { flexDirection: 'row', alignItems: 'center', marginTop: PRODUCT_LAYOUT.ratingTopGap },
  reviews: { ...PRODUCT_TYPOGRAPHY.reviews, marginLeft: PRODUCT_LAYOUT.reviewGap, color: COLORS.text.black },
  priceRow: { width: SIZES.productPriceRowWidth, height: SIZES.productPriceRowHeight, marginTop: PRODUCT_LAYOUT.priceTopGap },
  benefits: { height: SIZES.productBenefitsHeight, backgroundColor: COLORS.productBenefits, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: PRODUCT_LAYOUT.benefitsTopGap },
  benefitImage: { width: SIZES.productBenefitImageWidth, height: SIZES.productBenefitImageHeight, flexShrink: 1 },
  purchaseActions: { marginTop: PRODUCT_LAYOUT.purchaseTopGap, flexDirection: 'row', gap: PRODUCT_LAYOUT.purchaseGap },
  purchaseButton: { height: SIZES.productPurchaseButtonHeight, borderRadius: RADIUS.xs, borderWidth: UI.borderWidth, borderColor: COLORS.purple, justifyContent: 'center', alignItems: 'center', paddingVertical: PRODUCT_LAYOUT.purchasePaddingVertical, paddingHorizontal: PRODUCT_LAYOUT.purchasePaddingHorizontal },
  addButton: { backgroundColor: COLORS.productActionSurface },
  buyButton: { backgroundColor: COLORS.purple, paddingHorizontal: PRODUCT_LAYOUT.buyNowPaddingHorizontal },
  addButtonText: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.black, flexShrink: 0, width: SIZES.productPurchaseLabelWidth, maxWidth: SIZES.productPurchaseLabelWidth },
  buyButtonText: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.inverse, flexShrink: 0, width: SIZES.productBuyNowLabelWidth, maxWidth: SIZES.productBuyNowLabelWidth },
  sectionTitle: { ...PRODUCT_TYPOGRAPHY.section, color: COLORS.text.black },
  detailsSection: { marginTop: PRODUCT_LAYOUT.detailsTopGap },
  detailRows: { marginTop: PRODUCT_LAYOUT.detailsTitleGap, gap: PRODUCT_LAYOUT.detailRowGap },
  detailRow: { height: SIZES.productDetailRowHeight, borderWidth: UI.borderWidth, borderColor: COLORS.productDetailBorder, borderRadius: RADIUS.xs, paddingHorizontal: PRODUCT_LAYOUT.detailRowPadding, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  detailRowText: { ...PRODUCT_TYPOGRAPHY.detailRow, color: COLORS.text.black },
  detailContent: { ...PRODUCT_TYPOGRAPHY.detailRow, padding: PRODUCT_LAYOUT.detailRowPadding, color: COLORS.text.dark },
  videoSection: { marginTop: PRODUCT_LAYOUT.videoTopGap },
  videoTitle: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.black },
  videoDescription: { ...PRODUCT_TYPOGRAPHY.videoCaption, color: COLORS.text.dark, marginTop: PRODUCT_LAYOUT.videoDescriptionGap },
  videoPreview: { height: SIZES.productVideoHeight, borderRadius: RADIUS.lg, backgroundColor: COLORS.productVideo, marginTop: PRODUCT_LAYOUT.videoPreviewGap },
  returnsSection: { marginTop: PRODUCT_LAYOUT.returnsTopGap, maxWidth: SIZES.productReturnsWidth },
  returnsTitle: { ...PRODUCT_TYPOGRAPHY.returns, color: COLORS.purple },
  returnsDescription: { ...PRODUCT_TYPOGRAPHY.returnsDescription, color: COLORS.text.dark, marginTop: PRODUCT_LAYOUT.returnsDescriptionGap },
  similarSection: { marginTop: PRODUCT_LAYOUT.similarTopGap },
  recommendedSection: { marginTop: PRODUCT_LAYOUT.recommendedTopGap },
  faqSection: { marginTop: PRODUCT_LAYOUT.faqTopGap },
  faqTitle: { ...PRODUCT_TYPOGRAPHY.faqTitle, color: COLORS.text.black, alignSelf: 'flex-start' },
  faqRows: { marginTop: PRODUCT_LAYOUT.faqTitleGap, gap: PRODUCT_LAYOUT.faqRowGap },
  faqRow: { minHeight: SIZES.productFaqRowHeight, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQuestion: { ...PRODUCT_TYPOGRAPHY.faq, color: COLORS.text.dark, flex: 1 },
  faqAnswer: { ...PRODUCT_TYPOGRAPHY.faq, color: COLORS.text.dark, paddingVertical: PRODUCT_LAYOUT.detailRowPadding },
});
