import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { NotificationIllustration } from '@/components/notifications/NotificationIllustration';
import { NOTIFICATION_STRINGS } from '@/constants/notifications';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, RADIUS, SPACING, UI } from '@/theme';

interface NotificationEmptyStateProps {
  onExploreOffers: () => void;
  onSettings: () => void;
}

export function NotificationEmptyState({
  onExploreOffers,
  onSettings,
}: NotificationEmptyStateProps) {
  return (
    <View style={styles.container}>
      {/* Figma bell illustration — orange swapped to project purple tokens */}
      <NotificationIllustration />

      <AppText style={styles.title}>
        {NOTIFICATION_STRINGS.emptyTitle}
      </AppText>

      <AppText style={styles.subtitle}>
        {NOTIFICATION_STRINGS.emptySubtitle}
      </AppText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={NOTIFICATION_STRINGS.exploreOffers}
        onPress={onExploreOffers}
        style={({ pressed }) => [
          styles.exploreButton,
          pressed && styles.pressed,
        ]}
      >
        <AppText style={styles.exploreText}>
          {NOTIFICATION_STRINGS.exploreOffers}
        </AppText>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={NOTIFICATION_STRINGS.settings}
        hitSlop={UI.hitSlop}
        onPress={onSettings}
      >
        <AppText style={styles.settingsLink}>
          {NOTIFICATION_STRINGS.settings}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    gap: SPACING.md,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  subtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  exploreButton: {
    width: '100%',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: UI.disabledOpacity,
  },
  exploreText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.inverse,
  },
  settingsLink: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.purple,
    marginTop: SPACING.xs,
  },
});
