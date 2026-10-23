import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';

import { styles } from './styles';

export function ReviewSuccessScreen() {
  const router = useRouter();
  const returnHome = () => router.replace('/(main)/home');

  return (
    <SafeAreaView style={styles.successScreen}>
      <FeedbackHeader title="Review" onBackPress={returnHome} />

      <View style={styles.successContent}>
        <Image
          accessibilityLabel="Review submitted successfully"
          source={require('../../../assets/images/feedback-success.png')}
          style={styles.successIllustration}
          resizeMode="contain"
        />
        <Text style={styles.successTitle}>Thank you!</Text>
        <Text style={styles.successDescription}>
          Your review has been submitted successfully.
        </Text>
      </View>

      <View style={styles.successFooter}>
        <Pressable
          accessibilityRole="button"
          onPress={returnHome}
          style={styles.returnHomeButton}
        >
          <Text style={styles.returnHomeButtonText}>Return to home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
