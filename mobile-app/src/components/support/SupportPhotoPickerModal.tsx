import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  SUPPORT_CHAT_CONSTANTS,
  SUPPORT_CHAT_LAYOUT,
} from '@/constants/support';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING, UI } from '@/theme';

interface SupportPhotoPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
}

export function SupportPhotoPickerModal({
  visible,
  onClose,
  onSelectCamera,
  onSelectGallery,
}: SupportPhotoPickerModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={SUPPORT_CHAT_CONSTANTS.cancelLabel}
          style={styles.backdrop}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          <View style={styles.dragHandle} />

          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {SUPPORT_CHAT_CONSTANTS.photoPickerTitle}
            </Text>
            <Text style={styles.headerSubtitle}>
              {SUPPORT_CHAT_CONSTANTS.photoPickerSubtitle}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Camera Option */}
          <Pressable
            onPress={onSelectCamera}
            style={({ pressed }) => [
              styles.optionItem,
              pressed && styles.optionItemPressed,
            ]}
          >
            <View style={styles.optionIconBadge}>
              <Ionicons
                name="camera-outline"
                size={SUPPORT_CHAT_LAYOUT.iconLarge}
                color={COLORS.purple}
              />
            </View>
            <View style={styles.optionTextColumn}>
              <Text style={styles.optionTitle}>
                {SUPPORT_CHAT_CONSTANTS.takePhotoLabel}
              </Text>
              <Text style={styles.optionSubtitle}>
                {SUPPORT_CHAT_CONSTANTS.takePhotoSubtitle}
              </Text>
            </View>
          </Pressable>

          {/* Gallery Option */}
          <Pressable
            onPress={onSelectGallery}
            style={({ pressed }) => [
              styles.optionItem,
              pressed && styles.optionItemPressed,
            ]}
          >
            <View style={styles.optionIconBadge}>
              <Ionicons
                name="images-outline"
                size={SUPPORT_CHAT_LAYOUT.iconLarge}
                color={COLORS.purple}
              />
            </View>
            <View style={styles.optionTextColumn}>
              <Text style={styles.optionTitle}>
                {SUPPORT_CHAT_CONSTANTS.chooseGalleryLabel}
              </Text>
              <Text style={styles.optionSubtitle}>
                {SUPPORT_CHAT_CONSTANTS.chooseGallerySubtitle}
              </Text>
            </View>
          </Pressable>

          {/* Cancel Button */}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.cancelButtonPressed,
            ]}
          >
            <Text style={styles.cancelText}>
              {SUPPORT_CHAT_CONSTANTS.cancelLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  dragHandle: {
    width: SUPPORT_CHAT_LAYOUT.dragHandleWidth,
    height: SUPPORT_CHAT_LAYOUT.dragHandleHeight,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.cardBorder,
    alignSelf: 'center',
    marginBottom: SPACING.xs,
  },
  header: {
    paddingVertical: SPACING.xs,
    gap: SPACING.xxs,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },
  headerSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  divider: {
    height: UI.borderWidth,
    backgroundColor: COLORS.divider,
    marginVertical: SPACING.xs,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    gap: SPACING.md,
  },
  optionItemPressed: {
    backgroundColor: COLORS.purpleLight,
  },
  optionIconBadge: {
    width: SUPPORT_CHAT_LAYOUT.photoBadgeSize,
    height: SUPPORT_CHAT_LAYOUT.photoBadgeSize,
    borderRadius: SUPPORT_CHAT_LAYOUT.photoBadgeSize / 2,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTextColumn: {
    flex: 1,
    gap: SPACING.xxs,
  },
  optionTitle: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
  },
  optionSubtitle: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xxs,
    color: COLORS.text.secondary,
  },
  cancelButton: {
    marginTop: SPACING.xs,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceLight,
  },
  cancelButtonPressed: {
    opacity: UI.disabledOpacity,
  },
  cancelText: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
});
