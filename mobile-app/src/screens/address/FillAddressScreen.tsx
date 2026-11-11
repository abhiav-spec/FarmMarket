import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { AppText } from '@/components';
import { useAddress } from '@/context/AddressContext';
import { CropAdvisorHeader } from '@/screens/crop-advisor/CropAdvisorHeader';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

function UnderlineField({ label, value, onChangeText, placeholder, multiline }: FieldProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.field}>
      <AppText variant="bodyMedium" style={styles.label}>
        {label}
      </AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.text.muted}
        multiline={multiline}
        style={[styles.input, (focused || value.length > 0) && styles.inputActive]}
      />
    </View>
  );
}

export function FillAddressScreen() {
  const { draftAddress, setDraftAddress, addAddress } = useAddress();
  const [name, setName] = useState('');
  const [address, setAddress] = useState(draftAddress);
  const [landmark, setLandmark] = useState('');

  const canSave = name.trim().length > 0 && address.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addAddress({ name: name.trim(), address: address.trim(), landmark: landmark.trim() });
    setDraftAddress('');
    router.replace('/location');
  };

  return (
    <View style={styles.root}>
      <CropAdvisorHeader title="Add Address" />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <AppText variant="title" style={styles.heading}>
            Edit Address
          </AppText>

          <UnderlineField label="Name" value={name} onChangeText={setName} />
          <UnderlineField
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="House / Shop No. / Street / Area / PIN Code"
            multiline
          />
          <UnderlineField
            label="Delivery Details"
            value={landmark}
            onChangeText={setLandmark}
            placeholder="Landmark"
          />
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
            disabled={!canSave}
            onPress={save}
            style={[styles.button, !canSave && styles.buttonDisabled]}
          >
            <AppText variant="button" style={styles.buttonText}>
              Save Address
            </AppText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24, gap: 24 },
  heading: { fontFamily: FONT_FAMILY.medium, fontSize: 20, color: COLORS.text.black },
  field: { gap: 6 },
  label: { fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.sm, color: COLORS.text.black },
  input: {
    minHeight: 38,
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text.black,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
    ...({ outlineStyle: 'none', outlineWidth: 0 } as object),
  },
  inputActive: { borderBottomWidth: 2, borderBottomColor: COLORS.cropAdvisor },
  footer: { paddingHorizontal: 24, paddingBottom: 24, paddingTop: 8 },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.cropAdvisor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { backgroundColor: COLORS.cropAdvisorBorder },
  buttonText: { color: COLORS.text.inverse },
});
