import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components';
import { useAddress } from '@/context/AddressContext';
import { CropAdvisorHeader } from '@/screens/crop-advisor/CropAdvisorHeader';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';

/** UI only: the map itself is not connected yet, the placeholder keeps the layout of the design. */
export function AddAddressMapScreen() {
  const { draftAddress, setDraftAddress } = useAddress();
  const [focused, setFocused] = useState(false);
  const [notice, setNotice] = useState(false);

  const canContinue = draftAddress.trim().length > 0;

  return (
    <View style={styles.root}>
      <CropAdvisorHeader title="Add Address" />

      <View style={styles.map}>
        <View style={styles.mapHint}>
          <Ionicons name="map-outline" size={40} color={COLORS.purpleBorder} />
          <AppText variant="body" style={styles.mapHintText}>
            Map preview
          </AppText>
        </View>

        <View style={[styles.search, focused && styles.searchFocused]}>
          <Ionicons
            name="search-outline"
            size={22}
            color={focused ? COLORS.cropAdvisor : COLORS.purpleBorder}
          />
          <TextInput
            value={draftAddress}
            onChangeText={(text) => {
              setDraftAddress(text);
              setNotice(false);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search for address"
            placeholderTextColor={COLORS.text.muted}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.bottom}>
          <Pressable accessibilityRole="button" onPress={() => setNotice(true)} style={styles.locationChip}>
            <Ionicons name="locate-outline" size={20} color={COLORS.text.black} />
            <AppText variant="bodyMedium" style={styles.locationChipText}>
              Use current location
            </AppText>
          </Pressable>
          {notice ? (
            <AppText variant="body" style={styles.notice}>
              Current location will work once the map is connected. Please type your address above.
            </AppText>
          ) : null}

          <View style={styles.card}>
            <AppText variant="body" style={styles.cardLabel}>
              DELIVERING YOUR ORDER TO
            </AppText>
            <View style={styles.addressRow}>
              <Ionicons name="location-outline" size={22} color={COLORS.text.black} />
              <AppText
                variant="body"
                numberOfLines={2}
                style={[styles.addressText, !canContinue && styles.addressPlaceholder]}
              >
                {canContinue ? draftAddress.trim() : 'Search for an address above'}
              </AppText>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: !canContinue }}
              disabled={!canContinue}
              onPress={() => router.push('/fill-address')}
              style={[styles.button, !canContinue && styles.buttonDisabled]}
            >
              <AppText variant="button" style={styles.buttonText}>
                Add address details
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  map: { flex: 1, backgroundColor: COLORS.categoryBackground },
  mapHint: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', gap: 6 },
  mapHintText: { color: COLORS.purpleBorder, fontSize: FONT_SIZE.sm },
  search: {
    position: 'absolute',
    top: 16,
    left: 24,
    right: 24,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.purpleBorder,
    borderRadius: 8,
  },
  searchFocused: { borderColor: COLORS.cropAdvisor },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.primary,
    ...({ outlineStyle: 'none', outlineWidth: 0 } as object),
  },
  bottom: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', paddingBottom: 24 },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.walletSurface,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.12)',
  },
  locationChipText: { fontSize: FONT_SIZE.sm, color: COLORS.text.black },
  notice: {
    marginTop: 8,
    marginHorizontal: 24,
    textAlign: 'center',
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: 12,
    marginHorizontal: 24,
    padding: 16,
    gap: 12,
    borderRadius: 20,
    backgroundColor: COLORS.walletSurface,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
  },
  cardLabel: { fontSize: 10, color: COLORS.text.secondary },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addressText: { flex: 1, fontSize: FONT_SIZE.sm, color: COLORS.text.black },
  addressPlaceholder: { color: COLORS.text.muted },
  button: {
    height: 44,
    borderRadius: 20,
    backgroundColor: COLORS.cropAdvisor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { backgroundColor: COLORS.cropAdvisorBorder },
  buttonText: { color: COLORS.text.inverse },
});
