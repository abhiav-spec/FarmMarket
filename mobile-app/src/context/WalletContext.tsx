import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { type WalletTransaction } from '@/types';

interface WalletContextValue {
  balancePaise: number;
  lastTopUpPaise: number;
  topUpReturnToCheckout: boolean;
  transactions: readonly WalletTransaction[];
  addMoney: (amountPaise: number) => void;
  spendMoney: (amountPaise: number) => boolean;
  setTopUpReturnToCheckout: (returnToCheckout: boolean) => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balancePaise, setBalancePaise] = useState(0);
  const [lastTopUpPaise, setLastTopUpPaise] = useState(0);
  const [topUpReturnToCheckout, setTopUpReturnToCheckout] = useState(false);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const addMoney = useCallback((amountPaise: number) => {
    if (amountPaise <= 0) return;

    setBalancePaise((balance) => balance + amountPaise);
    setLastTopUpPaise(amountPaise);
    setTransactions((current) => [
      {
        id: `add-money-${Date.now()}`,
        title: 'Money added',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }).toUpperCase(),
        amount: `+${(amountPaise / 100).toLocaleString('en-IN')}`,
        credited: true,
      },
      ...current,
    ]);
  }, []);

  const spendMoney = useCallback((amountPaise: number) => {
    if (amountPaise <= 0 || amountPaise > balancePaise) return false;
    setBalancePaise((balance) => balance - amountPaise);
    setTransactions((current) => [
      {
        id: `payment-${Date.now()}`,
        title: 'Order payment',
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }).toUpperCase(),
        amount: `-${(amountPaise / 100).toLocaleString('en-IN')}`,
        credited: false,
      },
      ...current,
    ]);
    return true;
  }, [balancePaise]);

  const value = useMemo(
    () => ({ balancePaise, lastTopUpPaise, topUpReturnToCheckout, transactions, addMoney, spendMoney, setTopUpReturnToCheckout }),
    [addMoney, balancePaise, lastTopUpPaise, spendMoney, topUpReturnToCheckout, transactions],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
}
