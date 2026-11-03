import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { ICONS } from '@/constants/icons';
import { Touchable } from './Touchable';

export interface AccordionItem {
  id: string;
  title: string;
  content?: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  style?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<TextStyle>;
  iconSize: number;
  iconColor: string;
}

/** List of rows where at most one row is expanded at a time. Rows without content are disabled. */
export function Accordion({ items, style, rowStyle, titleStyle, contentStyle, iconSize, iconColor }: AccordionProps) {
  const [expandedId, setExpandedId] = useState<string>();
  return (
    <View style={style}>
      {items.map((item) => {
        const expanded = expandedId === item.id;
        return (
          <View key={item.id}>
            <Touchable onPress={item.content ? () => setExpandedId(expanded ? undefined : item.id) : undefined} label={item.title} accessibilityState={{ expanded }} hitSlop={0} style={rowStyle}>
              <AppText style={titleStyle}>{item.title}</AppText>
              <Ionicons name={expanded ? ICONS.chevronDown : ICONS.chevronRight} size={iconSize} color={iconColor} />
            </Touchable>
            {expanded && <AppText style={contentStyle}>{item.content}</AppText>}
          </View>
        );
      })}
    </View>
  );
}
