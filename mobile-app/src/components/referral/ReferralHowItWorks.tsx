import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

const REFERRAL_STEPS = [
  {
    id: 'share',
    icon: require('../../../assets/icons/referral-share.png'),
    title: 'Share your referral code',
    description: 'Send your code to your friends',
  },
  {
    id: 'signup',
    icon: require('../../../assets/icons/referral-signup.png'),
    title: 'Your friend sign up',
    description: 'They sign up using your referral code.',
  },
  {
    id: 'order',
    icon: require('../../../assets/icons/referral-order.png'),
    title: 'Your friends places their first order',
    description: 'They place their first successful orders',
  },
  {
    id: 'rewards',
    icon: require('../../../assets/icons/referral-rewards.png'),
    title: 'you earn 100, your friends gets 50',
    description: 'Rewards are credited to your wallet',
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
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close referral instructions"
        />

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <Text style={styles.title}>How it works</Text>

          <View style={styles.stepsContainer}>
            {REFERRAL_STEPS.map((step) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepIcon}>
                  <Image
                    source={step.icon}
                    style={styles.stepIconImage}
                    resizeMode="contain"
                    accessibilityIgnoresInvertColors
                  />
                </View>

                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Got it"
            onPress={onClose}
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.confirmButtonPressed,
            ]}
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
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    width: '100%',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xl,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    backgroundColor: COLORS.background,
  },
  dragHandle: {
    width: 44,
    height: 4,
    alignSelf: 'center',
    marginBottom: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.text.primary,
  },
  title: {
    alignSelf: 'center',
    marginBottom: SPACING.lg,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.text.primary,
  },
  stepsContainer: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  stepRow: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  stepIcon: {
    width: 60,
    height: 60,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purpleSurface,
  },
  stepIconImage: {
    width: '48%',
    height: '48%',
  },
  stepContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  stepTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  stepDescription: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    lineHeight: 17,
    color: COLORS.text.primary,
  },
  confirmButton: {
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.purple,
  },
  confirmButtonPressed: {
    opacity: 0.85,
  },
  confirmButtonText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.surface,
  },
});
