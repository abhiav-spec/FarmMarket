import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  SUPPORT_CHAT_CONSTANTS,
  SUPPORT_CHAT_LAYOUT,
} from '@/constants/support';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
  SPACING,
} from '@/theme';

interface SupportTicketBannerProps {
  ticketId: string;
  orderId: string;
}

export function SupportTicketBanner({
  ticketId,
  orderId,
}: SupportTicketBannerProps) {
  return (
    <View style={styles.bannerContainer}>
      {/* Left: Ticket ID */}
      <View style={styles.section}>
        <View
          style={styles.iconCircle}
          accessibilityLabel={SUPPORT_CHAT_CONSTANTS.accessibility.ticketIcon}
        >
          <Ionicons
            name="headset-outline"
            size={SUPPORT_CHAT_LAYOUT.iconMedium}
            color={COLORS.purple}
          />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.label}>{SUPPORT_CHAT_CONSTANTS.ticketLabel}</Text>
          <Text style={styles.value} numberOfLines={1}>
            {ticketId}
          </Text>
        </View>
      </View>

      {/* Right: Order ID */}
      <View style={styles.section}>
        <View
          style={styles.iconCircle}
          accessibilityLabel={SUPPORT_CHAT_CONSTANTS.accessibility.orderIcon}
        >
          <Ionicons
            name="cube-outline"
            size={SUPPORT_CHAT_LAYOUT.iconMedium}
            color={COLORS.purple}
          />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.label}>{SUPPORT_CHAT_CONSTANTS.orderLabel}</Text>
          <Text style={styles.value} numberOfLines={1}>
            {orderId}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: SUPPORT_CHAT_LAYOUT.borderWidth,
    borderColor: COLORS.purpleBorder1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    minHeight: SUPPORT_CHAT_LAYOUT.headerHeight,
    gap: SPACING.sm,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  iconCircle: {
    width: SUPPORT_CHAT_LAYOUT.ticketIconSize,
    height: SUPPORT_CHAT_LAYOUT.ticketIconSize,
    borderRadius: SUPPORT_CHAT_LAYOUT.ticketIconSize / 2,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    gap: SPACING.xxs,
  },
  label: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xxs,
    lineHeight: LINE_HEIGHT.xxs,
    color: COLORS.text.secondary,
  },
  value: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.purple,
  },
});
