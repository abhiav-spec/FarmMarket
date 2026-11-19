import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppIcon } from '@/components/common/AppIcon';
import { NOTIFICATION_STRINGS } from '@/constants/notifications';
import {
  COLORS,
  FEEDBACK_HEADER_LAYOUT,
  FONT_FAMILY,
  FONT_SIZE,
  ICON_SIZES,
  RADIUS,
  SPACING,
  UI,
} from '@/theme';

interface NotificationHeaderProps {
  onBack: () => void;
  onSettings: () => void;
}

export function NotificationHeader({
  onBack,
  onSettings,
}: NotificationHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={UI.hitSlop}
        onPress={onBack}
        style={styles.action}
      >
        <Image
          source={require('../../../assets/icons/back-arrow.png')}
          style={styles.backArrow}
          resizeMode="contain"
          accessibilityLabel="Back arrow"
        />
      </Pressable>

      <AppText style={styles.title} numberOfLines={1}>
        {NOTIFICATION_STRINGS.header}
      </AppText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notification settings"
        hitSlop={UI.hitSlop}
        onPress={onSettings}
        style={styles.action}
      >
        <AppIcon name="settings" size="lg" color={COLORS.text.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: FEEDBACK_HEADER_LAYOUT.height,
    backgroundColor: COLORS.purpleSurface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: FEEDBACK_HEADER_LAYOUT.borderWidth,
    borderBottomColor: COLORS.purple,
    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
  },
  action: {
    width: FEEDBACK_HEADER_LAYOUT.backButtonWidth,
    height: FEEDBACK_HEADER_LAYOUT.backButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  backArrow: {
    width: FEEDBACK_HEADER_LAYOUT.arrowWidth,
    height: ICON_SIZES.xl,
  },
  title: {
    position: 'absolute',
    left: UI.zeroInset,
    right: UI.zeroInset,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
});
