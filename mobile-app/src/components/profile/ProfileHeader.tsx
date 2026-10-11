import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONT_FAMILY, FONT_SIZE, RADIUS, SPACING } from '@/theme';

type ProfileHeaderProps = {
  onEditPress: () => void;
};

export function ProfileHeader({ onEditPress }: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Text style={styles.heading}>My Profile</Text>

        <Pressable
          accessibilityRole="button"
          onPress={onEditPress}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Edit Profile</Text>
        </Pressable>
      </View>

      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>?</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.name}>Your Profile</Text>
          <Text style={styles.detail}>Add your personal details</Text>
          <Text style={styles.detail}>Location not added</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.purple,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxl,
    borderBottomLeftRadius: RADIUS.xl,
    borderBottomRightRadius: RADIUS.xl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xl,
  },
  editButton: {
    borderWidth: 1,
    borderColor: COLORS.text.inverse,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  editText: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: FONT_SIZE.xs,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.purpleLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.purple,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.xxl,
  },
  details: {
    flex: 1,
    gap: SPACING.xs,
  },
  name: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.lg,
  },
  detail: {
    color: COLORS.text.inverse,
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.xs,
  },
});
