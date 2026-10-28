import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { FEEDBACK_RATINGS } from '@/constants/feedback';
import { COLORS, FEEDBACK_RATING_LAYOUT, RADIUS, SPACING } from '@/theme';

interface FeedbackRatingSelectorProps {
  value: number | null;
  onChange: (rating: number) => void;
}

export function FeedbackRatingSelector({
  value,
  onChange,
}: FeedbackRatingSelectorProps) {
  return (
    <View style={styles.container}>
      {FEEDBACK_RATINGS.map((rating) => {
        const selected = value === rating.value;

        return (
          <Pressable
            key={rating.value}
            accessibilityRole="radio"
            accessibilityLabel={rating.label}
            accessibilityState={{ selected }}
            onPress={() => onChange(rating.value)}
            style={[styles.ratingOption, selected && styles.ratingSelected]}
          >
            <Image
              source={rating.image}
              style={styles.ratingImage}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ratingOption: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: FEEDBACK_RATING_LAYOUT.maxCardWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.purpleLight,
    borderWidth: FEEDBACK_RATING_LAYOUT.borderWidth,
    borderColor: 'transparent',
    borderRadius: RADIUS.xxl,
    padding: SPACING.sm,
  },
  ratingSelected: {
    borderColor: COLORS.purple,
    borderWidth: FEEDBACK_RATING_LAYOUT.selectedBorderWidth,
  },
  ratingImage: {
    width: FEEDBACK_RATING_LAYOUT.imageSize,
    height: FEEDBACK_RATING_LAYOUT.imageSize,
  },
});
