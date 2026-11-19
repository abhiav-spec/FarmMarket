import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { DEFAULT_ORDER, loadPersistedOrders, ORDERS } from '../data/defaultOrder';
import type { FarmOrder } from '../types/order';

// Replace this adapter with the authenticated user's order query when login is connected.
export function useOrder(): FarmOrder {
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  return ORDERS.find((order) => order.id === orderId) ?? DEFAULT_ORDER;
}

export function useOrders(): FarmOrder[] {
  const [orders, setOrders] = useState<FarmOrder[]>(() => [...ORDERS]);
  useEffect(() => {
    let active = true;
    void loadPersistedOrders().then(() => {
      if (active) setOrders([...ORDERS]);
    });
    return () => { active = false; };
  }, []);
  return orders;
}
