import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { OutlinedBox } from '@/components/auth/OutlinedBox';
import { PillButton } from '@/components/auth/PillButton';
import {
  AUTH_ROUTES,
  AUTH_STRINGS,
  COUNTRY_CODE,
  MASKED_PHONE,
  OTP_LENGTH,
  OTP_RESEND_SECONDS,
} from '@/constants/auth';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  SPACING,
  UI,
  useResponsive,
} from '@/theme';

const STRINGS = AUTH_STRINGS.otp;
const BOX_INDEXES = Array.from({ length: OTP_LENGTH }, (_, i) => i);
const emptyDigits = () => Array<string>(OTP_LENGTH).fill('');


export function OtpScreen() {
  const router = useRouter();
  const { width, moderateScale } = useResponsive();
  const keyboardVisible = useKeyboardVisible();

  // Boxes scale gently with the screen like the rest of the app, but never
  // wider than fits with the side margins.
  const rowWidth = width - 2 * AUTH_LAYOUT.screenPadding;
  const boxWidth = Math.min(
    moderateScale(AUTH_LAYOUT.otpBoxWidth),
    (rowWidth - (OTP_LENGTH - 1) * AUTH_LAYOUT.inputBoxGap) / OTP_LENGTH,
  );
  const boxSize = {
    width: boxWidth,
    height: (boxWidth * AUTH_LAYOUT.otpBoxHeight) / AUTH_LAYOUT.otpBoxWidth,
  };

  const [digits, setDigits] = useState<string[]>(emptyDigits);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [timer, setTimer] = useState(OTP_RESEND_SECONDS);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const otp = digits.join('');
  const isComplete = otp.length === OTP_LENGTH;

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer === 0) {
      setTimer(OTP_RESEND_SECONDS);
      setDigits(emptyDigits());
      inputRefs.current[0]?.focus();
    }
  };

  const handleDigitChange = (text: string, index: number) => {
    const clean = text.replace(/[^0-9]/g, '');

    // Pasting the full code fills every box
    if (clean.length > 1) {
      const newDigits = [...digits];
      const chars = clean.slice(0, OTP_LENGTH).split('');
      chars.forEach((c, idx) => {
        newDigits[idx] = c;
      });
      setDigits(newDigits);
      inputRefs.current[Math.min(chars.length, OTP_LENGTH - 1)]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = clean.slice(-1);
    setDigits(newDigits);

    if (clean && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    // Backspace on an empty box clears and jumps to the previous one
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      const newDigits = [...digits];
      newDigits[index - 1] = '';
      setDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (isComplete) {
      router.push(AUTH_ROUTES.personalInfo);
    }
  };

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <AuthHeader
          title={STRINGS.header}
          fallbackRoute={AUTH_ROUTES.mobileNumber}
        />

        <View style={styles.instructionContainer}>
          <AppText style={styles.instructionText}>
            {STRINGS.sentPrefix}
            <AppText
              style={styles.phoneSpan}
            >{`${COUNTRY_CODE} ${MASKED_PHONE}`}</AppText>
            {STRINGS.sentSuffix}
          </AppText>
        </View>

        <View style={styles.otpInputContainer}>
          {BOX_INDEXES.map((index) => (
            <OutlinedBox
              key={index}
              focused={focusedIndex === index}
              style={boxSize}
            >
              <TextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpBoxInput}
                keyboardType="number-pad"
                value={digits[index]}
                onChangeText={(text) => handleDigitChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() =>
                  setFocusedIndex((prev) => (prev === index ? -1 : prev))
                }
                autoFocus={index === 0}
                selectTextOnFocus
                cursorColor={AUTH_COLORS.purple}
                selectionColor={AUTH_COLORS.purpleLight}
              />
            </OutlinedBox>
          ))}
        </View>

        <View style={styles.spacer} />

        {/* Resend text + button sit just above the keyboard */}
        <View
          style={[
            styles.footer,
            {
              paddingBottom: keyboardVisible
                ? AUTH_LAYOUT.keyboardGap
                : AUTH_LAYOUT.bottomGap,
            },
          ]}
        >
          <AppText style={styles.resendPrompt}>{STRINGS.notReceived}</AppText>
          {timer > 0 ? (
            <AppText style={styles.timerText}>
              {STRINGS.resendPrefix}
              <AppText style={styles.resendHighlight}>
                {STRINGS.resendLink}
              </AppText>
              {STRINGS.resendSuffix(timer)}
            </AppText>
          ) : (
            <Pressable onPress={handleResend} hitSlop={UI.hitSlop}>
              <AppText style={styles.resendActiveText}>
                {STRINGS.resendNow}
              </AppText>
            </Pressable>
          )}

          <View style={styles.buttonWrapper}>
            <PillButton
              title={AUTH_STRINGS.continue}
              showArrow
              arrowPosition="left"
              fullWidth={false}
              disabled={!isComplete}
              onPress={handleContinue}
              style={styles.button}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  instructionContainer: {
    width: '100%',
    marginTop: SPACING.xl,
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
  },
  instructionText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.dark,
    textAlign: 'center',
  },
  phoneSpan: {
    ...AUTH_TYPOGRAPHY.bodySmallStrong,
    color: COLORS.text.primary,
  },
  otpInputContainer: {
    marginTop: SPACING.xxl,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: AUTH_LAYOUT.inputBoxGap,
  },
  otpBoxInput: {
    ...AUTH_TYPOGRAPHY.otpDigit,
    width: '100%',
    height: '100%',
    color: COLORS.text.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: UI.zeroInset,
    margin: UI.zeroInset,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as object,
    }),
  },
  spacer: {
    flex: 1,
  },
  footer: {
    width: '100%',
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
  },
  resendPrompt: {
    ...AUTH_TYPOGRAPHY.captionRegular,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  timerText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.primary,
  },
  // Nested text still gets AppText's default size, so set it here
  resendHighlight: {
    ...AUTH_TYPOGRAPHY.bodySmallMedium,
    color: COLORS.success,
  },
  resendActiveText: {
    ...AUTH_TYPOGRAPHY.bodySmallStrong,
    color: COLORS.success,
  },
  buttonWrapper: {
    marginTop: SPACING.xxl,
    alignItems: 'center',
  },
  button: {
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
  },
});
