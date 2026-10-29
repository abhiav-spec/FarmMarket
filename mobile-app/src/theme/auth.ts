import { COLORS } from './colors';
import { RADIUS } from './radius';
import { SIZES } from './sizes';
import { SPACING } from './spacing';

// Values for the auth and onboarding screens, taken from Figma.
// Kept in their own groups (like CART_LAYOUT / WALLET_LAYOUT) so they never
// clash with shared SIZES keys used by other screens.

// Auth colours point at the shared COLORS so these screens use the same
// purples, borders and placeholder grey as the rest of the app (AppInput,
// feedback, referral screens). Only the yellow onboarding dot is auth-only.
export const AUTH_COLORS = {
  purple: COLORS.purple,
  purpleLight: COLORS.purpleButtonBorder,
  purpleBorder: COLORS.purpleBorder1,
  buttonFill: COLORS.purpleButtonFill,
  inputLine: COLORS.cardBorder,
  placeholder: COLORS.text.muted,
  dotInactive: '#F5F378',
} as const;

export const AUTH_LAYOUT = {
  // Figma frame (402×874, measured from the very top of the screen)
  screenWidth: 402,
  frameHeight: 874,
  screenPadding: SPACING.lg,

  // Space under the bottom button: above the keyboard / above the screen edge
  keyboardGap: 18,
  bottomGap: 44,

  // Get Started: title and button tops in Figma (the glow circle is centred)
  welcomeTitleTop: 313,
  welcomeButtonTop: 610,

  buttonHeight: 45,
  buttonRadius: RADIUS.header,
  buttonGap: SPACING.xxxl,
  arrowWidth: 30,
  arrowHeight: 15,
  // The Figma arrow PNG has 1px of transparent edge on each side
  // (30 wide image for a 28 wide arrow), so it takes up 28px in layout.
  arrowBleed: 1,
  getStartedButtonWidth: 271,
  continueButtonWidth: 253,

  // Header band shared by the auth screens
  headerSurfaceHeight: 123,
  headerShadowHeight: 138,
  headerContentTop: 83,
  backArrowSize: 30,

  // Bordered input boxes (mobile number + OTP)
  inputBoxHeight: SIZES.inputHeight,
  inputBoxRadius: RADIUS.xs,
  inputBoxGap: 10,
  inputBoxPadding: SPACING.md,
  countryCodeWidth: 56,
  otpBoxWidth: 50,
  otpBoxHeight: 56,

  // Get Started subtitle wraps at this width in Figma
  welcomeSubtitleWidth: 313,

  // Onboarding illustration window
  imageWidth: 370,
  imageHeight: 397,
  imageTop: 112,
  imageLeft: 16,
  imageTextGap: 50,
  onboardingBottomGap: 49,
  // Height kept for the title, description and dots row; the illustration
  // and the space around it share whatever is left
  onboardingTextArea: 335,
  descriptionWidth: 344,
  dotSize: 12,
  activeDotWidth: 27,
  arrowButtonWidth: 60,
  arrowButtonHeight: 32,

  pressedOpacity: 0.85,
} as const;

// AUTH_TYPOGRAPHY lives in typography.ts with the other screens' text styles.
