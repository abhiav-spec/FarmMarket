import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import type { ProfileMenuSectionConfig } from '@/constants/profile';
import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

import { ProfileMenuItem } from './ProfileMenuItem';

type ProfileMenuSectionProps = {
  section: ProfileMenuSectionConfig;
};

export function ProfileMenuSection({ section }: ProfileMenuSectionProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{section.title}</Text>

      {section.items.map((item, index) => (
        <ProfileMenuItem
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          showDivider={index < section.items.length - 1}
          onPress={() => {
            if (item.route === '/help-centre') {
              router.push(item.route);
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
  },
  heading: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
});
