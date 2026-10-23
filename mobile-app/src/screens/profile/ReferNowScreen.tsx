import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING, UI } from '@/theme';

const REFERRAL_CODE = 'JAGA100';

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

export function ReferNowScreen() {
  const router = useRouter();
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);

  const inviteFriends = async () => {
    try {
      await Share.share({
        message: `Join me on FarmMarket! Use my referral code ${REFERRAL_CODE}.`,
      });
    } catch {
      // Keep the screen usable if sharing is cancelled or unavailable.
    }
  };

  const copyReferralCode = async () => {
    try {
      await Share.share({
        message: REFERRAL_CODE,
      });
    } catch {
      // Sharing cancelled or unavailable.
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={UI.hitSlop}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Image
            source={require('../../../assets/icons/back-arrow.png')}
            style={styles.backArrow}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.headerTitle}>Refer Now</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Image
            source={require('../../../assets/images/refer-earn.png')}
            style={styles.illustration}
            resizeMode="contain"
            accessibilityLabel="Refer and earn illustration"
          />

          <Text style={styles.heroTitle}>Refer & Earn</Text>
          <Text style={styles.heroDescription}>
            Share the joy of farming with your friends and earn rewards
            together!
          </Text>
        </View>

        <View style={styles.referralCard}>
          <Text style={styles.referralLabel}>Your Referral Code</Text>

          <View style={styles.codeRow}>
            <Text style={styles.referralCode}>{REFERRAL_CODE}</Text>

            <Pressable
              accessibilityRole="button"
              onPress={copyReferralCode}
              style={styles.copyButton}
            >
              <Ionicons name="copy-outline" size={18} color={COLORS.purple} />
              <Text style={styles.copyButtonText}>Copy Code</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => setHowItWorksVisible(true)}
          style={styles.howItWorksButton}
        >
          <Text style={styles.howItWorksText}>How it works</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.purple} />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={inviteFriends}
          style={styles.inviteButton}
        >
          <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
          <Text style={styles.inviteButtonText}>Invite Friends</Text>
        </Pressable>
      </View>

      <Modal
        visible={howItWorksVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHowItWorksVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeadingRow}>
              <Text style={styles.modalTitle}>How it works</Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={() => setHowItWorksVisible(false)}
                hitSlop={UI.hitSlop}
              >
                <Ionicons name="close" size={24} color={COLORS.text.primary} />
              </Pressable>
            </View>

            {REFERRAL_STEPS.map((step, index) => (
              <View key={step.title} style={styles.stepRow}>
                <View style={styles.stepIconContainer}>
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
              onPress={() => setHowItWorksVisible(false)}
              style={styles.gotItButton}
            >
              <Text style={styles.gotItText}>Got it</Text>
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
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.purpleSurface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.purple,
    borderBottomLeftRadius: RADIUS.lg,
    borderBottomRightRadius: RADIUS.lg,
  },
  backButton: {
    width: 36,
    height: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  headerSpacer: {
    width: 36,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  hero: {
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: 230,
  },
  heroTitle: {
    marginTop: SPACING.md,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.purple,
    textAlign: 'center',
  },
  heroDescription: {
    marginTop: SPACING.sm,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    lineHeight: 23,
    textAlign: 'center',
  },
  referralCard: {
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.purpleSurface,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
  },
  referralLabel: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  codeRow: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  referralCode: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
    letterSpacing: 2,
    color: COLORS.purple,
  },
  copyButton: {
    minHeight: 42,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.purple,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.background,
  },
  copyButtonText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.purple,
  },
  howItWorksButton: {
    marginTop: SPACING.lg,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  howItWorksText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.purple,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  inviteButton: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple,
  },
  inviteButtonText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  modalCard: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    backgroundColor: COLORS.background,
  },
  modalHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  modalTitle: {
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
  stepIconContainer: {
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
  gotItButton: {
    height: 50,
    marginTop: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple,
  },
  gotItText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    color: '#FFFFFF',
  },
});
