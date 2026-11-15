import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { FeedbackHeader } from '@/components/common/FeedbackHeader';
import {
  SupportChatBubble,
  SupportChatInput,
  SupportPhotoPickerModal,
  SupportPhotoPreviewModal,
  SupportTicketBanner,
} from '@/components/support';
import type { ChatMessage } from '@/constants/support';
import { SUPPORT_CHAT_CONSTANTS } from '@/constants/support';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

const saafImg = require('../../../assets/images/categories/uplsaaf.png');
const rootPlusImg = require('../../../assets/images/categories/agrinova-rootplus.png');

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'support',
    senderName: SUPPORT_CHAT_CONSTANTS.supportTeamName,
    text: SUPPORT_CHAT_CONSTANTS.supportInitialMessage,
    timestamp: SUPPORT_CHAT_CONSTANTS.supportInitialTimestamp,
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: SUPPORT_CHAT_CONSTANTS.userInitialMessage,
    timestamp: SUPPORT_CHAT_CONSTANTS.userInitialTimestamp,
    images: [saafImg, rootPlusImg],
  },
];

export function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const params = useLocalSearchParams<{
    id?: string;
    orderId?: string;
    ticketId?: string;
  }>();

  const orderId =
    params.orderId || params.id || SUPPORT_CHAT_CONSTANTS.defaultOrderId;
  const ticketId = params.ticketId || SUPPORT_CHAT_CONSTANTS.defaultTicketId;

  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isPhotoPickerVisible, setIsPhotoPickerVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<ImageSourcePropType | null>(
    null,
  );

  const handleBackPress = useCallback(() => {
    router.replace('/(main)/profile');
  }, [router]);

  const handleSendMessage = useCallback(() => {
    const text = messageText.trim();
    if (!text) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessageText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate support reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const supportReply: ChatMessage = {
        id: `support-${Date.now()}`,
        sender: 'support',
        senderName: SUPPORT_CHAT_CONSTANTS.supportTeamName,
        text: SUPPORT_CHAT_CONSTANTS.autoReplyMessage,
        timestamp: replyTime,
      };

      setMessages((prev) => [...prev, supportReply]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  }, [messageText]);

  const handleSelectCamera = useCallback(async () => {
    setIsPhotoPickerVisible(false);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          SUPPORT_CHAT_CONSTANTS.permissionTitle,
          SUPPORT_CHAT_CONSTANTS.cameraPermissionRequired,
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length) {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const photoMessage: ChatMessage = {
          id: `photo-${Date.now()}`,
          sender: 'user',
          text:
            messageText.trim() || SUPPORT_CHAT_CONSTANTS.photoUploadedMessage,
          timestamp: currentTime,
          images: [{ uri: result.assets[0].uri }],
        };

        setMessages((prev) => [...prev, photoMessage]);
        setMessageText('');

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate support photo verification reply
        setTimeout(() => {
          const replyTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const supportReply: ChatMessage = {
            id: `support-${Date.now()}`,
            sender: 'support',
            senderName: SUPPORT_CHAT_CONSTANTS.supportTeamName,
            text: SUPPORT_CHAT_CONSTANTS.photoAutoReplyMessage,
            timestamp: replyTime,
          };

          setMessages((prev) => [...prev, supportReply]);
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }, 1000);
      }
    } catch (error) {
      console.error('Camera capture error:', error);
    }
  }, [messageText]);

  const handleSelectGallery = useCallback(async () => {
    setIsPhotoPickerVisible(false);

    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          SUPPORT_CHAT_CONSTANTS.permissionTitle,
          SUPPORT_CHAT_CONSTANTS.galleryPermissionRequired,
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets?.length) {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        const selectedImages = result.assets.map((asset) => ({
          uri: asset.uri,
        }));

        const photoMessage: ChatMessage = {
          id: `gallery-${Date.now()}`,
          sender: 'user',
          text:
            messageText.trim() || SUPPORT_CHAT_CONSTANTS.photoUploadedMessage,
          timestamp: currentTime,
          images: selectedImages,
        };

        setMessages((prev) => [...prev, photoMessage]);
        setMessageText('');

        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate support photo verification reply
        setTimeout(() => {
          const replyTime = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const supportReply: ChatMessage = {
            id: `support-${Date.now()}`,
            sender: 'support',
            senderName: SUPPORT_CHAT_CONSTANTS.supportTeamName,
            text: SUPPORT_CHAT_CONSTANTS.photoAutoReplyMessage,
            timestamp: replyTime,
          };

          setMessages((prev) => [...prev, supportReply]);
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }, 1000);
      }
    } catch (error) {
      console.error('Gallery selection error:', error);
    }
  }, [messageText]);

  const handleImagePress = useCallback((imageSource: ImageSourcePropType) => {
    setPreviewImage(imageSource);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Standard Reusable Topbar Header */}
      <FeedbackHeader
        title={SUPPORT_CHAT_CONSTANTS.headerTitle}
        onBackPress={handleBackPress}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + SPACING.xl },
          ]}
        >
          {/* Ticket ID & Order ID Top Banner */}
          <SupportTicketBanner ticketId={ticketId} orderId={orderId} />

          {/* Centered Date Badge ("Today") */}
          <View style={styles.dateBadgeContainer}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>
                {SUPPORT_CHAT_CONSTANTS.todayLabel}
              </Text>
            </View>
          </View>

          {/* Chat Messages */}
          <View style={styles.messagesContainer}>
            {messages.map((msg) => (
              <SupportChatBubble
                key={msg.id}
                message={msg}
                onImagePress={handleImagePress}
              />
            ))}
          </View>
        </ScrollView>

        {/* Bottom Input Bar */}
        <SupportChatInput
          messageText={messageText}
          onChangeText={setMessageText}
          onSend={handleSendMessage}
          onAttachPress={() => setIsPhotoPickerVisible(true)}
          bottomInset={insets.bottom}
        />
      </KeyboardAvoidingView>

      {/* Camera / Gallery Picker Bottom Sheet */}
      <SupportPhotoPickerModal
        visible={isPhotoPickerVisible}
        onClose={() => setIsPhotoPickerVisible(false)}
        onSelectCamera={handleSelectCamera}
        onSelectGallery={handleSelectGallery}
      />

      {/* Full Screen Photo Preview Modal */}
      <SupportPhotoPreviewModal
        visible={!!previewImage}
        imageSource={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.md,
  },
  dateBadgeContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xxs,
  },
  dateBadge: {
    backgroundColor: COLORS.purpleLight,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  dateBadgeText: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.xxs,
    color: COLORS.purple,
  },
  messagesContainer: {
    gap: SPACING.lg,
    marginTop: SPACING.xxs,
  },
});
