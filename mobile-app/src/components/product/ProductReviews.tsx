import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ReactionButtons } from '@/components/ui/ReactionButtons';
import { Touchable } from '@/components/ui/Touchable';
import {
  PRODUCT_DETAIL_CONFIG,
  PRODUCT_DETAIL_COPY,
  PRODUCT_RATING,
} from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { IMAGES } from '@/constants/images';
import {
  COLORS,
  PRODUCT_LAYOUT,
  PRODUCT_TYPOGRAPHY,
  RADIUS,
  SIZES,
} from '@/theme';
import { type ProductReview } from '@/types';
import {
  MediaPreviewModal,
  type PreviewItem,
} from '@/screens/crop-advisor/MediaPreview';

/** Renders only as many stars as the rating (3 → three stars); a fractional rating (4.5) ends with a partial star. */
export function RatingStars({
  size,
  filledStars,
}: {
  size: number;
  filledStars: number;
}) {
  const box = { width: size, height: size };
  const count = Math.ceil(
    Math.min(Math.max(filledStars, 0), PRODUCT_DETAIL_CONFIG.starCount),
  );
  return (
    <View style={styles.stars}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={box}>
          <View
            style={[
              box,
              styles.clip,
              { width: size * Math.min(1, Math.max(0, filledStars - index)) },
            ]}
          >
            <Image source={IMAGES.ratingStar} style={box} accessible={false} />
          </View>
        </View>
      ))}
    </View>
  );
}

interface ProductReviewsProps {
  /** Average product rating out of 5. */
  rating: number;
  reviews: readonly ProductReview[];
  onDelete?: (reviewId: string) => void;
  onEdit?: (reviewId: string) => void;
  onReply?: (reviewId: string) => void;
  onWriteReview?: () => void;
}

export function ProductReviews({
  rating,
  reviews,
  onDelete,
  onEdit,
  onReply,
  onWriteReview,
}: ProductReviewsProps) {
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewItem | null>(null);

  return (
    <View style={styles.section}>
      <AppText style={styles.title}>{PRODUCT_DETAIL_COPY.ratingReview}</AppText>
      <View style={styles.summary}>
        <View style={styles.scorePanel}>
          <AppText style={styles.score}>{rating.toFixed(1)}</AppText>
          <View style={styles.summaryStars}>
            <RatingStars size={SIZES.productStarSize} filledStars={rating} />
          </View>
          <AppText style={styles.count}>
            {PRODUCT_DETAIL_COPY.ratingReviewCount}
          </AppText>
        </View>
        <View style={styles.distribution}>
          {PRODUCT_RATING.distribution.map((row) => (
            <View key={row.stars} style={styles.barRow}>
              <AppText style={styles.barLabel}>{row.stars}</AppText>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${row.percent}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
      {onWriteReview ? (
        <Touchable
          label="Write a review"
          onPress={onWriteReview}
          style={styles.writeReviewSection}
        >
          <Ionicons color={COLORS.purple} name="create-outline" size={22} />
          <AppText style={styles.writeReviewTitle}>Write a review</AppText>
        </Touchable>
      ) : null}
      {openActionsId ? (
        <Touchable
          label="Close review actions"
          onPress={() => setOpenActionsId(null)}
          style={styles.menuBackdrop}
        />
      ) : null}
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onDelete={onDelete}
          onEdit={onEdit}
          onReply={onReply}
          showActions={openActionsId === review.id}
          onToggleActions={() =>
            setOpenActionsId((current) =>
              current === review.id ? null : review.id,
            )
          }
          onPreviewPhoto={(uri) => setPreview({ type: 'image', uri })}
        />
      ))}
      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </View>
  );
}

