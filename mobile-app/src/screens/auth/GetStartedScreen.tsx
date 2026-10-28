import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_STRINGS } from '@/constants/auth';
import { AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS } from '@/theme';

const STRINGS = AUTH_STRINGS.getStarted;

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
          <AppText style={styles.title}>{STRINGS.title}</AppText>
          <AppText style={styles.subtitle}>{STRINGS.subtitle}</AppText>

          <View style={styles.buttonWrapper}>
            <PillButton
              title={STRINGS.button}
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

// Figma (402×874 frame): title 313 → subtitle 361 → button 610
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
    maxWidth: AUTH_LAYOUT.screenWidth,
    alignItems: 'center',
    paddingTop: 313,
  },
  title: {
    ...AUTH_TYPOGRAPHY.welcomeTitle,
    width: 231,
    color: COLORS.text.black,
    textAlign: 'center',
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    marginTop: 12,
    width: 313,
    color: COLORS.text.dark,
    textAlign: 'center',
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
