import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import {
  INITIAL_NOTIFICATION_SETTINGS,
  NOTIFICATION_OPTIONS,
  type NotificationId,
} from '@/constants/accountSettings';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

export function NotificationSettingsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState(INITIAL_NOTIFICATION_SETTINGS);

  const toggleNotification = (id: NotificationId, enabled: boolean) => {
    setSettings((current) => ({ ...current, [id]: enabled }));
  };

  const handleSave = () => {
    // TODO: Persist these preferences through the notification settings API.
    Alert.alert(
      'Preferences',
      'Notification preferences are selected locally. Saving them to your account requires API integration.',
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
        <Text style={styles.description}>
          Choose which notifications you want to receive.
        </Text>

        <View style={styles.optionsCard}>
          {NOTIFICATION_OPTIONS.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 ? <View style={styles.divider} /> : null}

              <View style={styles.optionRow}>
                <View style={styles.optionText}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
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
        <Text
          accessibilityRole="text"
          style={styles.saveButton}
          onPress={handleSave}
        >
          Save Changes
        </Text>
      </View>
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
    paddingBottom: SPACING.xl,
  },
  description: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.lg,
  },
  optionsCard: {
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.surface,
  },
  optionRow: {
    minHeight: SPACING.xxxl * 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  optionText: {
    flex: 1,
    gap: SPACING.xs,
  },
  optionTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  optionDescription: {
    color: COLORS.text.secondary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    lineHeight: SPACING.lg,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.background,
  },
  saveButton: {
    overflow: 'hidden',
    paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purple,
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
  },
});
