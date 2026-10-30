import type { NotificationCategory } from '@/types/notifications';

export const NOTIFICATION_STRINGS = {
  header: 'Notifications',
  emptyTitle: 'No notifications yet',
  emptySubtitle:
    'Updates about your orders, offers\nand wallet will appear here',
  exploreOffers: 'Explore Offers',
  settings: 'Notification Settings',
} as const;

export const NOTIFICATION_TABS: { key: NotificationCategory; label: string }[] =
  [
    { key: 'all', label: 'All' },
    { key: 'orders', label: 'Orders' },
    { key: 'offers', label: 'Offers' },
    { key: 'wallet', label: 'Wallet' },
  ];

export const NOTIFICATION_ROUTES = {
  settings: '/(main)/notifications-settings',
  offers: '/(main)/home',
} as const;
