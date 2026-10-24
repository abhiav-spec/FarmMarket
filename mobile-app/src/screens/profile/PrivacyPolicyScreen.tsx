import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { PRIVACY_POLICY_SECTIONS } from '@/constants/accountSettings';
import { COLORS, FONT_FAMILY, FONT_SIZE, ICON_SIZES, SPACING } from '@/theme';

export function PrivacyPolicyScreen() {
  const router = useRouter();

  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setExpandedSections((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

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
          Learn how we collect, use and protect your information.
        </Text>

        <View style={styles.sectionList}>
          {PRIVACY_POLICY_SECTIONS.map((section, index) => {
            const isExpanded = expandedSections.includes(index);

            return (
              <View key={section.title} style={styles.section}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={section.title}
                  accessibilityState={{ expanded: isExpanded }}
                  onPress={() => toggleSection(index)}
                  style={styles.sectionHeader}
                >
                  <View style={styles.sectionText}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>

                    {!isExpanded && (
                      <Text style={styles.sectionSubtitle}>
                        {section.subtitle}
                      </Text>
                    )}

                    {isExpanded && (
                      <Text style={styles.sectionBody}>{section.body}</Text>
                    )}
                  </View>

                  <Image
                    source={
                      isExpanded
                        ? require('../../../assets/icons/dropdown-chevron.png')
                        : require('../../../assets/icons/right-arrow.png')
                    }
                    resizeMode="contain"
                    style={styles.arrow}
                    accessibilityLabel={
                      isExpanded ? 'Collapse section' : 'Expand section'
                    }
                  />
                </Pressable>
              </View>
            );
          })}
        </View>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },

  intro: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    lineHeight: SPACING.lg,
    marginBottom: SPACING.xl,
  },

  sectionList: {
    gap: SPACING.sm,
  },

  section: {
    paddingVertical: SPACING.xs,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  sectionText: {
    flex: 1,
    flexDirection: 'column',
    gap: SPACING.xs,
  },

  sectionTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },

  sectionSubtitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
  },

  arrow: {
    width: ICON_SIZES.md,
    height: ICON_SIZES.md,
  },

  sectionBody: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: SPACING.md + SPACING.xs,
  },
});
