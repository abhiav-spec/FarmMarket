import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type FeedbackHeaderProps = {
  title: string;
  onBackPress: () => void;
  rightIconSource?: number;
  onRightPress?: () => void;
  rightAccessibilityLabel?: string;
};

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
          accessible={false}
        />
      </Pressable>

      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {rightIconSource != null && onRightPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={rightAccessibilityLabel}
          hitSlop={8}
          onPress={onRightPress}
          style={styles.rightAction}
        >
          <Image
            source={rightIconSource}
            style={styles.rightIcon}
            resizeMode="contain"
            accessible={false}
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
  actionButton: {
    width: 40,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  rightAction: {
    width: 40,
    height: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  },
  rightSpacer: {
    width: 40,
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
});
