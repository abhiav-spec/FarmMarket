import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { COLORS, ICON_SIZES, useResponsive, WALLET_LAYOUT, WALLET_TYPOGRAPHY } from '@/theme';

export function WalletHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  const { horizontalPadding } = useResponsive();
  return (
    <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
      <Touchable onPress={onBack} label={CART_COPY.back}>
        <AppIcon name="chevronLeft" size="md" color={COLORS.text.black} />
      </Touchable>
      <AppText accessibilityRole="header" style={styles.title}>{title}</AppText>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: WALLET_LAYOUT.headerHeight,
    paddingTop: WALLET_LAYOUT.headerTitleTop,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.walletSurface,
    borderBottomLeftRadius: WALLET_LAYOUT.headerRadius,
    borderBottomRightRadius: WALLET_LAYOUT.headerRadius,
    boxShadow: WALLET_LAYOUT.headerShadow,
    zIndex: 1,
  },
  title: { ...WALLET_TYPOGRAPHY.header, flex: 1, color: COLORS.text.black, textAlign: 'center' },
  spacer: { width: ICON_SIZES.md },
});
