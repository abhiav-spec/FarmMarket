import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { OutlinedBox } from '@/components/auth/OutlinedBox';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  SPACING,
  UI,
} from '@/theme';

export interface FormFieldProps {
  label: string;
  /** Show the field as focused (darker border) while it is being typed in. */
  focused?: boolean;
  children: React.ReactNode;
}

/** Bold label above a curved box. Put a TextInput inside. */
export function FormField({ label, focused, children }: FormFieldProps) {
  return (
    <View style={styles.group}>
      <AppText style={styles.label}>{label}</AppText>
      <OutlinedBox darkBorder focused={focused} style={styles.inputBox}>
        {children}
      </OutlinedBox>
    </View>
  );
}

export interface SelectFieldProps {
  label: string;
  /** Selected value; the placeholder shows while this is empty. */
  value: string;
  placeholder: string;
  onPress: () => void;
  disabled?: boolean;
}

/** Same box as FormField, but opens a list when pressed (drop down). */
export function SelectField({
  label,
  value,
  placeholder,
  onPress,
  disabled = false,
}: SelectFieldProps) {
  return (
    <View style={styles.group}>
      <AppText style={styles.label}>{label}</AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        onPress={onPress}
        disabled={disabled}
        style={disabled && styles.disabled}
      >
        <OutlinedBox darkBorder style={styles.selectBox}>
          <AppText
            numberOfLines={1}
            style={[styles.valueText, !value && styles.placeholderText]}
          >
            {value || placeholder}
          </AppText>
          <AppIcon name="chevronDown" size="sm" color={COLORS.text.muted} />
        </OutlinedBox>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  label: {
    ...AUTH_TYPOGRAPHY.label,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  inputBox: {
    alignItems: 'stretch',
    paddingHorizontal: AUTH_LAYOUT.inputBoxPadding,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AUTH_LAYOUT.inputBoxPadding,
    gap: AUTH_LAYOUT.inputBoxGap,
  },
  valueText: {
    ...AUTH_TYPOGRAPHY.bodySmallMedium,
    flex: 1,
    color: COLORS.text.primary,
  },
  placeholderText: {
    color: AUTH_COLORS.placeholder,
  },
  disabled: {
    opacity: UI.disabledOpacity,
  },
});
