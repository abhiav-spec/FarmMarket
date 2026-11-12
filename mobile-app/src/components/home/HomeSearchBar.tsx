import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput, View } from 'react-native';
import {
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
} from 'expo-audio';
import * as ImagePicker from 'expo-image-picker';

import { AppIcon } from '@/components';
import { COLORS, FONT_FAMILY, SPACING, UI, useResponsive } from '@/theme';

interface HomeSearchBarProps {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  onVoicePress?: () => void;
  onScanPress?: () => void;
  onWishlistPress?: () => void;
}

export function HomeSearchBar({
  value,
  placeholder = 'Search seeds, fertilizers, equipment...',
  onChangeText,
  onVoicePress,
  onScanPress,
  onWishlistPress,
}: HomeSearchBarProps) {
  const { home } = useResponsive();
  const [isMicActive, setIsMicActive] = useState(false);
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    return () => {
      if (audioRecorder.isRecording) {
        audioRecorder.stop().catch(() => {});
      }
    };
  }, [audioRecorder]);

  const handleVoicePress = async () => {
    onVoicePress?.();

    if (isMicActive) {
      try {
        if (audioRecorder.isRecording) {
          await audioRecorder.stop();
        }
      } catch {
        // Ignore stop errors if recorder already stopped
      }
      setIsMicActive(false);
      return;
    }

    try {
      const permission = await requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          'Microphone Permission',
          'Microphone permission is required to enable the mic.',
        );
        return;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
      setIsMicActive(true);
    } catch {
      setIsMicActive(false);
    }
  };

  const handleScanPress = async () => {
    onScanPress?.();

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Camera Permission',
        'Camera permission is required to open the camera.',
      );
      return;
    }

    await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
  };

  return (
    <View style={styles.row}>
      <View
        style={[
          styles.container,
          {
            height: home.searchHeight,
            borderRadius: home.searchRadius,
            paddingHorizontal: home.searchHorizontalPadding,
          },
        ]}
      >
        <AppIcon name="search" size="lg" color={COLORS.text.secondary} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.muted}
          style={[
            styles.input,
            {
              fontSize: home.searchFontSize,
              lineHeight: home.searchLineHeight,
            },
          ]}
          returnKeyType="search"
          numberOfLines={1}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voice search"
          onPress={handleVoicePress}
          style={styles.iconButton}
          hitSlop={UI.hitSlop}
        >
          <AppIcon
            name="microphone"
            size="md"
            color={isMicActive ? COLORS.success : COLORS.text.primary}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Scan product"
          onPress={handleScanPress}
          style={styles.iconButton}
          hitSlop={UI.hitSlop}
        >
          <AppIcon name="scan" size="md" />
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Wishlist"
        onPress={onWishlistPress}
        style={styles.wishlistButton}
        hitSlop={UI.hitSlop}
      >
        <AppIcon name="wishlist" size="lg" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.categoryborder,
    backgroundColor: COLORS.surface,
  },

  input: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: SPACING.sm,
    paddingVertical: 0,
    fontFamily: FONT_FAMILY.regular,
    color: COLORS.text.primary,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },

  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.sm,
  },

  wishlistButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.md,
  },
});
