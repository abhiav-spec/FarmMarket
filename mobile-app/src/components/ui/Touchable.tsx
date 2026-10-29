import React from 'react';
import { Pressable, type PressableProps, type StyleProp, type TextStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { UI } from '@/theme';

interface TouchableProps extends Omit<PressableProps, 'onPress'> {
  onPress?: () => void;
  /** Accessibility label; defaults to `title`. */
  label?: string;
  /** Renders a text label as the only child. */
  title?: string;
  textStyle?: StyleProp<TextStyle>;
}

/** Pressable with the app's defaults: disabled without a handler, button role, hit slop. */
export function Touchable({ onPress, label, title, textStyle, disabled: disabledProp, accessibilityRole = 'button', accessibilityState, children, ...props }: TouchableProps) {
  const disabled = disabledProp ?? !onPress;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={label ?? title}
      accessibilityState={{ disabled, ...accessibilityState }}
      hitSlop={UI.hitSlop}
      {...props}
    >
      {title ? <AppText style={textStyle}>{title}</AppText> : children}
    </Pressable>
  );
}
