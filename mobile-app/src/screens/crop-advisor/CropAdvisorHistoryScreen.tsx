import React, { useMemo, useState } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppIcon, AppText } from '@/components';
import { useCropAdvisor } from '@/context/CropAdvisorContext';
import { COLORS, FONT_FAMILY, FONT_SIZE, SIZES, SPACING } from '@/theme';

function formatDate(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleString('en-GB', { month: 'short' });
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}

export function CropAdvisorHistoryScreen() {
  const { consultations } = useCropAdvisor();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return consultations;
    return consultations.filter((c) =>
      [c.id, c.cropName, c.issue, c.description].some((t) => t.toLowerCase().includes(q)),
    );
  }, [consultations, query]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Pressable hitSlop={10} onPress={() => router.back()} style={styles.back}>
          <AppIcon name="back" size="lg" color={COLORS.text.primary} />
        </Pressable>
        <AppText variant="bodyMedium" style={styles.headerTitle}>
          Crop Advisor History
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.search}>
          <Ionicons name="search-outline" size={22} color={COLORS.purpleBorder} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search Consultation"
            placeholderTextColor={COLORS.text.muted}
            style={styles.searchInput}
          />
        </View>

        {filtered.length === 0 ? (
          <AppText variant="body" style={styles.empty}>
            {consultations.length === 0 ? 'No consultations yet.' : 'No matching consultations.'}
          </AppText>
        ) : (
          filtered.map((c) => (
            <View key={c.id} style={styles.card}>
              <Image source={{ uri: c.photos[0]?.uri }} style={styles.thumb} />
              <View style={styles.info}>
                <AppText variant="bodyMedium" numberOfLines={1} style={styles.title}>
                  {c.issue || c.cropName}
                </AppText>
                <View style={styles.badge}>
                  <AppText variant="body" style={styles.badgeText}>
                    {c.status}
                  </AppText>
                </View>
                <AppText variant="body" numberOfLines={3} style={styles.desc}>
                  {c.description}
                </AppText>
                <View style={styles.footer}>
                  <AppText variant="body" style={styles.date}>
                    {formatDate(c.createdAt)}
                  </AppText>
                  <Pressable
                    onPress={() =>
                      router.push({ pathname: '/(main)/consultation-details', params: { id: c.id } })
                    }
                  >
                    <AppText variant="bodyMedium" style={styles.link}>
                      View Details
                    </AppText>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  content: { padding: SPACING.lg, gap: 20 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
  },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.text.muted },
  card: { flexDirection: 'row', gap: 16 },
  thumb: { width: 126, height: 130, borderRadius: 14, backgroundColor: COLORS.divider },
  info: { flex: 1, gap: 6 },
  title: { fontFamily: FONT_FAMILY.bold, fontSize: FONT_SIZE.md },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D4F5D0',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: { color: COLORS.reviewGreen, fontSize: 11 },
  desc: { fontSize: 11, lineHeight: 16, color: COLORS.text.primary },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: FONT_SIZE.sm, color: COLORS.text.dark },
  link: { color: COLORS.cropAdvisor, fontSize: FONT_SIZE.sm },
});
