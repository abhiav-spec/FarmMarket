import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AddMoneyScreen } from '@/screens/wallet/AddMoneyScreen';

export default function AddMoneyRoute() {
  const router = useRouter();
  const { amountPaise, locked, returnTo } = useLocalSearchParams<{ amountPaise?: string; locked?: string; returnTo?: string }>();
  const initialAmountPaise = Number(amountPaise);

  return <AddMoneyScreen initialAmountPaise={Number.isFinite(initialAmountPaise) && initialAmountPaise > 0 ? initialAmountPaise : undefined} lockAmount={locked === 'true'} onProceed={(amount) => router.push({ pathname: '/wallet/payment', params: { amountPaise: String(amount), returnTo } })} />;
}
