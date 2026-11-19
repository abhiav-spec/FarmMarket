import type { ImageSourcePropType } from 'react-native';

export interface ProductItem {
  id: string;
  name: string;
  specs: string;
  pricePaise: number;
  originalPricePaise: number;
  discountPercentage: number;
  image: ImageSourcePropType;
  category: string;
}

export interface SectionBanner {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}
export interface Product {
  id: string;
  name: string;
  imageUrl: string | number;
  variant: string;
  pricePaise: number;
  mrpPaise: number;
  discountPercent?: number;
  /** Average rating out of 5. */
  rating?: number;
  category: string;
}

export interface ProductPack {
  id: string;
  label: string;
}

export interface ProductReview {
  id: string;
  author: string;
  stars: number;
  date: string;
  text: string;
  photoUris?: readonly string[];
}

export interface ProductDeliveryInfo {
  name: string;
  address: string;
  delivery: string;
}
