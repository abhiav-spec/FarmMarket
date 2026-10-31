import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppIcon } from '@/components/common/AppIcon';
import { AppText } from '@/components/common/AppText';
import { EMPTY_STATE_STRINGS } from '@/constants/categoryStrings';
import { COLORS, FONT_SIZE, SEARCH_LAYOUT, SPACING } from '@/theme';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

export function EmptyState({
  message = EMPTY_STATE_STRINGS.noResults,
  subMessage = EMPTY_STATE_STRINGS.suggestion,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <AppIcon name="search" size="xl" color={COLORS.text.muted} />
      </View>
      <AppText variant="bodyMedium" style={styles.message}>
        {message}
      </AppText>
      {subMessage ? (
        <AppText variant="caption" style={styles.subMessage}>
          {subMessage}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl * 1.5,
    paddingHorizontal: SPACING.xl,
  },
  iconCircle: {
    width: SEARCH_LAYOUT.emptyIconContainerSize,
    height: SEARCH_LAYOUT.emptyIconContainerSize,
    borderRadius: SEARCH_LAYOUT.emptyIconContainerRadius,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subMessage: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.muted,
    textAlign: 'center',
    maxWidth: SEARCH_LAYOUT.emptySubtitleMaxWidth,
  },
});
