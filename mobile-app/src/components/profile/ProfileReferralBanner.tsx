import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileReferralBannerProps = {
  onPress: () => void;
};

export function ProfileReferralBanner({ onPress }: ProfileReferralBannerProps) {
  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Refer & Earn Rewards</Text>

          <Text style={styles.subtitle}>
            Invite your friends and earn exciting rewards on every successful
            referral.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Refer now"
          onPress={onPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Refer Now</Text>

          <Ionicons
            name="chevron-forward"
            size={FONT_SIZE.md}
            color={COLORS.text.inverse}
          />
        </Pressable>
      </View>

      <Image
        source={require('../../../assets/images/refer-earn.png')}
        resizeMode="contain"
        style={styles.illustration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 134,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.purpleLight,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: SPACING.sm,
    zIndex: 1,
  },

  textContainer: {
    gap: SPACING.xs,
  },

  title: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
  },

  subtitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: FONT_SIZE.xs + SPACING.sm,
  },

  button: {
    alignSelf: 'flex-start',
    minHeight: SPACING.xxxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.purple,
  },

  buttonText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
  },

  illustration: {
    width: '39%',
    height: 112,
    marginLeft: -SPACING.xs,
  },
});
