import {
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { CropAdvisorProvider } from '@/context/CropAdvisorContext';
import { CartProvider } from '@/context/CartContext';
import { MOCK_CART_CONFIG, MOCK_CART_ITEMS } from '@/data/mockProducts';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CartProvider initialItems={MOCK_CART_ITEMS} config={MOCK_CART_CONFIG}>
      <CropAdvisorProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CropAdvisorProvider>
    </CartProvider>
  );
}
