import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '@/components/common/AppText';
import { AUTH_COLORS, AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS } from '@/theme';

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
        <ActivityIndicator size="small" color={COLORS.text.black} />
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
            <AppText style={styles.title}>{buttonText}</AppText>
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
    paddingHorizontal: 60,
    paddingVertical: 12,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.4,
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
    color: COLORS.text.black,
    textAlign: 'center',
  },
});
