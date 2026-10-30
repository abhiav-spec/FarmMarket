import React, { useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import {
  NotificationCard,
  NotificationEmptyState,
  NotificationFilterTabs,
  NotificationHeader,
} from '@/components/notifications';
import { NOTIFICATION_ROUTES } from '@/constants/notifications';
import type { Notification, NotificationCategory } from '@/types/notifications';
import { COLORS } from '@/theme';

// ---------------------------------------------------------------------------
// Mock data — replace with an API call / context when ready
// ---------------------------------------------------------------------------
const MOCK_NOTIFICATIONS: Notification[] = [];

export function NotificationsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NotificationCategory>('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return MOCK_NOTIFICATIONS;
    return MOCK_NOTIFICATIONS.filter((n) => n.category === activeTab);
  }, [activeTab]);

  const handleCardPress = (_id: string) => {
    // TODO: mark as read / navigate to detail
  };

  const handleExploreOffers = () => {
    router.push(NOTIFICATION_ROUTES.offers as never);
  };

  const handleSettings = () => {
    router.push(NOTIFICATION_ROUTES.settings as never);
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
          <NotificationCard item={item} onPress={handleCardPress} />
        )}
        ListEmptyComponent={
          <NotificationEmptyState
            onExploreOffers={handleExploreOffers}
            onSettings={handleSettings}
          />
        }
        style={styles.list}
        contentContainerStyle={styles.listContent}
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
