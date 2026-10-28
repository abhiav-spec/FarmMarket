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
}

export interface ProductDeliveryInfo {
  name: string;
  address: string;
  delivery: string;
}
