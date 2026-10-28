import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { Touchable } from '@/components/ui/Touchable';
import { PRODUCT_DETAIL_CONFIG, PRODUCT_DETAIL_COPY } from '@/constants/config';
import { COLORS, PRODUCT_LAYOUT, PRODUCT_TYPOGRAPHY, RADIUS, SIZES, UI } from '@/theme';
import { type ProductPack } from '@/types';

export function ProductPackSelector({ packs, onChange }: { packs: readonly ProductPack[]; onChange?: (pack: ProductPack) => void }) {
  const [selectedId, setSelectedId] = useState(() => packs.find((pack) => pack.id === PRODUCT_DETAIL_CONFIG.initialPackId)?.id ?? packs[0]?.id);
  return (
    <View>
      <AppText style={styles.title}>{PRODUCT_DETAIL_COPY.selectPack}</AppText>
      <View style={styles.packs} accessibilityRole="radiogroup" accessibilityLabel={PRODUCT_DETAIL_COPY.selectPack}>
        {packs.map((pack) => {
          const selected = selectedId === pack.id;
          return (
            <Touchable key={pack.id} onPress={() => { setSelectedId(pack.id); onChange?.(pack); }} label={pack.label} accessibilityRole="radio" accessibilityState={{ checked: selected }} hitSlop={0} style={styles.pack}>
              <View style={[styles.packBorder, selected && styles.selected]} />
              <AppText style={[styles.packText, selected && styles.selectedText]} numberOfLines={1}>{pack.label}</AppText>
            </Touchable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.black, marginTop: PRODUCT_LAYOUT.packTitleTopGap },
  packs: { flexDirection: 'row', gap: PRODUCT_LAYOUT.packGap, marginTop: PRODUCT_LAYOUT.packTopGap },
  pack: { height: SIZES.productPackHeight, borderRadius: RADIUS.xxs, paddingHorizontal: PRODUCT_LAYOUT.packPaddingHorizontal, paddingVertical: PRODUCT_LAYOUT.packPaddingVertical, justifyContent: 'center' },
  packBorder: { position: 'absolute', pointerEvents: 'none', inset: UI.zeroInset, borderWidth: UI.borderWidth, borderColor: COLORS.productPackBorder, borderRadius: RADIUS.xxs },
  selected: { borderColor: COLORS.purple },
  packText: { ...PRODUCT_TYPOGRAPHY.pack, color: COLORS.text.black },
  selectedText: { color: COLORS.purple },
});
