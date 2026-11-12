import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Touchable } from '@/components/ui/Touchable';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';
import { useGoBack } from '@/utils/navigation';
import { useCoupon } from '@/context/CouponContext';

const COUPONS = [
  { code: 'WELCOME10', offer: 'Flat 10% off', detail: 'Minimum order value ₹500', color: COLORS.walletCredit },
  { code: 'FARM50', offer: 'Flat ₹50 off', detail: 'Minimum order value ₹1,000', color: COLORS.purple },
] as const;

export function CouponsScreen() {
  const goBack = useGoBack('/cart');
  const router = useRouter();
  const { applyCoupon: saveCoupon } = useCoupon();
  const [couponCode, setCouponCode] = useState('');

  const applyCoupon = (code = couponCode) => {
    const normalizedCode = code.trim().toUpperCase();
    if (!normalizedCode) return;
    saveCoupon(normalizedCode);
    router.push({ pathname: '/cart', params: { step: 'coupon-success' } });
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Apply coupon" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.codeInput}>
          <TextInput
            value={couponCode}
            onChangeText={setCouponCode}
            placeholder="Enter coupon code"
            placeholderTextColor={COLORS.text.muted}
            autoCapitalize="characters"
            style={styles.input}
          />
          <Touchable onPress={() => applyCoupon()} disabled={!couponCode.trim()} label="Apply coupon code" title="Apply" textStyle={styles.applyText} style={styles.applyButton} />
        </View>

        <AppText style={styles.sectionTitle}>Available coupons</AppText>
        <View style={styles.couponList}>
          {COUPONS.map((coupon) => (
            <View key={coupon.code} style={styles.couponCard}>
              <View style={[styles.couponIcon, { backgroundColor: coupon.color }]}>
                <Ionicons name="pricetag" size={18} color={COLORS.text.inverse} />
              </View>
              <View style={styles.couponDetails}>
                <AppText style={styles.code}>{coupon.code}</AppText>
                <AppText style={[styles.offer, { color: coupon.color }]}>{coupon.offer}</AppText>
                <AppText style={styles.detail}>{coupon.detail}</AppText>
              </View>
              <Touchable onPress={() => applyCoupon(coupon.code)} label={`Apply ${coupon.code}`} title="Apply" textStyle={styles.cardApplyText} style={styles.cardApply} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.xl },
  codeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    paddingLeft: SPACING.md,
  },
  input: { flex: 1, minWidth: 0, color: COLORS.text.primary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm, paddingVertical: SPACING.md, outlineWidth: 0, outlineStyle: 'solid', outlineColor: COLORS.surface },
  applyButton: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm },
  applyText: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
  sectionTitle: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.md },
  couponList: { gap: SPACING.md },
  couponCard: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, borderWidth: 1, borderColor: COLORS.purpleBorder, borderRadius: RADIUS.md, backgroundColor: COLORS.surface, padding: SPACING.md },
  couponIcon: { width: 36, height: 36, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center' },
  couponDetails: { flex: 1, gap: 2 },
  code: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xs },
  offer: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.xs },
  detail: { color: COLORS.text.secondary, fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xxs },
  cardApply: { alignSelf: 'flex-start', paddingVertical: SPACING.xs },
  cardApplyText: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xs },
});
