import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import type { Notification } from '@/types/notifications';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  RADIUS,
  SPACING,
  UI,
} from '@/theme';

interface NotificationActionModalProps {
  visible: boolean;
  item: Notification | null;
  onClose: () => void;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationActionModal({
  visible,
  item,
  onClose,
  onToggleRead,
  onDelete,
}: NotificationActionModalProps) {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close options"
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <AppText style={styles.headerTitle} numberOfLines={1}>
              {item.title}
            </AppText>
            <AppText style={styles.headerSubtitle} numberOfLines={1}>
              {item.body}
            </AppText>
          </View>

          <View style={styles.divider} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.read ? 'Mark as unread' : 'Mark as read'}
            onPress={() => onToggleRead(item.id)}
            style={({ pressed }) => [
              styles.actionItem,
              pressed && styles.actionItemPressed,
            ]}
          >
            <View style={styles.actionIconBadge}>
              <AppIcon
                name={item.read ? 'eyeOff' : 'check'}
                size="md"
                color={COLORS.purple}
              />
            </View>
            <AppText style={styles.actionText}>
              {item.read ? 'Mark as unread' : 'Mark as read'}
            </AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Delete notification"
            onPress={() => onDelete(item.id)}
            style={({ pressed }) => [
              styles.actionItem,
              pressed && styles.actionItemPressed,
            ]}
          >
            <View style={[styles.actionIconBadge, styles.deleteIconBadge]}>
              <AppIcon name="trash" size="md" color={COLORS.error} />
            </View>
            <AppText style={[styles.actionText, styles.deleteText]}>
              Delete notification
            </AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel"
            onPress={onClose}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
          >
            <AppText style={styles.cancelText}>Cancel</AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cardBorder,
    alignSelf: 'center',
    marginBottom: SPACING.xs,
  },
  header: {
    paddingVertical: SPACING.xs,
    gap: SPACING.xxs,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
  },
  divider: {
    height: UI.borderWidth,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.xs,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.md,
  },
  actionItemPressed: {
    backgroundColor: COLORS.surfaceLight,
  },
  actionIconBadge: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purpleSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconBadge: {
    backgroundColor: '#FDECEC',
  },
  actionText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  deleteText: {
    color: COLORS.error,
  },
  cancelButton: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
  },
  cancelButtonPressed: {
    opacity: UI.disabledOpacity,
  },
  cancelText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
});
