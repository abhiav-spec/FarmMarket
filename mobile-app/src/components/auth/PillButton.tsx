import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '@/components/common/AppText';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  SPACING,
  UI,
} from '@/theme';

export interface PillButtonProps {
  title?: string;
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  showArrow?: boolean;
  arrowPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  /** Overrides the label's text style, e.g. a different size on one screen. */
  textStyle?: StyleProp<TextStyle>;
}

export function PillButton({
  title,
  label,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  showArrow = false,
  arrowPosition,
  style,
  textStyle,
}: PillButtonProps) {
  const isDisabled = disabled || loading;
  const buttonText = title || label;
  const resolvedArrowPosition =
    arrowPosition ?? (showArrow ? 'right' : undefined);
  const shouldShowArrow = showArrow || Boolean(arrowPosition);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.text.primary} />
      ) : (
        <View style={styles.content}>
          {shouldShowArrow && resolvedArrowPosition === 'left' && (
            <Image
              source={require('@/assets/auth/arrow-right.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          )}
          {buttonText ? (
            <AppText style={[styles.title, textStyle]}>{buttonText}</AppText>
          ) : null}
          {shouldShowArrow && resolvedArrowPosition === 'right' && (
            <Image
              source={require('@/assets/auth/arrow-right.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: AUTH_LAYOUT.buttonHeight,
    backgroundColor: AUTH_COLORS.buttonFill,
    borderRadius: AUTH_LAYOUT.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    // Buttons have a fixed width, so keep the side padding small enough
    // for the label and arrow to stay on one line
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: AUTH_LAYOUT.pressedOpacity,
  },
  disabled: {
    opacity: UI.disabledOpacity,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: AUTH_LAYOUT.buttonGap,
  },
  arrowIcon: {
    width: AUTH_LAYOUT.arrowWidth,
    height: AUTH_LAYOUT.arrowHeight,
    marginHorizontal: -AUTH_LAYOUT.arrowBleed,
  },
  title: {
    ...AUTH_TYPOGRAPHY.button,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});
