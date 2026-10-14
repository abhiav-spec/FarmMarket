import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import type { ProfileMenuIcon } from '@/constants/profile';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileMenuItemProps = {
  title: string;
  subtitle?: string;
  icon: ProfileMenuIcon;
  onPress: () => void;
};

const PROFILE_ICONS: Record<ProfileMenuIcon, number> = {
  address: require('../../../assets/icons/profile/address.png'),
  history: require('../../../assets/icons/profile/history.png'),
  support: require('../../../assets/icons/profile/support.png'),
  review: require('../../../assets/icons/profile/review.png'),
  setting: require('../../../assets/icons/profile/setting.png'),
  logout: require('../../../assets/icons/profile/logout.png'),
};

export function ProfileMenuItem({
  title,
  subtitle,
  icon,
  onPress,
}: ProfileMenuItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={styles.item}
    >
      <View style={styles.iconBox}>
        <Image
          source={PROFILE_ICONS[icon]}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <Ionicons
        name="chevron-forward"
        size={FONT_SIZE.xl}
        color={COLORS.text.black}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  iconBox: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleLight,
  },
  icon: {
    width: 32,
    height: 32,
  },
  textContainer: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
  },
  subtitle: {
    color: COLORS.text.dark,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
});
