import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_ROUTES, AUTH_STRINGS } from '@/constants/auth';
import {
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  SPACING,
  UI,
  useResponsive,
} from '@/theme';

const STRINGS = AUTH_STRINGS.getStarted;
const FRAME_CENTER = AUTH_LAYOUT.frameHeight / 2;

export function GetStartedScreen() {
  const router = useRouter();
  const { width, height, auth } = useResponsive();

  // The glow image covers the screen with its circle centred, so place the
  // title and button by their Figma distance from the centre, scaled the
  // same way as the image. On the 402×874 Figma frame this gives 313 / 610.
  const scale = Math.max(
    width / AUTH_LAYOUT.screenWidth,
    height / AUTH_LAYOUT.frameHeight,
  );
  const fromCenter = (figmaTop: number) =>
    height / 2 + (figmaTop - FRAME_CENTER) * scale;

  const handleGetStarted = () => {
    router.push(AUTH_ROUTES.mobileNumber);
  };

  return (
    <View style={styles.container}>
      {/* Figma white circle with yellow/orange glow, exported as PNG */}
      <Image
        source={require('@/assets/auth/get-started-glow.png')}
        style={styles.glow}
        resizeMode="cover"
      />

      <View
        style={[styles.textBlock, { top: fromCenter(AUTH_LAYOUT.welcomeTitleTop) }]}
      >
        <AppText style={[styles.title, auth.welcomeTitle]}>
          {STRINGS.title}
        </AppText>
        <AppText
          style={[
            styles.subtitle,
            auth.welcomeSubtitle,
            { maxWidth: auth.welcomeSubtitleWidth },
          ]}
        >
          {STRINGS.subtitle}
        </AppText>
      </View>

      <View
        style={[
          styles.buttonWrapper,
          { top: fromCenter(AUTH_LAYOUT.welcomeButtonTop) },
        ]}
      >
        <PillButton
          title={STRINGS.button}
          showArrow
          arrowPosition="left"
          fullWidth={false}
          onPress={handleGetStarted}
          style={[styles.button, { width: auth.getStartedButtonWidth }]}
          textStyle={[styles.buttonText, auth.welcomeButton]}
        />
      </View>
    </View>
  );
}

// Title and button are placed from the Figma positions in AUTH_LAYOUT
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Explicit 100% size: without it, web keeps the PNG at its own 402×874
  // and leaves white strips on bigger phones
  glow: {
    position: 'absolute',
    top: UI.zeroInset,
    left: UI.zeroInset,
    width: '100%',
    height: '100%',
  },
  textBlock: {
    position: 'absolute',
    left: AUTH_LAYOUT.screenPadding,
    right: AUTH_LAYOUT.screenPadding,
    alignItems: 'center',
  },
  title: {
    ...AUTH_TYPOGRAPHY.welcomeTitle,
    color: COLORS.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.welcomeSubtitle,
    marginTop: SPACING.md,
    color: COLORS.text.dark,
    textAlign: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    left: UI.zeroInset,
    right: UI.zeroInset,
    alignItems: 'center',
  },
  button: {
    height: AUTH_LAYOUT.buttonHeight,
  },
  buttonText: {
    ...AUTH_TYPOGRAPHY.welcomeButton,
  },
});
