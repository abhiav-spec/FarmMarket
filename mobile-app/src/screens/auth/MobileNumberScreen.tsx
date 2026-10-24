import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { PillButton } from '@/components/auth/PillButton';
import { AUTH_COLORS, AUTH_LAYOUT, FONT_FAMILY, FONT_SIZE } from '@/theme';

export function MobileNumberScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  const cleanPhone = phone.replace(/\D/g, '').slice(0, 10);
  const isValid = cleanPhone.length === 10;

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(auth)/get-started');
    }
  };

  const handleContinue = () => {
    if (!isValid) return;
    router.push({
      pathname: '/(auth)/otp',
      params: { phone: cleanPhone },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* White Figma Surface with bottom shadow */}
        <View style={styles.headerSurface}>
          <Image
            source={require('@/assets/auth/input-surface.png')}
            style={styles.headerSurfaceBg}
            resizeMode="stretch"
          />

          {/* Back Arrow */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={handleBack}
            hitSlop={12}
            style={styles.backButton}
          >
            <Image
              source={require('@/assets/auth/back-arrow.png')}
              style={styles.backArrow}
              resizeMode="contain"
            />
          </Pressable>

          {/* Header Title */}
          <AppText style={styles.headerTitle}>
            Mobile Number
          </AppText>
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Subtitle */}
          <AppText style={styles.subtitle}>
            Enter your mobile number
          </AppText>

          {/* Mobile Number Input following StoreFiller pattern */}
          <View style={styles.inputRow}>
            {/* Country code: +91 */}
            <View style={styles.countryCodeSection}>
              <AppText style={styles.countryCodeText}>+91</AppText>
              <View style={styles.underline} />
            </View>

            {/* Mobile number text input */}
            <View style={styles.phoneSection}>
              <TextInput
                style={styles.phoneInput}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(value) => setPhone(value.replace(/\D/g, '').slice(0, 10))}
                cursorColor={AUTH_COLORS.purple}
                selectionColor={AUTH_COLORS.purpleLight}
                placeholder=""
                autoFocus
              />
              <View style={styles.underline} />
            </View>
          </View>

          {/* Security Text */}
          <AppText style={styles.securityText}>
            We'll send a verification code to confirm your number and keep your account secure.
          </AppText>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonWrapper}>
          <PillButton
            title="Continue"
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
  headerSurface: {
    width: '100%',
    maxWidth: AUTH_LAYOUT.headerSurfaceWidth,
    height: AUTH_LAYOUT.headerSurfaceHeight,
    position: 'relative',
  },
  headerSurfaceBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 138,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 83,
    width: AUTH_LAYOUT.backArrowSize,
    height: AUTH_LAYOUT.backArrowSize,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  backArrow: {
    width: AUTH_LAYOUT.backArrowSize,
    height: AUTH_LAYOUT.backArrowSize,
  },
  headerTitle: {
    position: 'absolute',
    left: 129,
    top: 85,
    width: 144,
    height: 26,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xl,
    lineHeight: 26,
    letterSpacing: 0,
    color: AUTH_COLORS.black,
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
    maxWidth: 402,
    paddingHorizontal: 16,
    flex: 1,
  },
  subtitle: {
    marginTop: 20, // 143 - 123
    width: 193,
    height: 21,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    lineHeight: 20.8,
    letterSpacing: 0,
    color: AUTH_COLORS.black,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 25, // 189 - 143 - 21
    alignItems: 'flex-end',
  },
  countryCodeSection: {
    width: 36,
  },
  countryCodeText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    lineHeight: 21,
    color: AUTH_COLORS.black,
    paddingBottom: 4,
  },
  phoneSection: {
    width: 242,
    marginLeft: 24, // 76 - (16 + 36)
  },
  phoneInput: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
    lineHeight: 21,
    color: AUTH_COLORS.black,
    paddingVertical: 0,
    paddingBottom: 4,
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      } as any,
    }),
  },
  underline: {
    height: 1,
    backgroundColor: AUTH_COLORS.inputLine,
    width: '100%',
  },
  securityText: {
    marginTop: 210, // 425 - 215
    width: 370,
    height: 32,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
    lineHeight: 15.6,
    letterSpacing: 0,
    color: AUTH_COLORS.textBody,
  },
  buttonWrapper: {
    position: 'absolute',
    left: 75,
    top: 473,
    width: 253,
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  button: {
    width: 253,
    height: 45,
    borderRadius: 40,
    backgroundColor: 'rgba(219, 193, 254, 0.4)',
  },
});

