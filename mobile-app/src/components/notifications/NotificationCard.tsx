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
  onOptionsPress?: (item: Notification) => void;
}

const CATEGORY_ICON: Record<string, Parameters<typeof AppIcon>[0]['name']> = {
  orders: 'orders',
  offers: 'coupon',
  wallet: 'wallet',
};

// Unread indicator dot size
const UNREAD_DOT = 9;

export function NotificationCard({
  item,
  onPress,
  onOptionsPress,
}: NotificationCardProps) {
  const iconName = CATEGORY_ICON[item.category] ?? 'notifications';

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
        <AppIcon name={iconName} size="lg" color={COLORS.purple} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText style={styles.title} numberOfLines={1}>
            {item.title}
          </AppText>
          <View style={styles.titleActions}>
            {!item.read && <View style={styles.unreadDot} />}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notification options"
              hitSlop={UI.hitSlop}
              onPress={() => onOptionsPress?.(item)}
              style={({ pressed }) => [
                styles.optionsButton,
                pressed && styles.optionsButtonPressed,
              ]}
            >
              <AppIcon name="moreVertical" size="lg" color={COLORS.text.muted} />
            </Pressable>
          </View>
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
    paddingVertical: SPACING.lg,
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
    width: SIZES.iconButton,
    height: SIZES.iconButton,
    borderRadius: RADIUS.circle,
    backgroundColor: COLORS.productActionSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: SPACING.xs,
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
    fontSize: FONT_SIZE.md,
    lineHeight: LINE_HEIGHT.md,
    color: COLORS.text.primary,
  },
  titleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  optionsButton: {
    padding: SPACING.xs,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsButtonPressed: {
    opacity: UI.disabledOpacity,
  },
  unreadDot: {
    width: UNREAD_DOT,
    height: UNREAD_DOT,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purple,
  },
  bodyText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.text.secondary,
  },
  timestamp: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    color: COLORS.text.muted,
  },
});
