import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { PriceTag } from '@/components/ui/PriceTag';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, RADIUS, SIZES, UI } from '@/theme';
import { type CartItem } from '@/types';
import { toImageSource } from '@/utils/image';

interface CartItemCardProps {
  item: CartItem;
  minQuantity?: number;
  maxQuantity?: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

export function CartItemCard({ item: { product, quantity }, minQuantity, maxQuantity, onIncrement, onDecrement, onDelete }: CartItemCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={toImageSource(product.imageUrl)} style={styles.image} resizeMode="contain" accessibilityLabel={product.name} />
      </View>
      <View style={styles.details}>
        <View style={styles.row}>
          <AppText style={styles.productName} numberOfLines={1}>{product.name}</AppText>
          <Touchable onPress={onDelete} label={CART_COPY.removeProduct(product.name)}>
            <Image source={IMAGES.trashIcon} style={styles.trashIcon} resizeMode="contain" accessible={false} />
          </Touchable>
        </View>
        <PriceTag product={product} variant="cart" style={styles.spaced} />
        <View style={[styles.row, styles.spaced]}>
          <AppText style={styles.variantText}>{product.variant}</AppText>
          <QuantityStepper quantity={quantity} min={minQuantity} max={maxQuantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SIZES.cartItemCardHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.purpleSurface,
    padding: CART_LAYOUT.itemPadding,
  },
  imageContainer: {
    width: SIZES.cartItemImageContainerSize,
    height: SIZES.cartItemImageContainerSize,
    borderRadius: RADIUS.xl,
    borderWidth: UI.borderWidth,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: SIZES.cartItemImageWidth, height: SIZES.cartItemImageHeight },
  details: { flex: 1, marginLeft: CART_LAYOUT.itemDetailsGap },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  spaced: { marginTop: CART_LAYOUT.cardPadding },
  trashIcon: { width: SIZES.cartTrashIconSize, height: SIZES.cartTrashIconSize },
  productName: { ...CART_TYPOGRAPHY.itemName, flex: 1, color: COLORS.text.black, marginRight: CART_LAYOUT.cardPadding },
  variantText: { ...CART_TYPOGRAPHY.body, color: COLORS.text.dark },
});
