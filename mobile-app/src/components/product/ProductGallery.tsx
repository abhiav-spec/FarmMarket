import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, View, type ImageSourcePropType } from 'react-native';

import { Touchable } from '@/components/ui/Touchable';
import { PRODUCT_DETAIL_CONFIG, PRODUCT_DETAIL_COPY } from '@/constants/config';
import { ICONS } from '@/constants/icons';
import { COLORS, PRODUCT_LAYOUT, RADIUS, SIZES } from '@/theme';

interface ProductGalleryProps {
  images: readonly ImageSourcePropType[];
  name: string;
  saved: boolean;
  onSave: () => void;
  onShare?: () => void;
}

export function ProductGallery({ images, name, saved, onSave, onShare }: ProductGalleryProps) {
  const [imageIndex, setImageIndex] = useState<number>(PRODUCT_DETAIL_CONFIG.initialImageIndex);
  return (
    <>
      <View style={styles.gallery}>
        <Image source={images[imageIndex]} style={styles.productImage} resizeMode="contain" accessibilityLabel={name} />
        <View style={styles.actions}>
          <Touchable onPress={onSave} label={PRODUCT_DETAIL_COPY.wishlist} accessibilityState={{ selected: saved }}>
            <Ionicons name={saved ? ICONS.heartFilled : ICONS.heart} size={SIZES.productActionIconSize} color={saved ? COLORS.purple : COLORS.text.black} />
          </Touchable>
          <Touchable onPress={onShare} label={PRODUCT_DETAIL_COPY.share}>
            <Ionicons name={ICONS.share} size={SIZES.productActionIconSize} color={COLORS.text.black} />
          </Touchable>
        </View>
      </View>
      <View style={styles.pager}>
        {images.map((_, index) => (
          <Touchable key={index} onPress={() => setImageIndex(index)} label={PRODUCT_DETAIL_COPY.image(index)} accessibilityState={{ selected: index === imageIndex }} style={[styles.dot, index === imageIndex && styles.activeDot]} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gallery: { height: SIZES.productGalleryHeight, alignItems: 'center', justifyContent: 'center' },
  productImage: { width: '100%', height: SIZES.productImageHeight },
  actions: { position: 'absolute', right: PRODUCT_LAYOUT.galleryActionsRight, bottom: PRODUCT_LAYOUT.galleryActionsBottom, flexDirection: 'row', gap: PRODUCT_LAYOUT.galleryActionsGap },
  pager: { height: SIZES.productPagerHeight, marginBottom: PRODUCT_LAYOUT.pagerBottomGap, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: PRODUCT_LAYOUT.pagerGap },
  dot: { width: SIZES.productPagerDotSize, height: SIZES.productPagerDotSize, borderRadius: RADIUS.full, backgroundColor: COLORS.originalPrice },
  activeDot: { backgroundColor: COLORS.text.black },
});
