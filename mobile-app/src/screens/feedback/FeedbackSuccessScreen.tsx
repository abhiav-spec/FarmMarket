import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppButton } from '@/components/ui/AppButton';
import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { COLORS } from '@/theme';

import { styles } from './styles';

export function FeedbackSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.successScreen}>
      <FeedbackHeader
        title="Write to us"
        onBackPress={() => router.replace('/(main)/home')}
      />

      <View style={styles.successContent}>
        <Image
          source={require('../../../assets/images/feedback-success.png')}
          style={styles.successIllustration}
          resizeMode="contain"
          accessibilityLabel="Feedback sent successfully illustration"
        />

        <Text style={styles.successTitle}>Thank you!</Text>

        <Text style={styles.successDescription}>
          Your message has been sent successfully.
        </Text>
      </View>

      <View style={styles.successFooter}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/(main)/home')}
          style={styles.returnHomeButton}
        >
          <Text style={styles.returnHomeButtonText}>Return to home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
