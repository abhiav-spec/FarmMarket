import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { type SubmittedReview, useReviews } from '@/context/ReviewContext';
import {
  MOCK_CART_PRODUCTS,
  MOCK_RECOMMENDATION_PRODUCTS,
} from '@/data/mockProducts';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

import {
  MediaPreviewModal,
  type PreviewItem,
} from '../crop-advisor/MediaPreview';

const products = [...MOCK_CART_PRODUCTS, ...MOCK_RECOMMENDATION_PRODUCTS];

export function MyReviewsScreen() {
  const router = useRouter();
  const { submittedReviews } = useReviews();
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewItem | null>(null);

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="My Reviews"
        onBackPress={() =>
          router.canGoBack() ? router.back() : router.replace('/(main)/profile')
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        {openActionsId ? (
          <Pressable
            accessibilityLabel="Close review actions"
            onPress={() => setOpenActionsId(null)}
            style={styles.menuBackdrop}
          />
        ) : null}
        {submittedReviews.length === 0 ? (
          <View style={styles.emptyState}>
            <AppText style={styles.emptyTitle}>No reviews yet</AppText>
            <AppText style={styles.emptyCopy}>
              Your product reviews will appear here.
            </AppText>
          </View>
        ) : (
          submittedReviews.map((review) => {
            const product = products.find(
              (item) => item.id === review.productId,
            );
            const productName = product?.name ?? 'Product review';

            return (
              <ReviewCard
                key={review.id}
                productName={productName}
                review={review}
                showActions={openActionsId === review.id}
                onToggleActions={() =>
                  setOpenActionsId((current) =>
                    current === review.id ? null : review.id,
                  )
                }
                onPreviewPhoto={(uri) => setPreview({ type: 'image', uri })}
              />
            );
          })
        )}
      </ScrollView>
      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </SafeAreaView>
  );
}

function ReviewCard({
  productName,
  review,
  showActions,
  onToggleActions,
  onPreviewPhoto,
}: {
  productName: string;
  review: SubmittedReview;
  showActions: boolean;
  onToggleActions: () => void;
  onPreviewPhoto: (uri: string) => void;
}) {
  const router = useRouter();
  const { deleteReview } = useReviews();

  return (
    <View style={[styles.reviewCard, showActions && styles.activeReviewCard]}>
      <View style={styles.productHeader}>
        <AppText style={styles.productName}>{productName}</AppText>
        <View style={styles.headerActions}>
          <Pressable
            accessibilityLabel={`Open ${productName}`}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: { id: review.productId },
              })
            }
          >
            <AppText style={styles.productLink}>View product</AppText>
          </Pressable>
          <Pressable
            accessibilityLabel={`Review actions for ${productName}`}
            accessibilityRole="button"
            hitSlop={8}
            onPress={(event) => {
              event.stopPropagation();
              onToggleActions();
            }}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <Ionicons
              color={COLORS.text.secondary}
              name="ellipsis-vertical"
              size={20}
            />
          </Pressable>
        </View>
      </View>
      {showActions ? (
        <View
          onTouchStart={(event) => event.stopPropagation()}
          style={styles.optionsMenu}
        >
          <Pressable
            accessibilityRole="button"
            onPress={(event) => {
              event.stopPropagation();
              router.push({
                pathname: '/reviews',
                params: { productId: review.productId, reviewId: review.id },
              });
            }}
            style={styles.option}
          >
            <AppText style={styles.editLink}>Edit review</AppText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={(event) => {
              event.stopPropagation();
              deleteReview(review.id);
            }}
            style={styles.option}
          >
            <AppText style={styles.deleteLink}>Delete review</AppText>
          </Pressable>
        </View>
      ) : null}
      <View style={styles.reviewMeta}>
        <AppText style={styles.stars}>
          {'★'.repeat(review.stars)}
          {'☆'.repeat(5 - review.stars)}
        </AppText>
        <AppText style={styles.date}>{review.date}</AppText>
      </View>
      <AppText style={styles.reviewText}>{review.text}</AppText>
      {review.photoUris.length > 0 ? (
        <View style={styles.photoList}>
          {review.photoUris.map((uri, index) => (
            <Pressable
              accessibilityLabel={`Preview uploaded review photo ${index + 1}`}
              accessibilityRole="button"
              key={uri}
              onPress={() => onPreviewPhoto(uri)}
            >
              <Image resizeMode="cover" source={{ uri }} style={styles.photo} />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    position: 'relative',
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  date: {
    color: COLORS.text.muted,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
  editLink: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
  },
  deleteLink: {
    color: COLORS.error,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
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
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.md,
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
  optionsMenu: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.purpleButtonBorder,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    minWidth: 124,
    overflow: 'hidden',
    position: 'absolute',
    right: SPACING.md,
    top: 38,
    zIndex: 2,
  },
  option: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  photo: {
    borderRadius: RADIUS.sm,
    height: 76,
    width: 76,
  },
  photoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.purpleButtonBorder,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    position: 'relative',
  },
  activeReviewCard: { zIndex: 2 },
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
