import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type SettingsIcon = 'notifications' | 'privacy-policy' | 'terms-conditions';

type SettingsRowProps = {
  title: string;
  description: string;
  icon: SettingsIcon;
  onPress: () => void;
};

const SETTINGS_ICONS: Record<SettingsIcon, number> = {
  notifications: require('../../../assets/icons/notifications.png'),
  'privacy-policy': require('../../../assets/icons/privacy-policy.png'),
  'terms-conditions': require('../../../assets/icons/terms-conditions.png'),
};

export function SettingsRow({
  title,
  description,
  icon,
  onPress,
}: SettingsRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.iconContainer}>
        <Image
          source={SETTINGS_ICONS[icon]}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={FONT_SIZE.xxl}
        color={COLORS.text.primary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: SPACING.xxxl + SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  pressed: {
    opacity: 0.75,
  },

  iconContainer: {
    width: SPACING.xxxl + SPACING.xl,
    height: SPACING.xxxl + SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purpleLight,
  },
  icon: {
    width: SPACING.xxxl,
    height: SPACING.xxxl,
    resizeMode: 'contain',
  },

  textContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  description: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
});
