import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { WalletHeader } from '@/components/wallet';
import { CURRENCY, WALLET_COPY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { COLORS, UI, useResponsive, WALLET_LAYOUT, WALLET_TYPOGRAPHY } from '@/theme';
import { useGoBack } from '@/utils/navigation';

const AMOUNT_PATTERN = /^\d*(?:\.\d{0,2})?$/;

export function AddMoneyScreen({ onProceed, initialAmountPaise, lockAmount = false }: { onProceed?: (amountPaise: number) => void; initialAmountPaise?: number; lockAmount?: boolean }) {
  const goBack = useGoBack('/wallet');
  const { horizontalPadding } = useResponsive();
  const [amount, setAmount] = useState(() => initialAmountPaise ? (initialAmountPaise / CURRENCY.PAISE_PER_RUPEE).toFixed(2).replace(/\.00$/, '') : '');
  useEffect(() => {
    if (initialAmountPaise !== undefined) {
      setAmount((initialAmountPaise / CURRENCY.PAISE_PER_RUPEE).toFixed(2).replace(/\.00$/, ''));
    }
  }, [initialAmountPaise]);
  const amountPaise = Math.round(Number(amount) * CURRENCY.PAISE_PER_RUPEE);
  const canProceed = Number.isFinite(amountPaise) && amountPaise > 0 && !!onProceed;

  return (
    <View style={styles.screen}>
      <WalletHeader title={WALLET_COPY.addMoney} onBack={goBack} />
      <ScrollView style={styles.body} contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <AppText style={styles.amountTitle}>{WALLET_COPY.enterAmount}</AppText>
        <View style={styles.amountField}>
          <Image source={IMAGES.walletAmountCurrency} style={styles.amountCurrency} resizeMode="contain" accessible={false} />
          <TextInput accessibilityLabel={WALLET_COPY.enterAmount} value={amount} onChangeText={(value) => AMOUNT_PATTERN.test(value) && setAmount(value)} editable={!lockAmount} keyboardType="decimal-pad" inputMode="decimal" style={styles.amountInput} />
        </View>
        {lockAmount ? <AppText style={styles.lockedHint}>This is the exact amount needed to complete your order.</AppText> : null}
      </ScrollView>
      <Touchable onPress={() => onProceed?.(amountPaise)} disabled={!canProceed} title={WALLET_COPY.proceed} textStyle={styles.proceedText} hitSlop={0} style={[styles.proceed, { marginHorizontal: horizontalPadding }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.surface },
  body: { flex: 1 },
  content: { paddingTop: WALLET_LAYOUT.amountTitleTopGap },
  amountTitle: { ...WALLET_TYPOGRAPHY.amountTitle, color: COLORS.text.black },
  amountField: { height: WALLET_LAYOUT.amountFieldHeight, marginTop: WALLET_LAYOUT.amountFieldGap, borderRadius: WALLET_LAYOUT.amountFieldRadius, borderWidth: UI.borderWidth, borderColor: COLORS.walletSurface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: WALLET_LAYOUT.amountFieldPadding },
  amountCurrency: { width: WALLET_LAYOUT.amountCurrencySize, height: WALLET_LAYOUT.amountCurrencySize },
  amountInput: { ...WALLET_TYPOGRAPHY.amountInput, color: COLORS.purple, flex: 1, minWidth: UI.zeroInset, marginLeft: WALLET_LAYOUT.amountCurrencyGap, padding: UI.zeroInset, borderWidth: UI.zeroInset, outlineWidth: UI.zeroInset, outlineStyle: 'solid', outlineColor: COLORS.surface },
  lockedHint: { ...WALLET_TYPOGRAPHY.paymentMethod, color: COLORS.text.secondary, marginTop: WALLET_LAYOUT.amountFieldGap },
  proceed: { height: WALLET_LAYOUT.proceedHeight, marginBottom: WALLET_LAYOUT.proceedBottomPadding, borderRadius: WALLET_LAYOUT.proceedRadius, backgroundColor: COLORS.purple, boxShadow: WALLET_LAYOUT.proceedShadow, alignItems: 'center', justifyContent: 'center' },
  proceedText: { ...WALLET_TYPOGRAPHY.proceed, color: COLORS.text.inverse },
});
