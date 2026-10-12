import React, { useState } from 'react';
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
        onSubmit={(data) => {
          addConsultation(data);
          setScreen('success');
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
