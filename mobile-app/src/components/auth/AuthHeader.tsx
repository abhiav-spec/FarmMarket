import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/common/AppText';
import { COLORS, FONT_FAMILY, FONT_SIZE, SIZES } from '@/theme';

export interface AuthHeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  fallbackRoute?: string;
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
      router.replace(fallbackRoute as any);
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

      {/* Back Arrow */}
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={handleBack}
          hitSlop={12}
          style={styles.backButton}
        >
          <Image
            source={require('@/assets/auth/back-arrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </Pressable>
      ) : null}

      {/* Centered Header Title */}
      {title ? (
        <AppText style={styles.title}>
          {title}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: SIZES.authHeaderSurfaceWidth,
    height: SIZES.authHeaderSurfaceHeight,
    position: 'relative',
  },
  headerSurfaceBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 138,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 83,
    width: SIZES.authBackArrowSize,
    height: SIZES.authBackArrowSize,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backArrow: {
    width: SIZES.authBackArrowSize,
    height: SIZES.authBackArrowSize,
  },
  title: {
    position: 'absolute',
    left: 56,
    right: 56,
    top: 85,
    height: 26,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xl,
    lineHeight: 26,
    letterSpacing: 0,
    color: COLORS.black,
    textAlign: 'center',
  },
});
