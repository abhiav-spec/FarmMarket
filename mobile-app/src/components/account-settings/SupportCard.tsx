import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type SupportCardProps = {
  onPress: () => void;
};

export function SupportCard({ onPress }: SupportCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../assets/icons/contact-support.png')}
          resizeMode="contain"
          style={styles.icon}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Need Help?</Text>

        <Text style={styles.description}>
          Our support team is here to help you
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Contact Support"
          onPress={onPress}
          style={({ pressed }) => [
            styles.contactLink,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.contactText}>Contact Support</Text>

          <Ionicons
            name="chevron-forward"
            size={FONT_SIZE.sm}
            color={COLORS.support}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.purpleLight,
  },
  iconContainer: {
    width: SPACING.xxxl + SPACING.xl,
    height: SPACING.xxxl + SPACING.xl,
    flexShrink: 0,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.supportcall,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: SPACING.xxxl,
    height: SPACING.xxxl,
  },
  content: {
    flex: 1,
    gap: SPACING.xs,
  },
  title: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.md,
  },
  description: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.sm,
  },
  contactLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACING.sm,
    marginTop: SPACING.xs,
    paddingVertical: SPACING.xs,
  },
  contactText: {
    color: COLORS.support,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.sm,
  },
  pressed: {
    opacity: 0.75,
  },
});
