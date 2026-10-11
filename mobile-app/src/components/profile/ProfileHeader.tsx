import React from 'react';
import { Image, Pressable, View } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { COLORS } from '@/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { profileHeaderStyles as styles } from './profileHeaderStyles';

type ProfileHeaderProps = {
  name: string;
  phone: string;
  location: string;
  onBackPress: () => void;
  onEditPress: () => void;
};

export function ProfileHeader({
  name,
  phone,
  location,
  onBackPress,
  onEditPress,
}: ProfileHeaderProps) {
  return (
    <View style={styles.header}>
      {/* Decorative background shapes */}
      <View pointerEvents="none" style={styles.decorations}>
        <View style={styles.shapeOne} />
        <View style={styles.shapeTwo} />
        <View style={styles.shapeThree} />
        <View style={styles.shapeFour} />
        <View style={styles.shapeFive} />
      </View>

      {/* Navigation and edit action */}
      <View style={styles.topRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBackPress}
          hitSlop={10}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={32}

            color={COLORS.text.inverse}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
          onPress={onEditPress}
          hitSlop={10}
          style={styles.editButton}
        >
          <Image
            source={require('../../../assets/icons/profile/edit-profile.png')}
            resizeMode="contain"
            style={styles.editIcon}
          />

          <AppText variant="category" color={COLORS.text.inverse}>
            Edit Profile
          </AppText>
        </Pressable>
      </View>

      {/* Profile information */}
      <View style={styles.details}>
        <AppText variant="title" color={COLORS.text.inverse}>
          {name}
        </AppText>

        <AppText variant="caption" color={COLORS.text.inverse}>
          {phone}
        </AppText>

        <AppText variant="caption" color={COLORS.text.inverse}>
          {location}
        </AppText>
      </View>
    </View>
  );
}
