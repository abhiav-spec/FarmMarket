import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING, UI } from '@/theme';

const REFERRAL_STEPS = [
  {
    icon: 'share-social-outline' as const,
    title: 'Invite your friends',
    description: 'Share your referral code with friends and family.',
  },
  {
    icon: 'person-add-outline' as const,
    title: 'Friends sign up',
    description: 'Your friends join FarmMarket using your referral code.',
  },
  {
    icon: 'cart-outline' as const,
    title: 'They shop on FarmMarket',
    description: 'Your friends explore and shop for their farming needs.',
  },
  {
    icon: 'gift-outline' as const,
    title: 'Earn rewards',
    description: 'Enjoy referral rewards when the eligible conditions are met.',
  },
];

interface ReferralHowItWorksProps {
  visible: boolean;
  onClose: () => void;
}

export function ReferralHowItWorks({
  visible,
  onClose,
}: ReferralHowItWorksProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.headingRow}>
            <Text style={styles.title}>How it works</Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close referral instructions"
              onPress={onClose}
              hitSlop={UI.hitSlop}
            >
              <Ionicons name="close" size={24} color={COLORS.text.primary} />
            </Pressable>
          </View>

          {REFERRAL_STEPS.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={23} color={COLORS.purple} />
              </View>

              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>
                  {index + 1}. {step.title}
                </Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}

          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  card: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    backgroundColor: COLORS.background,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.primary,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  stepIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purpleSurface,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  stepDescription: {
    marginTop: SPACING.xs,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
    color: COLORS.text.secondary,
  },
  confirmButton: {
    height: 50,
    marginTop: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple,
  },
  confirmButtonText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
  },
});
