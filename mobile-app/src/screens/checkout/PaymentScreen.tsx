import React, { useCallback, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';

import { AppText } from '@/components/common/AppText';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { Touchable } from '@/components/ui/Touchable';
import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { useCoupon } from '@/context/CouponContext';
import { addOrderFromCart } from '@/data/defaultOrder';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';
import { useGoBack } from '@/utils/navigation';
import { formatPaise } from '@/utils/price';
import { getCouponDiscountPaise } from '@/utils/coupon';

type PaymentStep = 'methods' | 'card' | 'otp';
type PaymentMethod = 'UPI' | 'Credit / Debit Card' | 'Cash on Delivery' | 'Wallet';

interface PaymentScreenProps {
  totalPaise?: number;
  onPaymentComplete?: (method: PaymentMethod) => void;
  successRoute?: '/checkout/payment-success' | '/wallet/payment-success';
  showWalletOption?: boolean;
  showCashOnDelivery?: boolean;
}

const UPI_APPS = [
  { label: 'PhonePe', source: require('../../../assets/images/payment/phonepe.png') },
  { label: 'GPay', source: require('../../../assets/images/payment/gpay.png') },
  { label: 'Paytm', source: require('../../../assets/images/payment/paytm.png') },
  { label: 'Super Money', source: require('../../../assets/images/payment/super-money.png') },
  { label: 'Navi', source: require('../../../assets/images/payment/navi.png') },
] as const;

export function PaymentScreen({ totalPaise: providedTotalPaise, onPaymentComplete, successRoute = '/checkout/payment-success', showWalletOption = true, showCashOnDelivery = true }: PaymentScreenProps) {
  const router = useRouter();
  const goBack = useGoBack('/cart');
  const { items, priceSummary, captureCheckoutItems } = useCart();
  const { balancePaise, spendMoney } = useWallet();
  const { appliedCoupon } = useCoupon();
  const [step, setStep] = useState<PaymentStep>('methods');
  const [method, setMethod] = useState<PaymentMethod>();
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [otp, setOtp] = useState('');
  const couponDiscountPaise = providedTotalPaise === undefined ? getCouponDiscountPaise(appliedCoupon, priceSummary.productTotalPaise) : 0;
  const totalPaise = Math.max(0, (providedTotalPaise ?? priceSummary.orderTotalPaise) - couponDiscountPaise);
  const total = formatPaise(totalPaise);

  useFocusEffect(useCallback(() => {
    setStep('methods');
    setMethod(undefined);
    setShowExitPrompt(false);
    setOtp('');
  }, []));

  const completeOrder = (paymentMethod: PaymentMethod) => {
    if (onPaymentComplete) {
      onPaymentComplete(paymentMethod);
      router.replace(successRoute);
      return;
    }
    if (paymentMethod === 'Wallet' && !spendMoney(totalPaise)) return;
    const firstItem = items[0];
    if (!firstItem) return;
    captureCheckoutItems();
    addOrderFromCart({ product: items.length > 1 ? `${firstItem.product.name} + ${items.length - 1} more` : firstItem.product.name, weight: firstItem.product.variant, totalPaise, paymentMethod });
    router.replace('/checkout/payment-success');
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader title={step === 'methods' ? 'Payments' : step === 'card' ? 'Add Credit / Debit Card' : 'Bank Verification'} onBack={() => setShowExitPrompt(true)} centerTitle />
      {step === 'methods' ? <PaymentMethods total={total} method={method} showWalletOption={showWalletOption} showCashOnDelivery={showCashOnDelivery} walletBalance={balancePaise} totalPaise={totalPaise} onSelectUpi={() => completeOrder('UPI')} onSelectCard={() => { setMethod('Credit / Debit Card'); setStep('card'); }} onSelectCod={() => setMethod('Cash on Delivery')} onSelectWallet={() => setMethod('Wallet')} onAddMoney={() => router.push({ pathname: '/wallet/add-money', params: { amountPaise: String(Math.max(0, totalPaise - balancePaise)), locked: 'true', returnTo: 'checkout' } })} onContinue={() => method && completeOrder(method)} /> : null}
      {step === 'card' ? <CardDetails total={total} onPay={() => setStep('otp')} /> : null}
      {step === 'otp' ? <OtpVerification otp={otp} setOtp={setOtp} onVerify={() => completeOrder('Credit / Debit Card')} /> : null}
      {showExitPrompt ? <ExitPrompt onExit={goBack} onContinue={() => setShowExitPrompt(false)} /> : null}
    </View>
  );
}

function PaymentMethods({ total, method, showWalletOption, showCashOnDelivery, walletBalance, totalPaise, onSelectUpi, onSelectCard, onSelectCod, onSelectWallet, onAddMoney, onContinue }: { total: string; method?: PaymentMethod; showWalletOption: boolean; showCashOnDelivery: boolean; walletBalance: number; totalPaise: number; onSelectUpi: () => void; onSelectCard: () => void; onSelectCod: () => void; onSelectWallet: () => void; onAddMoney: () => void; onContinue: () => void }) {
  return <View style={styles.flex}>
    <ScrollView contentContainerStyle={styles.content}>
      <TotalAmount total={total} />
      <View style={styles.paymentCard}><AppText style={styles.paymentHeading}>UPI apps</AppText><View style={styles.rule} /><View style={styles.upiApps}>{UPI_APPS.map((app) => <Touchable key={app.label} onPress={onSelectUpi} label={`Pay with ${app.label}`} style={styles.upiApp}><Image source={app.source} style={styles.upiIcon} resizeMode="contain" accessible={false} /></Touchable>)}</View></View>
      <View style={styles.paymentCard}><AppText style={styles.paymentHeading}>Cards</AppText><View style={styles.rule} /><Touchable onPress={onSelectCard} label="Add Credit or Debit Card" style={styles.rowAction}><Ionicons name="card-outline" size={22} color={COLORS.text.primary} /><AppText style={styles.rowActionText}>Add Credit / Debit Card</AppText><Ionicons name="chevron-forward" size={22} color={COLORS.text.primary} /></Touchable></View>
      {showWalletOption ? <Touchable onPress={walletBalance < totalPaise ? onAddMoney : onSelectWallet} accessibilityRole="radio" accessibilityState={{ checked: method === 'Wallet' }} label={walletBalance < totalPaise ? 'Add money to use wallet' : 'Pay using wallet'} style={[styles.cod, method === 'Wallet' && styles.selected, walletBalance < totalPaise && styles.unavailable]}><Ionicons name="wallet-outline" size={23} color={COLORS.text.primary} /><View style={styles.walletDetails}><AppText style={styles.walletTitle}>FarmMarket wallet</AppText><AppText style={styles.walletBalance}>{walletBalance < totalPaise ? `Low by ${formatPaise(totalPaise - walletBalance)}` : `Balance: ${formatPaise(walletBalance)}`}</AppText></View>{walletBalance < totalPaise ? <AppText style={styles.addMoneyText}>Add money</AppText> : <View style={styles.radio}>{method === 'Wallet' ? <View style={styles.radioDot} /> : null}</View>}</Touchable> : null}
      {showCashOnDelivery ? <Touchable onPress={onSelectCod} accessibilityRole="radio" accessibilityState={{ checked: method === 'Cash on Delivery' }} label="Cash on Delivery" style={[styles.cod, method === 'Cash on Delivery' && styles.selected]}><Ionicons name="cash-outline" size={23} color={COLORS.text.primary} /><AppText style={styles.rowActionText}>Cash on Delivery</AppText><View style={styles.radio}>{method === 'Cash on Delivery' ? <View style={styles.radioDot} /> : null}</View></Touchable> : null}
    </ScrollView>
    <Touchable onPress={onContinue} disabled={!method} title={method === 'Cash on Delivery' ? 'Place order' : `Pay ${total}`} textStyle={styles.payText} style={styles.payButton} />
  </View>;
}

function CardDetails({ total, onPay }: { total: string; onPay: () => void }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
  const complete = cardNumber.length >= 13 && cardNumber.length <= 19 && expiryValid && /^\d{3,4}$/.test(cvv) && cardholderName.trim().length >= 2;
  const validationMessage = !cardNumber ? 'Enter your card number' : cardNumber.length < 13 ? 'Card number must have at least 13 digits' : !expiryDate ? 'Enter expiry date in MM/YY format' : !expiryValid ? 'Enter a valid expiry month from 01 to 12' : !/^\d{3,4}$/.test(cvv) ? 'Enter a 3 or 4 digit CVV' : !cardholderName.trim() ? 'Enter the cardholder name' : 'Card details are valid';

  return <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><TotalAmount total={total} /><Field label="Card number" value={cardNumber} onChangeText={(value) => setCardNumber(value.replace(/\D/g, '').slice(0, 19))} keyboardType="number-pad" maxLength={19} /><View style={styles.fieldRow}><View style={styles.halfField}><Field label="Expiry date" value={expiryDate} onChangeText={(value) => { const digits = value.replace(/\D/g, '').slice(0, 4); setExpiryDate(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits); }} placeholder="MM/YY" keyboardType="number-pad" maxLength={5} /></View><View style={styles.halfField}><Field label="CVV" value={cvv} onChangeText={(value) => setCvv(value.replace(/\D/g, '').slice(0, 4))} keyboardType="number-pad" secureTextEntry maxLength={4} /></View></View><Field label="Card holder name" value={cardholderName} onChangeText={(value) => setCardholderName(value.replace(/[^a-zA-Z .'-]/g, '').slice(0, 50))} autoCapitalize="words" maxLength={50} /><AppText style={[styles.requiredHint, complete ? styles.validHint : styles.invalidHint]}>{validationMessage}</AppText><Touchable onPress={onPay} disabled={!complete} title={`Pay  ${total}`} textStyle={styles.payText} style={[styles.formPayButton, !complete && styles.disabledButton]} /></ScrollView>;
}

function OtpVerification({ otp, setOtp, onVerify }: { otp: string; setOtp: (otp: string) => void; onVerify: () => void }) {
  const inputRef = useRef<TextInput>(null);
  const complete = otp.length === 5;
  return <View style={styles.flex}><View style={styles.otpContent}><AppText style={styles.otpIntro}>Enter the OTP sent to your registered mobile number <AppText style={styles.otpPhone}>+91 XXXXX XXXXX</AppText></AppText><Touchable onPress={() => inputRef.current?.focus()} label="Enter one-time password" style={styles.otpEntry}><View style={styles.otpInputs}>{Array.from({ length: 5 }, (_, index) => <View key={index} style={styles.otpInput}><AppText style={styles.otpDigit}>{otp[index] ?? ''}</AppText></View>)}</View><TextInput ref={inputRef} value={otp} onChangeText={(value) => setOtp(value.replace(/\D/g, '').slice(0, 5))} keyboardType="number-pad" maxLength={5} style={styles.hiddenOtpInput} autoFocus /></Touchable><AppText style={styles.resend}>Resend code in <AppText style={styles.otpPhone}>00:28</AppText></AppText></View><Touchable onPress={onVerify} disabled={!complete} title="Verify & pay" textStyle={styles.payText} style={styles.payButton} /></View>;
}

function ExitPrompt({ onExit, onContinue }: { onExit: () => void; onContinue: () => void }) {
  return <View style={styles.exitPrompt}><View style={styles.exitTitleRow}><Ionicons name="alert-circle" size={25} color={COLORS.error} /><AppText style={styles.exitTitle}>Leave payment?</AppText></View><AppText style={styles.exitDescription}>Your order has not been placed. You can return to your cart and pay later.</AppText><View style={styles.exitActions}><Touchable onPress={onExit} title="Exit anyway" textStyle={styles.exitButtonText} style={styles.exitButton} /><Touchable onPress={onContinue} title="Continue payment" textStyle={styles.continuePromptText} style={styles.continuePrompt} /></View></View>;
}

function TotalAmount({ total }: { total: string }) { return <View style={styles.totalAmount}><AppText style={styles.totalLabel}>Total amount</AppText><AppText style={styles.totalValue}>{total}</AppText></View>; }
function Field({ label, value = '', ...inputProps }: React.ComponentProps<typeof TextInput> & { label: string }) { return <View style={styles.field}><AppText style={styles.fieldLabel}>{label}</AppText><TextInput {...inputProps} value={value} autoComplete="off" autoCorrect={false} placeholderTextColor={COLORS.text.muted} style={styles.fieldInput} /></View>; }

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background }, flex: { flex: 1 }, content: { padding: SPACING.lg, gap: SPACING.lg },
  totalAmount: { flexDirection: 'row', justifyContent: 'space-between', borderRadius: RADIUS.md, backgroundColor: COLORS.supportcall, padding: SPACING.md }, totalLabel: { color: COLORS.purple, fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.sm }, totalValue: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
  paymentCard: { borderRadius: RADIUS.lg, backgroundColor: COLORS.purpleSurface, padding: SPACING.md, gap: SPACING.md }, paymentHeading: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.sm }, rule: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.purpleBorder }, upiApps: { flexDirection: 'row', justifyContent: 'space-between' }, upiApp: { alignItems: 'center' }, upiIcon: { width: 56, height: 56 },
  rowAction: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm }, rowActionText: { flex: 1, color: COLORS.text.primary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm }, cod: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, borderRadius: RADIUS.md, backgroundColor: COLORS.purpleSurface, padding: SPACING.md }, selected: { borderWidth: 1, borderColor: COLORS.purple }, radio: { width: 18, height: 18, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' }, radioDot: { width: 10, height: 10, borderRadius: RADIUS.full, backgroundColor: COLORS.purple },
  payButton: { margin: SPACING.lg, marginTop: 0, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' }, payText: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.sm },
  unavailable: { opacity: 0.75 }, walletDetails: { flex: 1 }, walletTitle: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm }, walletBalance: { color: COLORS.text.secondary, fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs }, addMoneyText: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.xs }, field: { gap: SPACING.xs }, fieldLabel: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.sm }, fieldInput: { height: 20, borderWidth: 0, borderBottomWidth: 1, borderBottomColor: COLORS.text.secondary, padding: 0, backgroundColor: COLORS.surface, boxShadow: '0 0 0 1000px #FFFFFF inset', color: COLORS.text.primary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, lineHeight: 20, textAlignVertical: 'bottom', outlineWidth: 0, outlineStyle: 'solid', outlineColor: COLORS.surface }, fieldRow: { flexDirection: 'row', gap: SPACING.lg }, halfField: { flex: 1 }, requiredHint: { fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs, marginTop: -SPACING.sm }, invalidHint: { color: COLORS.error }, validHint: { color: COLORS.success }, formPayButton: { marginTop: SPACING.md, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' }, disabledButton: { backgroundColor: COLORS.disabled },
  otpContent: { padding: SPACING.lg, gap: SPACING.xl }, otpIntro: { color: COLORS.text.secondary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, lineHeight: 24 }, otpPhone: { color: COLORS.purple, fontFamily: FONT_FAMILY.bold }, otpEntry: { position: 'relative' }, otpInputs: { flexDirection: 'row', justifyContent: 'space-between' }, otpInput: { width: 48, height: 58, borderWidth: 1, borderColor: COLORS.purpleBorder, borderRadius: RADIUS.sm, alignItems: 'center', justifyContent: 'center' }, otpDigit: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.lg }, hiddenOtpInput: { position: 'absolute', width: 1, height: 1, opacity: 0 }, resend: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm },
  exitPrompt: { margin: SPACING.lg, marginTop: 0, borderRadius: RADIUS.lg, backgroundColor: COLORS.purpleSurface, padding: SPACING.md, gap: SPACING.md }, exitTitleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm }, exitTitle: { color: COLORS.text.primary, fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.md }, exitDescription: { color: COLORS.text.secondary, fontFamily: FONT_FAMILY.regular, fontSize: FONT_SIZE.xs }, exitActions: { flexDirection: 'row', gap: SPACING.sm }, exitButton: { flex: 1, height: 42, borderWidth: 1, borderColor: COLORS.purple, borderRadius: RADIUS.pill, alignItems: 'center', justifyContent: 'center' }, exitButtonText: { color: COLORS.purple, fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.xs }, continuePrompt: { flex: 1, height: 42, borderRadius: RADIUS.pill, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' }, continuePromptText: { color: COLORS.text.inverse, fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.xs },
});
