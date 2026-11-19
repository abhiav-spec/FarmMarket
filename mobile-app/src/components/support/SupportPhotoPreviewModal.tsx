import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, RADIUS, SPACING } from '@/theme';

interface SupportPhotoPreviewModalProps {
  visible: boolean;
  imageSource: ImageSourcePropType | null;
  onClose: () => void;
}

export function SupportPhotoPreviewModal({
  visible,
  imageSource,
  onClose,
}: SupportPhotoPreviewModalProps) {
  if (!imageSource) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close photo preview"
              onPress={onClose}
              hitSlop={12}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={COLORS.white} />
            </Pressable>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              style={styles.previewImage}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
