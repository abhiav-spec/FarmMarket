import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FarmOrder } from '../types/order';

const ORDERS_STORAGE_KEY = 'farmmarket.orders.v1';

export const DEFAULT_ORDER: FarmOrder = {
  id: '#ORD123456770',
  status: 'Delivered',
  date: '7 Jan, 2026',
  product: 'UPL Saaf Fungicide',
  weight: '250g',
  price: '₹ 466.65',
  amount: '466.65',
  paymentMethod: 'Cash on delivery',
  deliveredAt: 'on web, 7 Jan, 5:12 PM',
  deliveryTimelineLabel: 'Delivery on Web, 7 Ap',
  requestDate: '7 Jan, 2026 at 6:15 PM',
  cancellationReason: 'Ordered by mistake',
  returnRequest: {
    id: '#RTR12345678',
    reason: 'Wrong Product Received',
  },
  deliveryAddress: {
    name: 'Jagadeesh',
    lines:
      'H.No 12-4-56, Near bus Stand, Kappegalu Village, Bellary District\nKarnataka - 583101',
    phone: 'Phone: 1234567890',
  },
  events: [
    { name: 'Confirmed', date: '1 Jan, 2026', completed: true },
    { name: 'Packed', date: '3 Jan, 2026', completed: true },
    { name: 'Dispatched', date: '3 Jan, 2026', completed: true },
    { name: 'Out for Delivery', date: '5 Jan, 2026', completed: true },
    { name: 'Delivery', date: '7 Jan, 2026', completed: true },
  ],
};

export const PACKED_ORDER: FarmOrder = {
  ...DEFAULT_ORDER,
  id: '#ORD123456771',
  status: 'Packed',
  date: '1 Jan, 2026',
  deliveredAt: 'on web, 3 Jan, 11:24 AM',
  deliveryTimelineLabel: 'Packed on 3 Jan, 2026',
  events: [
    { name: 'Confirmed', date: '1 Jan, 2026', completed: true },
    { name: 'Packed', date: '3 Jan, 2026', completed: true },
    { name: 'Dispatched', date: '', completed: false },
    { name: 'Out for Delivery', date: '', completed: false },
    { name: 'Delivery', date: '', completed: false },
  ],
};

export const ORDERS: FarmOrder[] = [DEFAULT_ORDER, PACKED_ORDER];

function persistOrders(): void {
  void AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ORDERS));
}

export async function loadPersistedOrders(): Promise<void> {
  try {
    const stored = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) return;
    const parsed = JSON.parse(stored) as FarmOrder[];
    if (!Array.isArray(parsed)) return;
    ORDERS.splice(0, ORDERS.length, ...parsed);
  } catch {
    // Keep the built-in order list if storage is unavailable or corrupted.
  }
}

export function updateOrderStatus(orderId: string, status: FarmOrder['status']): void {
  const order = ORDERS.find((item) => item.id === orderId);
  if (!order) return;
  order.status = status;
  if (status === 'Cancelled') {
    order.deliveredAt = 'Cancelled';
    order.deliveryTimelineLabel = 'Order cancelled';
  } else if (status === 'Return Requested') {
    order.deliveredAt = 'Return requested';
    order.deliveryTimelineLabel = 'Return request submitted';
  }
  persistOrders();
}

export function addOrderFromCart(input: {
  product: string;
  weight?: string;
  totalPaise: number;
  paymentMethod: string;
}): FarmOrder {
  const now = new Date();
  const date = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const order: FarmOrder = {
    ...DEFAULT_ORDER,
    id: `#ORD${Date.now()}`,
    status: 'Order Placed',
    date,
    product: input.product,
    weight: input.weight ?? '1 unit',
    price: `₹ ${(input.totalPaise / 100).toFixed(2)}`,
    amount: (input.totalPaise / 100).toFixed(2),
    paymentMethod: input.paymentMethod,
    deliveredAt: `placed on ${date}`,
    deliveryTimelineLabel: `Order placed on ${date}`,
    requestDate: `${date} at ${now.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}`,
    events: [
      { name: 'Confirmed', date, completed: false },
      { name: 'Packed', date: '', completed: false },
      { name: 'Dispatched', date: '', completed: false },
      { name: 'Out for Delivery', date: '', completed: false },
      { name: 'Delivery', date: '', completed: false },
    ],
  };
  ORDERS.unshift(order);
  persistOrders();
  return order;
}
