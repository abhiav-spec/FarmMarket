import React from 'react';
import { Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
  SUPPORT_CHAT_CONSTANTS,
  SUPPORT_CHAT_LAYOUT,
} from '@/constants/support';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

interface SupportChatInputProps {
  messageText: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttachPress?: () => void;
  bottomInset?: number;
}

export function SupportChatInput({
  messageText,
  onChangeText,
  onSend,
  onAttachPress,
  bottomInset = 0,
}: SupportChatInputProps) {
  const isSendDisabled = !messageText.trim();

  return (
    <View
      style={[
        styles.bottomInputBar,
        {
          paddingBottom: Math.max(bottomInset, SPACING.md),
        },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={SUPPORT_CHAT_CONSTANTS.inputPlaceholder}
          placeholderTextColor={COLORS.text.placeholder}
          value={messageText}
          onChangeText={onChangeText}
          onSubmitEditing={isSendDisabled ? undefined : onSend}
          returnKeyType="send"
        />

        {/* Attachment Button - Enabled visually, no logic */}
        <Pressable
          hitSlop={SPACING.xs}
          accessibilityRole="button"
          accessibilityLabel={SUPPORT_CHAT_CONSTANTS.accessibility.attachFile}
          onPress={onAttachPress}
          style={styles.attachButton}
        >
          <Ionicons
            name="attach-outline"
            size={SUPPORT_CHAT_LAYOUT.iconLarge}
            color={COLORS.purple}
          />
        </Pressable>
      </View>

      {/* Circular Send Button - Disabled when empty, enabled when typed */}
      <Pressable
        onPress={isSendDisabled ? undefined : onSend}
        disabled={isSendDisabled}
        accessibilityRole="button"
        accessibilityLabel={SUPPORT_CHAT_CONSTANTS.accessibility.sendMessage}
        accessibilityState={{ disabled: isSendDisabled }}
        style={({ pressed }) => [
          styles.sendButton,
          isSendDisabled
            ? styles.sendButtonDisabled
            : pressed && styles.sendButtonPressed,
        ]}
      >
        <Ionicons
          name="paper-plane"
          size={SUPPORT_CHAT_LAYOUT.iconMedium}
          color={COLORS.white}
          style={styles.sendIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  inputContainer: {
    flex: 1,
    height: SUPPORT_CHAT_LAYOUT.inputHeight,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    borderWidth: SUPPORT_CHAT_LAYOUT.borderWidth,
    borderColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
  },
  textInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    height: '100%',
    padding: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
        boxShadow: 'none',
      } as Record<string, unknown>,
    }),
  },
  attachButton: {
    padding: SPACING.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: SUPPORT_CHAT_LAYOUT.sendButtonSize,
    height: SUPPORT_CHAT_LAYOUT.sendButtonSize,
    borderRadius: SUPPORT_CHAT_LAYOUT.sendButtonSize / 2,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  sendButtonPressed: {
    opacity: 0.8,
  },
  sendIcon: {
    marginLeft: SUPPORT_CHAT_LAYOUT.sendIconOffset,
  },
});
