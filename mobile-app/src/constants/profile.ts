export type ProfileMenuIcon =
  'address' | 'history' | 'support' | 'review' | 'setting' | 'logout';

export type ProfileMenuItemConfig = {
  id: string;
  title: string;
  subtitle: string;
  icon: ProfileMenuIcon;
  route?: '/help-centre' | '/write-to-us' | '/account-settings';
};

export type ProfileMenuSectionConfig = {
  id: string;
  title: string;
  items: ProfileMenuItemConfig[];
};

export const PROFILE_MENU_SECTIONS: ProfileMenuSectionConfig[] = [
  {
    id: 'account',
    title: 'My Account',
    items: [
      {
        id: 'addresses',
        title: 'Save Address',
        subtitle: 'Manage your delivery address',
        icon: 'address',
      },
      {
        id: 'advisory',
        title: 'Crop Advisory History',
        subtitle: 'View your past consultation',
        icon: 'history',
      },
      {
        id: 'support',
        title: 'Help & Support',
        subtitle: "We're here to help you",
        icon: 'support',
        route: '/help-centre',
      },
      {
        id: 'feedback',
        title: 'Write to us',
        subtitle: 'Share your feedback and suggestions',
        icon: 'review',
        route: '/write-to-us',
      },
    ],
  },
  {
    id: 'settings',
    title: '',
    items: [
      {
        id: 'settings',
        title: 'Account Settings',
        subtitle: 'Privacy, Security and more',
        icon: 'setting',
        route: '/account-settings',
      },
      {
        id: 'logout',
        title: 'Logout',
        subtitle: 'Sign out from your account',
        icon: 'logout',
      },
    ],
  },
];
