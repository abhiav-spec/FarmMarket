import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { CART_CONFIG } from '@/constants/config';
import { type CartConfig, type CartItem, type CartPriceSummary, type Product } from '@/types';
import { computePriceSummary } from '@/utils/price';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'DELETE_ITEM'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

function updateQuantity(items: CartItem[], productId: string, update: (quantity: number) => number): CartItem[] {
  return items.map((item) => (item.product.id === productId ? { ...item, quantity: update(item.quantity) } : item));
}

function cartReducer(items: CartItem[], action: CartAction, config: CartConfig): CartItem[] {
  const { MIN_QUANTITY_PER_ITEM: min, MAX_QUANTITY_PER_ITEM: max } = config;
  switch (action.type) {
    case 'ADD_ITEM':
      return items.some((item) => item.product.id === action.product.id)
        ? updateQuantity(items, action.product.id, (quantity) => Math.min(quantity + 1, max))
        : [...items, { product: action.product, quantity: min }];
    case 'REMOVE_ITEM':
      // Decrementing below the minimum removes the item.
      return updateQuantity(items, action.productId, (quantity) => quantity - 1).filter((item) => item.quantity >= min);
    case 'DELETE_ITEM':
      return items.filter((item) => item.product.id !== action.productId);
    case 'SET_QUANTITY':
      if (!Number.isFinite(action.quantity)) return items;
      return updateQuantity(items, action.productId, () => Math.min(Math.max(Math.trunc(action.quantity), min), max));
    case 'CLEAR_CART':
      return [];
    default:
      return items;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  config: CartConfig;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  priceSummary: CartPriceSummary;
}

interface CartProviderProps {
  children: React.ReactNode;
  initialItems?: readonly CartItem[];
  config?: CartConfig;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const EMPTY_ITEMS: readonly CartItem[] = [];

export function CartProvider({
  children,
  initialItems = EMPTY_ITEMS,
  config = CART_CONFIG,
}: CartProviderProps) {
  const [items, dispatch] = useReducer(
    (current: CartItem[], action: CartAction) => cartReducer(current, action, config),
    initialItems,
    (initial) => initial.map((item) => ({ ...item })),
  );
  const actions = useMemo(() => ({
    addItem: (product: Product) => dispatch({ type: 'ADD_ITEM', product }),
    removeItem: (productId: string) => dispatch({ type: 'REMOVE_ITEM', productId }),
    deleteItem: (productId: string) => dispatch({ type: 'DELETE_ITEM', productId }),
    setQuantity: (productId: string, quantity: number) =>
      dispatch({ type: 'SET_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  }), []);
  const value = useMemo<CartContextValue>(() => ({
    ...actions,
    items,
    config,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    priceSummary: computePriceSummary(items, config),
  }), [actions, items, config]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
