import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SIZES } from '@/theme';

export interface WelcomeImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  positioned?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const WELCOME_IMAGE_DIMENSIONS = {
  width: SIZES.welcomeImageWidth,
  height: SIZES.welcomeImageHeight,
  top: SIZES.welcomeImageTop,
  left: SIZES.welcomeImageLeft,
  angle: `${SIZES.welcomeImageAngle}deg`,
  opacity: SIZES.welcomeImageOpacity,
} as const;

export const WELCOME_IMAGE_STYLE = {
  width: SIZES.welcomeImageWidth,
  height: SIZES.welcomeImageHeight,
  opacity: SIZES.welcomeImageOpacity,
  transform: [{ rotate: `${SIZES.welcomeImageAngle}deg` }],
} as const;

export function WelcomeImage({
  source,
  style,
  containerStyle,
  resizeMode = 'contain',
  positioned = false,
  testID,
  accessibilityLabel,
}: WelcomeImageProps) {
  return (
    <View
      style={[
        styles.container,
        positioned && styles.positioned,
        containerStyle,
      ]}
    >
      <Image
        source={source}
        style={[styles.image, style]}
        resizeMode={resizeMode}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.welcomeImageWidth,
    height: SIZES.welcomeImageHeight,
    opacity: SIZES.welcomeImageOpacity,
    transform: [{ rotate: `${SIZES.welcomeImageAngle}deg` }],
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  positioned: {
    position: 'absolute',
    top: SIZES.welcomeImageTop,
    left: SIZES.welcomeImageLeft,
  },
  image: {
    width: SIZES.welcomeImageWidth,
    height: SIZES.welcomeImageHeight,
    opacity: SIZES.welcomeImageOpacity,
    transform: [{ rotate: `${SIZES.welcomeImageAngle}deg` }],
  },
});

export default WelcomeImage;
