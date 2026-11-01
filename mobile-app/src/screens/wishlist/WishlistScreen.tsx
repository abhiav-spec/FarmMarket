import React, { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppIcon, AppText } from '@/components';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Touchable } from '@/components/ui/Touchable';
import { CATEGORY_STRINGS } from '@/constants/categoryStrings';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { CART_COPY } from '@/constants/config';
import { PRODUCT_CATALOG } from '@/data/productCatalog';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/theme';
import type { Product } from '@/types';
import { formatPaise } from '@/utils/price';

const SIDE_PADDING = 16;
const GAP = 12;
const CATALOG: Product[] = PRODUCT_CATALOG;

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const startOf = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((startOf(new Date()) - startOf(d)) / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function WishlistScreen() {
  const router = useRouter();
  const { entries, ready, remove } = useWishlist();
  const cart = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
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

  const openProduct = (product: Product) => router.push(`/product/${product.id}`);

  return (
    <View style={styles.root}>
      <ScreenHeader title={CART_COPY.wishlist} onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        {groups.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={48} color={COLORS.text.muted} />
            <AppText variant="subheading" style={styles.emptyTitle}>
              {ready ? 'Your wishlist is empty' : 'Loading...'}
            </AppText>
            {ready ? <AppText variant="caption" style={styles.emptyDescription}>Save products here to find them quickly.</AppText> : null}
          </View>
        ) : (
          groups.map((group) => (
            <View key={group.label} style={styles.group}>
              <AppText variant="bodyMedium" style={styles.groupLabel}>
                {group.label}
              </AppText>
              <View style={styles.grid}>
                {group.items.map((product) => {
                  const quantity = quantities[product.id] ?? cart.config.MIN_QUANTITY_PER_ITEM;
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

                      <View style={styles.quantityRow}>
                        <AppText variant="caption" style={styles.quantityLabel}>Quantity</AppText>
                        <QuantityStepper
                          quantity={quantity}
                          min={cart.config.MIN_QUANTITY_PER_ITEM}
                          max={cart.config.MAX_QUANTITY_PER_ITEM}
                          onDecrement={() => setQuantities((current) => ({ ...current, [product.id]: quantity - 1 }))}
                          onIncrement={() => setQuantities((current) => ({ ...current, [product.id]: quantity + 1 }))}
                        />
                      </View>

                      <Touchable
                        label={`${CART_COPY.removeFromWishlist} ${product.name}`}
                        onPress={() => remove(product.id)}
                        hitSlop={0}
                        style={styles.removeButton}
                      >
                        <Ionicons name="trash-outline" size={18} color={COLORS.purple} />
                      </Touchable>

                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`${CART_COPY.moveToCart} ${product.name}`}
                        onPress={() => {
                          cart.addItem(product);
                          cart.setQuantity(product.id, quantity);
                          remove(product.id);
                        }}
                        style={styles.addButton}
                      >
                        <AppIcon name="cart" size="sm" color={COLORS.purple} />
                        <AppText variant="caption" style={styles.addText}>
                          {CART_COPY.moveToCart}
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
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyTitle: { marginTop: 16, color: COLORS.text.secondary },
  emptyDescription: { marginTop: 8, color: COLORS.text.muted },
  group: { gap: 12 },
  groupLabel: { fontFamily: FONT_FAMILY.medium, fontSize: FONT_SIZE.md, color: COLORS.text.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.purpleBorder,
    padding: 8,
    paddingTop: 38,
  },
  imageBox: { height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  image: { width: '85%', height: '100%' },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: COLORS.purpleLight,
  },
  name: { fontFamily: FONT_FAMILY.medium, color: COLORS.text.black },
  variant: { fontSize: 11, color: COLORS.text.secondary, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  price: { fontFamily: FONT_FAMILY.bold, color: COLORS.purple },
  mrp: { fontSize: 10, color: COLORS.text.muted, textDecorationLine: 'line-through' },
  discount: { fontSize: 10, color: COLORS.purple, fontFamily: FONT_FAMILY.semiBold },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  quantityLabel: { color: COLORS.text.secondary },
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
