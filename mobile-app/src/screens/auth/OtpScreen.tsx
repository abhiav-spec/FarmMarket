import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_COLORS, AUTH_LAYOUT, FONT_FAMILY, FONT_SIZE } from '@/theme';

export function OtpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ phone?: string }>();
  const phone = params.phone || '';

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const otp = digits.join('');

  // Mask phone e.g. 98765 XXXXX or XXXXX XXXXX
  const displayPhone = phone.length === 10
    ? `${phone.slice(0, 5)} XXXXX`
    : 'XXXXX XXXXX';

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleDigitChange = (text: string, index: number) => {
    const clean = text.replace(/[^0-9]/g, '');

    // Handle paste of multiple digits
    if (clean.length > 1) {
      const newDigits = [...digits];
      const chars = clean.slice(0, 6).split('');
      chars.forEach((c, idx) => {
        newDigits[idx] = c;
      });
      setDigits(newDigits);
      const nextIdx = Math.min(chars.length, 5);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    const newDigits = [...digits];
    newDigits[index] = clean.slice(-1);
    setDigits(newDigits);

    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleContinue = () => {
    if (otp.length === 6) {
      router.push('/(auth)/personal-info');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 1. Top Header: Reused AuthHeader component with Mobile Number top bar layout */}
        <AuthHeader
          title="Verify your number"
          fallbackRoute="/(auth)/mobile-number"
        />

        {/* 2. OTP Instruction Text: Centered, width 327, top 143 */}
        <View style={styles.instructionContainer}>
          <AppText style={styles.instructionText}>
            We've sent a 6-digit verification code to{' '}
            <AppText style={styles.phoneSpan}>
              {`+91 ${displayPhone}`}
            </AppText>
            . Enter the code below to continue.
          </AppText>
        </View>

        {/* 3. 6 Individual OTP Input Boxes: 40px × 45px rounded rectangular boxes */}
        <View style={styles.otpInputContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = Boolean(digits[index]);
            const isFocused = focusedIndex === index;

            return (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  isFilled && styles.otpBoxFilled,
                  isFocused && styles.otpBoxFocused,
                ]}
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
                  onBlur={() => setFocusedIndex((prev) => (prev === index ? -1 : prev))}
                  autoFocus={index === 0}
                  selectTextOnFocus
                  cursorColor="#7B4CE2"
                  selectionColor="rgba(123, 76, 226, 0.3)"
                />
              </View>
            );
          })}
        </View>

        {/* 4. Resend Section: Left: 16px, Top: 409px */}
        <View style={styles.resendContainer}>
          <AppText style={styles.resendPrompt}>
            Didn't receive the code?
          </AppText>
          {timer > 0 ? (
            <AppText style={styles.timerText}>
              You can <AppText style={styles.resendHighlight}>resend it</AppText> in {timer} seconds.
            </AppText>
          ) : (
            <Pressable onPress={handleResend} hitSlop={8}>
              <AppText style={styles.resendActiveText}>
                Resend code
              </AppText>
            </Pressable>
          )}
        </View>

        {/* 5. Continue Button: Left: 75px, Top: 474px, Width: 253px, Height: 45px, Pill */}
        <View style={styles.buttonWrapper}>
          <PillButton
            title="Continue"
            showArrow
            arrowPosition="left"
            fullWidth={false}
            disabled={otp.length !== 6}
            onPress={handleContinue}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AUTH_COLORS.white,
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
    backgroundColor: AUTH_COLORS.white,
    alignItems: 'center',
    width: '100%',
    maxWidth: 402,
    position: 'relative',
  },
  instructionContainer: {
    position: 'absolute',
    top: 143,
    left: 16,
    width: 370,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    width: 370,
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    lineHeight: 18.2, // 130% of 14px
    letterSpacing: 0,
    color: AUTH_COLORS.textBody,
    textAlign: 'center',
  },
  phoneSpan: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0,
    color: AUTH_COLORS.black,
  },
  otpInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 205,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  otpBox: {
    width: 40,
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    backgroundColor: AUTH_COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFilled: {
    backgroundColor: 'rgba(219, 193, 254, 0.4)',
    borderColor: 'rgba(123, 76, 226, 0.4)',
    borderWidth: 1,
  },
  otpBoxFocused: {
    backgroundColor: 'rgba(219, 193, 254, 0.4)',
    borderColor: '#7B4CE2',
    borderWidth: 1.5,
  },
  otpBoxInput: {
    width: '100%',
    height: '100%',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 20,
    color: AUTH_COLORS.black,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  resendContainer: {
    position: 'absolute',
    left: 16,
    top: 408,
    width: 370,
  },
  resendPrompt: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: 15.6,
    color: AUTH_COLORS.black,
    marginBottom: 4.4, // next line starts at 428 in Figma
  },
  timerText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18.2,
    color: AUTH_COLORS.black,
  },
  resendHighlight: {
    color: AUTH_COLORS.resendLink,
    fontFamily: FONT_FAMILY.medium,
  },
  resendActiveText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    lineHeight: 18.2,
    color: AUTH_COLORS.resendLink,
  },
  buttonWrapper: {
    position: 'absolute',
    left: 75,
    top: 474,
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
    borderRadius: AUTH_LAYOUT.buttonHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  button: {
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
    borderRadius: AUTH_LAYOUT.buttonHeight / 2,
    backgroundColor: AUTH_COLORS.buttonFill,
  },
});
