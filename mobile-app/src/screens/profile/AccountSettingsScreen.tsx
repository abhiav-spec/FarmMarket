import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { SettingsRow, SupportCard } from '@/components/account-settings';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

export function AccountSettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Account settings"
        onBackPress={() => router.back()}
      />

      <View style={styles.layout}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <Text style={styles.description}>
            Privacy, security and account preferences
          </Text>

          <View style={styles.settingsList}>
            <SettingsRow
              title="Notifications"
              description="Manage your notification preferences"
              icon="notifications"
              onPress={() => router.push('/notifications-settings')}
            />

            <SettingsRow
              title="Privacy Policy"
              description="Learn how we collect and use your data"
              icon="privacy-policy"
              onPress={() => router.push('/privacy-policy')}
            />

            <SettingsRow
              title="Terms & Conditions"
              description="Read our terms and conditions"
              icon="terms-conditions"
              onPress={() => router.push('/terms-and-conditions')}
            />
          </View>
        </ScrollView>

        <SupportCard onPress={() => router.push('/help-centre')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  layout: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  description: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.lg,
  },
  settingsList: {
    paddingHorizontal: SPACING.sm,
  },
});
