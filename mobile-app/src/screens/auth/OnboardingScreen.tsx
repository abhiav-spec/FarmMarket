import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { WelcomeImage } from '@/components/auth/WelcomeImage';
import { AUTH_STRINGS, ONBOARDING_SLIDES } from '@/constants/auth';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  RADIUS,
  SPACING,
} from '@/theme';

const STRINGS = AUTH_STRINGS.onboarding;
const LAST_INDEX = ONBOARDING_SLIDES.length - 1;

export function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleHardwareBack = () => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        return true;
      }
      return false;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBack,
    );

    return () => backHandlerSubscription.remove();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < LAST_INDEX) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace('/(main)/home');
    }
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = ONBOARDING_SLIDES[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Illustration, positioned and cropped per slide as in Figma */}
        <WelcomeImage
          source={currentItem.image}
          resizeMode="cover"
          containerStyle={[
            styles.imageWindow,
            { overflow: currentItem.clipImage ? 'hidden' : 'visible' },
          ]}
          style={[styles.image, currentItem.imageFrame]}
        />

        {/* Text Details Section */}
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{currentItem.title}</AppText>
          <AppText style={styles.description}>
            {currentItem.description}
          </AppText>
        </View>

        {/* Bottom Navigation Row: Indicator Dots & Action CTA */}
        <View style={styles.bottomRow}>
          <View style={styles.dotsContainer}>
            {ONBOARDING_SLIDES.map((slide, index) => {
              const isActive = currentIndex === index;
              return (
                <Pressable
                  key={slide.id}
                  onPress={() => handleDotPress(index)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={STRINGS.goToSlide(index + 1)}
                  style={[
                    styles.dot,
                    isActive ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              );
            })}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              currentIndex === LAST_INDEX ? STRINGS.finish : STRINGS.next
            }
            onPress={handleNext}
            style={({ pressed }) => [
              styles.arrowButton,
              pressed && styles.arrowButtonPressed,
            ]}
          >
            <Image
              source={require('@/assets/auth/arrow-right.png')}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </Pressable>
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
  // Figma (874-tall frame): image 112–509 → title 559 →
  // description 659 → dots/button row 793–825
  container: {
    flex: 1,
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    paddingBottom: Platform.OS === 'ios' ? 15 : 49,
  },
  imageWindow: {
    marginTop: AUTH_LAYOUT.imageTop,
    width: AUTH_LAYOUT.imageWidth,
    height: AUTH_LAYOUT.imageHeight,
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    position: 'absolute',
  },
  textContainer: {
    marginTop: 50, // 559 - 509
  },
  title: {
    ...AUTH_TYPOGRAPHY.onboardingTitle,
    color: COLORS.text.black,
    marginBottom: 16.8, // 659 - (559 + 2 × 41.6)
  },
  description: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    width: 344,
    color: COLORS.text.black,
  },
  bottomRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    height: 12,
    borderRadius: RADIUS.pill,
  },
  activeDot: {
    width: 27,
    backgroundColor: COLORS.text.black,
  },
  inactiveDot: {
    width: 12,
    backgroundColor: AUTH_COLORS.dotInactive,
  },
  arrowButton: {
    width: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: AUTH_COLORS.buttonFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: AUTH_LAYOUT.arrowWidth,
    height: AUTH_LAYOUT.arrowHeight,
  },
  arrowButtonPressed: {
    opacity: 0.8,
  },
});
