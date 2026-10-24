import { FONT_FAMILY, FONT_SIZE } from './typography';

// Values for the auth and onboarding screens, taken from Figma.
// Kept in their own groups (like CART_LAYOUT / WALLET_LAYOUT) so they never
// clash with shared COLORS / SIZES keys used by other screens.
// Black, white, body text and green come from the shared COLORS; only the
// colours used just on these screens live here.

export const AUTH_COLORS = {
  purple: '#7B4CE2',
  purpleLight: '#DBC1FE',
  purpleBorder: 'rgba(123, 76, 226, 0.4)',
  buttonFill: 'rgba(219, 193, 254, 0.4)',
  inputLine: 'rgba(0, 0, 0, 0.2)',
  placeholder: '#CCCCCC',
  dotInactive: '#F5F378',
} as const;

export const AUTH_LAYOUT = {
  screenWidth: 402,
  screenPadding: 16,

  buttonHeight: 45,
  buttonRadius: 40,
  buttonGap: 32,
  arrowWidth: 30,
  arrowHeight: 15,
  // The Figma arrow PNG has 1px of transparent edge on each side
  // (30 wide image for a 28 wide arrow), so it takes up 28px in layout.
  arrowBleed: 1,
  getStartedButtonWidth: 271,
  continueButtonWidth: 253,

  // Header band shared by the auth screens
  headerSurfaceHeight: 123,
  headerSurfaceWidth: 405,
  headerShadowHeight: 138,
  headerContentTop: 83,
  backArrowSize: 30,

  // Bordered input boxes (mobile number + OTP)
  inputBoxHeight: 48,
  inputBoxRadius: 4,
  inputBoxGap: 10,
  inputBoxPadding: 12,
  countryCodeWidth: 56,
  otpBoxWidth: 50,
  otpBoxHeight: 56,

  // Onboarding illustration window
  imageWidth: 370,
  imageHeight: 397,
  imageTop: 112,
  imageLeft: 16,
} as const;

export const AUTH_TYPOGRAPHY = {
  welcomeTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 28,
    lineHeight: 36.4,
  },
  onboardingTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xxxl,
    lineHeight: 41.6,
  },
  header: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xl,
    lineHeight: 26,
  },
  body: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    lineHeight: 20.8,
  },
  bodySmall: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18.2,
  },
  bodySmallStrong: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18.2,
  },
  caption: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
    lineHeight: 15.6,
  },
  captionRegular: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: 15.6,
  },
  button: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    lineHeight: 20.8,
  },
  otpDigit: { fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xxl },
} as const;
