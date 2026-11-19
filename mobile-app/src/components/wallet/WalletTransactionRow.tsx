import React from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { CURRENCY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { COLORS, UI, WALLET_LAYOUT, WALLET_TYPOGRAPHY } from '@/theme';
import { type WalletTransaction } from '@/types';

export function WalletTransactionRow({ transaction }: { transaction: WalletTransaction }) {
  // Enough dashes to span the widest row; the row clips the overflow.
  const dashCount = Math.ceil(useWindowDimensions().width / (WALLET_LAYOUT.transactionDash + WALLET_LAYOUT.transactionDashGap));
  const amountColor = transaction.credited && styles.creditText;
  return (
    <View style={styles.transaction}>
      <View style={styles.circle}>
        <Image source={IMAGES.walletTransactionCircle} style={styles.circleImage} resizeMode="contain" accessible={false} />
        <Image source={transaction.credited ? IMAGES.walletCreditArrow : IMAGES.walletDebitArrow} style={styles.arrow} resizeMode="contain" accessible={false} />
      </View>
      <View style={styles.details}>
        <AppText style={styles.title} numberOfLines={1}>{transaction.title}</AppText>
        <AppText style={styles.date}>{transaction.date}</AppText>
      </View>
      <View style={styles.amountRow}>
        <AppText style={[styles.currency, amountColor]}>{CURRENCY.SYMBOL}</AppText>
        <AppText style={[styles.amount, amountColor]}>{transaction.amount}</AppText>
      </View>
      {/* Dashes are drawn as views: a one-sided dashed border is not reliable on Android. */}
      <View style={styles.border} accessible={false}>
        {Array.from({ length: dashCount }, (_, index) => <View key={index} style={styles.dash} />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: { minHeight: WALLET_LAYOUT.transactionHeight, borderRadius: WALLET_LAYOUT.transactionRadius, backgroundColor: COLORS.walletSurface, overflow: 'hidden', paddingHorizontal: WALLET_LAYOUT.transactionPadding, flexDirection: 'row', alignItems: 'center' },
  border: { position: 'absolute', left: UI.zeroInset, right: UI.zeroInset, bottom: UI.zeroInset, height: WALLET_LAYOUT.transactionBorder, flexDirection: 'row', gap: WALLET_LAYOUT.transactionDashGap },
  dash: { width: WALLET_LAYOUT.transactionDash, height: WALLET_LAYOUT.transactionBorder, backgroundColor: COLORS.purple, flexShrink: 0 },
  circle: { width: WALLET_LAYOUT.circleSize, height: WALLET_LAYOUT.circleSize, alignItems: 'center', justifyContent: 'center' },
  circleImage: { position: 'absolute', width: WALLET_LAYOUT.circleSize, height: WALLET_LAYOUT.circleSize },
  arrow: { width: WALLET_LAYOUT.arrowSize, height: WALLET_LAYOUT.arrowSize },
  details: { flex: 1, marginHorizontal: WALLET_LAYOUT.transactionTextGap, gap: WALLET_LAYOUT.transactionDateGap },
  title: { ...WALLET_TYPOGRAPHY.transactionTitle, color: COLORS.text.black },
  date: { ...WALLET_TYPOGRAPHY.transactionDate, color: COLORS.walletDate },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: WALLET_LAYOUT.amountGap },
  currency: { ...WALLET_TYPOGRAPHY.currency, color: COLORS.text.black },
  amount: { ...WALLET_TYPOGRAPHY.transactionAmount, color: COLORS.text.black },
  creditText: { color: COLORS.walletCredit },
});
