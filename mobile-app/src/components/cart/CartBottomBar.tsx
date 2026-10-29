import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, RADIUS, SIZES, UI } from '@/theme';
import { formatPaise } from '@/utils/price';

interface CartBottomBarProps {
  totalPaise: number;
  onContinue?: () => void;
  disabled?: boolean;
  /** Button text. */
  title?: string;
  /** Button accessibility label. */
  label?: string;
  style?: StyleProp<ViewStyle>;
  actionStyle?: StyleProp<ViewStyle>;
}

export function CartBottomBar({ totalPaise, onContinue, disabled, title = CART_COPY.continue, label = CART_COPY.checkout, style, actionStyle }: CartBottomBarProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.priceSection}>
        <AppText style={styles.priceText}>{formatPaise(totalPaise)}</AppText>
        <AppText style={styles.priceLabel}>{CART_COPY.viewPrice}</AppText>
      </View>
      <Touchable onPress={onContinue} disabled={disabled || !onContinue} title={title} label={label} textStyle={styles.continueButtonText} hitSlop={0} style={[styles.continueButton, actionStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.cartBottomBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CART_LAYOUT.footerPaddingHorizontal,
    paddingBottom: CART_LAYOUT.sectionPadding,
    backgroundColor: COLORS.purpleSurface,
    boxShadow: UI.bottomBarShadow,
    elevation: UI.elevation,
  },
  priceSection: { flex: 1, gap: CART_LAYOUT.footerTextGap },
  priceText: { ...CART_TYPOGRAPHY.itemPrice, color: COLORS.purple },
  priceLabel: { ...CART_TYPOGRAPHY.footerLabel, color: COLORS.text.black, alignSelf: 'flex-start' },
  continueButton: {
    width: SIZES.continueButtonWidth,
    height: SIZES.continueButtonHeight,
    backgroundColor: COLORS.purple,
    borderRadius: RADIUS.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: { ...CART_TYPOGRAPHY.continueButton, color: COLORS.text.inverse },
});
