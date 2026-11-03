import React from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components';
import { COLORS, WALLET_LAYOUT, WALLET_TYPOGRAPHY } from '@/theme';

/** Same header geometry as the other Figma screens (Cart/Wallet). */
// Tweak these two numbers to move the header content up/down.
const HEADER_HEIGHT = 112;
const CONTENT_TOP = 56;

export function CropAdvisorHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={10}
        onPress={() =>
          router.canGoBack()
            ? router.back()
            : router.replace('/(main)/crop-advisor')
        }
        style={styles.back}
      >
        <Ionicons name="chevron-back" size={32} color={COLORS.text.black} />
      </Pressable>
      <View pointerEvents="none">
        <AppText variant="bodyMedium" style={styles.title}>
          {title}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: COLORS.walletSurface,
    borderBottomLeftRadius: WALLET_LAYOUT.headerRadius,
    borderBottomRightRadius: WALLET_LAYOUT.headerRadius,
    boxShadow: WALLET_LAYOUT.headerShadow,
    zIndex: 1,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: CONTENT_TOP,
    zIndex: 2,
  },
  title: {
    ...WALLET_TYPOGRAPHY.header,
    color: COLORS.text.black,
    textAlign: 'center',
    marginTop: CONTENT_TOP,
  },
});
