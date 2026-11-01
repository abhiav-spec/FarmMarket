import React, { useCallback, useEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Modal, Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import {
  ProductCarousel,
  ProductDeliveryAddress,
  ProductGallery,
  ProductPackSelector,
  ProductReviews,
  RatingStars,
} from '@/components/product';
import { PriceTag } from '@/components/ui/PriceTag';
import { Touchable } from '@/components/ui/Touchable';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import {
  CART_COPY,
  PRODUCT_BENEFITS,
  PRODUCT_DETAIL_ADDRESS,
  PRODUCT_DETAIL_CONFIG,
  PRODUCT_DETAIL_COPY,
  PRODUCT_DETAIL_SECTIONS,
  PRODUCT_FAQS,
  PRODUCT_PACKS,
  PRODUCT_REVIEWS,
} from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { IMAGES, PRODUCT_DETAIL_GALLERY } from '@/constants/images';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useReviews } from '@/context/ReviewContext';
import {
  MOCK_CART_PRODUCTS,
  MOCK_RECOMMENDATION_PRODUCTS,
} from '@/data/mockProducts';
import { PRODUCT_CATALOG } from '@/data/productCatalog';
import type { Product, ProductPack } from '@/types';
import {
  COLORS,
  PRODUCT_LAYOUT,
  PRODUCT_TYPOGRAPHY,
  RADIUS,
  SIZES,
  UI,
} from '@/theme';
import { toImageSource } from '@/utils/image';
import { useGoBack } from '@/utils/navigation';

const ALL_PRODUCTS = PRODUCT_CATALOG;

const PACK_PRICE_MULTIPLIERS: Record<string, number> = {
  '100g': 0.4,
  '250g': 1,
  '500g': 1.9,
  '1kg': 3.6,
};

function productForPack(product: Product, pack: ProductPack): Product {
  const multiplier = PACK_PRICE_MULTIPLIERS[pack.id] ?? 1;
  return {
    ...product,
    variant: pack.label,
    pricePaise: Math.round(product.pricePaise * multiplier),
    mrpPaise: Math.round(product.mrpPaise * multiplier),
  };
}

function getProductGallery(product: (typeof ALL_PRODUCTS)[number]) {
  if (product.imageUrl === IMAGES.saaf) return PRODUCT_DETAIL_GALLERY;

  const alternateImage = product.id === 'prod-003' ? IMAGES.gromor : IMAGES.saaf;
  return [toImageSource(product.imageUrl), alternateImage] as const;
}

function productUse(category: string): string {
  const normalized = category.toLowerCase();
  if (normalized.includes('seed')) return 'planting and establishing healthy crops';
  if (normalized.includes('fertil')) return 'supporting crop nutrition and stronger growth';
  if (normalized.includes('equipment')) return 'everyday field work and farm operations';
  return 'protecting crops from common field threats';
}

function productInfo(product: (typeof ALL_PRODUCTS)[number], sectionId: string): string {
  if (sectionId === 'about') {
    return `${product.name}\n\nCategory: ${product.category}\nPack size: ${product.variant}\n\nDesigned for ${productUse(product.category)}. This product is selected for dependable performance and practical use on the farm.`;
  }

  return `${product.name} is supplied in the ${product.variant} pack. Use it only for its intended agricultural purpose and follow the instructions printed on the product label.\n\nStore in a cool, dry place away from children, food, and animal feed. Use the recommended protective equipment when handling the product.`;
}

function faqInfo(product: (typeof ALL_PRODUCTS)[number], faqId: string): string {
  const answers: Record<string, string> = {
    crop: `Check the product label to confirm that ${product.name} is approved for your crop and target issue before use.`,
    usage: `Use ${product.name} only as directed on the label. Follow the recommended application method, timing, and safety precautions.`,
    dosage: `Use the dosage printed on the product label for your crop and application method. Do not exceed the recommended dose.`,
    help: 'Our Crop Advisor can help you choose the right product and usage plan for your crop. Open Crop Advisor from the main navigation for assistance.',
  };
  return answers[faqId] ?? 'Please follow the product label or contact our Crop Advisor for help.';
}

