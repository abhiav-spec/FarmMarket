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
import { AUTH_LAYOUT } from '@/theme';

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
  width: AUTH_LAYOUT.imageWidth,
  height: AUTH_LAYOUT.imageHeight,
  top: AUTH_LAYOUT.imageTop,
  left: AUTH_LAYOUT.imageLeft,
  angle: `${AUTH_LAYOUT.imageAngle}deg`,
  opacity: AUTH_LAYOUT.imageOpacity,
} as const;

export const WELCOME_IMAGE_STYLE = {
  width: AUTH_LAYOUT.imageWidth,
  height: AUTH_LAYOUT.imageHeight,
  opacity: AUTH_LAYOUT.imageOpacity,
  transform: [{ rotate: `${AUTH_LAYOUT.imageAngle}deg` }],
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
    width: AUTH_LAYOUT.imageWidth,
    height: AUTH_LAYOUT.imageHeight,
    opacity: AUTH_LAYOUT.imageOpacity,
    transform: [{ rotate: `${AUTH_LAYOUT.imageAngle}deg` }],
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  positioned: {
    position: 'absolute',
    top: AUTH_LAYOUT.imageTop,
    left: AUTH_LAYOUT.imageLeft,
  },
  image: {
    width: AUTH_LAYOUT.imageWidth,
    height: AUTH_LAYOUT.imageHeight,
    opacity: AUTH_LAYOUT.imageOpacity,
    transform: [{ rotate: `${AUTH_LAYOUT.imageAngle}deg` }],
  },
});

export default WelcomeImage;
