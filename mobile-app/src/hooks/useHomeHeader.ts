import { useRouter } from 'expo-router';

import { useAddress, shortLocationLabel } from '@/context/AddressContext';
import { useCart } from '@/context/CartContext';
import { HOME_HEADER_DATA } from '@/constants/home';

export function useHomeHeader() {
  const router = useRouter();
  const { selected } = useAddress();
  const { itemCount } = useCart();

  return {
    location: selected
      ? shortLocationLabel(selected.address)
      : HOME_HEADER_DATA.location,

    walletBalance: HOME_HEADER_DATA.walletBalance,
    cartCount: itemCount,

    onLocationPress: () => router.push('/location'),
    onNotificationPress: () => router.push('/(main)/notifications'),
    onWalletPress: () => router.push('/(main)/wallet'),
    onCartPress: () => router.push('/(main)/cart'),
  };
}
