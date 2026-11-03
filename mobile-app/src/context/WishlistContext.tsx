import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Only ids and timestamps are stored; the product data is looked up from the catalog when shown. */
export interface WishlistEntry {
  productId: string;
  addedAt: string;
}

interface WishlistContextValue {
  entries: WishlistEntry[];
  ready: boolean;
  count: number;
  isWished: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
}

const STORAGE_KEY = '@farmmarket/wishlist';
const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<WishlistEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw: string | null) => {
        if (!active) return;
        try {
          const parsed = raw ? (JSON.parse(raw) as WishlistEntry[]) : [];
          setEntries(Array.isArray(parsed) ? parsed : []);
        } catch {
          setEntries([]);
        }
      })
      .catch(() => undefined)
      .finally(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);

  const update = useCallback((updater: (current: WishlistEntry[]) => WishlistEntry[]) => {
    setEntries((current) => {
      const next = updater(current);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
      return next;
    });
  }, []);

  const toggle = useCallback(
    (productId: string) =>
      update((current) =>
        current.some((e) => e.productId === productId)
          ? current.filter((e) => e.productId !== productId)
          : [{ productId, addedAt: new Date().toISOString() }, ...current],
      ),
    [update],
  );

  const remove = useCallback(
    (productId: string) => update((current) => current.filter((e) => e.productId !== productId)),
    [update],
  );

  const value = useMemo<WishlistContextValue>(
    () => ({
      entries,
      ready,
      count: entries.length,
      isWished: (productId) => entries.some((e) => e.productId === productId),
      toggle,
      remove,
    }),
    [entries, ready, toggle, remove],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
