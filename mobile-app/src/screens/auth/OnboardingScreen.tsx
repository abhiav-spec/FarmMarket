import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { WelcomeImage } from '@/components/auth/WelcomeImage';
import { COLORS, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, RADIUS, SIZES, SPACING } from '@/theme';

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

const ONBOARDING_ITEMS: OnboardingItem[] = [
  {
    id: 'crop-guidance',
    title: 'Expert Crop\nGuidance',
    description: 'Upload photos and videos of your crops and get\nadvice from our agricultural experts.',
    image: require('@/assets/illustrations/expert-crop.png'),
  },
  {
    id: 'agricultural-products',
    title: 'Trusted Agricultural\nProducts',
    description: 'Buy seeds, fertilizers, pesticides and equipment from\nverified suppliers.',
    image: require('@/assets/illustrations/trusted-products.png'),
  },
  {
    id: 'track-order',
    title: 'Track Every\nOrder',
    description: 'Track your orders from purchase to delivery at your\ndoorstep.',
    image: require('@/assets/illustrations/track-order.png'),
  },
];

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
      handleHardwareBack
    );

    return () => backHandlerSubscription.remove();
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_ITEMS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.replace('/(main)/home');
    }
  };

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = ONBOARDING_ITEMS[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top spacer / header area without 01/03 slider */}
        <View style={styles.topSpacer} />

        {/* Advisory / Onboarding Illustration */}
        <View style={styles.imageContainer}>
          <WelcomeImage
            source={currentItem.image}
            resizeMode="cover"
            containerStyle={styles.imageMask}
          />
        </View>

        {/* Text Details Section */}
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{currentItem.title}</AppText>
          <AppText style={styles.description}>{currentItem.description}</AppText>
        </View>

        {/* Bottom Navigation Row: Indicator Dots & Action CTA */}
        <View style={styles.bottomRow}>
          <View style={styles.dotsContainer}>
            {ONBOARDING_ITEMS.map((_, index) => {
              const isActive = currentIndex === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => handleDotPress(index)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to slide ${index + 1}`}
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
              currentIndex === ONBOARDING_ITEMS.length - 1
                ? 'Get started'
                : 'Next slide'
            }
            onPress={handleNext}
            style={({ pressed }) => [
              styles.arrowButton,
              pressed && styles.arrowButtonPressed,
            ]}
          >
            <AppIcon name="forward" size="lg" color="#000000" />
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.welcomeImageLeft,
    paddingBottom: SPACING.xxl,
  },
  topSpacer: {
    height: Platform.OS === 'web' ? SIZES.welcomeImageTop : 68,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageMask: {
    width: SIZES.welcomeImageWidth,
    height: SIZES.welcomeImageHeight,
    overflow: 'hidden',
  },
  textContainer: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxxl,
    lineHeight: LINE_HEIGHT.xxxl,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: LINE_HEIGHT.sm,
    color: COLORS.text.secondary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  dot: {
    height: 8,
    borderRadius: RADIUS.xs,
  },
  activeDot: {
    width: 24,
    backgroundColor: COLORS.text.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#EAE572',
  },
  arrowButton: {
    width: 64,
    height: 48,
    borderRadius: RADIUS.pill,
    backgroundColor: '#E8D5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButtonPressed: {
    opacity: 0.8,
  },
});
