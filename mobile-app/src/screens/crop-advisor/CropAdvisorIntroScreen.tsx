import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';

import { router } from 'expo-router';
import { AppButton, AppIcon, AppText } from '@/components';

import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
  SIZES,
  SPACING,
  useResponsive,
} from '@/theme';

const ASSETS = {
  advisor: require('../../../assets/images/crop-advisor/advisor.png'),
  decorations: require('../../../assets/images/crop-advisor/decorations.png'),
  farmer: require('../../../assets/images/crop-advisor/farmer.png'),
} as const;

const COPY = {
  title: 'Crop Advisor',
  description:
    'Facing a crop problem? Upload photos or videos and get expert guidance to keep your crops healthy and productive.',
  continue: 'Continue',
} as const;

/**
 * The two illustrations sit in the bottom-left and bottom-right corners and never overlap:
 * their widths always add up to the available width, and both shrink together when the
 * space between the text and the button is short.
 */
const ART = {
  advisor: { aspect: 412 / 293, share: 0.54, bottomPad: 34 / 412 }, // height / width, transparent bottom padding
  farmer: { aspect: 284 / 250, share: 0.46, bottomPad: 0 },
  sideMargin: 8,
  maxTotalWidth: 720,
  minScale: 0.4,
} as const;

const BUTTON_CLEARANCE = 73 + 4; // button bottom (25) + button height (48) + small gap
const COPY_TOP_RATIO = 101 / 771; // Figma title offset relative to the body height
const GAP_BELOW_COPY = 12;

interface ScreenHeaderProps {
  onBack: () => void;
}

function ScreenHeader({ onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={10}
        onPress={onBack}
        style={styles.backButton}
      >
        <AppIcon name="back" size="md" color={COLORS.text.primary} />
      </Pressable>
    </View>
  );
}

interface CropAdvisorIntroScreenProps {
  onContinue: () => void;
}

export function CropAdvisorIntroScreen({ onContinue }: CropAdvisorIntroScreenProps) {
  const { width } = useWindowDimensions();
  const { moderateScale } = useResponsive();
  const [bodyHeight, setBodyHeight] = useState(0);
  const [copyHeight, setCopyHeight] = useState(0);

  const onBodyLayout = (e: LayoutChangeEvent) => setBodyHeight(e.nativeEvent.layout.height);
  const onCopyLayout = (e: LayoutChangeEvent) => setCopyHeight(e.nativeEvent.layout.height);

  const copyTop = bodyHeight ? Math.max(24, Math.min(101, bodyHeight * COPY_TOP_RATIO)) : 101;
  const copyBottom = copyTop + copyHeight;
  const availableArtHeight = Math.max(0, bodyHeight - copyBottom - GAP_BELOW_COPY - BUTTON_CLEARANCE);
  const totalWidth = Math.min(width, ART.maxTotalWidth) - ART.sideMargin * 2;
  let advisorWidth = totalWidth * ART.advisor.share;
  let farmerWidth = totalWidth * ART.farmer.share;
  const tallest = Math.max(advisorWidth * ART.advisor.aspect, farmerWidth * ART.farmer.aspect);
  if (bodyHeight && tallest > availableArtHeight) {
    const k = Math.max(ART.minScale, availableArtHeight / tallest);
    advisorWidth *= k;
    farmerWidth *= k;
  }
  const advisorHeight = advisorWidth * ART.advisor.aspect;
  const farmerHeight = farmerWidth * ART.farmer.aspect;
  const artSide = (width - Math.min(width, ART.maxTotalWidth)) / 2 + ART.sideMargin;
  const titleSize = Math.min(FONT_SIZE.xxl, moderateScale(FONT_SIZE.xxl));
  const bodySize = Math.min(FONT_SIZE.sm, moderateScale(FONT_SIZE.sm));

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.surface} />

      <ScreenHeader onBack={handleBack} />

      <View style={styles.introBody} onLayout={onBodyLayout}>
        <ImageBackground
          source={ASSETS.decorations}
          resizeMode="stretch"
          style={[styles.decorations, { width }]}
        />

        <View style={[styles.introCopy, { top: copyTop }]} onLayout={onCopyLayout}>
          <AppText
            variant="title"
            align="center"
            style={[styles.introTitle, { fontSize: titleSize }]}
          >
            {COPY.title}
          </AppText>

          <AppText
            variant="body"
            align="center"
            style={[
              styles.introDescription,
              { paddingHorizontal: Math.min(53, width * 0.13), fontSize: bodySize },
            ]}
          >
            {COPY.description}
          </AppText>
        </View>

        <Image
          source={ASSETS.advisor}
          resizeMode="contain"
          style={{
            position: 'absolute',
            left: artSide,
            bottom: BUTTON_CLEARANCE - ART.advisor.bottomPad * advisorHeight,
            width: advisorWidth,
            height: advisorHeight,
            zIndex: 2,
          }}
        />

        <Image
          source={ASSETS.farmer}
          resizeMode="contain"
          style={{
            position: 'absolute',
            right: artSide,
            bottom: BUTTON_CLEARANCE,
            width: farmerWidth,
            height: farmerHeight,
            zIndex: 2,
          }}
        />

        <AppButton
          title={COPY.continue}
          onPress={onContinue}
          fullWidth
          style={[styles.purpleButton, styles.introButton]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: SIZES.headerHeight,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
    zIndex: 5,
  },

  backButton: {
    position: 'absolute',
    left: SPACING.lg,
    width: SIZES.iconButton,
    height: SIZES.smallIconButton,
    alignItems: 'center',
    justifyContent: 'center',
  },

  introBody: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: COLORS.cropAdvisorBackground,
  },

  decorations: {
    position: 'absolute',
    top: -11,
    bottom: -11,
    left: 0,
    height: '110%',
  },

  introCopy: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    zIndex: 2,
  },

  introTitle: {
    fontSize: FONT_SIZE.xxl,
    lineHeight: LINE_HEIGHT.xxl,
    fontFamily: FONT_FAMILY.semiBold,
  },

  introDescription: {
    marginTop: 14,
    paddingHorizontal: 53,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18,
  },


  purpleButton: {
    height: SIZES.buttonHeight,
    borderRadius: RADIUS.xs,
    backgroundColor: COLORS.cropAdvisor,
  },

  introButton: {
    position: 'absolute',
    left: SPACING.lg,
    right: SPACING.lg,
    width: 'auto',
    bottom: 25,
    zIndex: 6,
  },
});
