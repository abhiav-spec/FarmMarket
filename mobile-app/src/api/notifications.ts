import { MOCK_NOTIFICATIONS } from '@/data/mockNotifications';
import { INITIAL_NOTIFICATION_SETTINGS } from '@/constants/accountSettings';
import type { Notification, NotificationSettings } from '@/types/notifications';

/**
 * Notifications API service
 *
 * Backend engineers: Replace the mock Promise returns below with your actual API calls
 * (e.g. using fetch or axios).
 */
export const notificationsApi = {
  /**
   * Fetch all notifications for the authenticated user
   */
  async getNotifications(): Promise<Notification[]> {
    // TODO: Connect real API endpoint:
    // const response = await fetch('/api/notifications');
    // return response.json();
    return Promise.resolve([...MOCK_NOTIFICATIONS]);
  },

  /**
   * Mark a single notification as read
   */
  async markAsRead(_id: string): Promise<void> {
    // TODO: Connect real API endpoint:
    // await fetch(`/api/notifications/${_id}/read`, { method: 'PATCH' });
    return Promise.resolve();
  },

  /**
   * Mark a single notification as unread
   */
  async markAsUnread(_id: string): Promise<void> {
    // TODO: Connect real API endpoint:
    // await fetch(`/api/notifications/${_id}/unread`, { method: 'PATCH' });
    return Promise.resolve();
  },

  /**
   * Delete a notification
   */
  async deleteNotification(_id: string): Promise<void> {
    // TODO: Connect real API endpoint:
    // await fetch(`/api/notifications/${_id}`, { method: 'DELETE' });
    return Promise.resolve();
  },

  /**
   * Fetch user notification preferences
   */
  async getSettings(): Promise<NotificationSettings> {
    // TODO: Connect real API endpoint:
    // const response = await fetch('/api/user/notification-settings');
    // return response.json();
    return Promise.resolve({ ...INITIAL_NOTIFICATION_SETTINGS });
  },

  /**
   * Save user notification preferences
   */
  async updateSettings(_settings: NotificationSettings): Promise<void> {
    // TODO: Connect real API endpoint:
    // await fetch('/api/user/notification-settings', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(_settings),
    // });
    return Promise.resolve();
  },
};

