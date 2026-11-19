import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppText } from '@/components';
import { useAddress } from '@/context/AddressContext';
import { CropAdvisorHeader } from '@/screens/crop-advisor/CropAdvisorHeader';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';
import { LastAddressModal } from './LastAddressModal';

export function SavedAddressesScreen() {
  const { addresses, selected, ready, removeAddress } = useAddress();
  const [showLastAlert, setShowLastAlert] = useState(false);

  const handleDelete = (id: string) => {
    if (!removeAddress(id)) setShowLastAlert(true);
  };

  return (
    <View style={styles.root}>
      <CropAdvisorHeader title="Save Address" />

      <ScrollView contentContainerStyle={styles.content}>
        {addresses.length === 0 ? (
          <AppText variant="body" style={styles.empty}>
            {ready ? 'No saved addresses yet.' : 'Loading...'}
          </AppText>
        ) : (
          addresses.map((item) => (
            <View
              key={item.id}
              style={[styles.card, selected?.id === item.id && styles.cardSelected]}
            >
              <View style={styles.iconBox}>
                <Ionicons name="location-outline" size={22} color={COLORS.cropAdvisor} />
              </View>

              <View style={styles.text}>
                <AppText variant="bodyMedium" numberOfLines={1} style={styles.name}>
                  {item.name}
                </AppText>
                <AppText variant="body" numberOfLines={3} style={styles.address}>
                  {item.address}
                </AppText>
                {item.landmark ? (
                  <AppText variant="body" numberOfLines={1} style={styles.landmark}>
                    {item.landmark}
                  </AppText>
                ) : null}
              </View>

              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Edit ${item.name}`}
                  hitSlop={10}
                  onPress={() =>
                    router.push({ pathname: '/fill-address', params: { id: item.id } })
                  }
                >
                  <Ionicons name="create-outline" size={22} color={COLORS.cropAdvisor} />
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Delete ${item.name}`}
                  hitSlop={10}
                  onPress={() => handleDelete(item.id)}
                >
                  <Ionicons name="trash-outline" size={22} color={COLORS.text.black} />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <LastAddressModal visible={showLastAlert} onClose={() => setShowLastAlert(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingTop: 24, gap: 12 },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.text.muted },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder1,
    backgroundColor: COLORS.surface,
  },
  cardSelected: { backgroundColor: COLORS.purpleLight, borderColor: COLORS.cropAdvisorBorder },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
  name: { fontFamily: FONT_FAMILY.semiBold, fontSize: FONT_SIZE.md, color: COLORS.text.black },
  address: { fontSize: FONT_SIZE.xs, color: COLORS.text.primary },
  landmark: { fontSize: FONT_SIZE.xs, color: COLORS.text.muted },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingTop: 2 },
});
