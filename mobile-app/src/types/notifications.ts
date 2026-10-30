export type NotificationCategory = 'all' | 'orders' | 'offers' | 'wallet';

export interface Notification {
  id: string;
  category: Exclude<NotificationCategory, 'all'>;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}
