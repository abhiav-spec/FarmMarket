import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ReactionButtons } from '@/components/ui/ReactionButtons';
import { Touchable } from '@/components/ui/Touchable';
import { PRODUCT_DETAIL_CONFIG, PRODUCT_DETAIL_COPY, PRODUCT_RATING } from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { IMAGES } from '@/constants/images';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY, RADIUS, SIZES } from '@/theme';
import { type ProductReview } from '@/types';

/** Renders only as many stars as the rating (3 → three stars); a fractional rating (4.5) ends with a partial star. */
export function RatingStars({ size, filledStars }: { size: number; filledStars: number }) {
  const box = { width: size, height: size };
  const count = Math.ceil(Math.min(Math.max(filledStars, 0), PRODUCT_DETAIL_CONFIG.starCount));
  return (
    <View style={styles.stars}>
      {Array.from({ length: count }, (_, index) => (
        <View key={index} style={box}>
          <View style={[box, styles.clip, { width: size * Math.min(1, Math.max(0, filledStars - index)) }]}>
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
  onReply?: (reviewId: string) => void;
  onOptions?: (reviewId: string) => void;
}

export function ProductReviews({ rating, reviews, onReply, onOptions }: ProductReviewsProps) {
  return (
    <View style={styles.section}>
      <AppText style={styles.title}>{PRODUCT_DETAIL_COPY.ratingReview}</AppText>
      <View style={styles.summary}>
        <View style={styles.scorePanel}>
          <AppText style={styles.score}>{rating.toFixed(1)}</AppText>
          <View style={styles.summaryStars}><RatingStars size={SIZES.productStarSize} filledStars={rating} /></View>
          <AppText style={styles.count}>{PRODUCT_DETAIL_COPY.ratingReviewCount}</AppText>
        </View>
        <View style={styles.distribution}>
          {PRODUCT_RATING.distribution.map((row) => (
            <View key={row.stars} style={styles.barRow}>
              <AppText style={styles.barLabel}>{row.stars}</AppText>
              <View style={styles.track}><View style={[styles.fill, { width: `${row.percent}%` }]} /></View>
            </View>
          ))}
        </View>
      </View>
      {reviews.map((review) => <ReviewItem key={review.id} review={review} onReply={onReply} onOptions={onOptions} />)}
    </View>
  );
}

function ReviewItem({ review, onReply, onOptions }: { review: ProductReview } & Omit<ProductReviewsProps, 'rating' | 'reviews'>) {
  return (
    <View style={styles.review}>
      <View style={styles.reviewHeader}>
        <Ionicons name={ICONS.reviewer} size={SIZES.reviewAvatarSize} color={COLORS.reviewGreen} style={styles.avatar} />
        <AppText style={styles.author}>{review.author}</AppText>
        <Touchable onPress={onOptions && (() => onOptions(review.id))} label={PRODUCT_DETAIL_COPY.reviewOptions}>
          <Image source={IMAGES.reviewMenu} style={styles.menuIcon} resizeMode="contain" accessible={false} />
        </Touchable>
      </View>
      <View style={styles.meta}>
        <RatingStars size={SIZES.reviewStarSize} filledStars={review.stars} />
        <AppText style={styles.date}>{review.date}</AppText>
      </View>
      <AppText style={styles.text}>{review.text}</AppText>
      <View style={styles.actions}>
        <Touchable onPress={onReply && (() => onReply(review.id))} title={PRODUCT_DETAIL_COPY.reply} textStyle={styles.reply} hitSlop={0} />
        <ReactionButtons likeLabel={PRODUCT_DETAIL_COPY.helpful} dislikeLabel={PRODUCT_DETAIL_COPY.notHelpful} size={SIZES.productActionIconSize} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stars: { flexDirection: 'row' },
  clip: { overflow: 'hidden' },
  section: { marginTop: PRODUCT_LAYOUT.reviewSectionTopGap },
  title: { ...PRODUCT_TYPOGRAPHY.smallSection, color: COLORS.text.black },
  summary: { height: SIZES.ratingSummaryHeight, marginTop: PRODUCT_LAYOUT.ratingSummaryTopGap, flexDirection: 'row', justifyContent: 'space-between' },
  scorePanel: { width: SIZES.ratingScorePanelWidth, alignItems: 'center', paddingTop: PRODUCT_LAYOUT.ratingScoreTopGap },
  score: { ...PRODUCT_TYPOGRAPHY.ratingScore, color: COLORS.text.black },
  summaryStars: { marginTop: PRODUCT_LAYOUT.ratingStarsTopGap },
  count: { ...PRODUCT_TYPOGRAPHY.ratingLabel, color: COLORS.text.black, marginTop: PRODUCT_LAYOUT.ratingCountTopGap },
  distribution: { width: SIZES.ratingDistributionWidth },
  barRow: { height: SIZES.ratingRowHeight, flexDirection: 'row', alignItems: 'center', gap: PRODUCT_LAYOUT.ratingBarGap },
  barLabel: { ...PRODUCT_TYPOGRAPHY.ratingLabel, width: SIZES.ratingLabelWidth, color: COLORS.text.black },
  track: { flex: 1, height: SIZES.ratingBarHeight, borderRadius: RADIUS.lg, backgroundColor: COLORS.productVideo, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: RADIUS.lg, backgroundColor: COLORS.ratingStar },
  review: { marginTop: PRODUCT_LAYOUT.reviewTopGap },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: PRODUCT_LAYOUT.reviewAuthorGap },
  avatar: { width: SIZES.productActionIconSize, height: SIZES.productActionIconSize, lineHeight: SIZES.productActionIconSize },
  author: { ...PRODUCT_TYPOGRAPHY.reviewAuthor, flex: 1, color: COLORS.text.black },
  menuIcon: { width: SIZES.reviewStarSize, height: SIZES.reviewStarSize },
  meta: { marginTop: PRODUCT_LAYOUT.reviewMetaTopGap, flexDirection: 'row', alignItems: 'center', gap: PRODUCT_LAYOUT.reviewDateGap },
  date: { ...PRODUCT_TYPOGRAPHY.reviewDate, color: COLORS.text.black },
  text: { ...PRODUCT_TYPOGRAPHY.reviewText, color: COLORS.text.black, marginTop: PRODUCT_LAYOUT.reviewTextTopGap },
  actions: { marginTop: PRODUCT_LAYOUT.reviewActionsTopGap, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  reply: { ...PRODUCT_TYPOGRAPHY.reviewReply, color: COLORS.reviewGreen },
});
