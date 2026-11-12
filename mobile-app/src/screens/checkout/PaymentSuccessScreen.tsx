import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { IMAGES } from '@/constants/images';
import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { useCoupon } from '@/context/CouponContext';
import { ORDERS } from '@/data/defaultOrder';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';
import { formatPaise } from '@/utils/price';
import { getCouponDiscountPaise } from '@/utils/coupon';

export function PaymentSuccessScreen({ walletTopUp = false }: { walletTopUp?: boolean }) {
  const router = useRouter();
  const { items, priceSummary } = useCart();
  const { balancePaise, lastTopUpPaise, topUpReturnToCheckout } = useWallet();
  const { appliedCoupon } = useCoupon();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const paidAmount = walletTopUp ? lastTopUpPaise : Math.max(0, priceSummary.orderTotalPaise - getCouponDiscountPaise(appliedCoupon, priceSummary.productTotalPaise));
  const isCashOnDelivery = !walletTopUp && ORDERS[0]?.paymentMethod === 'Cash on Delivery';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={IMAGES.paymentSuccessCheck} style={styles.successImage} resizeMode="contain" accessible={false} />
      <AppText style={styles.title}>{walletTopUp ? 'Money added successfully!' : isCashOnDelivery ? 'Order placed successfully!' : 'Payment successful!'}</AppText>
      <AppText style={styles.subtitle}>{walletTopUp ? 'Your wallet balance has been updated.' : isCashOnDelivery ? 'Payment will be collected when your order is delivered.' : 'Your payment has been completed successfully.'}</AppText>

      <View style={styles.receipt}>
        <View style={styles.receiptHeader}>
          <View><AppText style={styles.receiptLabel}>{walletTopUp ? 'Wallet recharge' : 'Order ID'}</AppText><AppText style={styles.orderId}>{walletTopUp ? 'Payment complete' : `#FM${String(Date.now()).slice(-8)}`}</AppText></View>
          <Ionicons name="checkmark-circle" size={27} color={COLORS.text.inverse} />
        </View>
        <View style={styles.separator} />
        <ReceiptRow label={walletTopUp ? 'Amount added' : 'Amount paid'} value={formatPaise(paidAmount)} />
        {walletTopUp ? <ReceiptRow label="Wallet balance" value={formatPaise(balancePaise)} /> : null}
        {walletTopUp ? null : <ReceiptRow label="Items ordered" value={`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} />}
        <ReceiptRow label="Payment status" value={isCashOnDelivery ? 'Pay on delivery' : 'Paid'} />
        {walletTopUp ? null : <View style={styles.delivery}><Ionicons name="car-outline" size={30} color={COLORS.text.inverse} /><View><AppText style={styles.deliveryLabel}>Delivery at</AppText><AppText style={styles.deliveryValue}>Your saved delivery address</AppText></View></View>}
      </View>

      <View style={styles.actions}>
        <Touchable onPress={() => router.replace(walletTopUp ? topUpReturnToCheckout ? '/checkout/payment' : '/wallet' : '/checkout/success')} title={walletTopUp ? topUpReturnToCheckout ? 'Continue checkout' : 'View wallet' : 'View order confirmation'} textStyle={styles.primaryText} style={styles.primaryButton} />
        <Touchable onPress={() => router.replace('/home')} title="Continue shopping" textStyle={styles.secondaryText} style={styles.secondaryButton} />
      </View>
    </ScrollView>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return <View style={styles.receiptRow}><AppText style={styles.receiptLabel}>{label}</AppText><AppText style={styles.receiptValue}>{value}</AppText></View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, padding: SPACING.xl, paddingTop: SPACING.xxxl, alignItems: 'center' },
  successImage: { width: 116, height: 116 },
  title: { marginTop: SPACING.xl, color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xl, textAlign: 'center' },
  subtitle: { marginTop: SPACING.sm, color: COLORS.text.secondary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm, textAlign: 'center' },
  receipt: { alignSelf: 'stretch', marginTop: SPACING.xxxl, borderRadius: RADIUS.lg, backgroundColor: COLORS.purple, padding: SPACING.lg, gap: SPACING.sm },
  receiptHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  separator: { borderTopWidth: 1, borderTopColor: COLORS.purpleBorder, borderStyle: 'dashed' },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', gap: SPACING.md },
  receiptLabel: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.xs },
  orderId: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.md, marginTop: 2 },
  receiptValue: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xs, textAlign: 'right' },
  delivery: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginTop: SPACING.sm, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.purpleBorder, borderStyle: 'dashed' },
  deliveryLabel: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.xs },
  deliveryValue: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm, marginTop: 2 },
  actions: { alignSelf: 'stretch', gap: SPACING.sm, marginTop: 'auto', paddingTop: SPACING.xxxl },
  primaryButton: { height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
  secondaryButton: { height: 48, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  secondaryText: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
});
