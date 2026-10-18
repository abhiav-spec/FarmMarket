import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import type { ProfileMenuSectionConfig } from '@/constants/profile';
import { COLORS, FONT_FAMILY, FONT_SIZE, SPACING } from '@/theme';

import { ProfileMenuItem } from './ProfileMenuItem';

type ProfileMenuSectionProps = {
  section: ProfileMenuSectionConfig;
};

export function ProfileMenuSection({ section }: ProfileMenuSectionProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {section.title ? (
        <Text style={styles.heading}>{section.title}</Text>
      ) : null}

      {section.items.map((item) => (
        <ProfileMenuItem
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
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
    marginTop: SPACING.md,
  },
  heading: {
    color: COLORS.text.primary,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.sm,
  },
});
