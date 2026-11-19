import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY, PRODUCT_DETAIL_COPY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY, RADIUS, SIZES, UI } from '@/theme';
import { type ProductDeliveryInfo } from '@/types';

export function ProductDeliveryAddress({ address, onChange }: { address: ProductDeliveryInfo; onChange?: () => void }) {
  return (
    <View style={styles.section}>
      <AppText style={styles.title}>{PRODUCT_DETAIL_COPY.address}</AppText>
      <View style={styles.row}>
        <Image source={IMAGES.productMapPin} style={styles.icon} resizeMode="contain" accessible={false} />
        <AppText style={styles.name}>{address.name}</AppText>
        <AppText style={styles.address} numberOfLines={1}>{address.address}</AppText>
        <Touchable onPress={onChange} title={CART_COPY.changeAddress} textStyle={styles.change} />
      </View>
      <View style={styles.deliveryBanner}>
        <AppText style={styles.deliveryText}>{address.delivery}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: PRODUCT_LAYOUT.addressTopGap },
  title: { ...PRODUCT_TYPOGRAPHY.section, color: COLORS.text.black },
  row: { height: SIZES.productAddressHeight, borderWidth: UI.borderWidth, borderColor: COLORS.productDetailBorder, borderRadius: RADIUS.xs, marginTop: PRODUCT_LAYOUT.addressTitleGap, paddingHorizontal: PRODUCT_LAYOUT.addressPaddingHorizontal, flexDirection: 'row', alignItems: 'center', gap: PRODUCT_LAYOUT.addressContentGap },
  icon: { width: SIZES.productAddressIconSize, height: SIZES.productAddressIconSize },
  name: { ...PRODUCT_TYPOGRAPHY.addressName, color: COLORS.text.black },
  address: { ...PRODUCT_TYPOGRAPHY.addressText, color: COLORS.text.dark, flex: 1 },
  change: { ...PRODUCT_TYPOGRAPHY.addressAction, color: COLORS.text.black, textDecorationLine: 'underline' },
  deliveryBanner: { height: SIZES.productDeliveryHeight, borderRadius: RADIUS.xs, marginTop: PRODUCT_LAYOUT.deliveryTopGap, backgroundColor: COLORS.paymentOffer, justifyContent: 'center', alignItems: 'center' },
  deliveryText: { ...PRODUCT_TYPOGRAPHY.delivery, color: COLORS.stepperGreen },
});
