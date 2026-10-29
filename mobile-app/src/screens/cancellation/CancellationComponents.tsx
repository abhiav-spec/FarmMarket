import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import { CANCELLATION_REASONS } from '../../constants/orders';
import { ProductBag } from '../../components/orders/ProductBag';
import { KeyValue } from '../../components/orders/InfoCard';
import {
  MOCK_CART_PRODUCTS,
  MOCK_RECOMMENDATION_PRODUCTS,
} from '../../data/mockProducts';
import type { FarmOrder } from '../../types/order';
import { colors, spacing } from '../../../themes';
import { styles } from './cancellationStyles';

const packedStatusDot = require('../../components/images/Rectangle 66.png');

type CancellationProductCardProps = {
  order: FarmOrder;
};

export function CancellationProductCard({
  order,
}: CancellationProductCardProps) {
  const product = [...MOCK_CART_PRODUCTS, ...MOCK_RECOMMENDATION_PRODUCTS].find(
    (item) => item.name === order.product,
  );

  return (
    <View style={styles.product}>
      <ProductBag small />
      <View style={styles.copy}>
        <Text style={styles.productName}>{order.product}</Text>
        <View style={styles.statusRow}>
          <Image
            source={packedStatusDot}
            style={styles.greenDot}
            resizeMode="contain"
          />
          <Text style={styles.productStatus}>{order.status}</Text>
        </View>
      </View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/cart',
            params: { productId: product?.id ?? 'prod-001', step: 'product' },
          })
        }
        hitSlop={spacing.sm}
        accessibilityLabel="Open product"
      >
        <Ionicons
          name="chevron-forward-outline"
          size={22}
          color={colors.black}
        />
      </Pressable>
    </View>
  );
}

type CancellationReasonListProps = {
  selectedReason: string | null;
  onSelect: (reason: string) => void;
};

export function CancellationReasonList({
  selectedReason,
  onSelect,
}: CancellationReasonListProps) {
  return (
    <>
      {CANCELLATION_REASONS.map((reason) => (
        <Pressable
          key={reason}
          style={[
            styles.reason,
            selectedReason === reason && styles.selectedReason,
          ]}
          onPress={() => onSelect(reason)}
        >
          <Text
            style={[
              styles.reasonText,
              selectedReason === reason && styles.selectedReasonText,
            ]}
          >
            {reason}
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={selectedReason === reason ? colors.purple : colors.black}
          />
        </Pressable>
      ))}
    </>
  );
}

type CancellationDetailsProps = {
  order: FarmOrder;
  reason: string;
  success?: boolean;
};

export function CancellationDetails({
  order,
  reason,
  success = false,
}: CancellationDetailsProps) {
  const labelStyle = success
    ? styles.successDetailLabel
    : styles.confirmDetailLabel;
  const valueStyle = success
    ? styles.successDetailValue
    : styles.confirmDetailValue;
  const amountStyle = success ? styles.successAmount : styles.confirmAmount;

  return (
    <View style={styles.details}>
      <KeyValue
        label="Order ID"
        value={order.id}
        labelStyle={labelStyle}
        valueStyle={valueStyle}
      />
      <KeyValue
        label="Product"
        value={`${order.product} (${order.weight})`}
        labelStyle={labelStyle}
        valueStyle={valueStyle}
      />
      <KeyValue
        label="Reason"
        value={reason}
        labelStyle={labelStyle}
        valueStyle={valueStyle}
      />
      <KeyValue
        label="Refund Amount"
        value={order.amount}
        strong={success}
        labelStyle={labelStyle}
        valueStyle={amountStyle}
      />
      <KeyValue
        label="Request Date"
        value={order.requestDate}
        labelStyle={labelStyle}
        valueStyle={valueStyle}
      />
    </View>
  );
}
