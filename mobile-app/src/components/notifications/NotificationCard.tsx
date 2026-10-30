import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import type { Notification } from '@/types/notifications';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
  SIZES,
  SPACING,
  UI,
} from '@/theme';

interface NotificationCardProps {
  item: Notification;
  onPress?: (id: string) => void;
}

const CATEGORY_ICON: Record<
  Notification['category'],
  Parameters<typeof AppIcon>[0]['name']
> = {
  orders: 'orders',
  offers: 'coupon',
  wallet: 'wallet',
};

// Unread indicator dot size — not a standard SIZES token so kept here
const UNREAD_DOT = SPACING.sm;

export function NotificationCard({ item, onPress }: NotificationCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.title}
      onPress={() => onPress?.(item.id)}
      style={({ pressed }) => [
        styles.card,
        !item.read && styles.cardUnread,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.iconBadge}>
        <AppIcon name={CATEGORY_ICON[item.category]} size="md" color={COLORS.purple} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText style={styles.title} numberOfLines={1}>
            {item.title}
          </AppText>
          {!item.read && <View style={styles.unreadDot} />}
        </View>

        <AppText style={styles.bodyText} numberOfLines={2}>
          {item.body}
        </AppText>

        <AppText style={styles.timestamp}>{item.timestamp}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: UI.borderWidth,
    borderBottomColor: COLORS.divider,
  },
  cardUnread: {
    backgroundColor: COLORS.purpleSurface,
  },
  cardPressed: {
    opacity: UI.disabledOpacity,
  },
  iconBadge: {
    width: SIZES.smallIconButton,
    height: SIZES.smallIconButton,
    borderRadius: RADIUS.circle,
    backgroundColor: COLORS.productActionSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: SPACING.xxs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
  },
  unreadDot: {
    width: UNREAD_DOT,
    height: UNREAD_DOT,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purple,
  },
  bodyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    color: COLORS.text.secondary,
  },
  timestamp: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xxs,
    color: COLORS.text.muted,
  },
});
