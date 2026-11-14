import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import type { ChatMessage } from '@/constants/support';
import {
  SUPPORT_CHAT_CONSTANTS,
  SUPPORT_CHAT_LAYOUT,
} from '@/constants/support';
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
  SPACING,
} from '@/theme';

interface SupportChatBubbleProps {
  message: ChatMessage;
}

export function SupportChatBubble({ message }: SupportChatBubbleProps) {
  const isSupport = message.sender === 'support';

  return (
    <View
      style={[
        styles.messageRow,
        isSupport ? styles.supportRow : styles.userRow,
      ]}
    >
      {/* Support Avatar */}
      {isSupport && (
        <View style={styles.supportAvatar}>
          <Ionicons
            name="headset-outline"
            size={SUPPORT_CHAT_LAYOUT.iconSmall}
            color={COLORS.purple}
          />
        </View>
      )}

      {/* Bubble Card with Purple Header & Clean Body */}
      <View
        style={[
          styles.bubbleCard,
          isSupport ? styles.supportBubble : styles.userBubble,
        ]}
      >
        {/* Purple Header Strip */}
        <View style={styles.bubbleHeader}>
          {isSupport ? (
            <>
              <Text style={styles.bubbleHeaderTitle} numberOfLines={1}>
                {message.senderName || SUPPORT_CHAT_CONSTANTS.supportTeamName}
              </Text>
              <Text style={styles.bubbleHeaderTime}>{message.timestamp}</Text>
            </>
          ) : (
            <Text style={[styles.bubbleHeaderTime, styles.userTime]}>
              {message.timestamp}
            </Text>
          )}
        </View>

        {/* Bubble Body Content */}
        <View style={styles.bubbleBody}>
          <Text style={styles.bubbleText}>{message.text}</Text>

          {/* Attached Product Images */}
          {message.images && message.images.length > 0 && (
            <View style={styles.imagesGrid}>
              {message.images.map((imgSrc, imgIndex) => (
                <View key={`img-${imgIndex}`} style={styles.attachedImageBox}>
                  <Image
                    source={imgSrc}
                    style={styles.attachedImage}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xs,
  },
  supportRow: {
    alignSelf: 'flex-start',
  },
  userRow: {
    alignSelf: 'flex-end',
  },
  supportAvatar: {
    width: SUPPORT_CHAT_LAYOUT.avatarSmall,
    height: SUPPORT_CHAT_LAYOUT.avatarSmall,
    borderRadius: SUPPORT_CHAT_LAYOUT.avatarSmall / 2,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xxs,
  },
  bubbleCard: {
    width: SUPPORT_CHAT_LAYOUT.chatBubbleWidth,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    borderWidth: SUPPORT_CHAT_LAYOUT.borderWidth,
    borderColor: COLORS.purpleBorder1,
  },
  supportBubble: {
    backgroundColor: COLORS.white,
  },
  userBubble: {
    backgroundColor: COLORS.purpleLight,
  },
  bubbleHeader: {
    backgroundColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  bubbleHeaderTitle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xxs,
    color: COLORS.white,
    flex: 1,
  },
  bubbleHeaderTime: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.micro,
    color: COLORS.white,
    opacity: 0.9,
  },
  userTime: {
    marginLeft: 'auto',
  },
  bubbleBody: {
    padding: SPACING.sm,
    gap: SPACING.xs,
  },
  bubbleText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xs,
    lineHeight: LINE_HEIGHT.xs,
    color: COLORS.text.primary,
  },
  imagesGrid: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xxs,
  },
  attachedImageBox: {
    width: SUPPORT_CHAT_LAYOUT.chatThumbnailSize,
    height: SUPPORT_CHAT_LAYOUT.chatThumbnailSize,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: SUPPORT_CHAT_LAYOUT.borderWidth,
    borderColor: COLORS.purpleBorder1,
    padding: SPACING.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachedImage: {
    width: '100%',
    height: '100%',
  },
});
