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
  testID?: string;
  accessibilityLabel?: string;
}

/** Illustration inside the 370×397 onboarding image window. */
export function WelcomeImage({
  source,
  style,
  containerStyle,
  resizeMode = 'contain',
  testID,
  accessibilityLabel,
}: WelcomeImageProps) {
  return (
    <View style={[styles.container, containerStyle]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: AUTH_LAYOUT.imageWidth,
    height: AUTH_LAYOUT.imageHeight,
  },
});

export default WelcomeImage;
