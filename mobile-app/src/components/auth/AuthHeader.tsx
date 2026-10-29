import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Href, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { AUTH_STRINGS } from '@/constants/auth';
import { AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS, SPACING, UI } from '@/theme';

export interface AuthHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  /** Where to go when there is no screen to go back to. */
  fallbackRoute?: Href;
  /** Figma shows the white shadowed band only on the Mobile Number screen. */
  showSurface?: boolean;
}

export function AuthHeader({
  title,
  onBack,
  showBack = true,
  fallbackRoute = '/(auth)/get-started',
  showSurface = false,
}: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(fallbackRoute);
    }
  };

  return (
    <View style={styles.container}>
      {showSurface ? (
        <Image
          source={require('@/assets/auth/input-surface.png')}
          style={styles.headerSurfaceBg}
          resizeMode="stretch"
        />
      ) : null}

      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={AUTH_STRINGS.back}
          onPress={handleBack}
          hitSlop={SPACING.md}
          style={styles.backButton}
        >
          <Image
            source={require('@/assets/auth/back-arrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </Pressable>
      ) : null}

      {title ? <AppText style={styles.title}>{title}</AppText> : null}
    </View>
  );
}

// Title sits clear of the back arrow on both sides so it stays centred
const TITLE_SIDE_INSET =
  AUTH_LAYOUT.screenPadding +
  AUTH_LAYOUT.backArrowSize +
  AUTH_LAYOUT.screenPadding / 2;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: AUTH_LAYOUT.headerSurfaceHeight,
    position: 'relative',
  },
  headerSurfaceBg: {
    position: 'absolute',
    top: UI.zeroInset,
    left: UI.zeroInset,
    right: UI.zeroInset,
    height: AUTH_LAYOUT.headerShadowHeight,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: AUTH_LAYOUT.screenPadding,
    top: AUTH_LAYOUT.headerContentTop,
    width: AUTH_LAYOUT.backArrowSize,
    height: AUTH_LAYOUT.backArrowSize,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backArrow: {
    width: AUTH_LAYOUT.backArrowSize,
    height: AUTH_LAYOUT.backArrowSize,
  },
  title: {
    ...AUTH_TYPOGRAPHY.header,
    position: 'absolute',
    left: TITLE_SIDE_INSET,
    right: TITLE_SIDE_INSET,
    // Centre the 26px title on the 30px back arrow
    top:
      AUTH_LAYOUT.headerContentTop +
      (AUTH_LAYOUT.backArrowSize - AUTH_TYPOGRAPHY.header.lineHeight) / 2,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
});
