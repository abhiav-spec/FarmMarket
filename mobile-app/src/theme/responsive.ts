import { useWindowDimensions } from 'react-native';

import { AUTH_LAYOUT } from './auth';
import { RADIUS } from './radius';
import { SPACING } from './spacing';
import { AUTH_TYPOGRAPHY, FONT_SIZE, LINE_HEIGHT } from './typography';

export const BREAKPOINTS = {
  small: 360,
  medium: 414,
  tablet: 768,
} as const;

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isSmall = width < BREAKPOINTS.small;
  const isMedium = width >= BREAKPOINTS.small && width < BREAKPOINTS.medium;
  const isLarge = width >= BREAKPOINTS.medium;
  const isTablet = width >= BREAKPOINTS.tablet;

  const wp = (percentage: number) => (width * percentage) / 100;

  const hp = (percentage: number) => (height * percentage) / 100;

  const scale = (size: number) => (width / BASE_WIDTH) * size;

  const verticalScale = (size: number) => (height / BASE_HEIGHT) * size;

  const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

  const horizontalPadding = isTablet
    ? 32
    : Math.min(Math.max(width * 0.04, 16), 24);

  const home = {
    headerHorizontalPadding: horizontalPadding,

    headerVerticalPadding: isSmall ? SPACING.sm : SPACING.md,

    locationIconSize: isSmall ? 18 : 20,

    locationFontSize: isSmall ? FONT_SIZE.sm : FONT_SIZE.md,

    locationLineHeight: isSmall ? LINE_HEIGHT.sm : LINE_HEIGHT.md,

    headerActionSize: isSmall ? 40 : 44,

    searchFontSize: isSmall ? 12 : 13,

    searchLineHeight: isSmall ? 16 : 18,

    searchHeight: isSmall ? 40 : 42,

    searchRadius: isSmall ? RADIUS.sm : RADIUS.md,

    searchHorizontalPadding: isSmall ? SPACING.sm : SPACING.md,

    // Category section
    categoryGap: isSmall ? 2 : 4,

    categoryImageSize: isSmall ? 66 : 68,

    categoryImageContainerSize: isSmall ? 76 : 84,

    categoryCardWidth: isSmall ? 92 : 104,

    categoryCardRadius: RADIUS.xs,

    categoryFontSize: isSmall ? FONT_SIZE.sm : FONT_SIZE.sm,

    categoryLineHeight: isSmall ? LINE_HEIGHT.sm : LINE_HEIGHT.sm,

    sectionSpacing: isSmall ? SPACING.xl : SPACING.xxl,
    // Crop Advisor banner
    cropAdvisorMarginTop: SPACING.xs,

    cropAdvisorHeight: ((width - horizontalPadding * 2) * 387) / 606,

    cropAdvisorRadius: RADIUS.lg,

    cropAdvisorTitleSize: isSmall ? FONT_SIZE.md : FONT_SIZE.lg,

    cropAdvisorTitleLineHeight: isSmall ? LINE_HEIGHT.md : LINE_HEIGHT.lg,

    cropAdvisorDescriptionSize: isSmall ? 9 : 10,

    cropAdvisorDescriptionLineHeight: isSmall ? 12 : 14,

    cropAdvisorButtonHeight: isSmall ? 30 : 32,

    cropAdvisorButtonRadius: RADIUS.sm,

    cropAdvisorButtonFontSize: isSmall ? 12 : 13,

    cropAdvisorButtonLineHeight: isSmall ? 16 : 18,
    walletHeight: isSmall ? 24 : 28,
    walletWidth: isSmall ? 46 : 50,
    walletHorizontalPadding: isSmall ? 6 : 8,
    walletRadius: isSmall ? 4 : 6,
    walletGap: isSmall ? 2 : 4,
    walletFontSize: isSmall ? 12 : 13,
    walletLineHeight: isSmall ? 16 : 18,
  };

  // Auth + onboarding screens. Text and sizes follow the screen width; the
  // onboarding picture follows both width and height so it always fits.
  const scaledText = (style: { fontSize: number; lineHeight: number }) => ({
    fontSize: moderateScale(style.fontSize),
    lineHeight: moderateScale(style.lineHeight),
  });

  // Height of the picture area (space above + picture + gap below). The text
  // and dots below it shrink or grow with the screen height.
  const authImageArea =
    AUTH_LAYOUT.imageTop + AUTH_LAYOUT.imageHeight + AUTH_LAYOUT.imageTextGap;
  const authTextArea =
    (AUTH_LAYOUT.onboardingTextArea * height) / AUTH_LAYOUT.frameHeight;
  const authSpaceScale = (height - authTextArea) / authImageArea;
  const authWidthScale =
    (width - 2 * AUTH_LAYOUT.screenPadding) / AUTH_LAYOUT.imageWidth;
  const authImageScale = Math.min(authSpaceScale, authWidthScale);
  // Height the picture could not use (narrow phones), shared above and below
  // it so it stays centred in its area
  const authSpareHalf =
    (AUTH_LAYOUT.imageHeight * (authSpaceScale - authImageScale)) / 2;

  const auth = {
    // Onboarding picture
    imageScale: authImageScale,
    imageWidth: AUTH_LAYOUT.imageWidth * authImageScale,
    imageHeight: AUTH_LAYOUT.imageHeight * authImageScale,
    imageTopSpace: AUTH_LAYOUT.imageTop * authSpaceScale + authSpareHalf,
    imageBottomSpace: AUTH_LAYOUT.imageTextGap * authSpaceScale + authSpareHalf,

    // Text
    welcomeTitle: scaledText(AUTH_TYPOGRAPHY.welcomeTitle),
    welcomeSubtitle: scaledText(AUTH_TYPOGRAPHY.welcomeSubtitle),
    welcomeButton: scaledText(AUTH_TYPOGRAPHY.welcomeButton),
    onboardingTitle: scaledText(AUTH_TYPOGRAPHY.onboardingTitle),
    onboardingDescription: scaledText(AUTH_TYPOGRAPHY.bodySmall),
    welcomeSubtitleWidth: moderateScale(AUTH_LAYOUT.welcomeSubtitleWidth),
    descriptionWidth: moderateScale(AUTH_LAYOUT.descriptionWidth),

    // Buttons and dots
    getStartedButtonWidth: moderateScale(AUTH_LAYOUT.getStartedButtonWidth),
    dotSize: moderateScale(AUTH_LAYOUT.dotSize),
    activeDotWidth: moderateScale(AUTH_LAYOUT.activeDotWidth),
    arrowButtonWidth: moderateScale(AUTH_LAYOUT.arrowButtonWidth),
    arrowButtonHeight: moderateScale(AUTH_LAYOUT.arrowButtonHeight),
  };

  return {
    width,
    height,
    isSmall,
    isMedium,
    isLarge,
    isTablet,
    wp,
    hp,
    scale,
    verticalScale,
    moderateScale,
    horizontalPadding,
    home,
    auth,
  };
}
