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
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, SIZES } from '@/theme';

export function GetStartedScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/mobile-number');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Figma large circular background element with glow shadows */}
        <Image
          source={require('@/assets/auth/Rectangle 1 (1).svg')}
          style={styles.backgroundImage}
          resizeMode="cover"
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
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
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
    fontSize: FONT_SIZE.display,
    lineHeight: LINE_HEIGHT.display,
    color: COLORS.black,
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
    color: COLORS.text.body,
    textAlign: 'center',
    letterSpacing: 0,
  },
  buttonWrapper: {
    marginTop: 207,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: SIZES.getStartedButtonWidth,
    height: SIZES.authButtonHeight,
  },
});

