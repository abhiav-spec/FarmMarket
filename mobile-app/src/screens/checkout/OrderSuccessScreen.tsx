import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { PAYMENT_SUCCESS_COPY } from '@/constants/config';
import { IMAGES } from '@/constants/images';
import { useCart } from '@/context/CartContext';
import { MOCK_ADDRESS } from '@/data/mockAddress';
import { COLORS, PAYMENT_SUCCESS_LAYOUT as LAYOUT, PAYMENT_SUCCESS_TYPOGRAPHY as TYPOGRAPHY, useResponsive } from '@/theme';
import { type CartItem, type DeliveryAddress } from '@/types';
import { toImageSource } from '@/utils/image';
import { formatPaise } from '@/utils/price';

export function OrderSuccessScreen() {
  const router = useRouter();
  const { items } = useCart();
  const { horizontalPadding } = useResponsive();
  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]} showsVerticalScrollIndicator={false}>
      <View style={styles.check}>
        <Image source={IMAGES.paymentSuccessCheck} style={styles.checkImage} resizeMode="contain" accessible={false} />
      </View>
      <AppText accessibilityRole="header" style={styles.title}>{PAYMENT_SUCCESS_COPY.title}</AppText>
      <AppText style={styles.description}>{PAYMENT_SUCCESS_COPY.description}</AppText>
      <View style={styles.orders}>
        {items.map((item) => <OrderedItem key={item.product.id} item={item} address={MOCK_ADDRESS} />)}
      </View>
      <View style={styles.spacer} />
      <View style={styles.actions}>
        <Touchable title={PAYMENT_SUCCESS_COPY.viewOrders} textStyle={styles.buttonText} hitSlop={0} style={styles.button} />
        <Touchable onPress={() => router.replace('/home')} title={PAYMENT_SUCCESS_COPY.home} textStyle={styles.buttonText} hitSlop={0} style={styles.button} />
      </View>
    </ScrollView>
  );
}

function OrderedItem({ item: { product, quantity }, address }: { item: CartItem; address: DeliveryAddress }) {
  return (
    <View style={styles.order}>
      <Image source={toImageSource(product.imageUrl)} style={styles.productImage} resizeMode="contain" accessibilityLabel={product.name} />
      <View style={styles.details}>
        <AppText style={styles.productName}>{quantity > 1 ? `${product.name} × ${quantity}` : product.name}</AppText>
        <AppText style={styles.price}>{formatPaise(product.pricePaise, true)}<AppText style={styles.unit}>{PAYMENT_SUCCESS_COPY.unit}</AppText></AppText>
        <View style={styles.location}>
          <AppIcon name="location" size="md" color={COLORS.text.black} />
          <AppText style={styles.locationText} numberOfLines={1}>{`${address.district}, ${address.state}`}</AppText>
        </View>
      </View>
      <Touchable label={PAYMENT_SUCCESS_COPY.orderOptions} style={styles.menu}>
        <Image source={IMAGES.reviewMenu} style={styles.menuImage} resizeMode="contain" accessible={false} />
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.surface },
  content: { flexGrow: 1, paddingTop: LAYOUT.topPadding, paddingBottom: LAYOUT.bottomPadding, alignItems: 'center' },
  check: { width: LAYOUT.checkSize, height: LAYOUT.checkSize },
  checkImage: { position: 'absolute', width: LAYOUT.checkImageSize, height: LAYOUT.checkImageSize, top: LAYOUT.checkImageTopOffset, left: LAYOUT.checkImageOffset },
  title: { ...TYPOGRAPHY.title, color: COLORS.text.black, textAlign: 'center', marginTop: LAYOUT.titleGap },
  description: { ...TYPOGRAPHY.body, color: COLORS.text.black, textAlign: 'center', maxWidth: LAYOUT.descriptionWidth, marginTop: LAYOUT.descriptionGap },
  orders: { alignSelf: 'stretch', marginTop: LAYOUT.orderGap, gap: LAYOUT.buttonGap },
  order: { flexDirection: 'row', alignItems: 'flex-start' },
  productImage: { width: LAYOUT.productImageWidth, height: LAYOUT.productImageHeight, borderRadius: LAYOUT.productImageRadius },
  details: { flex: 1, marginLeft: LAYOUT.productGap, paddingTop: LAYOUT.productDetailsTop },
  productName: { ...TYPOGRAPHY.body, color: COLORS.text.black },
  price: { ...TYPOGRAPHY.price, color: COLORS.text.black, marginTop: LAYOUT.priceGap },
  unit: { ...TYPOGRAPHY.unit, color: COLORS.confirmedUnit },
  location: { flexDirection: 'row', alignItems: 'center', marginLeft: -LAYOUT.locationTextGap, marginTop: LAYOUT.locationGap },
  locationText: { ...TYPOGRAPHY.location, flexShrink: 1, color: COLORS.text.black, marginLeft: LAYOUT.locationTextGap },
  menu: { marginTop: LAYOUT.productDetailsTop },
  menuImage: { width: LAYOUT.menuSize, height: LAYOUT.menuSize },
  spacer: { flex: 1, minHeight: LAYOUT.buttonGap },
  actions: { alignSelf: 'stretch', gap: LAYOUT.buttonGap },
  button: { height: LAYOUT.buttonHeight, borderRadius: LAYOUT.buttonRadius, backgroundColor: COLORS.purple, paddingVertical: LAYOUT.buttonPaddingVertical, paddingHorizontal: LAYOUT.buttonPaddingHorizontal, alignItems: 'center', justifyContent: 'center' },
  buttonText: { ...TYPOGRAPHY.button, color: COLORS.text.inverse },
});
