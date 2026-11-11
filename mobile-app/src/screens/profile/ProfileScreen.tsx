import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { PROFILE_MENU_SECTIONS } from '@/constants/profile';
import { AUTH_ROUTES } from '@/constants/auth';
import {
  ProfileHeader,
  ProfileMenuSection,
  ProfileQuickActions,
  ProfileReferralBanner,
} from '@/components/profile';
import { useWishlist } from '@/context/WishlistContext';
import { useUserProfile } from '@/context/UserProfileContext';

import { styles } from './styles';

export function ProfileScreen() {
  const router = useRouter();
  const { profile, isProfileLoaded } = useUserProfile();
  const wishlist = useWishlist();

  const showNotConnectedMessage = (feature: string) => {
    Alert.alert(feature, 'This feature is not connected yet.');
  };

  const profileName = isProfileLoaded
    ? profile.name || 'Your Name'
    : 'Loading...';

  const profilePhone = isProfileLoaded
    ? profile.phone || 'Mobile number not added'
    : 'Loading...';

  const profileLocation = isProfileLoaded
    ? [profile.district, profile.state].filter(Boolean).join(', ') ||
      'Location not added'
    : 'Loading...';

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
          name={profileName}
          phone={profilePhone}
          location={profileLocation}
          onBackPress={() => {}}
          onEditPress={() =>
            router.push({
              pathname: AUTH_ROUTES.personalInfo,
              params: { mode: 'edit' },
            })
          }
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
