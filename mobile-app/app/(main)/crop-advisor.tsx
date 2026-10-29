import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

import { TAB_BAR_STYLE } from './_layout';
import { useCropAdvisor } from '@/context/CropAdvisorContext';
import { CropAdvisorFormScreen } from '@/screens/crop-advisor/CropAdvisorFormScreen';
import { CropAdvisorIntroScreen } from '@/screens/crop-advisor/CropAdvisorIntroScreen';
import { CropAdvisorSuccessScreen } from '@/screens/crop-advisor/CropAdvisorSuccessScreen';

type CropAdvisorScreen = 'intro' | 'form' | 'success';

export default function CropAdvisorRoute() {
  const params = useLocalSearchParams<{ phoneNumber?: string }>();
  const [screen, setScreen] = useState<CropAdvisorScreen>('intro');

  const { addConsultation } = useCropAdvisor();
  const navigation = useNavigation();
  const phoneNumber = params.phoneNumber?.trim();

  // Show the bottom tab bar only on the intro screen (as in Figma).
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: screen === 'intro' ? TAB_BAR_STYLE : { display: 'none' },
    });
  }, [navigation, screen]);

  if (screen === 'form') {
    return (
      <CropAdvisorFormScreen
        onBack={() => setScreen('intro')}
        onSubmit={async (data) => {
          try {
            await addConsultation(data);
            setScreen('success');
          } catch {
            Alert.alert(
              'Could not save',
              'Your request could not be saved. Please try again.',
            );
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

  return <CropAdvisorIntroScreen onContinue={() => setScreen('form')} />;
}
