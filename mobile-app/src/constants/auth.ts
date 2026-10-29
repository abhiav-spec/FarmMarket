import { ImageSourcePropType } from 'react-native';

// Text and data for the auth + onboarding screens.

export const OTP_LENGTH = 6;
export const OTP_RESEND_SECONDS = 30;
export const PHONE_LENGTH = 10;
export const COUNTRY_CODE = '+91';

export const AUTH_STRINGS = {
  getStarted: {
    title: 'Welcome to Atavi',
    subtitle: 'Buy trusted agricultural products and get expert crop guidance.',
    button: 'Get Started',
  },
  mobileNumber: {
    header: 'Mobile Number',
    subtitle: 'Enter your mobile number',
    security:
      "We'll send a verification code to confirm your number and keep your account secure.",
  },
  otp: {
    header: 'Verify your number',
    sentPrefix: "We've sent a 6-digit verification code to ",
    sentSuffix: '. Enter the code below to continue.',
    notReceived: "Didn't receive the code?",
    resendPrefix: 'You can ',
    resendLink: 'resend it',
    resendSuffix: (seconds: number) => ` in ${seconds} seconds.`,
    resendNow: 'Resend code',
  },
  personalInfo: {
    header: 'Personal Information',
    nameLabel: 'Name',
    namePlaceholder: 'What should we call you?',
    stateLabel: 'State',
    statePlaceholder: 'Select your state',
    districtLabel: 'District',
    districtPlaceholder: 'Select your district',
    districtLocked: 'Select state first',
    languageLabel: 'Language',
    defaultLanguageKey: 'english',
    defaultLanguageName: 'English',
    modalTitles: {
      language: 'Select Language',
      state: 'Select State',
      district: 'Select District',
    },
    search: 'Search...',
    empty: 'No options found',
  },
  onboarding: {
    next: 'Next slide',
    finish: 'Get started',
    goToSlide: (slide: number) => `Go to slide ${slide}`,
  },
  continue: 'Continue',
  back: 'Go back',
} as const;

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  /** Image size and offset inside the 370×397 image window (from Figma). */
  imageFrame: { width: number; height: number; left: number; top: number };
  /** Figma crops Expert and Trust to the window; Track is not cropped. */
  clipImage: boolean;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'crop-guidance',
    title: 'Expert Crop\nGuidance',
    description:
      'Upload photos and videos of your crops and get\nadvice from our agricultural experts.',
    image: require('@/assets/illustrations/expert-crop.png'),
    imageFrame: { width: 382, height: 573, left: -6, top: -45 },
    clipImage: true,
  },
  {
    id: 'agricultural-products',
    title: 'Trusted Agricultural\nProducts',
    description:
      'Buy seeds, fertilizers, pesticides and equipment from\nverified suppliers.',
    image: require('@/assets/illustrations/trusted-products.png'),
    imageFrame: { width: 369, height: 553, left: 0, top: -30 },
    clipImage: true,
  },
  {
    id: 'track-order',
    title: 'Track Every\nOrder',
    description:
      'Track your orders from purchase to delivery at your\ndoorstep.',
    image: require('@/assets/illustrations/track-order.png'),
    imageFrame: { width: 371, height: 555, left: 0, top: -28 },
    clipImage: false,
  },
];
