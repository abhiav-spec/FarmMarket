import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileReferralBannerProps = {
  onPress: () => void;
};

export function ProfileReferralBanner({ onPress }: ProfileReferralBannerProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.banner}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>Refer & Earn</Text>
        <Text style={styles.subtitle}>
          Invite friends and explore referral rewards.
        </Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purpleLight,
  },
  textContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
  },
  subtitle: {
    color: COLORS.text.dark,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: 18,
  },
  arrow: {
    color: COLORS.purple,
    fontSize: FONT_SIZE.xxl,
    marginLeft: SPACING.sm,
  },
});
