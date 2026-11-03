import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { AppText } from '@/components/common/AppText';

import { writeToUsStyles as styles } from './writeToUsStyles';

export function FeedbackSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successContent}>
        <Image
          accessibilityLabel="Feedback sent successfully"
          resizeMode="contain"
          source={require('../../../assets/images/feedback-success.png')}
          style={styles.successIllustration}
        />
        <AppText style={styles.successTitle}>Thank you!</AppText>
        <AppText style={styles.successDescription}>
          We appreciate you taking the time to share your feedback with us. Your
          thoughts help us improve your FarmMarket experience.
        </AppText>
      </View>
      <View style={styles.successFooter}>
        <AppButton
          fullWidth
          onPress={() => router.replace('/(main)/home')}
          size="large"
          title="Return to home"
        />
      </View>
    </SafeAreaView>
  );
}
