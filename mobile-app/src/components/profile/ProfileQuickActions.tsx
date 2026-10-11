import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileQuickActionsProps = {
  onWishlistPress: () => void;
  onWalletPress: () => void;
};

export function ProfileQuickActions({
  onWishlistPress,
  onWalletPress,
}: ProfileQuickActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={onWishlistPress}
        style={styles.card}
      >
        <View style={styles.iconBox}>
          <Text style={styles.symbol}>♡</Text>
        </View>
        <Text style={styles.title}>Wishlist</Text>
        <Text style={styles.subtitle}>Your saved products</Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={onWalletPress}
        style={styles.card}
      >
        <View style={styles.iconBox}>
          <Text style={styles.symbol}>₹</Text>
        </View>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>Your wallet balance</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  card: {
    flex: 1,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleSurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  symbol: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xl,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  subtitle: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
});
