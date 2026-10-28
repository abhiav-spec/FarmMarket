import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

export function ReferralHero() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/refer-earn-illustration.png')}
        style={styles.illustration}
        resizeMode="contain"
        accessibilityLabel="Refer and earn illustration"
      />

      <Text style={styles.title}>Refer &amp; Earn</Text>

      <Text style={styles.description}>
        Invite your friends and earn cash rewards when {'\n'} they place their
        first order.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  illustration: {
    width: '100%',
    height: 160,
  },
  title: {
    marginTop: SPACING.md,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.purple,
    textAlign: 'center',
  },
  description: {
    marginTop: SPACING.sm,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
    lineHeight: 20,
    textAlign: 'center',
  },
});
