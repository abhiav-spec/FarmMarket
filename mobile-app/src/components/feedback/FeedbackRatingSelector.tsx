import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  REVIEW_RATING_LABELS,
  REVIEW_RATING_VALUES,
} from '@/constants/feedback';
import { COLORS, SPACING } from '@/theme';

type FeedbackRatingSelectorProps = {
  value: number | null;
  onChange: (rating: number) => void;
};

export function FeedbackRatingSelector({
  value,
  onChange,
}: FeedbackRatingSelectorProps) {
  return (
    <View accessibilityRole="radiogroup" style={styles.container}>
      {REVIEW_RATING_VALUES.map((rating) => {
        const selected = value === rating;
        const filled = value !== null && rating <= value;

        return (
          <Pressable
            key={rating}
            accessibilityLabel={`${rating} star${rating === 1 ? '' : 's'}: ${REVIEW_RATING_LABELS[rating]}`}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(rating)}
            style={[styles.starButton, selected && styles.selectedStarButton]}
          >
            <Ionicons
              name={filled ? 'star' : 'star-outline'}
              color={filled ? COLORS.ratingStar : COLORS.purpleButtonBorder}
              size={42}
            />
            <Text
              style={[styles.starLabel, selected && styles.selectedStarLabel]}
            >
              {REVIEW_RATING_LABELS[rating]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: SPACING.xs,
    justifyContent: 'center',
  },
  starButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    minWidth: 52,
    padding: SPACING.xs,
  },
  starLabel: {
    color: COLORS.text.secondary,
    fontSize: 12,
    marginTop: 2,
  },
  selectedStarLabel: {
    color: COLORS.purple,
    fontWeight: '700',
  },
  selectedStarButton: {
    transform: [{ scale: 1.08 }],
  },
});
