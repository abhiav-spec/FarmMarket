import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import {
  ReferralCodeCard,
  ReferralHero,
  ReferralHowItWorks,
} from '@/components/referral';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

const REFERRAL_CODE = 'JAGA100';

export function ReferNowScreen() {
  const router = useRouter();
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyReferralCode = async () => {
    try {
      await Clipboard.setStringAsync(REFERRAL_CODE);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy referral code:', error);
    }
  };

  const inviteFriends = async () => {
    try {
      await Share.share({
        message: `Join me on FarmMarket! Use my referral code ${REFERRAL_CODE}.`,
      });
    } catch (error) {
      console.error('Unable to share referral code:', error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Refer Now"
        onBackPress={() => router.back()}
        rightIconSource={require('../../../assets/icons/referral-info.png')}
        onRightPress={() => setHowItWorksVisible(true)}
        rightAccessibilityLabel="Referral help and details"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ReferralHero />

        <ReferralCodeCard
          code={REFERRAL_CODE}
          onCopy={copyReferralCode}
          copied={copied}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          onPress={inviteFriends}
          style={styles.inviteButton}
        >
          <Image
            source={require('../../../assets/icons/invite-friends-icon.png')}
            style={styles.inviteIcon}
            resizeMode="contain"
          />
          <Text style={styles.inviteButtonText}>Invite Friends</Text>
        </Pressable>
      </View>

      <ReferralHowItWorks
        visible={howItWorksVisible}
        onClose={() => setHowItWorksVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
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
  inviteIcon: {
    width: 24,
    height: 24,
  },
});
