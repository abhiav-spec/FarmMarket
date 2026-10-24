import { FONT_FAMILY } from './typography';

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
  buttonHeight: 45,
  buttonRadius: 40,
  buttonGap: 32,
  arrowWidth: 30,
  arrowHeight: 15,
  // The Figma arrow PNG has 1px of transparent edge on each side
  // (30 wide image for a 28 wide arrow), so it takes up 28px in layout.
  arrowBleed: 1,
  headerSurfaceHeight: 123,
  headerSurfaceWidth: 405,
  backArrowSize: 30,
  getStartedButtonWidth: 271,
  continueButtonWidth: 253,

  // Bordered input boxes (mobile number + OTP)
  inputBoxHeight: 48,
  inputBoxRadius: 4,
  inputBoxGap: 10,
  countryCodeWidth: 56,
  otpBoxWidth: 50,
  otpBoxHeight: 56,

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
