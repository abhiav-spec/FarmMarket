import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import { FONT_FAMILY } from '@/theme';

import { styles } from './styles';

export function ProfileScreen() {
  const router = useRouter();
  const { profile, isProfileLoaded } = useUserProfile();
  const wishlist = useWishlist();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const showNotConnectedMessage = (feature: string) => {
    Alert.alert(feature, 'This feature is not connected yet.');
  };

  // Open custom logout confirmation modal
  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  // Confirm logout
  const confirmLogout = () => {
    setIsLogoutModalVisible(false);
    router.replace(AUTH_ROUTES.getStarted);
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
          onBackPress={() => router.replace('/home')}
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
          <ProfileMenuSection
            section={settingsSection}
            onLogoutPress={handleLogout}
          />
        ) : null}
      </ScrollView>

      {/* Custom Logout Confirmation Modal */}
      <Modal
        transparent
        visible={isLogoutModalVisible}
        animationType="fade"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.card}>
            <Text style={modalStyles.title}>
              Are you sure you want to log out?
            </Text>

            <Text style={modalStyles.message}>
              You will need to sign in again to access your account.
            </Text>

            <Pressable
              style={modalStyles.confirmButton}
              onPress={confirmLogout}
            >
              <Text style={modalStyles.confirmText}>Log Out</Text>
            </Pressable>

            <Pressable
              style={modalStyles.cancelButton}
              onPress={() => setIsLogoutModalVisible(false)}
            >
              <Text style={modalStyles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  card: {
    width: '100%',
    maxWidth: 580,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#7000FF',
    borderRadius: 22,
    padding: 26,
  },
  title: {
    color: '#111111',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 22,
    marginBottom: 12,
  },
  message: {
    color: '#333333',
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  confirmButton: {
    minHeight: 52,
    backgroundColor: '#7000FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    color: '#FFFFFF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 16,
  },
  cancelButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  cancelText: {
    color: '#7000FF',
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 15,
  },
});
