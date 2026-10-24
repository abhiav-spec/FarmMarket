import { FONT_FAMILY } from './typography';

// Values for the auth and onboarding screens, taken from Figma.
// Kept in their own groups (like CART_LAYOUT / WALLET_LAYOUT) so they never
// clash with shared COLORS / SIZES keys used by other screens.

export const AUTH_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  textBody: '#333333',
  purple: '#7B4CE2',
  purpleLight: '#DBC1FE',
  buttonFill: 'rgba(219, 193, 254, 0.4)',
  inputLine: 'rgba(0, 0, 0, 0.2)',
  placeholder: '#CCCCCC',
  resendLink: '#009411',
  dotInactive: '#F5F378',
} as const;

export const AUTH_LAYOUT = {
  buttonHeight: 45,
  buttonRadius: 40,
  buttonGap: 31,
  arrowWidth: 30,
  arrowHeight: 15,
  headerSurfaceHeight: 123,
  headerSurfaceWidth: 405,
  backArrowSize: 30,
  getStartedButtonWidth: 271,
  continueButtonWidth: 253,

  // Onboarding illustration window
  imageWidth: 370,
  imageHeight: 397,
  imageTop: 112,
  imageLeft: 16,
  imageAngle: 0,
  imageOpacity: 1,
} as const;

export const AUTH_TYPOGRAPHY = {
  welcomeTitle: { fontFamily: FONT_FAMILY.semiBold, fontSize: 28, lineHeight: 36.4 },
} as const;
