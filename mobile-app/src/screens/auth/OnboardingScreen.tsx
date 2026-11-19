import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { WelcomeImage } from '@/components/auth/WelcomeImage';
import {
  AUTH_ROUTES,
  AUTH_STRINGS,
  ONBOARDING_SLIDES,
  OnboardingSlide,
} from '@/constants/auth';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  RADIUS,
  SPACING,
  UI,
  useResponsive,
} from '@/theme';

const STRINGS = AUTH_STRINGS.onboarding;
const LAST_INDEX = ONBOARDING_SLIDES.length - 1;

export function OnboardingScreen() {
  const router = useRouter();
  const { width, auth } = useResponsive();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      listRef.current?.scrollToOffset({ offset: index * width, animated: true });
      setCurrentIndex(index);
    },
    [width],
  );

  useEffect(() => {
    const handleHardwareBack = () => {
      if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
        return true;
      }
      return false;
    };

    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBack,
    );

    return () => backHandlerSubscription.remove();
  }, [currentIndex, goToSlide]);

  // Keep the dots in step with the slide the user swiped to
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    const clamped = Math.max(0, Math.min(LAST_INDEX, index));
    if (clamped !== currentIndex) setCurrentIndex(clamped);
  };

  const handleNext = () => {
    if (currentIndex < LAST_INDEX) {
      goToSlide(currentIndex + 1);
    } else {
      router.replace(AUTH_ROUTES.home);
    }
  };

  const renderSlide: ListRenderItem<OnboardingSlide> = ({ item }) => {
    const frame = item.imageFrame;
    return (
      <View
        style={[
          styles.slide,
          { width, paddingTop: auth.imageTopSpace },
        ]}
      >
        {/* Illustration, positioned and cropped per slide as in Figma */}
        <WelcomeImage
          source={item.image}
          resizeMode="cover"
          containerStyle={[
            styles.imageWindow,
            {
              width: auth.imageWidth,
              height: auth.imageHeight,
              overflow: item.clipImage ? 'hidden' : 'visible',
            },
          ]}
          style={[
            styles.image,
            {
              width: frame.width * auth.imageScale,
              height: frame.height * auth.imageScale,
              left: frame.left * auth.imageScale,
              top: frame.top * auth.imageScale,
            },
          ]}
        />

        <View style={{ marginTop: auth.imageBottomSpace }}>
          <AppText style={[styles.title, auth.onboardingTitle]}>
            {item.title}
          </AppText>
          <AppText
            style={[
              styles.description,
              auth.onboardingDescription,
              { maxWidth: auth.descriptionWidth },
            ]}
          >
            {item.description}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Swipe left/right between slides */}
      <FlatList
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(slide) => slide.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        extraData={auth}
        style={styles.list}
      />

      {/* Dots and next arrow */}
      <View style={styles.bottomRow}>
        <View style={styles.dotsContainer}>
          {ONBOARDING_SLIDES.map((slide, index) => {
            const isActive = currentIndex === index;
            return (
              <Pressable
                key={slide.id}
                onPress={() => goToSlide(index)}
                hitSlop={UI.hitSlop}
                accessibilityRole="button"
                accessibilityLabel={STRINGS.goToSlide(index + 1)}
                style={[
                  styles.dot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                  {
                    height: auth.dotSize,
                    width: isActive ? auth.activeDotWidth : auth.dotSize,
                  },
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
            { width: auth.arrowButtonWidth, height: auth.arrowButtonHeight },
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  slide: {
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
  },
  imageWindow: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    position: 'absolute',
  },
  title: {
    ...AUTH_TYPOGRAPHY.onboardingTitle,
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
  },
  description: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SPACING.lg,
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    paddingBottom: AUTH_LAYOUT.onboardingBottomGap,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dot: {
    borderRadius: RADIUS.pill,
  },
  activeDot: {
    backgroundColor: COLORS.text.primary,
  },
  inactiveDot: {
    backgroundColor: AUTH_COLORS.dotInactive,
  },
  arrowButton: {
    borderRadius: RADIUS.pill,
    backgroundColor: AUTH_COLORS.buttonFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: AUTH_LAYOUT.arrowWidth,
    height: AUTH_LAYOUT.arrowHeight,
  },
  arrowButtonPressed: {
    opacity: AUTH_LAYOUT.pressedOpacity,
  },
});
