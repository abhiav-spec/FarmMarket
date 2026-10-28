import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import { COLORS } from '@/theme';

export function TermsAndConditionsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.screen}>
      <FeedbackHeader
        title="Terms & Conditions"
        onBackPress={() => router.back()}
      />

      <View style={styles.content} />
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
    backgroundColor: COLORS.background,
  },
});
