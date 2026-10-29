import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { CART_COPY } from '@/constants/config';
import { CART_LAYOUT, CART_TYPOGRAPHY, COLORS, SIZES } from '@/theme';
import { type DeliveryAddress } from '@/types';
import { formatAddress } from '@/utils/address';

interface AddressBarProps {
  address: DeliveryAddress;
  onChangePress?: () => void;
}

export function AddressBar({ address, onChangePress }: AddressBarProps) {
  return (
    <View style={styles.container}>
      <AppIcon name="location" size="xs" color={COLORS.text.secondary} />
      <View style={styles.addressContainer}>
        <AppText style={styles.addressLine} numberOfLines={2}>{formatAddress(address)}</AppText>
      </View>
      <Touchable onPress={onChangePress} title={CART_COPY.changeAddress} textStyle={styles.changeText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: CART_LAYOUT.addressHeight,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: CART_LAYOUT.sectionPadding,
    paddingTop: CART_LAYOUT.addressPaddingTop,
    paddingBottom: CART_LAYOUT.cardPadding,
    backgroundColor: COLORS.surface,
  },
  addressContainer: {
    flex: 1,
    minWidth: 0,
    maxWidth: SIZES.addressContainerWidth,
    height: SIZES.addressContainerHeight,
    marginLeft: CART_LAYOUT.addressIconGap,
    marginRight: CART_LAYOUT.addressActionGap,
  },
  addressLine: { ...CART_TYPOGRAPHY.address, color: COLORS.text.dark },
  changeText: { ...CART_TYPOGRAPHY.addressAction, color: COLORS.text.primary, textDecorationLine: 'underline' },
});
