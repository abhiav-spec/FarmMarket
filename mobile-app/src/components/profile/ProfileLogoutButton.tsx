import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileLogoutButtonProps = {
  onPress: () => void;
};

export function ProfileLogoutButton({ onPress }: ProfileLogoutButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>Log Out</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    minHeight: 48,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  text: {
    color: COLORS.error,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
});
