import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, SIZES, SPACING, UI } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  /** Icons rendered on the right. */
  actions?: React.ReactNode;
  /** Centers the title between the back button and an equal-width spacer. */
  centerTitle?: boolean;
  /** Removes the drop shadow. */
  flat?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ScreenHeader({ title, onBack, actions, centerTitle, flat, style }: ScreenHeaderProps) {
  return (
    <View style={[styles.header, flat && styles.flat, style]}>
      <Touchable onPress={onBack} label={CART_COPY.back}>
        <AppIcon name="back" size="md" color={COLORS.text.black} />
      </Touchable>
      <AppText accessibilityRole="header" style={[styles.title, centerTitle && styles.centered]}>{title}</AppText>
      {centerTitle ? <View style={styles.spacer} /> : <View style={styles.actions}>{actions}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: SIZES.cartHeaderHeight,
    paddingTop: CART_LAYOUT.headerTopInset,
    paddingBottom: CART_LAYOUT.headerBottomInset,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: CART_LAYOUT.headerTitleGap,
    boxShadow: UI.headerShadow,
    elevation: UI.elevation,
    zIndex: UI.elevation,
  },
  flat: { boxShadow: 'none', elevation: 0 },
  title: { ...CART_TYPOGRAPHY.title, flex: 1, marginTop: CART_LAYOUT.headerTitleTopMargin, color: COLORS.text.black },
  centered: { textAlign: 'center', marginTop: 0 },
  spacer: { width: SIZES.cartHeaderIconSize },
  actions: { flexDirection: 'row', alignItems: 'center', gap: CART_LAYOUT.headerActionGap },
});
