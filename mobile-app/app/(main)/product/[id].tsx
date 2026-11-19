import { useLocalSearchParams } from 'expo-router';

import { ProductDetailsScreen } from '@/screens/product/ProductDetailsScreen';

export default function ProductDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProductDetailsScreen key={id} />;
}
