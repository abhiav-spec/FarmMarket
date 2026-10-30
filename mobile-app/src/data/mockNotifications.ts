import type { Notification } from '@/types/notifications';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    category: 'orders',
    title: 'Order Confirmed',
    body: 'Your produce order #1042 has been placed successfully.',
    timestamp: '10m ago',
    read: false,
  },
  {
    id: '2',
    category: 'offers',
    title: 'Special Discount',
    body: 'Get 15% off on your next purchase of organic fertilizer.',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: '3',
    category: 'wallet',
    title: 'Payment Received',
    body: '₹4,500 has been credited to your FarmMarket wallet.',
    timestamp: '1d ago',
    read: true,
  },
  {
    id: '4',
    category: 'orders',
    title: 'Order Shipped',
    body: 'Order #1039 is on the way to your delivery address.',
    timestamp: '2d ago',
    read: true,
  },
];

