import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileQuickActionsProps = {
  wishlistCount?: number;
  walletBalance?: number;
  onWishlistPress: () => void;
  onWalletPress: () => void;
};

export function ProfileQuickActions({
  wishlistCount,
  walletBalance,
  onWishlistPress,
  onWalletPress,
}: ProfileQuickActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open wishlist"
        onPress={onWishlistPress}
        style={styles.card}
      >
        <View style={styles.iconBox}>
          <Image
            source={require('../../../assets/icons/profile/wishlist.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>Wishlist</Text>

          <Text style={styles.value}>
            {wishlistCount === undefined
              ? 'View wishlist'
              : `${wishlistCount} ${wishlistCount === 1 ? 'Product' : 'Products'}`}
          </Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open wallet"
        onPress={onWalletPress}
        style={styles.card}
      >
        <View style={styles.iconBox}>
          <Image
            source={require('../../../assets/icons/profile/wallet.png')}
            resizeMode="contain"
            style={styles.icon}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title}>Wallet</Text>

          <Text style={styles.value}>
            {walletBalance === undefined
              ? 'View wallet'
              : `₹${walletBalance.toLocaleString('en-IN')}`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },

  card: {
    flex: 1,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.sm,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.purpleLight,
  },

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 44,
    height: 44,
  },

  details: {
    flex: 1,
    gap: SPACING.xs,
  },

  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },

  value: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
  },
});
