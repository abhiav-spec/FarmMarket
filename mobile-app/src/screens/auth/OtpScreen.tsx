import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { OutlinedBox } from '@/components/auth/OutlinedBox';
import { PillButton } from '@/components/auth/PillButton';
import {
  AUTH_STRINGS,
  COUNTRY_CODE,
  OTP_LENGTH,
  OTP_RESEND_SECONDS,
  PHONE_LENGTH,
} from '@/constants/auth';
import { AUTH_COLORS, AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS } from '@/theme';

const STRINGS = AUTH_STRINGS.otp;
const BOX_INDEXES = Array.from({ length: OTP_LENGTH }, (_, i) => i);
const emptyDigits = () => Array<string>(OTP_LENGTH).fill('');

// Shows the first half of the number, e.g. 98765 XXXXX
const maskPhone = (phone: string) => {
  const half = PHONE_LENGTH / 2;
  const hidden = 'X'.repeat(half);
  return phone.length === PHONE_LENGTH
    ? `${phone.slice(0, half)} ${hidden}`
    : `${hidden} ${hidden}`;
};

export function OtpScreen() {
  const router = useRouter();
  const { phone = '' } = useLocalSearchParams<{ phone?: string }>();

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
      router.push('/(auth)/personal-info');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AuthHeader
          title={STRINGS.header}
          fallbackRoute="/(auth)/mobile-number"
        />

        <View style={styles.instructionContainer}>
          <AppText style={styles.instructionText}>
            {STRINGS.sentPrefix}
            <AppText
              style={styles.phoneSpan}
            >{`${COUNTRY_CODE} ${maskPhone(phone)}`}</AppText>
            {STRINGS.sentSuffix}
          </AppText>
        </View>

        <View style={styles.otpInputContainer}>
          {BOX_INDEXES.map((index) => (
            <OutlinedBox
              key={index}
              focused={focusedIndex === index}
              style={styles.otpBox}
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

        <View style={styles.resendContainer}>
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
            <Pressable onPress={handleResend} hitSlop={8}>
              <AppText style={styles.resendActiveText}>
                {STRINGS.resendNow}
              </AppText>
            </Pressable>
          )}
        </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Figma (402×874 frame): instruction 143 → OTP boxes 205 → resend 408 → button 474
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    width: '100%',
    maxWidth: AUTH_LAYOUT.screenWidth,
    position: 'relative',
  },
  instructionContainer: {
    position: 'absolute',
    top: 143,
    left: AUTH_LAYOUT.screenPadding,
    right: AUTH_LAYOUT.screenPadding,
  },
  instructionText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.dark,
    textAlign: 'center',
  },
  phoneSpan: {
    ...AUTH_TYPOGRAPHY.bodySmallStrong,
    color: COLORS.text.black,
  },
  otpInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 205,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: AUTH_LAYOUT.inputBoxGap,
  },
  otpBox: {
    width: AUTH_LAYOUT.otpBoxWidth,
    height: AUTH_LAYOUT.otpBoxHeight,
  },
  otpBoxInput: {
    ...AUTH_TYPOGRAPHY.otpDigit,
    width: '100%',
    height: '100%',
    color: COLORS.text.black,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as object,
    }),
  },
  resendContainer: {
    position: 'absolute',
    left: AUTH_LAYOUT.screenPadding,
    right: AUTH_LAYOUT.screenPadding,
    top: 408,
  },
  resendPrompt: {
    ...AUTH_TYPOGRAPHY.captionRegular,
    color: COLORS.text.black,
    marginBottom: 4.4, // next line starts at 428 in Figma
  },
  timerText: {
    ...AUTH_TYPOGRAPHY.bodySmall,
    color: COLORS.text.black,
  },
  resendHighlight: {
    fontFamily: AUTH_TYPOGRAPHY.body.fontFamily,
    color: COLORS.success,
  },
  resendActiveText: {
    ...AUTH_TYPOGRAPHY.bodySmallStrong,
    color: COLORS.success,
  },
  buttonWrapper: {
    position: 'absolute',
    top: 474,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  button: {
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
  },
});
