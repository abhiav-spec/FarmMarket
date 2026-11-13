import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

interface LastAddressModalProps {
  visible: boolean;
  onClose: () => void;
}

/** Shown when the user tries to delete their only remaining address. */
export function LastAddressModal({ visible, onClose }: LastAddressModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <AppText variant="bodyMedium" style={styles.title}>
            Can't delete this address
          </AppText>
          <AppText variant="body" style={styles.message}>
            At least one address must be saved. Add another address before deleting this one.
          </AppText>
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.button}>
            <AppText variant="button" style={styles.buttonText}>
              OK
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.cropAdvisor,
    padding: 20,
    gap: 10,
  },
  title: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.md, color: COLORS.text.black },
  message: { fontSize: FONT_SIZE.sm, color: COLORS.text.primary },
  button: {
    marginTop: 6,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.cropAdvisor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: COLORS.text.inverse },
});
