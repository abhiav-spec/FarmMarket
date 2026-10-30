import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
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
  PHONE_LENGTH,
} from '@/constants/auth';
import { useKeyboardVisible } from '@/hooks/useKeyboardVisible';
import {
  AUTH_COLORS,
  AUTH_LAYOUT,
  AUTH_TYPOGRAPHY,
  COLORS,
  SPACING,
  UI,
} from '@/theme';

const STRINGS = AUTH_STRINGS.mobileNumber;

const onlyDigits = (value: string) =>
  value.replace(/\D/g, '').slice(0, PHONE_LENGTH);

export function MobileNumberScreen() {
  const router = useRouter();
  const keyboardVisible = useKeyboardVisible();
  const [phone, setPhone] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isValid = phone.length === PHONE_LENGTH;

  const handleContinue = () => {
    if (!isValid) return;
    router.push(AUTH_ROUTES.otp);
  };

  return (
    <View style={styles.screen}>
      {/* "padding" works on both platforms: it only adds the part of the
          keyboard that actually covers the screen */}
      <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
        <AuthHeader
          title={STRINGS.header}
          showSurface
          fallbackRoute={AUTH_ROUTES.getStarted}
        />

        <View style={styles.contentContainer}>
          <AppText style={styles.subtitle}>{STRINGS.subtitle}</AppText>

          {/* Mobile number: country code box next to the number box */}
          <View style={styles.inputRow}>
            <OutlinedBox darkBorder style={styles.countryCodeBox}>
              <AppText style={styles.countryCodeText}>
                {COUNTRY_CODE}
              </AppText>
            </OutlinedBox>

            <OutlinedBox darkBorder focused={isFocused} style={styles.phoneBox}>
              <TextInput
                style={[styles.inputText, styles.phoneInput]}
                keyboardType="phone-pad"
                maxLength={PHONE_LENGTH}
                value={phone}
                onChangeText={(value) => setPhone(onlyDigits(value))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                cursorColor={AUTH_COLORS.purple}
                selectionColor={AUTH_COLORS.purpleLight}
                autoFocus
              />
            </OutlinedBox>
          </View>
        </View>

        {/* Security note + button sit just above the keyboard */}
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
          <AppText style={styles.securityText}>{STRINGS.security}</AppText>

          <View style={styles.buttonWrapper}>
            <PillButton
              title={AUTH_STRINGS.continue}
              showArrow
              arrowPosition="left"
              fullWidth={false}
              disabled={!isValid}
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
  contentContainer: {
    width: '100%',
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    flex: 1,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    marginTop: SPACING.xl,
    color: COLORS.text.primary,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: SPACING.xxl,
    gap: AUTH_LAYOUT.inputBoxGap,
  },
  countryCodeBox: {
    width: AUTH_LAYOUT.countryCodeWidth,
  },
  phoneBox: {
    flex: 1,
    alignItems: 'stretch',
    paddingHorizontal: AUTH_LAYOUT.inputBoxPadding,
  },
  inputText: {
    ...AUTH_TYPOGRAPHY.body,
    color: COLORS.text.primary,
  },
  // Figma: "+91" is SemiBold
  countryCodeText: {
    ...AUTH_TYPOGRAPHY.bodyStrong,
    color: COLORS.text.primary,
  },
  phoneInput: {
    height: '100%',
    padding: UI.zeroInset,
    borderWidth: UI.zeroInset,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as object,
    }),
  },
  footer: {
    width: '100%',
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
  },
  securityText: {
    ...AUTH_TYPOGRAPHY.caption,
    color: COLORS.text.dark,
  },
  buttonWrapper: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  button: {
    width: AUTH_LAYOUT.continueButtonWidth,
    height: AUTH_LAYOUT.buttonHeight,
  },
});
