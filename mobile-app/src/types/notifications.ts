export type StandardNotificationCategory = 'orders' | 'offers' | 'wallet';

export type NotificationCategory =
  | 'all'
  | StandardNotificationCategory
  | (string & {});

export interface Notification {
  id: string;
  category: StandardNotificationCategory | string;
  title: string;
  body: string;
  timestamp: string;
  createdAt?: string;
  read: boolean;
  metadata?: Record<string, unknown>;
}

export interface NotificationSettings {
  orderUpdates: boolean;
  cropAdvisory: boolean;
  offers: boolean;
  walletUpdates: boolean;
  [key: string]: boolean;
}
