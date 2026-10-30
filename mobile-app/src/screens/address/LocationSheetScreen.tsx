import React from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components';
import { SavedAddress, useAddress } from '@/context/AddressContext';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

const goHome = () => router.replace('/(main)/home');
const goBack = () => (router.canGoBack() ? router.back() : goHome());

export function LocationSheetScreen() {
  const { addresses, selected, ready, setDraftAddress, removeAddress, selectAddress } = useAddress();

  const addNew = () => {
    setDraftAddress('');
    router.push('/add-address');
  };

  const choose = (item: SavedAddress) => {
    selectAddress(item.id);
    goHome();
  };

  return (
    <View style={styles.root}>
      <Pressable accessibilityLabel="Close" style={styles.backdrop} onPress={goBack} />

      <View style={styles.sheet}>
        <View style={styles.topRow}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10} onPress={goBack}>
            <Ionicons name="arrow-back" size={26} color={COLORS.text.black} />
          </Pressable>
          <AppText variant="bodyMedium" style={styles.title}>
            Location
          </AppText>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" hitSlop={10} onPress={goHome}>
            <Ionicons name="close" size={26} color={COLORS.text.black} />
          </Pressable>
        </View>

        <Pressable accessibilityRole="button" onPress={addNew} style={styles.addRow}>
          <View style={styles.plusBox}>
            <Ionicons name="add" size={16} color={COLORS.text.black} />
          </View>
          <AppText variant="bodyMedium" style={styles.addText}>
            Add New Address
          </AppText>
          <Ionicons name="chevron-forward" size={22} color={COLORS.text.black} />
        </Pressable>

        <AppText variant="body" style={styles.sectionLabel}>
          Saved addresses
        </AppText>

        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {addresses.length === 0 ? (
            <AppText variant="body" style={styles.empty}>
              {ready ? 'No saved addresses yet.' : 'Loading...'}
            </AppText>
          ) : (
            addresses.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => choose(item)}
                style={[styles.card, selected?.id === item.id && styles.cardSelected]}
              >
                <Ionicons name="location-outline" size={22} color={COLORS.text.black} />
                <View style={styles.cardText}>
                  <AppText variant="bodyMedium" numberOfLines={1} style={styles.cardName}>
                    {item.name}
                  </AppText>
                  <AppText variant="body" numberOfLines={2} style={styles.cardAddress}>
                    {item.address}
                  </AppText>
                  {item.landmark ? (
                    <AppText variant="body" numberOfLines={1} style={styles.cardLandmark}>
                      {item.landmark}
                    </AppText>
                  ) : null}
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${item.name}`}
                  hitSlop={10}
                  onPress={() => removeAddress(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color={COLORS.text.black} />
                </Pressable>
              </Pressable>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.walletSurface, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.12)' },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
    maxHeight: '75%',
    minHeight: 340,
    boxShadow: '0px -4px 12px rgba(0, 0, 0, 0.10)',
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  title: { flex: 1, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, color: COLORS.text.secondary },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 24 },
  plusBox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: COLORS.text.black,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: { flex: 1, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, color: COLORS.text.black },
  sectionLabel: { marginTop: 24, fontSize: FONT_SIZE.sm, color: COLORS.text.black },
  list: { marginTop: 12 },
  listContent: { gap: 10, paddingBottom: 8 },
  empty: { color: COLORS.text.muted, fontSize: FONT_SIZE.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
    backgroundColor: COLORS.surface,
  },
  cardSelected: { backgroundColor: COLORS.purpleLight, borderColor: COLORS.cropAdvisorBorder },
  cardText: { flex: 1, gap: 2 },
  cardName: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.sm, color: COLORS.cropAdvisor },
  cardAddress: { fontSize: FONT_SIZE.xs, color: COLORS.text.black },
  cardLandmark: { fontSize: FONT_SIZE.xs, color: COLORS.text.muted },
});
