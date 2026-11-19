import React from 'react';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VideoView, useVideoPlayer } from 'expo-video';

import { AppIcon, AppText } from '@/components';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

export interface PreviewItem {
  uri: string;
  type: 'image' | 'video';
}

/** First frame of the video with a play badge; used as the video thumbnail. */
export function VideoThumb({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (p) => {
    p.muted = true;
  });
  return (
    <View style={styles.thumb} pointerEvents="none">
      <VideoView player={player} nativeControls={false} contentFit="contain" style={StyleSheet.absoluteFill} />
      <View style={styles.playBadge}>
        <Ionicons name="play" size={22} color={COLORS.text.inverse} />
      </View>
    </View>
  );
}

function PreviewVideo({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (p) => {
    p.play();
  });
  return <VideoView player={player} nativeControls contentFit="contain" style={styles.media} />;
}

export function MediaPreviewModal({ item, onClose }: { item: PreviewItem | null; onClose: () => void }) {
  return (
    <Modal visible={!!item} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.top}>
            <AppText variant="bodyMedium" style={styles.title}>
              {item?.type === 'video' ? 'Video Preview' : 'Photo Preview'}
            </AppText>
            <Pressable accessibilityLabel="Close preview" hitSlop={10} onPress={onClose} style={styles.close}>
              <AppIcon name="close" size="xs" color={COLORS.text.inverse} />
            </Pressable>
          </View>
          {item ? (
            item.type === 'video' ? (
              <PreviewVideo uri={item.uri} />
            ) : (
              <Image source={{ uri: item.uri }} style={styles.media} resizeMode="contain" />
            )
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  thumb: { flex: 1, backgroundColor: COLORS.text.dark, alignItems: 'center', justifyContent: 'center' },
  playBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cropAdvisor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  sheet: {
    width: '100%',
    maxWidth: 402,
    backgroundColor: COLORS.walletSurface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.cropAdvisor,
    padding: 16,
    gap: 12,
  },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.md, color: COLORS.text.black },
  close: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cropAdvisor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: { width: '100%', height: 360, borderRadius: 14, backgroundColor: COLORS.text.dark },
});
