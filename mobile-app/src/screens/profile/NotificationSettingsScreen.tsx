import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState(INITIAL_NOTIFICATION_SETTINGS);

  const handleToggle = (id: NotificationId, value: boolean) => {
    setSettings((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader title="Notifications" onBackPress={() => router.back()} />

      <View style={styles.content}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.description}>
            Choose what you want to be notified about
          </Text>

          <View style={styles.notificationList}>
            {NOTIFICATION_OPTIONS.map((item) => (
              <View key={item.id} style={styles.notificationRow}>
                <View style={styles.notificationText}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>

                  <Text style={styles.notificationDescription}>
                    {item.description}
                  </Text>
                </View>

                <Pressable
                  accessibilityRole="switch"
                  accessibilityState={{ checked: settings[item.id] }}
                  accessibilityLabel={item.title}
                  onPress={() => handleToggle(item.id, !settings[item.id])}
                  style={[
                    styles.switchTrack,
                    settings[item.id] && styles.switchTrackOn,
                  ]}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      settings[item.id] && styles.switchThumbOn,
                    ]}
                  />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
            ]}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.successTitle}>Success!</Text>

            <Text style={styles.successMessage}>
              Your notification preferences have been saved.
            </Text>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setShowSuccess(false);
                router.back();
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  description: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.xl,
  },
  notificationList: {
    gap: SPACING.xl,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
    minHeight: SPACING.xxxl,
  },
  notificationText: {
    flex: 1,
    gap: SPACING.xs,
  },
  notificationTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.md,
  },
  notificationDescription: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  saveButton: {
    minHeight: SPACING.xxxl + SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.purple,
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  switchTrack: {
    width: SPACING.xxxl * 2.5,
    height: SPACING.xxxl,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.disabled,
    justifyContent: 'center',
    padding: 1,
  },
  switchTrackOn: {
    backgroundColor: COLORS.purple,
  },
  switchThumb: {
    width: SPACING.xl * 2,
    height: SPACING.xxxl,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.purpleBorder,
    alignSelf: 'flex-start',
  },
  switchThumbOn: {
    alignSelf: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.overlay,
  },
  modalCard: {
    width: '100%',
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    gap: SPACING.md,
  },
  successTitle: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.lg,
  },
  successMessage: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    textAlign: 'center',
  },
  modalButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple,
  },
  modalButtonText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
});
