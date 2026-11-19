import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { NOTIFICATION_TABS } from '@/constants/notifications';
import type { NotificationCategory } from '@/types/notifications';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING, UI } from '@/theme';

interface NotificationFilterTabsProps {
  active: NotificationCategory;
  onSelect: (tab: NotificationCategory) => void;
}

export function NotificationFilterTabs({
  active,
  onSelect,
}: NotificationFilterTabsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {NOTIFICATION_TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              hitSlop={UI.hitSlop}
              onPress={() => onSelect(tab.key)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <AppText style={[styles.label, isActive && styles.labelActive]}>
                {tab.label}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: UI.borderWidth,
    borderBottomColor: COLORS.divider,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  tab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: UI.borderWidth,
    borderColor: COLORS.purpleBorder1,
    backgroundColor: COLORS.background,
  },
  tabActive: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },
  label: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  labelActive: {
    fontFamily: FONT_FAMILY.semiBold,
    color: COLORS.text.inverse,
  },
});
