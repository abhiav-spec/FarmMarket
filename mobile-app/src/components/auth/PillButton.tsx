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
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SIZES } from '@/theme';

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
  const resolvedArrowPosition = arrowPosition ?? (showArrow ? 'right' : undefined);
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
        <ActivityIndicator size="small" color="#000000" />
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
            <AppText style={styles.title}>
              {buttonText}
            </AppText>
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
    height: SIZES.authButtonHeight,
    backgroundColor: COLORS.purple.lightFill,
    borderRadius: RADIUS.buttonPill,
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
    gap: SIZES.authButtonGap,
  },
  arrowIcon: {
    width: SIZES.authArrowWidth,
    height: SIZES.authArrowHeight,
  },
  title: {
    color: '#000000',
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    lineHeight: 20.8,
    textAlign: 'center',
  },
});
