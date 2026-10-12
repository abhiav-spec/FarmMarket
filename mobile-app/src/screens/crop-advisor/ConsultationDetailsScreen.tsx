import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppIcon, AppText } from '@/components';
import { useCropAdvisor } from '@/context/CropAdvisorContext';
import { COLORS, FONT_FAMILY, FONT_SIZE, SIZES, SPACING } from '@/theme';

export function ConsultationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConsultation } = useCropAdvisor();
  const c = id ? getConsultation(id) : undefined;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={() => router.back()} style={styles.back}>
          <AppIcon name="back" size="lg" color={COLORS.text.primary} />
        </Pressable>
        <AppText variant="bodyMedium" style={styles.headerTitle}>
          Consultation Details
        </AppText>
      </View>

      {!c ? (
        <AppText variant="body" style={styles.empty}>
          Consultation not found.
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
              <Image key={`${p.uri}-${i}`} source={{ uri: p.uri }} style={styles.photo} />
            ))}
          </View>

          {c.videos.length > 0 ? (
            <>
              <AppText variant="bodyMedium" style={styles.section}>
                Video ({c.videos.length})
              </AppText>
              {c.videos.map((v, i) => (
                <View key={`${v.uri}-${i}`} style={styles.video}>
                  <Ionicons name="play-circle" size={56} color={COLORS.text.inverse} />
                </View>
              ))}
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    height: SIZES.headerHeight,
    backgroundColor: COLORS.cropAdvisorBackground,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.cropAdvisor,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: { position: 'absolute', left: SPACING.lg, bottom: 16 },
  headerTitle: { fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md },
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
