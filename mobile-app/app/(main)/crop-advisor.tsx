import React, { useState } from 'react';
import { Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useCropAdvisor } from '@/context/CropAdvisorContext';
import { CropAdvisorFormScreen } from '@/screens/crop-advisor/CropAdvisorFormScreen';
import { CropAdvisorIntroScreen } from '@/screens/crop-advisor/CropAdvisorIntroScreen';
import { CropAdvisorSuccessScreen } from '@/screens/crop-advisor/CropAdvisorSuccessScreen';

type CropAdvisorScreen = 'intro' | 'form' | 'success';

export default function CropAdvisorRoute() {
  const params = useLocalSearchParams<{ phoneNumber?: string }>();
  const [screen, setScreen] = useState<CropAdvisorScreen>('intro');

  const { addConsultation } = useCropAdvisor();
  const phoneNumber = params.phoneNumber?.trim();

  if (screen === 'form') {
    return (
      <CropAdvisorFormScreen
        onBack={() => setScreen('intro')}
        onSubmit={async (data) => {
          try {
            await addConsultation(data);
            setScreen('success');
          } catch {
            if (typeof window !== 'undefined' && window.alert) window.alert('Your request could not be saved. Please try again.');
            else Alert.alert('Could not save', 'Your request could not be saved. Please try again.');
          }
        }}
      />
    );
  }

  if (screen === 'success') {
    return (
      <CropAdvisorSuccessScreen
        phoneNumber={phoneNumber}
        onBack={() => setScreen('form')}
        onDone={() => {
          setScreen('intro');
          router.push('/(main)/crop-advisor-history');
        }}
      />
    );
  }

  return (
    <CropAdvisorIntroScreen
      onContinue={() => setScreen('form')}
    />
  );
}
