import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { COLORS } from '@/theme';

import { styles } from './styles';

export function FeedbackSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.successScreen}>
      <View style={styles.successContent}>
        <Image
          source={require('../../../assets/images/feedback-success.png')}
          style={styles.successIllustration}
          resizeMode="contain"
          accessibilityLabel="Feedback sent successfully illustration"
        />

        <Text style={styles.successTitle}>Thank you!</Text>

        <Text style={styles.successDescription}>
          We appreciate you taking the time to share your feedback with us. Your
          thoughts help us improve your FarmMarket experience.
        </Text>
      </View>

      <View style={styles.successFooter}>
        <AppButton
          title="Return to home"
          onPress={() => router.replace('/(main)/home')}
          fullWidth
          size="large"
        />
      </View>
    </SafeAreaView>
  );
}
