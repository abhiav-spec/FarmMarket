import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';

import { styles } from './styles';

export function ReviewSuccessScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const returnToProduct = () =>
    productId
      ? router.replace({
          pathname: '/cart',
          params: { productId, step: 'product' },
        })
      : router.replace('/(main)/home');

  return (
    <SafeAreaView style={styles.successScreen}>
      <FeedbackHeader title="Review" onBackPress={returnToProduct} />

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
          onPress={returnToProduct}
          style={styles.returnHomeButton}
        >
          <Text style={styles.returnHomeButtonText}>
            {productId ? 'Back to product' : 'Return to home'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
