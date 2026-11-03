import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components';
import { CropAdvisorHeader } from './CropAdvisorHeader';
import { MediaPreviewModal, PreviewItem, VideoThumb } from './MediaPreview';
import { useCropAdvisor } from '@/context/CropAdvisorContext';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

export function ConsultationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConsultation, ready } = useCropAdvisor();
  const [preview, setPreview] = useState<PreviewItem | null>(null);
  const c = id ? getConsultation(id) : undefined;

  return (
    <View style={styles.root}>
      <CropAdvisorHeader title="Consultation Details" />

      {!c ? (
        <AppText variant="body" style={styles.empty}>
          {ready ? 'Consultation not found.' : 'Loading...'}
        </AppText>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.idCard}>
            <AppText variant="bodyMedium" style={styles.idLabel}>
              Consultation ID
            </AppText>
            <AppText variant="bodyMedium" style={styles.idValue}>
              #{c.id}
            </AppText>
          </View>

          <AppText variant="bodyMedium" style={styles.section}>
            Problem Statement
          </AppText>
          <AppText variant="body" style={styles.problem}>
            {c.description}
          </AppText>

          <AppText variant="bodyMedium" style={styles.section}>
            Photos ({c.photos.length})
          </AppText>
          <View style={styles.photoRow}>
            {c.photos.map((p, i) => (
              <Pressable key={`${p.uri}-${i}`} onPress={() => setPreview({ uri: p.uri, type: 'image' })}>
                <Image source={{ uri: p.uri }} style={styles.photo} />
              </Pressable>
            ))}
          </View>

          {c.videos.length > 0 ? (
            <>
              <AppText variant="bodyMedium" style={styles.section}>
                Video ({c.videos.length})
              </AppText>
              {c.videos.map((v, i) => (
                <Pressable key={`${v.uri}-${i}`} style={styles.video} onPress={() => setPreview({ uri: v.uri, type: 'video' })}>
                  <VideoThumb uri={v.uri} />
                </Pressable>
              ))}
            </>
          ) : null}
        </ScrollView>
      )}
      <MediaPreviewModal item={preview} onClose={() => setPreview(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: 12, paddingBottom: SPACING.xxl },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.text.muted },
  idCard: {
    backgroundColor: COLORS.cropAdvisorBackground,
    borderRadius: 14,
    padding: 24,
    gap: 8,
    marginBottom: 8,
  },
  idLabel: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.md },
  idValue: { color: COLORS.cropAdvisor, fontSize: 18, fontFamily: FONT_FAMILY.bold },
  section: { fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.md, marginTop: 8 },
  problem: { fontSize: 12, lineHeight: 17, color: COLORS.text.primary },
  photoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  photo: { width: 126, height: 130, borderRadius: 14, backgroundColor: COLORS.divider },
  video: {
    height: 130,
    borderRadius: 14,
    backgroundColor: COLORS.text.dark,
    overflow: 'hidden',
  },
});
