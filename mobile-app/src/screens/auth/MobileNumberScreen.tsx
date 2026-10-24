import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { OutlinedBox } from '@/components/auth/OutlinedBox';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_STRINGS, COUNTRY_CODE, PHONE_LENGTH } from '@/constants/auth';
import { AUTH_COLORS, AUTH_LAYOUT, AUTH_TYPOGRAPHY, COLORS } from '@/theme';

const STRINGS = AUTH_STRINGS.mobileNumber;

const onlyDigits = (value: string) =>
  value.replace(/\D/g, '').slice(0, PHONE_LENGTH);

export function MobileNumberScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isValid = phone.length === PHONE_LENGTH;

  const handleContinue = () => {
    if (!isValid) return;
    router.push({
      pathname: '/(auth)/otp',
      params: { phone },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AuthHeader
          title={STRINGS.header}
          showSurface
          fallbackRoute="/(auth)/get-started"
        />

        <View style={styles.contentContainer}>
          <AppText style={styles.subtitle}>{STRINGS.subtitle}</AppText>

          {/* Mobile number: country code box next to the number box */}
          <View style={styles.inputRow}>
            <OutlinedBox style={styles.countryCodeBox}>
              <AppText style={styles.inputText}>{COUNTRY_CODE}</AppText>
            </OutlinedBox>

            <OutlinedBox focused={isFocused} style={styles.phoneBox}>
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

          <AppText style={styles.securityText}>{STRINGS.security}</AppText>
        </View>

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Figma (402×874 frame): header ends 123 → subtitle 143 → boxes 189 →
// security text 425 → button 473
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
  contentContainer: {
    width: '100%',
    paddingHorizontal: AUTH_LAYOUT.screenPadding,
    flex: 1,
  },
  subtitle: {
    ...AUTH_TYPOGRAPHY.body,
    marginTop: 20,
    color: COLORS.text.black,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 25,
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
    color: COLORS.text.black,
  },
  phoneInput: {
    height: '100%',
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as object,
    }),
  },
  securityText: {
    ...AUTH_TYPOGRAPHY.caption,
    marginTop: 188,
    color: COLORS.text.dark,
  },
  buttonWrapper: {
    position: 'absolute',
    top: 473,
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
