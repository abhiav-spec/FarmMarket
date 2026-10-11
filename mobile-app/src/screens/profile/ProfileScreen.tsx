import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { PROFILE_MENU_SECTIONS } from '@/constants/profile';
import {
  ProfileHeader,
  ProfileLogoutButton,
  ProfileMenuSection,
  ProfileQuickActions,
  ProfileReferralBanner,
} from '@/components/profile';

import { styles } from './styles';

export function ProfileScreen() {
  const showNotConnectedMessage = (feature: string) => {
    Alert.alert(feature, 'This feature is not connected yet.');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileHeader
          onEditPress={() => showNotConnectedMessage('Edit Profile')}
        />

        <ProfileQuickActions
          onWishlistPress={() => showNotConnectedMessage('Wishlist')}
          onWalletPress={() => showNotConnectedMessage('Wallet')}
        />

        {PROFILE_MENU_SECTIONS.map((section) => (
          <ProfileMenuSection key={section.id} section={section} />
        ))}

        <ProfileReferralBanner
          onPress={() => showNotConnectedMessage('Refer & Earn')}
        />

        <ProfileLogoutButton
          onPress={() => showNotConnectedMessage('Logout')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
