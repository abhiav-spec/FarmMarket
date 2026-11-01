import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { CART_CONFIG, CART_COPY } from '@/constants/config';
import { CART_TYPOGRAPHY, COLORS, RADIUS, SIZES, UI } from '@/theme';
import { Touchable } from './Touchable';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  size?: 'default' | 'card';
}

export function QuantityStepper({ quantity, onIncrement, onDecrement, min = CART_CONFIG.MIN_QUANTITY_PER_ITEM, max = CART_CONFIG.MAX_QUANTITY_PER_ITEM, size = 'default' }: QuantityStepperProps) {
  const sizeStyle = size === 'card'
    ? { container: styles.cardSizeContainer, cell: styles.cardSizeCell }
    : { container: undefined, cell: undefined };
  const step = (symbol: string, label: string, onPress: () => void, enabled: boolean, style: StyleProp<ViewStyle>) => (
    <Touchable onPress={onPress} disabled={!enabled} title={symbol} label={label} textStyle={[styles.symbolText, size === 'card' && styles.cardSymbolText]} hitSlop={0} style={[styles.cell, sizeStyle.cell, styles.button, style]} />
  );
  return (
    <View style={[styles.container, sizeStyle.container]}>
      {step(CART_COPY.decrement, CART_COPY.decreaseQuantity, onDecrement, quantity > min, styles.buttonLeft)}
      <View style={[styles.cell, sizeStyle.cell, styles.countContainer]}>
        <AppText style={styles.countText}>{quantity}</AppText>
      </View>
      {step(CART_COPY.increment, CART_COPY.increaseQuantity, onIncrement, quantity < max, styles.buttonRight)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.stepperWidth,
    height: SIZES.stepperHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: UI.borderWidth,
    borderColor: COLORS.stepperGreen,
    borderRadius: RADIUS.xs,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
  },
  cardSizeContainer: {
    width: 96,
    height: 28,
  },
  cardSizeCell: { height: 28 },
  cell: { flex: 1, height: SIZES.stepperHeight, alignItems: 'center', justifyContent: 'center' },
  button: { backgroundColor: COLORS.surface },
  buttonLeft: { borderRightWidth: UI.borderWidth, borderRightColor: COLORS.stepperGreen },
  buttonRight: { borderLeftWidth: UI.borderWidth, borderLeftColor: COLORS.stepperGreen },
  countContainer: { backgroundColor: COLORS.stepperGreen },
  symbolText: { ...CART_TYPOGRAPHY.quantitySymbol, color: COLORS.text.dark },
  cardSymbolText: { fontSize: 22, lineHeight: 24 },
  countText: { ...CART_TYPOGRAPHY.quantity, color: COLORS.text.inverse },
});
