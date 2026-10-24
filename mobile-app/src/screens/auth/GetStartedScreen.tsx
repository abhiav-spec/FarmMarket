import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

export function GetStartedScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/mobile-number');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Figma white circle with yellow/orange glow, exported as PNG */}
        <Image
          source={require('@/assets/auth/get-started-glow.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          {/* Welcome to Atavi Header */}
          <AppText style={styles.title}>
            Welcome to Atavi
          </AppText>

          {/* Subtitle */}
          <AppText style={styles.subtitle}>
            Buy trusted agricultural products and get expert crop guidance.
          </AppText>

          {/* Get Started Button */}
          <View style={styles.buttonWrapper}>
            <PillButton
              title="Get Started"
              showArrow
              arrowPosition="left"
              fullWidth={false}
              onPress={handleGetStarted}
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    aspectRatio: 402 / 874,
  },
  content: {
    width: '100%',
    maxWidth: 402,
    alignItems: 'center',
    paddingTop: 313,
  },
  title: {
    width: 231,
    height: 36,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: AUTH_TYPOGRAPHY.welcomeTitle.fontSize,
    lineHeight: AUTH_TYPOGRAPHY.welcomeTitle.lineHeight,
    color: COLORS.text.black,
    textAlign: 'center',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 12,
    width: 313,
    height: 42,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    lineHeight: 20.8,
    color: COLORS.text.dark,
    textAlign: 'center',
    letterSpacing: 0,
  },
  buttonWrapper: {
    marginTop: 207,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: AUTH_LAYOUT.getStartedButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
  },
});