export function ProductDetailsScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const { addItem, itemCount, items, config, removeItem } = useCart();
  const { isWished, toggle: toggleWishlist } = useWishlist();
  const { deleteReview, submittedReviews } = useReviews();
  const { id } = useLocalSearchParams<{ id: string }>();
  const goBack = useGoBack('/cart');
  const baseProduct =
    ALL_PRODUCTS.find((item) => item.id === id) ?? MOCK_CART_PRODUCTS[0];
  const [selectedPackId, setSelectedPackId] = useState(
    PRODUCT_DETAIL_CONFIG.initialPackId,
  );
  const resetProductPage = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  useFocusEffect(resetProductPage);
  useEffect(() => {
    setSelectedPackId(PRODUCT_DETAIL_CONFIG.initialPackId);
    resetProductPage();
  }, [id, resetProductPage]);
  useEffect(resetProductPage, [selectedPackId, resetProductPage]);

  const selectedPack = PRODUCT_PACKS.find((pack) => pack.id === selectedPackId) ?? PRODUCT_PACKS[0];
  const product = productForPack(baseProduct, selectedPack);
  const rating = product.rating ?? 0;
  const images = getProductGallery(product);
  const openProduct = (item: typeof product) =>
    router.push(`/product/${item.id}`);
  const saved = isWished(product.id);
  const toggleSaved = () => toggleWishlist(product.id);
  const [activeInfo, setActiveInfo] = useState<{ title: string; body: string } | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const shareProduct = () => Share.share({
    title: product.name,
    message: `Check out ${product.name} (${product.variant}) on FarmMarket: /product/${product.id}`,
  });
  const reviews = [
    ...submittedReviews.filter((review) => review.productId === product.id),
    ...PRODUCT_REVIEWS,
  ];

  return (
    <View style={styles.screen}>
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={PRODUCT_DETAIL_COPY.title}
          onBack={goBack}
          flat
          style={styles.header}
          actions={
            <>
              <Touchable label={CART_COPY.search}>
                <Image source={IMAGES.headerSearch} style={styles.headerIcon} />
              </Touchable>
              <Touchable
                onPress={toggleSaved}
                label={PRODUCT_DETAIL_COPY.wishlist}
                accessibilityState={{ selected: saved }}
              >
                <Ionicons
                  name={saved ? ICONS.heartFilled : ICONS.heart}
                  size={SIZES.cartHeaderIconSize}
                  color={saved ? COLORS.purple : COLORS.text.black}
                />
              </Touchable>
              <Touchable
                onPress={() => router.navigate('/cart')}
                label={PRODUCT_DETAIL_COPY.cart}
              >
                <View style={styles.cartAction}>
                  <Image
                    source={IMAGES.productHeaderCart}
                    style={styles.headerIcon}
                    resizeMode="contain"
                    accessible={false}
                  />
                  <AppText style={styles.cartCount}>{itemCount}</AppText>
                </View>
              </Touchable>
            </>
          }
        />
        <ProductGallery
          key={product.id}
          images={images}
          name={product.name}
          saved={saved}
          onSave={toggleSaved}
          onShare={shareProduct}
        />
        <View style={styles.content}>
          <AppText style={styles.name}>{product.name}</AppText>
          <View style={styles.rating}>
            <RatingStars size={SIZES.productStarSize} filledStars={rating} />
            <AppText style={styles.reviews}>
              {PRODUCT_DETAIL_COPY.reviews}
            </AppText>
          </View>
          <PriceTag
            product={product}
            variant="detail"
            style={styles.priceRow}
          />
          <ProductPackSelector
            key={baseProduct.id}
            packs={PRODUCT_PACKS}
            selectedId={selectedPackId}
            onChange={(pack) => setSelectedPackId(pack.id)}
          />
          <View style={styles.benefits}>
            {PRODUCT_BENEFITS.map((benefit) => (
              <Image
                key={benefit.label}
                source={IMAGES[benefit.imageKey]}
                style={styles.benefitImage}
                resizeMode="contain"
                accessibilityLabel={benefit.label}
              />
            ))}
          </View>
          <PurchaseActions
            quantity={items.find((item) => item.product.id === product.id)?.quantity}
            minQuantity={config.MIN_QUANTITY_PER_ITEM}
            maxQuantity={config.MAX_QUANTITY_PER_ITEM}
            onAddToCart={() => addItem(product)}
            onRemoveFromCart={() => removeItem(product.id)}
            onBuyNow={() => {
              addItem(product);
              router.push('/checkout/payment');
            }}
          />
          <ProductDeliveryAddress address={PRODUCT_DETAIL_ADDRESS} />
          <View style={styles.detailsSection}>
            <AppText style={styles.sectionTitle}>
              {PRODUCT_DETAIL_COPY.productDetails}
            </AppText>
            <View style={styles.detailRows}>
              {PRODUCT_DETAIL_SECTIONS.map((section) => (
                <Touchable
                  key={section.id}
                  onPress={() => setActiveInfo({
                    title: section.title,
                    body: productInfo(product, section.id)
                  })}
                  label={section.title}
                  accessibilityState={{ expanded: activeInfo?.title === section.title }}
                  hitSlop={0}
                  style={styles.detailRow}
                >
                  <AppText style={styles.detailRowText}>{section.title}</AppText>
                  <Ionicons name={ICONS.chevronRight} size={SIZES.productActionIconSize} color={COLORS.text.black} />
                </Touchable>
              ))}
            </View>
          </View>
          <View style={styles.videoSection}>
            <AppText style={styles.videoTitle}>
              {PRODUCT_DETAIL_COPY.watchVideo}
            </AppText>
            <AppText style={styles.videoDescription}>
              {PRODUCT_DETAIL_COPY.videoDescription}
            </AppText>
            <Touchable
              label={PRODUCT_DETAIL_COPY.watchVideo}
              hitSlop={0}
              style={styles.videoPreview}
            />
          </View>
          <View style={styles.returnsSection}>
            <Touchable
              title={PRODUCT_DETAIL_COPY.returns}
              textStyle={styles.returnsTitle}
              hitSlop={0}
            />
            <AppText style={styles.returnsDescription}>
              {PRODUCT_DETAIL_COPY.returnsDescription}
            </AppText>
          </View>
          <ProductCarousel
            title={PRODUCT_DETAIL_COPY.similarProducts}
            products={MOCK_RECOMMENDATION_PRODUCTS}
            onAddToCart={addItem}
            onProductPress={openProduct}
            style={styles.similarSection}
          />
          <ProductReviews
            rating={rating}
            reviews={reviews}
            onDelete={deleteReview}
            onEdit={(reviewId) =>
              router.push({
                pathname: '/reviews',
                params: { productId: product.id, reviewId },
              })
            }
            onWriteReview={() =>
              router.push({
                pathname: '/reviews',
                params: { entryId: String(Date.now()), productId: product.id },
              })
            }
          />
          <ProductCarousel
            title={PRODUCT_DETAIL_COPY.recommendedProducts}
            products={MOCK_RECOMMENDATION_PRODUCTS}
            onAddToCart={addItem}
            onProductPress={openProduct}
            style={styles.recommendedSection}
          />
          <View style={styles.faqSection}>
            <AppText style={styles.faqTitle}>{PRODUCT_DETAIL_COPY.faq}</AppText>
            <View style={styles.faqRows}>
              {PRODUCT_FAQS.map((faq) => (
                <React.Fragment key={faq.id}>
                  <Touchable
                  onPress={() => setExpandedFaqId((current) => current === faq.id ? null : faq.id)}
                  label={faq.title}
                  accessibilityState={{ expanded: expandedFaqId === faq.id }}
                  hitSlop={0}
                  style={styles.faqRow}
                  >
                    <AppText style={styles.faqQuestion}>{faq.title}</AppText>
                    <Ionicons name={expandedFaqId === faq.id ? ICONS.chevronDown : ICONS.chevronRight} size={SIZES.reviewStarSize} color={COLORS.text.secondary} />
                  </Touchable>
                  {expandedFaqId === faq.id ? (
                    <AppText style={styles.faqAnswer}>{faqInfo(product, faq.id)}</AppText>
                  ) : null}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={activeInfo !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveInfo(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveInfo(null)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>{activeInfo?.title}</AppText>
              <Touchable
                title="×"
                label="Close"
                hitSlop={0}
                onPress={() => setActiveInfo(null)}
                textStyle={styles.modalClose}
              />
            </View>
            <AppText style={styles.modalBody}>{activeInfo?.body}</AppText>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function PurchaseActions({
  quantity,
  minQuantity,
  maxQuantity,
  onAddToCart,
  onRemoveFromCart,
  onBuyNow,
}: {
  quantity?: number;
  minQuantity: number;
  maxQuantity: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
  onBuyNow: () => void;
}) {
  const [buttonWidth, setButtonWidth] = useState<number>(
    SIZES.productPurchaseButtonWidth,
  );
  return (
    <View
      style={styles.purchaseActions}
      onLayout={({ nativeEvent }) =>
        setButtonWidth(
          (nativeEvent.layout.width - PRODUCT_LAYOUT.purchaseGap) / 2,
        )
      }
    >
      {quantity ? (
        <View style={[styles.quantityButton, { width: buttonWidth }]}>
          <QuantityStepper
            quantity={quantity}
            size="card"
            min={minQuantity}
            max={maxQuantity}
            onDecrement={onRemoveFromCart}
            onIncrement={onAddToCart}
          />
        </View>
      ) : (
        <Touchable
          onPress={onAddToCart}
          label={PRODUCT_DETAIL_COPY.addToCart}
          hitSlop={0}
          style={[
            styles.purchaseButton,
            styles.addButton,
            { width: buttonWidth },
          ]}
        >
          <AppText style={styles.addButtonText} numberOfLines={1}>
            {PRODUCT_DETAIL_COPY.addToCart}
          </AppText>
        </Touchable>
      )}
      <Touchable
        onPress={onBuyNow}
        label={PRODUCT_DETAIL_COPY.buyNow}
        hitSlop={0}
        style={[
          styles.purchaseButton,
          styles.buyButton,
          { width: buttonWidth },
        ]}
      >
        <AppText style={styles.buyButtonText} numberOfLines={1}>
          {PRODUCT_DETAIL_COPY.buyNow}
        </AppText>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: SIZES.productHeaderHeight,
    paddingTop: PRODUCT_LAYOUT.headerTopInset,
    paddingHorizontal: PRODUCT_LAYOUT.contentPadding,
    gap: PRODUCT_LAYOUT.headerTitleGap,
    backgroundColor: 'transparent',
  },
  headerIcon: {
    width: SIZES.cartHeaderIconSize,
    height: SIZES.cartHeaderIconSize,
  },
  cartAction: { position: 'relative' },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.purple,
    color: COLORS.text.inverse,
    fontSize: 9,
    lineHeight: 16,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: PRODUCT_LAYOUT.contentPadding,
    paddingBottom: PRODUCT_LAYOUT.contentPadding,
  },
  name: { ...PRODUCT_TYPOGRAPHY.name, color: COLORS.text.black },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: PRODUCT_LAYOUT.ratingTopGap,
  },
  reviews: {
    ...PRODUCT_TYPOGRAPHY.reviews,
    marginLeft: PRODUCT_LAYOUT.reviewGap,
    color: COLORS.text.black,
  },
  priceRow: {
    width: SIZES.productPriceRowWidth,
    height: SIZES.productPriceRowHeight + 14,
    marginTop: PRODUCT_LAYOUT.priceTopGap,
  },
  benefits: {
    height: SIZES.productBenefitsHeight,
    backgroundColor: COLORS.productBenefits,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: PRODUCT_LAYOUT.benefitsTopGap,
  },
  benefitImage: {
    width: SIZES.productBenefitImageWidth,
    height: SIZES.productBenefitImageHeight,
    flexShrink: 1,
  },
  purchaseActions: {
    marginTop: PRODUCT_LAYOUT.purchaseTopGap,
    flexDirection: 'row',
    gap: PRODUCT_LAYOUT.purchaseGap,
  },
  purchaseButton: {
    height: SIZES.productPurchaseButtonHeight,
    borderRadius: RADIUS.xs,
    borderWidth: UI.borderWidth,
    borderColor: COLORS.purple,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: PRODUCT_LAYOUT.purchasePaddingVertical,
    paddingHorizontal: PRODUCT_LAYOUT.purchasePaddingHorizontal,
  },
  addButton: { backgroundColor: COLORS.productActionSurface },
  quantityButton: {
    height: SIZES.stepperHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: PRODUCT_LAYOUT.buyNowPaddingHorizontal,
  },
  addButtonText: {
    ...PRODUCT_TYPOGRAPHY.pack,
    color: COLORS.text.black,
    flexShrink: 0,
    width: SIZES.productPurchaseLabelWidth,
    maxWidth: SIZES.productPurchaseLabelWidth,
  },
  buyButtonText: {
    ...PRODUCT_TYPOGRAPHY.pack,
    color: COLORS.text.inverse,
    flexShrink: 0,
    width: SIZES.productBuyNowLabelWidth,
    maxWidth: SIZES.productBuyNowLabelWidth,
  },
  sectionTitle: { ...PRODUCT_TYPOGRAPHY.section, color: COLORS.text.black },
  detailsSection: { marginTop: PRODUCT_LAYOUT.detailsTopGap },
  detailRows: {
    marginTop: PRODUCT_LAYOUT.detailsTitleGap,
    gap: PRODUCT_LAYOUT.detailRowGap,
  },
  detailRow: {
    height: SIZES.productDetailRowHeight,
    borderWidth: UI.borderWidth,
    borderColor: COLORS.productDetailBorder,
    borderRadius: RADIUS.xs,
    paddingHorizontal: PRODUCT_LAYOUT.detailRowPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailRowText: { ...PRODUCT_TYPOGRAPHY.detailRow, color: COLORS.text.black },
  detailContent: {
    ...PRODUCT_TYPOGRAPHY.detailRow,
    padding: PRODUCT_LAYOUT.detailRowPadding,
    color: COLORS.text.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    paddingHorizontal: PRODUCT_LAYOUT.contentPadding,
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: PRODUCT_LAYOUT.contentPadding,
    boxShadow: UI.headerShadow,
    elevation: UI.elevation,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: PRODUCT_LAYOUT.detailRowPadding,
  },
  modalTitle: { ...PRODUCT_TYPOGRAPHY.section, color: COLORS.text.black },
  modalClose: { fontSize: 28, lineHeight: 28, color: COLORS.text.secondary },
  modalBody: {
    ...PRODUCT_TYPOGRAPHY.detailRow,
    color: COLORS.text.dark,
    lineHeight: 22,
  },
  videoSection: { marginTop: PRODUCT_LAYOUT.videoTopGap },
  videoTitle: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.black },
  videoDescription: {
    ...PRODUCT_TYPOGRAPHY.videoCaption,
    color: COLORS.text.dark,
    marginTop: PRODUCT_LAYOUT.videoDescriptionGap,
  },
  videoPreview: {
    height: SIZES.productVideoHeight,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.productVideo,
    marginTop: PRODUCT_LAYOUT.videoPreviewGap,
  },
  returnsSection: {
    marginTop: PRODUCT_LAYOUT.returnsTopGap,
    maxWidth: SIZES.productReturnsWidth,
  },
  returnsTitle: { ...PRODUCT_TYPOGRAPHY.returns, color: COLORS.purple },
  returnsDescription: {
    ...PRODUCT_TYPOGRAPHY.returnsDescription,
    color: COLORS.text.dark,
    marginTop: PRODUCT_LAYOUT.returnsDescriptionGap,
  },
  similarSection: { marginTop: PRODUCT_LAYOUT.similarTopGap },
  recommendedSection: { marginTop: PRODUCT_LAYOUT.recommendedTopGap },
  faqSection: { marginTop: PRODUCT_LAYOUT.faqTopGap },
  faqTitle: {
    ...PRODUCT_TYPOGRAPHY.faqTitle,
    color: COLORS.text.black,
    alignSelf: 'flex-start',
  },
  faqRows: {
    marginTop: PRODUCT_LAYOUT.faqTitleGap,
    gap: PRODUCT_LAYOUT.faqRowGap,
  },
  faqRow: {
    minHeight: SIZES.productFaqRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestion: { ...PRODUCT_TYPOGRAPHY.faq, color: COLORS.text.dark, flex: 1 },
  faqAnswer: {
    ...PRODUCT_TYPOGRAPHY.faq,
    color: COLORS.text.dark,
    paddingVertical: PRODUCT_LAYOUT.detailRowPadding,
  },
});
