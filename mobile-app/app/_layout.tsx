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
import { UserProfileProvider } from '@/context/UserProfileContext';
import { AddressProvider } from '../src/context/AddressContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CropAdvisorProvider } from '@/context/CropAdvisorContext';
import { CartProvider } from '@/context/CartContext';
import { ReviewProvider } from '@/context/ReviewContext';
import { WalletProvider } from '@/context/WalletContext';
import { CouponProvider } from '@/context/CouponContext';

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
    <UserProfileProvider>
      <ReviewProvider>
        <CartProvider>
          <CropAdvisorProvider>
            <WalletProvider>
              <CouponProvider>
                <WishlistProvider>
                  <AddressProvider>
                    <Stack screenOptions={{ headerShown: false }} />
                  </AddressProvider>
                </WishlistProvider>
              </CouponProvider>
            </WalletProvider>
          </CropAdvisorProvider>
        </CartProvider>
      </ReviewProvider>
    </UserProfileProvider>
  );
}
