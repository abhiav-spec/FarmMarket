import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { CartBottomBar } from '@/components/cart';
import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Touchable } from '@/components/ui/Touchable';
import { PAYMENT_COPY, PAYMENT_OPTIONS } from '@/constants/config';
import { useCart } from '@/context/CartContext';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, RADIUS, SIZES, SPACING, UI } from '@/theme';
import { formatPaise } from '@/utils/price';
import { useGoBack } from '@/utils/navigation';

export function PaymentScreen() {
  const router = useRouter();
  const goBack = useGoBack('/cart');
  const totalPaise = useCart().priceSummary.orderTotalPaise;
  const [selectedId, setSelectedId] = useState<string>();
  const selectedOption = PAYMENT_OPTIONS.find((option) => option.id === selectedId);
  const priceAfter = (discountPaise = 0) => Math.max(0, totalPaise - discountPaise);

  return (
    <View style={styles.screen}>
      <ScreenHeader title={PAYMENT_COPY.title} onBack={goBack} centerTitle />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppText style={styles.sectionTitle}>{PAYMENT_COPY.selectMethod}</AppText>
        <View accessibilityRole="radiogroup" accessibilityLabel={PAYMENT_COPY.selectMethod} style={styles.options}>
          {PAYMENT_OPTIONS.map((option) => {
            const price = formatPaise(priceAfter(option.discountPaise));
            const checked = selectedId === option.id;
            return (
              <Touchable
                key={option.id}
                onPress={() => setSelectedId(option.id)}
                accessibilityRole="radio"
                accessibilityState={{ checked }}
                label={[option.label, price, option.offer].filter(Boolean).join(', ')}
                hitSlop={0}
                style={styles.option}
              >
                <View style={[styles.optionRow, option.offer && styles.offerOptionRow]}>
                  <AppText style={styles.price}>{price}</AppText>
                  <View style={styles.divider} />
                  <AppText style={styles.method}>{option.label}</AppText>
                  <View style={styles.radio}>{checked && <View style={styles.radioDot} />}</View>
                </View>
                {option.offer && <View style={styles.offer}><AppText style={styles.offerText}>{option.offer}</AppText></View>}
              </Touchable>
            );
          })}
        </View>
      </ScrollView>
      <CartBottomBar
        totalPaise={priceAfter(selectedOption?.discountPaise)}
        title={PAYMENT_COPY.placeOrder}
        label={PAYMENT_COPY.placeOrder}
        style={styles.footer}
        actionStyle={styles.placeOrder}
        onContinue={selectedOption && (() => router.push('/checkout/success'))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: CART_LAYOUT.sectionPadding, paddingTop: CART_LAYOUT.paymentContentTop },
  sectionTitle: { ...CART_TYPOGRAPHY.sectionTitle, color: COLORS.text.black, marginBottom: CART_LAYOUT.paymentTitleGap },
  options: { gap: CART_LAYOUT.paymentOptionGap },
  option: { borderWidth: UI.borderWidth, borderColor: COLORS.purple, borderRadius: RADIUS.md, overflow: 'hidden', backgroundColor: COLORS.surface },
  optionRow: { height: SIZES.paymentOptionHeight - UI.borderWidth * 2, paddingHorizontal: SPACING.md, flexDirection: 'row', alignItems: 'center' },
  offerOptionRow: { height: SIZES.paymentOfferOptionRowHeight },
  price: { ...CART_TYPOGRAPHY.paymentMethod, color: COLORS.text.black, width: SIZES.paymentPriceWidth },
  divider: { height: SIZES.paymentDividerHeight, borderLeftWidth: UI.borderWidth, borderLeftColor: COLORS.cardBorder, borderStyle: 'dashed' },
  method: { ...CART_TYPOGRAPHY.paymentMethod, color: COLORS.text.black, flex: 1, marginLeft: CART_LAYOUT.paymentMethodGap },
  radio: { width: SIZES.paymentRadioSize, height: SIZES.paymentRadioSize, borderWidth: UI.borderWidth, borderColor: COLORS.purple, borderRadius: RADIUS.full, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: SIZES.paymentRadioDotSize, height: SIZES.paymentRadioDotSize, borderRadius: RADIUS.full, backgroundColor: COLORS.purple },
  offer: { height: SIZES.paymentOfferHeight, backgroundColor: COLORS.paymentOffer, alignItems: 'center', justifyContent: 'center' },
  offerText: { ...CART_TYPOGRAPHY.paymentOffer, color: COLORS.stepperGreen },
  footer: { paddingRight: CART_LAYOUT.sectionPadding },
  placeOrder: { width: SIZES.placeOrderButtonWidth, marginTop: CART_LAYOUT.paymentActionTopMargin },
});
