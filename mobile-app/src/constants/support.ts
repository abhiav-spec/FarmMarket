import type { ImageSourcePropType } from 'react-native';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support';
  senderName?: string;
  text: string;
  timestamp: string;
  images?: ImageSourcePropType[];
}

export const SUPPORT_CHAT_CONSTANTS = {
  headerTitle: 'Support Chat',
  onlineStatus: 'Support team is online',
  ticketLabel: 'Ticket ID',
  orderLabel: 'Order ID',
  defaultTicketId: 'TKT-23445-23459',
  defaultOrderId: 'FM-DRUBNDG3543',
  todayLabel: 'Today',
  supportTeamName: 'Support team',
  inputPlaceholder: 'Type your message...',
  supportInitialTimestamp: '06:45 PM',
  userInitialTimestamp: '06:48 PM',
  supportInitialMessage:
    'Hi Jagadeesh,\nWe received your request for "Wrong items received" related to order #FM-DRUBNDG3543 please tell us which products were incorrect and share a photo of the delivered items or invoice if possible.',
  userInitialMessage:
    'Hi, I ordered UPL Saaf and Root Plus, but I received a different pack / different brand item. I am sharing the photo of the received products.',
  autoReplyMessage:
    'Thank you for sharing the details. Our team is verifying this with the seller and will update your ticket shortly.',
  supportPhoneNumber: 'tel:1800123456',
  photoPickerTitle: 'Upload Photo',
  photoPickerSubtitle: 'Choose an option to upload product photo',
  takePhotoLabel: 'Take Photo',
  takePhotoSubtitle: 'Use camera to capture photo',
  chooseGalleryLabel: 'Choose from Gallery',
  chooseGallerySubtitle: 'Select from device photos',
  cancelLabel: 'Cancel',
  photoUploadedMessage: 'Photo uploaded for verification',
  photoAutoReplyMessage:
    'Thank you for sharing the photo. Our team is verifying this with the seller and will update your ticket shortly.',
  cameraPermissionRequired: 'Please allow camera access to take a photo.',
  galleryPermissionRequired:
    'Please allow access to your photo library to select photos.',
  permissionTitle: 'Permission Required',
  accessibility: {
    back: 'Go back',
    callSupport: 'Call support',
    moreOptions: 'More options',
    sendMessage: 'Send message',
    onlineDot: 'Support online status',
    ticketIcon: 'Ticket icon',
    orderIcon: 'Order icon',
  },
} as const;

export const SUPPORT_CHAT_LAYOUT = {
  headerHeight: 56,
  onlineDotSize: 8,
  ticketIconSize: 32,
  avatarSmall: 32,
  chatBubbleWidth: 260,
  chatThumbnailSize: 60,
  inputHeight: 48,
  sendButtonSize: 48,
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 22,
  borderWidth: 1,
  sendIconOffset: 1,
  photoBadgeSize: 44,
  dragHandleWidth: 36,
  dragHandleHeight: 4,
} as const;
