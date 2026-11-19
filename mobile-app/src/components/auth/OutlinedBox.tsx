import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AUTH_COLORS, AUTH_LAYOUT, COLORS, UI } from '@/theme';

export interface OutlinedBoxProps {
  children: React.ReactNode;
  /** Darkens the border while the field inside is being typed in. */
  focused?: boolean;
  /** Light purple outline while idle (no fill), for the mobile number and
   *  personal info fields. */
  darkBorder?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** White box with a thin purple border, used for the auth inputs. */
export function OutlinedBox({
  children,
  focused = false,
  darkBorder = false,
  style,
}: OutlinedBoxProps) {
  return (
    <View
      style={[
        styles.box,
        darkBorder && styles.darkBorder,
        focused && styles.focused,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: AUTH_LAYOUT.inputBoxHeight,
    borderRadius: AUTH_LAYOUT.inputBoxRadius,
    borderWidth: UI.borderWidth,
    borderColor: AUTH_COLORS.purpleBorder,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkBorder: {
    borderColor: AUTH_COLORS.inputBorder,
  },
  focused: {
    borderColor: AUTH_COLORS.purple,
  },
});
