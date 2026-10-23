import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type SettingsRowProps = {
  title: string;
  description?: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
};

const NOTIFICATION_OPTIONS = [
  {
    id: 'orderUpdates',
    title: 'Order Updates',
    description: 'Get updates about your orders and deliveries.',
  },
  {
    id: 'cropAdvisory',
    title: 'Crop Advisory Alerts',
    description: 'Receive updates about your crop consultations.',
  },
  {
    id: 'offers',
    title: 'Offers & Promotions',
    description: 'Stay informed about offers and special deals.',
  },
  {
    id: 'walletUpdates',
    title: 'Wallet Updates',
    description: 'Receive updates about wallet transactions.',
  },
] as const;

type NotificationId = (typeof NOTIFICATION_OPTIONS)[number]['id'];

const INITIAL_NOTIFICATION_SETTINGS: Record<NotificationId, boolean> = {
  orderUpdates: true,
  cropAdvisory: true,
  offers: false,
  walletUpdates: true,
};

function SettingsRow({ title, description, icon, onPress }: SettingsRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.settingsRow, pressed && styles.pressed]}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={FONT_SIZE.xl} color={COLORS.purple} />
      </View>

      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        {description ? (
          <Text style={styles.rowDescription}>{description}</Text>
        ) : null}
      </View>

      <Ionicons
        name="chevron-forward"
        size={FONT_SIZE.lg}
        color={COLORS.text.secondary}
      />
    </Pressable>
  );
}

