import React, { createContext, useContext, useMemo, useState } from 'react';

interface CouponContextValue {
  appliedCoupon: string | null;
  applyCoupon: (code: string) => void;
}

const CouponContext = createContext<CouponContextValue | null>(null);

export function CouponProvider({ children }: { children: React.ReactNode }) {
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const value = useMemo(() => ({ appliedCoupon, applyCoupon: (code: string) => setAppliedCoupon(code) }), [appliedCoupon]);
  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
}

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error('useCoupon must be used within CouponProvider');
  return context;
}
