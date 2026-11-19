import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ICONS } from '@/constants/icons';
import { COLORS, SPACING } from '@/theme';
import { Touchable } from './Touchable';

export type Reaction = 'like' | 'dislike' | null;

interface ReactionButtonsProps {
  initialValue?: Reaction;
  onChange?: (reaction: Reaction) => void;
  likeLabel: string;
  dislikeLabel: string;
  size: number;
  /** Outline and fill color. */
  color?: string;
  style?: StyleProp<ViewStyle>;
}

/** Like / dislike pair. Selecting one deselects the other; pressing the active one clears it. Dislike is the like icon flipped. */
export function ReactionButtons({ initialValue = null, onChange, likeLabel, dislikeLabel, size, color = COLORS.reviewGreen, style }: ReactionButtonsProps) {
  const [value, setValue] = useState<Reaction>(initialValue);
  const toggle = (reaction: Exclude<Reaction, null>) => {
    const next = value === reaction ? null : reaction;
    setValue(next);
    onChange?.(next);
  };
  const button = (reaction: Exclude<Reaction, null>, label: string) => (
    <Touchable onPress={() => toggle(reaction)} label={label} accessibilityState={{ selected: value === reaction }} style={reaction === 'dislike' && styles.flipped}>
      <Ionicons name={value === reaction ? ICONS.helpfulFilled : ICONS.helpful} size={size} color={color} />
    </Touchable>
  );
  return (
    <View style={[styles.row, style]}>
      {button('like', likeLabel)}
      {button('dislike', dislikeLabel)}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  flipped: { transform: [{ scaleY: -1 }] },
});
