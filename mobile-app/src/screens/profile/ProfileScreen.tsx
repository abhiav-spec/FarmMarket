import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { PROFILE_MENU_SECTIONS } from '@/constants/profile';
import {
  ProfileHeader,
  ProfileMenuSection,
  ProfileQuickActions,
  ProfileReferralBanner,
} from '@/components/profile';
import { useRouter } from 'expo-router';
import { useWishlist } from '@/context/WishlistContext';
import { styles } from './styles';

export function ProfileScreen() {
  const router = useRouter();
  const wishlist = useWishlist();
  const showNotConnectedMessage = (feature: string) => {
    Alert.alert(feature, 'This feature is not connected yet.');
  };

  const accountSection = PROFILE_MENU_SECTIONS.find(
    (section) => section.id === 'account',
  );

  const settingsSection = PROFILE_MENU_SECTIONS.find(
    (section) => section.id === 'settings',
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileHeader
          name="Jagadeesh"
          phone="+91 12345 67890"
          location="Bengaluru, Karnataka"
          onBackPress={() => {}}
          onEditPress={() => {}}
        />

        <ProfileQuickActions
          wishlistCount={wishlist.count}
          onWishlistPress={() => router.push('/wishlist')}
          onWalletPress={() => showNotConnectedMessage('Wallet')}
        />

        {accountSection ? (
          <ProfileMenuSection section={accountSection} />
        ) : null}

        <ProfileReferralBanner onPress={() => router.push('/refer-now')} />

        {settingsSection ? (
          <ProfileMenuSection section={settingsSection} />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
