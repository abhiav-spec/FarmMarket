import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { IMAGES } from '@/constants/images';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, SIZES } from '@/theme';

interface CouponBannerProps {
  onPress?: () => void;
  appliedCoupon?: string | null;
}

export function CouponBanner({ onPress, appliedCoupon }: CouponBannerProps) {
  return (
    <Touchable onPress={onPress} label={appliedCoupon ? CART_COPY.couponAccessibility(appliedCoupon) : CART_COPY.applyCoupon} hitSlop={0} style={styles.container}>
      <Image source={IMAGES.couponIcon} style={styles.iconImage} resizeMode="contain" accessible={false} />
      <View style={styles.textContainer}>
        <AppText style={styles.titleText}>{appliedCoupon ? CART_COPY.couponApplied(appliedCoupon) : CART_COPY.applyCoupon}</AppText>
        <AppText style={styles.descriptionText} numberOfLines={1}>{appliedCoupon ? CART_COPY.changeCoupon : CART_COPY.couponOffers}</AppText>
      </View>
      <Ionicons name={ICONS.chevronRight} size={SIZES.couponArrowSize} color={COLORS.text.black} style={styles.arrow} />
    </Touchable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.couponBannerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.purpleSurface,
    paddingHorizontal: CART_LAYOUT.sectionPadding,
    marginTop: CART_LAYOUT.sectionGap,
  },
  iconImage: { width: SIZES.couponIconWidth, height: SIZES.couponIconHeight, marginRight: CART_LAYOUT.couponIconGap },
  textContainer: { flex: 1, gap: CART_LAYOUT.couponTextGap, marginBottom: CART_LAYOUT.couponTextBottomMargin },
  titleText: { ...CART_TYPOGRAPHY.couponTitle, color: COLORS.text.black, alignSelf: 'flex-start' },
  descriptionText: { ...CART_TYPOGRAPHY.couponDescription, color: COLORS.text.dark, alignSelf: 'flex-start' },
  arrow: { width: SIZES.couponArrowSize, height: SIZES.couponArrowSize, lineHeight: SIZES.couponArrowSize },
});