function ReviewItem({
  review,
  onDelete,
  onEdit,
  onReply,
  showActions,
  onToggleActions,
  onPreviewPhoto,
}: { review: ProductReview } & Omit<
  ProductReviewsProps,
  'rating' | 'reviews'
> & {
    showActions: boolean;
    onToggleActions: () => void;
    onPreviewPhoto: (uri: string) => void;
  }) {
  const canManage = review.author === 'You' && (onEdit || onDelete);

  return (
    <View style={[styles.review, showActions && styles.activeReview]}>
      <View style={styles.reviewHeader}>
        <Ionicons
          name={ICONS.reviewer}
          size={SIZES.reviewAvatarSize}
          color={COLORS.reviewGreen}
          style={styles.avatar}
        />
        <AppText style={styles.author}>{review.author}</AppText>
        {canManage ? (
          <Touchable
            label={PRODUCT_DETAIL_COPY.reviewOptions}
            onPress={onToggleActions}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <Image
              source={IMAGES.reviewMenu}
              style={styles.menuIcon}
              resizeMode="contain"
              accessible={false}
            />
          </Touchable>
        ) : null}
      </View>
      {showActions && canManage ? (
        <View
          onTouchStart={(event) => event.stopPropagation()}
          style={styles.optionsMenu}
        >
          {onEdit ? (
            <Touchable
              label="Edit review"
              onPress={() => {
                onToggleActions();
                onEdit(review.id);
              }}
              onTouchStart={(event) => event.stopPropagation()}
              style={styles.option}
              title="Edit review"
              textStyle={styles.editOption}
            />
          ) : null}
          {onDelete ? (
            <Touchable
              label="Delete review"
              onPress={() => {
                onToggleActions();
                onDelete(review.id);
              }}
              onTouchStart={(event) => event.stopPropagation()}
              style={styles.option}
              title="Delete review"
              textStyle={styles.deleteOption}
            />
          ) : null}
        </View>
      ) : null}
      <View style={styles.meta}>
        <RatingStars size={SIZES.reviewStarSize} filledStars={review.stars} />
        <AppText style={styles.date}>{review.date}</AppText>
      </View>
      <AppText style={styles.text}>{review.text}</AppText>
      {review.photoUris?.length ? (
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
      <View style={styles.actions}>
        <Touchable
          onPress={onReply && (() => onReply(review.id))}
          title={PRODUCT_DETAIL_COPY.reply}
          textStyle={styles.reply}
          hitSlop={0}
        />
        <ReactionButtons
          likeLabel={PRODUCT_DETAIL_COPY.helpful}
          dislikeLabel={PRODUCT_DETAIL_COPY.notHelpful}
          size={SIZES.productActionIconSize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stars: { flexDirection: 'row' },
  clip: { overflow: 'hidden' },
  section: {
    marginTop: PRODUCT_LAYOUT.reviewSectionTopGap,
    position: 'relative',
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  title: { ...PRODUCT_TYPOGRAPHY.smallSection, color: COLORS.text.black },
  summary: {
    height: SIZES.ratingSummaryHeight,
    marginTop: PRODUCT_LAYOUT.ratingSummaryTopGap,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scorePanel: {
    width: SIZES.ratingScorePanelWidth,
    alignItems: 'center',
    paddingTop: PRODUCT_LAYOUT.ratingScoreTopGap,
  },
  score: { ...PRODUCT_TYPOGRAPHY.ratingScore, color: COLORS.text.black },
  summaryStars: { marginTop: PRODUCT_LAYOUT.ratingStarsTopGap },
  writeReviewSection: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: PRODUCT_LAYOUT.reviewAuthorGap,
    justifyContent: 'flex-start',
    marginTop: PRODUCT_LAYOUT.reviewTopGap,
    paddingVertical: PRODUCT_LAYOUT.reviewMetaTopGap,
  },
  writeReviewTitle: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.purple },
  count: {
    ...PRODUCT_TYPOGRAPHY.ratingLabel,
    color: COLORS.text.black,
    marginTop: PRODUCT_LAYOUT.ratingCountTopGap,
  },
  distribution: { width: SIZES.ratingDistributionWidth },
  barRow: {
    height: SIZES.ratingRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: PRODUCT_LAYOUT.ratingBarGap,
  },
  barLabel: {
    ...PRODUCT_TYPOGRAPHY.ratingLabel,
    width: SIZES.ratingLabelWidth,
    color: COLORS.text.black,
  },
  track: {
    flex: 1,
    height: SIZES.ratingBarHeight,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.productVideo,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.ratingStar,
  },
  review: { marginTop: PRODUCT_LAYOUT.reviewTopGap, position: 'relative' },
  activeReview: { zIndex: 2 },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: PRODUCT_LAYOUT.reviewAuthorGap,
  },
  avatar: {
    width: SIZES.productActionIconSize,
    height: SIZES.productActionIconSize,
    lineHeight: SIZES.productActionIconSize,
  },
  author: {
    ...PRODUCT_TYPOGRAPHY.reviewAuthor,
    flex: 1,
    color: COLORS.text.black,
  },
  menuIcon: { width: SIZES.reviewStarSize, height: SIZES.reviewStarSize },
  optionsMenu: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.purpleButtonBorder,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
    minWidth: 120,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: SIZES.reviewAvatarSize + PRODUCT_LAYOUT.reviewAuthorGap,
    zIndex: 2,
  },
  option: {
    paddingHorizontal: PRODUCT_LAYOUT.detailRowPadding,
    paddingVertical: PRODUCT_LAYOUT.reviewMetaTopGap,
  },
  editOption: {
    ...PRODUCT_TYPOGRAPHY.reviewReply,
    color: COLORS.text.primary,
  },
  deleteOption: { ...PRODUCT_TYPOGRAPHY.reviewReply, color: COLORS.error },
  meta: {
    marginTop: PRODUCT_LAYOUT.reviewMetaTopGap,
    flexDirection: 'row',
    alignItems: 'center',
    gap: PRODUCT_LAYOUT.reviewDateGap,
  },
  date: { ...PRODUCT_TYPOGRAPHY.reviewDate, color: COLORS.text.black },
  text: {
    ...PRODUCT_TYPOGRAPHY.reviewText,
    color: COLORS.text.black,
    marginTop: PRODUCT_LAYOUT.reviewTextTopGap,
  },
  photoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: PRODUCT_LAYOUT.reviewMetaTopGap,
    marginTop: PRODUCT_LAYOUT.reviewMetaTopGap,
  },
  photo: { borderRadius: RADIUS.xs, height: 76, width: 76 },
  actions: {
    marginTop: PRODUCT_LAYOUT.reviewActionsTopGap,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reply: { ...PRODUCT_TYPOGRAPHY.reviewReply, color: COLORS.reviewGreen },
});
