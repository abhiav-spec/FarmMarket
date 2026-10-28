import React, { useMemo } from 'react';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppIcon, AppText } from '@/components';
import { CATEGORY_STRINGS } from '@/constants/categoryStrings';
import { MOCK_CART_PRODUCTS, MOCK_RECOMMENDATION_PRODUCTS } from '@/data/mockProducts';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { CropAdvisorHeader } from '@/screens/crop-advisor/CropAdvisorHeader';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';
import type { Product } from '@/types';
import { formatPaise } from '@/utils/price';

const SIDE_PADDING = 16;
const GAP = 12;
const CATALOG: Product[] = [...MOCK_CART_PRODUCTS, ...MOCK_RECOMMENDATION_PRODUCTS];

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOf(new Date()) - startOf(d)) / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function WishlistScreen() {
  const { entries, ready, remove } = useWishlist();
  const cart = useCart();
  const { width } = useWindowDimensions();
  const cardWidth = (Math.min(width, 402) - SIDE_PADDING * 2 - GAP) / 2;

  const groups = useMemo(() => {
    const result: { label: string; items: Product[] }[] = [];
    entries.forEach((entry) => {
      const product = CATALOG.find((p) => p.id === entry.productId);
      if (!product) return;
      const label = dayLabel(entry.addedAt);
      const group = result.find((g) => g.label === label);
      if (group) group.items.push(product);
      else result.push({ label, items: [product] });
    });
    return result;
  }, [entries]);

  const openProduct = (product: Product) =>
    router.push({ pathname: '/cart', params: { step: 'product', productId: product.id } });

  return (
    <View style={styles.root}>
      <CropAdvisorHeader title="Wishlist" />
      <ScrollView contentContainerStyle={styles.content}>
        {groups.length === 0 ? (
          <AppText variant="body" style={styles.empty}>
            {ready ? 'Your wishlist is empty.' : 'Loading...'}
          </AppText>
        ) : (
          groups.map((group) => (
            <View key={group.label} style={styles.group}>
              <AppText variant="bodyMedium" style={styles.groupLabel}>
                {group.label}
              </AppText>
              <View style={styles.grid}>
                {group.items.map((product) => {
                  const source =
                    typeof product.imageUrl === 'string' ? { uri: product.imageUrl } : product.imageUrl;
                  return (
                    <View key={product.id} style={[styles.card, { width: cardWidth }]}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={product.name}
                        onPress={() => openProduct(product)}
                      >
                        <View style={styles.imageBox}>
                          <Image source={source} style={styles.image} resizeMode="contain" />
                        </View>
                        <AppText variant="caption" numberOfLines={1} style={styles.name}>
                          {product.name}
                        </AppText>
                        <AppText variant="caption" numberOfLines={1} style={styles.variant}>
                          {product.variant}
                        </AppText>
                        <View style={styles.priceRow}>
                          <AppText variant="caption" style={styles.price}>
                            {formatPaise(product.pricePaise)}
                          </AppText>
                          <AppText variant="caption" style={styles.mrp}>
                            {formatPaise(product.mrpPaise, true)}
                          </AppText>
                          {product.discountPercent ? (
                            <AppText variant="caption" style={styles.discount}>
                              {product.discountPercent}
                              {CATEGORY_STRINGS.discountSuffix}
                            </AppText>
                          ) : null}
                        </View>
                      </Pressable>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Remove ${product.name} from wishlist`}
                        hitSlop={10}
                        onPress={() => remove(product.id)}
                        style={styles.heart}
                      >
                        <Ionicons name="heart" size={22} color={COLORS.purple} />
                      </Pressable>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${CATEGORY_STRINGS.addToCart} ${product.name}`}
                        onPress={() => cart.addItem(product)}
                        style={styles.addButton}
                      >
                        <AppIcon name="cart" size="sm" color={COLORS.purple} />
                        <AppText variant="caption" style={styles.addText}>
                          {CATEGORY_STRINGS.addToCart}
                        </AppText>
                      </Pressable>
                    </View>
                  );
                })}
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
  content: { padding: SIDE_PADDING, paddingTop: 24, gap: 20 },
  empty: { textAlign: 'center', marginTop: 40, color: COLORS.text.muted },
  group: { gap: 12 },
  groupLabel: { fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, color: COLORS.text.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    padding: 8,
  },
  imageBox: { height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  image: { width: '85%', height: '100%' },
  heart: { position: 'absolute', top: 10, right: 10 },
  name: { fontFamily: FONT_FAMILY.medium, color: COLORS.text.black },
  variant: { fontSize: 11, color: COLORS.text.secondary, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  price: { fontFamily: FONT_FAMILY.bold, color: COLORS.purple },
  mrp: { fontSize: 10, color: COLORS.text.muted, textDecorationLine: 'line-through' },
  discount: { fontSize: 10, color: COLORS.purple, fontFamily: FONT_FAMILY.semiBold },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    borderRadius: 4,
    paddingVertical: 6,
    marginTop: 8,
    backgroundColor: COLORS.purpleLight,
  },
  addText: { color: COLORS.purple, fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.xs },
});
