import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

interface ReferralCodeCardProps {
  code: string;
  onCopy: () => void;
  copied?: boolean;
}

export function ReferralCodeCard({
  code,
  onCopy,
  copied = false,
}: ReferralCodeCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Your Referral Code</Text>

      <View style={styles.codeContainer}>
        <Text style={styles.code}>{code}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Copy referral code"
        onPress={onCopy}
        style={styles.copyButton}
      >
        <Image
          source={require('../../../assets/icons/copy-icon.png')}
          style={styles.copyIcon}
          resizeMode="contain"
        />
        <Text style={styles.copyButtonText}>
          {copied ? 'Copied' : 'Copy Code'}
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purpleSurface,
  },
  label: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  codeContainer: {
    width: '72%',
    height: 44,
    marginTop: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.purple,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleLight,
  },
  code: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    letterSpacing: 0,
    color: COLORS.purple,
    textAlign: 'center',
  },
  copyButton: {
    minWidth: 0,
    height: 40,
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.copycode,
  },
  copyButtonText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  copyIcon: {
    width: 24,
    height: 24,
  },
});
