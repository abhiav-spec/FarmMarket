import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon, AppText } from '@/components';
import { useWallet } from '@/context/WalletContext';
import { COLORS, useResponsive } from '@/theme';

interface HomeHeaderProps {
  location: string;
  walletBalance?: number;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onWalletPress?: () => void;
  onCartPress?: () => void;
  cartCount?: number;
  onProfilePress?: () => void;
}

export function HomeHeader({
  location,
  onLocationPress,
  onNotificationPress,
  onWalletPress,
  onCartPress,
  cartCount = 0,
  onProfilePress,
}: HomeHeaderProps) {
  const { home } = useResponsive();
  const { balancePaise } = useWallet();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: home.headerHorizontalPadding,
          paddingVertical: home.headerVerticalPadding,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delivery location: ${location}`}
        onPress={onLocationPress}
        style={styles.locationButton}
      >
        <AppIcon name="location" size="lg" />

        <AppText
          variant="bodyMedium"
          numberOfLines={1}
          style={[
            styles.locationText,
            {
              fontSize: home.locationFontSize,
              lineHeight: home.locationLineHeight,
            },
          ]}
        >
          {location}
        </AppText>

        <AppIcon name="chevronDown" size="md" />
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={onNotificationPress}
          style={[
            styles.actionButton,
            {
              width: home.headerActionSize,
              height: home.headerActionSize,
            },
          ]}
        >
          <AppIcon name="notifications" size="lg" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Wallet"
          onPress={onWalletPress}
          style={[
            styles.walletButton,
            {
              height: home.walletHeight,
              minWidth: home.walletWidth,
              paddingHorizontal: home.walletHorizontalPadding,
              borderRadius: home.walletRadius,
              gap: home.walletGap,
            },
          ]}
        >
          <AppIcon name="wallet" size="md" />

          <AppText
            variant="caption"
            style={{
              fontSize: home.walletFontSize,
              lineHeight: home.walletLineHeight,
            }}
          >
            {(balancePaise / 100).toLocaleString('en-IN')}
          </AppText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cart"
          onPress={onCartPress}
          style={[
            styles.actionButton,
            {
              width: home.headerActionSize,
              height: home.headerActionSize,
            },
          ]}
        >
          <View style={styles.cartIconWrap}>
            <AppIcon name="cart" size="lg" />
            <AppText style={styles.cartCount}>{cartCount}</AppText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
  },

  locationButton: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationText: {
    flexShrink: 1,
    marginHorizontal: 6,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIconWrap: { position: 'relative' },
  cartCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.purple,
    color: COLORS.text.inverse,
    fontSize: 9,
    lineHeight: 16,
    textAlign: 'center',
  },

  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.categoryborder,
  },
});
