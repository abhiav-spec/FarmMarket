import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { PRIVACY_POLICY_SECTIONS } from '@/constants/accountSettings';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

export function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Privacy Policy"
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.intro}>
          Your privacy matters to us. This page explains how FarmMarket may
          collect, use and protect your information.
        </Text>

        {PRIVACY_POLICY_SECTIONS.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.number}>
              {String(index + 1).padStart(2, '0')}
            </Text>

            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionBody}>{section.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  intro: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xxl,
    marginBottom: SPACING.lg,
  },
  section: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  number: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.sm,
  },
  sectionContent: {
    flex: 1,
    gap: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  sectionBody: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.xxl,
  },
});
