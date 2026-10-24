import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

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

interface FeedbackHeaderProps {
  title: string;
  onBackPress: () => void;
  rightIconSource?: number;
  onRightPress?: () => void;
  rightAccessibilityLabel?: string;
}

export function FeedbackHeader({
  title,
  onBackPress,
  rightIconSource,
  onRightPress,
  rightAccessibilityLabel = 'More information',
}: FeedbackHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={UI.hitSlop}
        onPress={onBackPress}
        style={styles.actionButton}
      >
        <Image
          source={require('../../../assets/icons/back-arrow.png')}
          style={styles.backArrow}
          resizeMode="contain"
          accessibilityLabel="Back arrow"
        />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightIconSource && onRightPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={rightAccessibilityLabel}
          hitSlop={UI.hitSlop}
          onPress={onRightPress}
          style={styles.rightAction}
        >
          <Image
            source={rightIconSource}
            style={styles.rightIcon}
            resizeMode="contain"
            accessibilityLabel={rightAccessibilityLabel}
          />
        </Pressable>
      ) : (
        <View style={styles.rightSpacer} />
      )}
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
  actionButton: {
    width: FEEDBACK_HEADER_LAYOUT.backButtonWidth,
    height: FEEDBACK_HEADER_LAYOUT.backButtonHeight,
    alignItems: 'flex-start',
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
  rightSpacer: {
    width: FEEDBACK_HEADER_LAYOUT.rightSpacerWidth,
  },
  rightAction: {
    width: FEEDBACK_HEADER_LAYOUT.rightSpacerWidth,
    height: FEEDBACK_HEADER_LAYOUT.backButtonHeight,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  },
  rightIcon: {
    width: ICON_SIZES.lg,
    height: ICON_SIZES.lg,
  },
});
