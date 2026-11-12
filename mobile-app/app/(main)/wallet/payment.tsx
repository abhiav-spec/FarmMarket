import React from 'react';
import { useLocalSearchParams } from 'expo-router';

import { PaymentScreen } from '@/screens/checkout/PaymentScreen';
import { useWallet } from '@/context/WalletContext';

export default function WalletPaymentRoute() {
  const { amountPaise, returnTo } = useLocalSearchParams<{ amountPaise?: string; returnTo?: string }>();
  const { addMoney, setTopUpReturnToCheckout } = useWallet();
  const amount = Number(amountPaise);

  return <PaymentScreen totalPaise={Number.isFinite(amount) && amount > 0 ? amount : 0} onPaymentComplete={() => { addMoney(amount); setTopUpReturnToCheckout(returnTo === 'checkout'); }} successRoute="/wallet/payment-success" showWalletOption={false} showCashOnDelivery={false} />;
}