export function AccountSettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Account Settings"
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageDescription}>
          Privacy, security and account preferences
        </Text>

        <View style={styles.settingsCard}>
          <SettingsRow
            title="Notifications"
            description="Manage your notification preferences"
            icon="notifications-outline"
            onPress={() => router.push('/notifications-settings')}
          />

          <View style={styles.divider} />

          <SettingsRow
            title="Privacy Policy"
            description="Learn how your information is used"
            icon="shield-checkmark-outline"
            onPress={() => router.push('/privacy-policy')}
          />

          <View style={styles.divider} />

          <SettingsRow
            title="Terms & Conditions"
            description="Read the terms for using FarmMarket"
            icon="document-text-outline"
            onPress={() => router.push('/terms-and-conditions')}
          />
        </View>

        <View style={styles.supportCard}>
          <View style={styles.supportIcon}>
            <Ionicons
              name="headset-outline"
              size={FONT_SIZE.xxl}
              color={COLORS.purple}
            />
          </View>

          <View style={styles.supportText}>
            <Text style={styles.supportTitle}>Need help?</Text>
            <Text style={styles.rowDescription}>
              Contact our support team for assistance.
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/help-centre')}
            style={styles.supportButton}
          >
            <Text style={styles.supportButtonText}>Contact Support</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function NotificationSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(INITIAL_NOTIFICATION_SETTINGS);

  const toggleNotification = (id: NotificationId, enabled: boolean) => {
    setSettings((current) => ({ ...current, [id]: enabled }));
  };

  const saveChanges = () => {
    // Connect this action to the notification preferences API when available.
    Alert.alert(
      'Preferences updated',
      'Your selections are ready to be saved. Server-side saving will be connected when the preferences API is available.',
      [{ text: 'OK', onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader title="Notifications" onBackPress={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.pageDescription}>
          Choose which notifications you want to receive.
        </Text>

        <View style={styles.settingsCard}>
          {NOTIFICATION_OPTIONS.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 ? <View style={styles.divider} /> : null}

              <View style={styles.notificationRow}>
                <View style={styles.notificationText}>
                  <Text style={styles.rowTitle}>{option.title}</Text>
                  <Text style={styles.rowDescription}>
                    {option.description}
                  </Text>
                </View>

                <Switch
                  accessibilityLabel={option.title}
                  value={settings[option.id]}
                  onValueChange={(enabled) =>
                    toggleNotification(option.id, enabled)
                  }
                  trackColor={{
                    false: COLORS.disabled,
                    true: COLORS.purple,
                  }}
                  thumbColor={COLORS.surface}
                />
              </View>
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={saveChanges}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const PRIVACY_SECTIONS = [
  {
    title: 'Information We Collect',
    body: 'FarmMarket may collect information you provide when using the app, such as account details, contact information, delivery details and preferences.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Information may be used to manage your account, process orders, provide crop advisory services, respond to support requests and improve the app experience.',
  },
  {
    title: 'Information Sharing',
    body: 'Information may be shared with service providers when necessary to deliver requested services or meet applicable legal obligations.',
  },
  {
    title: 'Data Security',
    body: 'We take reasonable steps to protect information. No digital system can guarantee absolute security.',
  },
  {
    title: 'Your Choices',
    body: 'You can review available account settings and contact support with questions or requests concerning your information.',
  },
  {
    title: 'Contact Us',
    body: 'Contact FarmMarket support if you have questions about this policy.',
  },
];

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
        contentContainerStyle={styles.legalContent}
      >
        <Text style={styles.legalIntro}>
          Your privacy matters to us. This page explains how FarmMarket may
          collect, use and protect your information.
        </Text>

        {PRIVACY_SECTIONS.map((section, index) => (
          <View key={section.title} style={styles.legalSection}>
            <Text style={styles.legalNumber}>
              {String(index + 1).padStart(2, '0')}
            </Text>
            <View style={styles.legalText}>
              <Text style={styles.legalTitle}>{section.title}</Text>
              <Text style={styles.legalBody}>{section.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const TERMS_SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using FarmMarket, you agree to the applicable terms. If you do not agree, please discontinue use of the service.',
  },
  {
    title: 'Your Account',
    body: 'You are responsible for providing accurate account information and keeping your account credentials secure.',
  },
  {
    title: 'Orders and Payments',
    body: 'Product availability, pricing, delivery details and payment conditions should be reviewed before completing an order.',
  },
  {
    title: 'Acceptable Use',
    body: 'You agree to use FarmMarket lawfully and not misuse the service or interfere with its operation.',
  },
  {
    title: 'Service Availability',
    body: 'Features and services may change or be temporarily unavailable for maintenance or other operational reasons.',
  },
  {
    title: 'Contact and Updates',
    body: 'We may update these terms as the service evolves. Contact support if you have questions about the applicable terms.',
  },
];

export function TermsAndConditionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Terms & Conditions"
        onBackPress={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.legalContent}
      >
        <Text style={styles.legalIntro}>
          Please review these terms before using FarmMarket.
        </Text>

        {TERMS_SECTIONS.map((section, index) => (
          <View key={section.title} style={styles.legalSection}>
            <Text style={styles.legalNumber}>
              {String(index + 1).padStart(2, '0')}
            </Text>
            <View style={styles.legalText}>
              <Text style={styles.legalTitle}>{section.title}</Text>
              <Text style={styles.legalBody}>{section.body}</Text>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  pageDescription: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.lg,
  },
  settingsCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  pressed: {
    opacity: 0.75,
  },
  rowIcon: {
    width: SPACING.xxxl + SPACING.xs,
    height: SPACING.xxxl + SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleLight,
  },
  rowText: {
    flex: 1,
    gap: SPACING.xs,
  },
  rowTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  rowDescription: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: FONT_SIZE.xs + SPACING.sm,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  supportCard: {
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.purpleSurface,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
    gap: SPACING.md,
  },
  supportIcon: {
    width: SPACING.xxxl + SPACING.xs,
    height: SPACING.xxxl + SPACING.xs,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportText: {
    gap: SPACING.xs,
  },
  supportTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
  },
  supportButton: {
    minHeight: SPACING.xxxl + SPACING.xs,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purple,
  },
  supportButtonText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
  },
  notificationRow: {
    minHeight: SPACING.xxxl * 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  notificationText: {
    flex: 1,
    gap: SPACING.xs,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.background,
  },
  primaryButton: {
    minHeight: SPACING.xxxl + SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purple,
  },
  primaryButtonText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  legalContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  legalIntro: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.md + SPACING.md,
    marginBottom: SPACING.xl,
  },
  legalSection: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  legalNumber: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.sm,
  },
  legalText: {
    flex: 1,
    gap: SPACING.sm,
  },
  legalTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  legalBody: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: FONT_SIZE.md + SPACING.md,
  },
});
