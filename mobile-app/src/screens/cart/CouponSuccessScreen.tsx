import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { IMAGES } from '@/constants/images';
import { useCoupon } from '@/context/CouponContext';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

export function CouponSuccessScreen() {
  const router = useRouter();
  const { appliedCoupon } = useCoupon();
  return <View style={styles.screen}>
    <View style={styles.content}>
      <Image source={IMAGES.paymentSuccessCheck} style={styles.image} resizeMode="contain" accessible={false} />
      <AppText style={styles.title}>Coupon applied!</AppText>
      <AppText style={styles.description}>{appliedCoupon ? `${appliedCoupon} is now applied to your cart.` : 'Your coupon is now applied to your cart.'}</AppText>
    </View>
    <Touchable onPress={() => router.replace('/cart')} title="Back to cart" textStyle={styles.buttonText} style={styles.button} />
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.xl },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  image: { width: 116, height: 116 },
  title: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xl, marginTop: SPACING.lg },
  description: { color: COLORS.text.secondary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm, textAlign: 'center' },
  button: { height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
});
