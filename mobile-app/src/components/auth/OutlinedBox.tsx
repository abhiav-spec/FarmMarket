import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AUTH_COLORS, AUTH_LAYOUT, COLORS } from '@/theme';

export interface OutlinedBoxProps {
  children: React.ReactNode;
  /** Darkens the border while the field inside is being typed in. */
  focused?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** White box with a thin purple border, used for the mobile number and OTP inputs. */
export function OutlinedBox({
  children,
  focused = false,
  style,
}: OutlinedBoxProps) {
  return (
    <View style={[styles.box, focused && styles.focused, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: AUTH_LAYOUT.inputBoxHeight,
    borderRadius: AUTH_LAYOUT.inputBoxRadius,
    borderWidth: 1,
    borderColor: AUTH_COLORS.purpleBorder,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focused: {
    borderColor: AUTH_COLORS.purple,
  },
});
