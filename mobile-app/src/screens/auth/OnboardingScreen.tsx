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

import { AppText } from '@/components/common/AppText';
import { WelcomeImage } from '@/components/auth/WelcomeImage';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SIZES, SPACING } from '@/theme';

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  /** Image size and offset inside the 370×397 image window (from Figma). */
  imageFrame: { width: number; height: number; left: number; top: number };
  /** Figma crops Expert and Trust to the window; Track is not cropped. */
  clipImage: boolean;
}

const ONBOARDING_ITEMS: OnboardingItem[] = [
  {
    id: 'crop-guidance',
    title: 'Expert Crop\nGuidance',
    description: 'Upload photos and videos of your crops and get\nadvice from our agricultural experts.',
    image: require('@/assets/illustrations/expert-crop.png'),
    imageFrame: { width: 382, height: 573, left: -6, top: -45 },
    clipImage: true,
  },
  {
    id: 'agricultural-products',
    title: 'Trusted Agricultural\nProducts',
    description: 'Buy seeds, fertilizers, pesticides and equipment from\nverified suppliers.',
    image: require('@/assets/illustrations/trusted-products.png'),
    imageFrame: { width: 369, height: 553, left: 0, top: -30 },
    clipImage: true,
  },
  {
    id: 'track-order',
    title: 'Track Every\nOrder',
    description: 'Track your orders from purchase to delivery at your\ndoorstep.',
    image: require('@/assets/illustrations/track-order.png'),
    imageFrame: { width: 371, height: 555, left: 0, top: -28 },
    clipImage: false,
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
        {/* Slide counter, e.g. 01/03 */}
        <AppText style={styles.counter}>
          {`${String(currentIndex + 1).padStart(2, '0')}/${String(ONBOARDING_ITEMS.length).padStart(2, '0')}`}
        </AppText>

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
  // Figma (874-tall frame): counter 67 → image 112–509 → title 559 →
  // description 659 → dots/button row 793–825
  container: {
    flex: 1,
    paddingHorizontal: SIZES.onboardingImageLeft,
    paddingBottom: Platform.OS === 'ios' ? 15 : 49,
  },
  counter: {
    marginTop: 67,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 16.8,
    letterSpacing: 0.25,
    color: COLORS.black,
  },
  imageWindow: {
    marginTop: 28.2, // 112 - (67 + 16.8)
    width: SIZES.onboardingImageWidth,
    height: SIZES.onboardingImageHeight,
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
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xxxl,
    lineHeight: 41.6,
    color: COLORS.black,
    marginBottom: 16.8, // 659 - (559 + 2 × 41.6)
  },
  description: {
    width: 344,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18.2,
    color: COLORS.black,
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
    backgroundColor: COLORS.black,
  },
  inactiveDot: {
    width: 12,
    backgroundColor: COLORS.auth.dotInactive,
  },
  arrowButton: {
    width: 60,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.purple.lightFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: SIZES.authArrowWidth,
    height: SIZES.authArrowHeight,
  },
  arrowButtonPressed: {
    opacity: 0.8,
  },
});
