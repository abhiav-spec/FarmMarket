export type ProfileMenuItemConfig = {
  id: string;
  title: string;
  subtitle: string;
  route?: '/help-centre';
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
        title: 'Saved Addresses',
        subtitle: 'Manage your delivery addresses',
      },
      {
        id: 'advisory',
        title: 'Crop Advisory History',
        subtitle: 'View your previous advisories',
      },
      {
        id: 'support',
        title: 'Help & Support',
        subtitle: 'Get assistance with your orders',
        route: '/help-centre',
      },
    ],
  },
  {
    id: 'more',
    title: 'More',
    items: [
      {
        id: 'feedback',
        title: 'Write to Us',
        subtitle: 'Share your feedback',
      },
      {
        id: 'settings',
        title: 'Account Settings',
        subtitle: 'Manage your account preferences',
      },
    ],
  },
];
