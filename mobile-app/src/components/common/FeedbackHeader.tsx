import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type FeedbackHeaderProps = {
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
        hitSlop={8}
        onPress={onBackPress}
        style={styles.actionButton}
      >
        <Image
          source={require('../../../assets/icons/back-arrow.png')}
          style={styles.backArrow}
          resizeMode="contain"
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
    height: 112,
    alignItems: 'center',
    backgroundColor: COLORS.purpleSurface,
    borderBottomColor: COLORS.purple,
    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
    borderBottomWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    height: 44,
  actionButton: {
    width: FEEDBACK_HEADER_LAYOUT.backButtonWidth,
    height: FEEDBACK_HEADER_LAYOUT.backButtonHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 40,
    zIndex: 1,
  },
  backArrow: {
    height: 32,
    width: 32,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
  },
  spacer: {
    width: 40,
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
