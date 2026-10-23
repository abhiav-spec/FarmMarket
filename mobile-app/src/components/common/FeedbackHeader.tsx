import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type FeedbackHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export function FeedbackHeader({ title, onBackPress }: FeedbackHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={onBackPress}
        style={styles.backButton}
      >
        <Image
          source={require('../../../assets/icons/back-arrow.png')}
          style={styles.backArrow}
          resizeMode="contain"
        />
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 112,
    alignItems: 'center',
    backgroundColor: COLORS.purpleSurface,
    borderBottomColor: COLORS.purple,
    borderBottomLeftRadius: RADIUS.header,
    borderBottomRightRadius: RADIUS.header,
    borderBottomWidth: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  backButton: {
    height: 44,
    justifyContent: 'center',
    width: 40,
    zIndex: 1,
  },
  backArrow: {
    height: 32,
    width: 32,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
});
