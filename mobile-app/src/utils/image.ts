import { type ImageSourcePropType } from 'react-native';

import { type Product } from '@/types';

export function toImageSource(imageUrl: Product['imageUrl']): ImageSourcePropType {
  return typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;
}
