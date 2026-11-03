import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useOrder } from '../../hooks/useOrder';
import { Header } from '../../components/orders/Header';
import { colors } from '../../../themes';
import {
  CancellationDetails,
  CancellationProductCard,
  CancellationReasonList,
} from './CancellationComponents';
import { styles } from './cancellationStyles';

export function CancelOrderScreen() {
  const order = useOrder();
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [noteFocused, setNoteFocused] = useState(false);

  return (
    <View style={styles.page}>
      <Header
        title="Cancel Order"
        backRoute={`/(main)/order-detail?orderId=${encodeURIComponent(order.id)}`}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.orderMeta}>
          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Order ID </Text>
            {order.id}
          </Text>
          <Text style={styles.meta}>
            <Text style={styles.metaLabel}>Sold to </Text>
            {order.deliveryAddress.name}
          </Text>
        </View>
        <CancellationProductCard order={order} />
        <Text style={styles.heading}>Why do you want to cancel?</Text>
        <CancellationReasonList
          selectedReason={selectedReason}
          onSelect={setSelectedReason}
        />
        <Text style={styles.noteLabel}>Additional Note (Optional)</Text>
        <View style={[styles.note, noteFocused && styles.noteFocused]}>
          <TextInput
            placeholder="Write a reason (optional)"
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.purple}
            selectionHandleColor={colors.purple}
            cursorColor={colors.purple}
            underlineColorAndroid="transparent"
            multiline
            maxLength={5000}
            value={note}
            onChangeText={setNote}
            onFocus={() => setNoteFocused(true)}
            onBlur={() => setNoteFocused(false)}
            style={[
              styles.noteInput,
              {
                outlineWidth: 0,
                outlineColor: 'transparent',
                backgroundColor: 'transparent',
              },
            ]}
          />
          <Text style={styles.counter}>{note.length}/5000</Text>
        </View>
      </ScrollView>
      <Pressable
        style={[
          styles.primaryButton,
          styles.cancelPrimaryButton,
          !selectedReason && styles.disabledButton,
        ]}
        disabled={!selectedReason}
        onPress={() => {
          if (selectedReason) {
            router.push({
              pathname: '/(main)/confirm-cancellation',
              params: { reason: selectedReason, orderId: order.id },
            });
          }
        }}
      >
        <Text style={styles.primaryText}>Confirm Cancellation</Text>
      </Pressable>
    </View>
  );
}

export function ConfirmCancellationScreen() {
  const order = useOrder();
  const { reason = order.cancellationReason } = useLocalSearchParams<{
    reason?: string;
  }>();

  return (
    <View style={styles.page}>
      <Header
        title="Confirm Cancellation"
        backRoute={`/(main)/cancel-order?orderId=${encodeURIComponent(order.id)}`}
      />
      <View style={[styles.warning, styles.confirmWarning]}>
        <Image
          source={require('../../components/images/warning 1.png')}
          style={styles.warningIcon}
        />
        <Text style={styles.warningText}>
          Please review your details before{'\n'}confirming
        </Text>
      </View>
      <CancellationDetails order={order} reason={reason} />
      <View style={styles.confirmActions}>
        <Text style={styles.policy}>
          Your order will be canceled and refund will be initiated{'\n'}as per
          our policy.
        </Text>
        <Pressable
          style={[styles.primaryButton, styles.confirmButton]}
          onPress={() =>
            router.replace({
              pathname: '/(main)/cancellation-success',
              params: { reason, orderId: order.id },
            })
          }
        >
          <Text style={styles.confirmPrimaryText}>Yes, Cancel Order</Text>
        </Pressable>
        <Pressable
          style={[styles.secondaryButton, styles.confirmButton]}
          onPress={() =>
            router.replace({
              pathname: '/(main)/cancel-order',
              params: { orderId: order.id },
            })
          }
        >
          <Text style={styles.confirmSecondaryText}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function CancellationSuccessScreen() {
  const order = useOrder();
  const { reason = order.cancellationReason } = useLocalSearchParams<{
    reason?: string;
  }>();

  return (
    <View style={styles.page}>
      <Header title="Cancellation Confirmed" backRoute="/(main)/home" />
      <View style={styles.successContent}>
        <Image
          source={require('../../components/images/check-circle-fill 1.png')}
          style={styles.successIcon}
        />
        <Text style={styles.successMessage}>
          Your order has been{'\n'}cancelled successfully
        </Text>
        <CancellationDetails order={order} reason={reason} success />
      </View>
      <Pressable
        style={[styles.secondaryButton, styles.successOrdersButton]}
        onPress={() => router.replace('/(main)/orders')}
      >
        <Text style={styles.secondaryText}>View My Orders</Text>
      </Pressable>
    </View>
  );
}
