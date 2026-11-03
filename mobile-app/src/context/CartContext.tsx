import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { CART_CONFIG } from '@/constants/config';
import { type CartConfig, type CartItem, type CartPriceSummary, type Product } from '@/types';
import { type CartProductRef, isSameCartProduct } from '@/utils/cart';
import { computePriceSummary } from '@/utils/price';

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; product: CartProductRef }
  | { type: 'DELETE_ITEM'; product: CartProductRef }
  | { type: 'SET_QUANTITY'; product: CartProductRef; quantity: number }
  | { type: 'CLEAR_CART' };

function updateQuantity(items: CartItem[], product: CartProductRef, update: (quantity: number) => number): CartItem[] {
  return items.map((item) => (isSameCartProduct(item.product, product) ? { ...item, quantity: update(item.quantity) } : item));
}

function cartReducer(items: CartItem[], action: CartAction, config: CartConfig): CartItem[] {
  const { MIN_QUANTITY_PER_ITEM: min, MAX_QUANTITY_PER_ITEM: max } = config;
  switch (action.type) {
    case 'ADD_ITEM':
      return items.some((item) => isSameCartProduct(item.product, action.product))
        ? updateQuantity(items, action.product, (quantity) => Math.min(quantity + 1, max))
        : [...items, { product: action.product, quantity: min }];
    case 'REMOVE_ITEM':
      // Decrementing below the minimum removes the item.
      return updateQuantity(items, action.product, (quantity) => quantity - 1).filter((item) => item.quantity >= min);
    case 'DELETE_ITEM':
      return items.filter((item) => !isSameCartProduct(item.product, action.product));
    case 'SET_QUANTITY':
      if (!Number.isFinite(action.quantity)) return items;
      return updateQuantity(items, action.product, () => Math.min(Math.max(Math.trunc(action.quantity), min), max));
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
  removeItem: (product: CartProductRef) => void;
  deleteItem: (product: CartProductRef) => void;
  setQuantity: (product: CartProductRef, quantity: number) => void;
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
    removeItem: (product: CartProductRef) => dispatch({ type: 'REMOVE_ITEM', product }),
    deleteItem: (product: CartProductRef) => dispatch({ type: 'DELETE_ITEM', product }),
    setQuantity: (product: CartProductRef, quantity: number) =>
      dispatch({ type: 'SET_QUANTITY', product, quantity }),
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
