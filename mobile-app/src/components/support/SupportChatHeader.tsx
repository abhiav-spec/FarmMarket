import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  SUPPORT_CHAT_CONSTANTS,
  SUPPORT_CHAT_LAYOUT,
} from '@/constants/support';
import {
  COLORS,
  FEEDBACK_HEADER_LAYOUT,
  FONT_FAMILY,
  FONT_SIZE,
  RADIUS,
  SPACING,
  UI,
} from '@/theme';

const backArrow = require('../../../assets/icons/back-arrow.png');
const phoneIcon = require('@/components/images/phone-fill (1) 1.png');

interface SupportChatHeaderProps {
  title?: string;
  onBackPress: () => void;
  onCallPress?: () => void;
  onOptionsPress?: () => void;
}

export function SupportChatHeader({
  title = SUPPORT_CHAT_CONSTANTS.headerTitle,
  onBackPress,
  onCallPress,
  onOptionsPress,
}: SupportChatHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={SUPPORT_CHAT_CONSTANTS.accessibility.back}
          hitSlop={UI.hitSlop}
          onPress={onBackPress}
          style={styles.actionButton}
        >
          <Image
            source={backArrow}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.titleColumn}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.onlineStatusRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineStatusText}>
              {SUPPORT_CHAT_CONSTANTS.onlineStatus}
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            hitSlop={SPACING.sm}
            accessibilityRole="button"
            accessibilityLabel={
              SUPPORT_CHAT_CONSTANTS.accessibility.callSupport
            }
            onPress={onCallPress}
            style={styles.headerActionBtn}
          >
            <Image
              source={phoneIcon}
              style={styles.phoneIcon}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            hitSlop={SPACING.sm}
            accessibilityRole="button"
            accessibilityLabel={
              SUPPORT_CHAT_CONSTANTS.accessibility.moreOptions
            }
            onPress={onOptionsPress}
            style={styles.headerActionBtn}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={SUPPORT_CHAT_LAYOUT.iconMedium}
              color={COLORS.purple}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.purpleSurface,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.purpleButtonBorder,
    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: FEEDBACK_HEADER_LAYOUT.backButtonWidth,
    height: FEEDBACK_HEADER_LAYOUT.backButtonHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backArrow: {
    width: FEEDBACK_HEADER_LAYOUT.arrowWidth,
    height: FONT_SIZE.xl,
  },
  titleColumn: {
    flex: 1,
    marginLeft: SPACING.xs,
    gap: 2,
  },
  title: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  onlineStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  onlineDot: {
    width: SUPPORT_CHAT_LAYOUT.onlineDotSize,
    height: SUPPORT_CHAT_LAYOUT.onlineDotSize,
    borderRadius: SUPPORT_CHAT_LAYOUT.onlineDotSize / 2,
    backgroundColor: COLORS.stepperGreen,
  },
  onlineStatusText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.stepperGreen,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerActionBtn: {
    width: SUPPORT_CHAT_LAYOUT.avatarSmall,
    height: SUPPORT_CHAT_LAYOUT.avatarSmall,
    borderRadius: SUPPORT_CHAT_LAYOUT.avatarSmall / 2,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    width: SUPPORT_CHAT_LAYOUT.iconSmall,
    height: SUPPORT_CHAT_LAYOUT.iconSmall,
    tintColor: COLORS.purple,
  },
});
