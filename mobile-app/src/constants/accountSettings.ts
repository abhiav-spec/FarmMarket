export const NOTIFICATION_OPTIONS = [
  {
    id: 'orderUpdates',
    title: 'Order Updates',
    description: 'Get updates about your orders and deliveries.',
  },
  {
    id: 'cropAdvisory',
    title: 'Crop Advisory Alerts',
    description: 'Receive updates about your crop consultations.',
  },
  {
    id: 'offers',
    title: 'Offers & Promotions',
    description: 'Discover offers and special deals.',
  },
  {
    id: 'walletUpdates',
    title: 'Wallet Updates',
    description: 'Receive updates about wallet transactions.',
  },
] as const;

export type NotificationId = (typeof NOTIFICATION_OPTIONS)[number]['id'];

export const INITIAL_NOTIFICATION_SETTINGS: Record<NotificationId, boolean> = {
  orderUpdates: true,
  cropAdvisory: true,
  offers: false,
  walletUpdates: true,
};

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: 'Information We Collect',
    body: 'FarmMarket may collect information you provide when using the app, including account details, contact information, delivery details and preferences.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Information may be used to manage your account, process orders, provide crop advisory services, respond to support requests and improve the app.',
  },
  {
    title: 'Information Sharing',
    body: 'Information may be shared with service providers when necessary to deliver requested services or meet applicable legal obligations.',
  },
  {
    title: 'Data Security',
    body: 'We take reasonable steps to protect information. No digital system can guarantee absolute security.',
  },
  {
    title: 'Your Choices',
    body: 'You can review available account settings and contact support with questions or requests concerning your information.',
  },
  {
    title: 'Contact Us',
    body: 'Contact FarmMarket support if you have questions about this policy.',
  },
] as const;

export const TERMS_AND_CONDITIONS_SECTIONS = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using FarmMarket, you agree to the applicable terms. If you do not agree, please discontinue use of the service.',
  },
  {
    title: 'Your Account',
    body: 'You are responsible for providing accurate account information and keeping your account credentials secure.',
  },
  {
    title: 'Orders and Payments',
    body: 'Review product availability, pricing, delivery details and payment conditions before completing an order.',
  },
  {
    title: 'Acceptable Use',
    body: 'You agree to use FarmMarket lawfully and not misuse the service or interfere with its operation.',
  },
  {
    title: 'Service Availability',
    body: 'Features and services may change or be temporarily unavailable for maintenance or other operational reasons.',
  },
  {
    title: 'Contact and Updates',
    body: 'We may update these terms as the service evolves. Contact support if you have questions about the applicable terms.',
  },
] as const;
