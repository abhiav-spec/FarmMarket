import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  NotificationActionModal,
  NotificationCard,
  NotificationEmptyState,
  NotificationFilterTabs,
  NotificationHeader,
} from '@/components/notifications';
import { notificationsApi } from '@/api/notifications';
import { NOTIFICATION_ROUTES } from '@/constants/notifications';
import type { Notification, NotificationCategory } from '@/types/notifications';
import { COLORS } from '@/theme';

interface NotificationsScreenProps {
  initialNotifications?: Notification[];
}

export function NotificationsScreen({
  initialNotifications,
}: NotificationsScreenProps = {}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');
  const [notifications, setNotifications] = useState<Notification[]>(
    initialNotifications ?? []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    let isMounted = true;
    notificationsApi
      .getNotifications()
      .then((data) => {
        if (isMounted) {
          setNotifications(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load notifications:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await notificationsApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to refresh notifications:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === 'all') return notifications;
    return notifications.filter((n) => n.category === activeTab);
  }, [activeTab, notifications]);

  const handleCardPress = async (id: string) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
    try {
      await notificationsApi.markAsRead(id);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleOptionsPress = (item: Notification) => {
    setSelectedNotification(item);
  };

  const handleToggleRead = async (id: string) => {
    const targetItem = notifications.find((item) => item.id === id);
    if (!targetItem) return;
    const willBeRead = !targetItem.read;

    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: willBeRead } : item))
    );
    setSelectedNotification(null);

    try {
      if (willBeRead) {
        await notificationsApi.markAsRead(id);
      } else {
        await notificationsApi.markAsUnread(id);
      }
    } catch (error) {
      console.error('Failed to toggle notification read state:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    setSelectedNotification(null);

    try {
      await notificationsApi.deleteNotification(id);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const handleExploreOffers = () => {
    router.push(NOTIFICATION_ROUTES.offers as never);
  };

  const handleSettings = () => {
    router.push({
      pathname: NOTIFICATION_ROUTES.settings,
      params: { from: 'notifications' },
    } as never);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(main)/home' as never);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <NotificationHeader
        onBack={handleBack}
        onSettings={handleSettings}
      />

      <NotificationFilterTabs active={activeTab} onSelect={setActiveTab} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationCard
            item={item}
            onPress={handleCardPress}
            onOptionsPress={handleOptionsPress}
          />
        )}
        ListEmptyComponent={
          <NotificationEmptyState
            onExploreOffers={handleExploreOffers}
            onSettings={handleSettings}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.purple]}
            tintColor={COLORS.purple}
          />
        }
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <NotificationActionModal
        visible={selectedNotification !== null}
        item={selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onToggleRead={handleToggleRead}
        onDelete={handleDelete}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
