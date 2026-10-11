import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

type ProfileMenuItemProps = {
  title: string;
  subtitle?: string;
  onPress: () => void;
  showDivider?: boolean;
};

export function ProfileMenuItem({
  title,
  subtitle,
  onPress,
  showDivider = true,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.item, !showDivider && styles.lastItem]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  textContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
  },
  subtitle: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
  chevron: {
    color: COLORS.text.secondary,
    fontSize: FONT_SIZE.xxl,
  },
});
