import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SavedAddress {
  id: string;
  name: string;
  address: string;
  landmark: string;
  createdAt: string;
}

export type NewAddress = Omit<SavedAddress, 'id' | 'createdAt'>;

interface AddressContextValue {
  addresses: SavedAddress[];
  selected: SavedAddress | undefined;
  ready: boolean;
  /** Address typed on the "Add Address" screen, carried over to the details form. */
  draftAddress: string;
  setDraftAddress: (value: string) => void;
  addAddress: (data: NewAddress) => SavedAddress;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
}

const STORAGE_KEY = '@farmmarket/addresses';
const AddressContext = createContext<AddressContextValue | null>(null);

interface StoredState {
  addresses: SavedAddress[];
  selectedId: string | null;
}

/** "Bangarpet, Kolar District, Karnataka, India" -> "Kolar District, Karnataka" (for the Home header). */
export function shortLocationLabel(address: string): string {
  const parts = address
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length && parts[parts.length - 1].toLowerCase() === 'india') parts.pop();
  return parts.slice(-2).join(', ') || address;
}

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredState>({ addresses: [], selectedId: null });
  const [ready, setReady] = useState(false);
  const [draftAddress, setDraftAddress] = useState('');

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw: string | null) => {
        if (!active || !raw) return;
        try {
          const parsed = JSON.parse(raw) as StoredState;
          if (Array.isArray(parsed.addresses)) setState(parsed);
        } catch {
          /* ignore corrupted data */
        }
      })
      .catch(() => undefined)
      .finally(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);

  const commit = useCallback((next: StoredState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => undefined);
  }, []);

  const addAddress = useCallback(
    (data: NewAddress) => {
      const item: SavedAddress = {
        ...data,
        id: `addr-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      commit({ addresses: [item, ...state.addresses], selectedId: item.id });
      return item;
    },
    [commit, state.addresses],
  );

  const removeAddress = useCallback(
    (id: string) => {
      const addresses = state.addresses.filter((a) => a.id !== id);
      const selectedId = state.selectedId === id ? (addresses[0]?.id ?? null) : state.selectedId;
      commit({ addresses, selectedId });
    },
    [commit, state],
  );

  const selectAddress = useCallback(
    (id: string) => commit({ addresses: state.addresses, selectedId: id }),
    [commit, state.addresses],
  );

  const value = useMemo<AddressContextValue>(
    () => ({
      addresses: state.addresses,
      selected: state.addresses.find((a) => a.id === state.selectedId),
      ready,
      draftAddress,
      setDraftAddress,
      addAddress,
      removeAddress,
      selectAddress,
    }),
    [state, ready, draftAddress, addAddress, removeAddress, selectAddress],
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error('useAddress must be used within AddressProvider');
  return ctx;
}
