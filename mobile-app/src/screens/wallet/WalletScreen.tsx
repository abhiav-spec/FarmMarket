import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { WalletHeader, WalletTransactionRow } from '@/components/wallet';
import { WALLET_COPY, WALLET_DATA } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { COLORS, UI, useResponsive, WALLET_LAYOUT, WALLET_TYPOGRAPHY } from '@/theme';
import { useGoBack } from '@/utils/navigation';

type WalletTab = 'history' | 'how-to-use';

const TABS: readonly { id: WalletTab; label: string }[] = [
  { id: 'history', label: WALLET_COPY.history },
  { id: 'how-to-use', label: WALLET_COPY.howToUse },
];

export function WalletScreen() {
  const router = useRouter();
  const goBack = useGoBack('/home');
  const { horizontalPadding } = useResponsive();
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState<WalletTab>(tab === 'how-to-use' ? 'how-to-use' : 'history');
  const padded = { paddingHorizontal: horizontalPadding };

  return (
    <View style={styles.screen}>
      <WalletHeader title={WALLET_COPY.title} onBack={goBack} />
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
        <View style={padded}>
          <View style={styles.balanceCard}>
            <Image source={IMAGES.walletIllustration} style={styles.illustration} resizeMode="contain" accessible={false} />
            <View style={styles.balanceDetails}>
              <AppText style={styles.balanceTitle}>{WALLET_COPY.title}</AppText>
              <AppText style={styles.balance}>{WALLET_DATA.balance}</AppText>
            </View>
            <Touchable onPress={() => router.push('/wallet/add-money')} title={WALLET_COPY.addMoney} textStyle={styles.addMoneyText} hitSlop={0} style={[styles.button, styles.addMoney]} />
          </View>
        </View>
        <View style={[styles.tabs, padded]} accessibilityRole="tablist">
          {TABS.map(({ id, label }) => (
            <Touchable key={id} onPress={() => setActiveTab(id)} label={label} accessibilityRole="tab" accessibilityState={{ selected: activeTab === id }} hitSlop={0} style={styles.tab}>
              <AppText style={styles.tabText}>{label}</AppText>
              {activeTab === id && <View style={styles.tabIndicator} />}
            </Touchable>
          ))}
        </View>
        {activeTab === 'history' ? (
          <View style={[styles.transactions, padded]}>
            {WALLET_DATA.transactions.map((transaction) => <WalletTransactionRow key={transaction.id} transaction={transaction} />)}
          </View>
        ) : (
          <View style={[styles.usage, padded]}>
            <Image source={IMAGES.walletUsageIllustration} style={styles.usageImage} resizeMode="contain" accessible={false} />
            <AppText accessibilityRole="header" style={styles.usageTitle}>{WALLET_COPY.usageTitle}</AppText>
            <AppText style={styles.usageDescription}>{WALLET_COPY.usageDescription}</AppText>
            <Touchable onPress={() => setActiveTab('history')} title={WALLET_COPY.gotIt} textStyle={styles.gotItText} hitSlop={0} style={[styles.button, styles.gotIt]} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.surface },
  body: { flex: 1 },
  bodyContent: { paddingTop: WALLET_LAYOUT.balanceTop, paddingBottom: WALLET_LAYOUT.bottomPadding },
  balanceCard: { minHeight: WALLET_LAYOUT.balanceHeight, padding: WALLET_LAYOUT.balancePadding, gap: WALLET_LAYOUT.balanceTextGap, flexDirection: 'row', alignItems: 'center', borderRadius: WALLET_LAYOUT.balanceRadius, backgroundColor: COLORS.walletSurface },
  illustration: { width: WALLET_LAYOUT.illustrationWidth, height: WALLET_LAYOUT.illustrationHeight },
  balanceDetails: { flex: 1, gap: WALLET_LAYOUT.balanceTextGap },
  balanceTitle: { ...WALLET_TYPOGRAPHY.balanceTitle, color: COLORS.text.black },
  balance: { ...WALLET_TYPOGRAPHY.balance, color: COLORS.purple },
  button: { backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  addMoney: { flexShrink: 1, minHeight: WALLET_LAYOUT.addMoneyHeight, borderRadius: WALLET_LAYOUT.addMoneyRadius, padding: WALLET_LAYOUT.addMoneyPadding },
  addMoneyText: { ...WALLET_TYPOGRAPHY.addMoney, color: COLORS.text.inverse, textAlign: 'center' },
  tabs: { flexDirection: 'row', marginTop: WALLET_LAYOUT.tabsTopGap },
  tab: { flex: 1, height: WALLET_LAYOUT.tabsHeight, alignItems: 'center' },
  tabText: { ...WALLET_TYPOGRAPHY.tab, color: COLORS.text.black, textAlign: 'center' },
  tabIndicator: { position: 'absolute', left: UI.zeroInset, right: UI.zeroInset, bottom: UI.zeroInset, height: WALLET_LAYOUT.tabIndicator, backgroundColor: COLORS.purple },
  transactions: { marginTop: WALLET_LAYOUT.transactionTopGap },
  usage: { alignItems: 'center' },
  usageImage: { width: '100%', maxWidth: WALLET_LAYOUT.usageImageMaxWidth, height: undefined, aspectRatio: WALLET_LAYOUT.usageImageAspectRatio, marginTop: WALLET_LAYOUT.usageImageTopGap },
  usageTitle: { ...WALLET_TYPOGRAPHY.howToUseTitle, color: COLORS.purple, textAlign: 'center', marginTop: WALLET_LAYOUT.usageTitleGap },
  usageDescription: { ...WALLET_TYPOGRAPHY.howToUseDescription, color: COLORS.text.dark, textAlign: 'center', maxWidth: WALLET_LAYOUT.usageDescriptionMaxWidth, minHeight: WALLET_LAYOUT.usageDescriptionHeight, marginTop: WALLET_LAYOUT.usageDescriptionGap },
  gotIt: { alignSelf: 'stretch', height: WALLET_LAYOUT.gotItHeight, marginTop: WALLET_LAYOUT.gotItGap, borderRadius: WALLET_LAYOUT.gotItRadius, boxShadow: UI.headerShadow },
  gotItText: { ...WALLET_TYPOGRAPHY.gotIt, color: COLORS.text.inverse },
});
