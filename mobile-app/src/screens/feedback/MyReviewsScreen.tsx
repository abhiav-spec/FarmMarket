import React, { useMemo } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { useReviews } from '@/context/ReviewContext';
import {
  MOCK_CART_PRODUCTS,
  MOCK_RECOMMENDATION_PRODUCTS,
} from '@/data/mockProducts';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

const products = [...MOCK_CART_PRODUCTS, ...MOCK_RECOMMENDATION_PRODUCTS];

export function MyReviewsScreen() {
  const router = useRouter();
  const { submittedReviews } = useReviews();
  const reviewsByProduct = useMemo(() => {
    return submittedReviews.reduce<Map<string, typeof submittedReviews>>(
      (groups, review) => {
        const current = groups.get(review.productId) ?? [];
        groups.set(review.productId, [...current, review]);
        return groups;
      },
      new Map(),
    );
  }, [submittedReviews]);

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="My Reviews"
        onBackPress={() =>
          router.canGoBack() ? router.back() : router.replace('/(main)/profile')
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        {reviewsByProduct.size === 0 ? (
          <View style={styles.emptyState}>
            <AppText style={styles.emptyTitle}>No reviews yet</AppText>
            <AppText style={styles.emptyCopy}>
              Your product reviews will appear here.
            </AppText>
          </View>
        ) : (
          [...reviewsByProduct.entries()].map(([productId, reviews]) => {
            const product = products.find((item) => item.id === productId);
            const productName = product?.name ?? 'Product review';

            return (
              <View key={productId} style={styles.productSection}>
                <View style={styles.productHeader}>
                  <AppText style={styles.productName}>{productName}</AppText>
                  <Pressable
                    accessibilityLabel={`Open ${productName}`}
                    accessibilityRole="button"
                    onPress={() =>
                      router.push({
                        pathname: '/cart',
                        params: { productId, step: 'product' },
                      })
                    }
                  >
                    <AppText style={styles.productLink}>View product</AppText>
                  </Pressable>
                </View>
                {reviews.map((review) => (
                  <View key={review.id} style={styles.reviewCard}>
                    <View style={styles.reviewMeta}>
                      <AppText style={styles.stars}>
                        {'★'.repeat(review.stars)}
                        {'☆'.repeat(5 - review.stars)}
                      </AppText>
                      <AppText style={styles.date}>{review.date}</AppText>
                    </View>
                    <AppText style={styles.reviewText}>{review.text}</AppText>
                    <Pressable
                      accessibilityLabel={`Edit review for ${productName}`}
                      accessibilityRole="button"
                      onPress={() =>
                        router.push({
                          pathname: '/reviews',
                          params: { productId, reviewId: review.id },
                        })
                      }
                    >
                      <AppText style={styles.editLink}>Edit review</AppText>
                    </Pressable>
                  </View>
                ))}
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxxl },
  date: {
    color: COLORS.text.muted,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
  editLink: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    marginTop: SPACING.md,
  },
  emptyCopy: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
  },
  productHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  productLink: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
  },
  productName: {
    color: COLORS.text.primary,
    flex: 1,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.md,
  },
  productSection: { marginBottom: SPACING.xxl },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.purpleButtonBorder,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginTop: SPACING.sm,
    padding: SPACING.md,
  },
  reviewMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewText: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  screen: { backgroundColor: COLORS.background, flex: 1 },
  stars: {
    color: COLORS.ratingStar,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
  },
});
