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
    title: 'Information we collect',
    subtitle: 'What data we collect and why',
    body: `We collect information you provide directly such as
your name, mobile number, address, and order details.
We also collect device, location and usage information.`,
  },
  {
    title: 'How we use your data',
    subtitle: 'How your data is used',
    body: `We use your data to process orders, 
provide crop advisory, improve our services and 
send important updates and offers.`,
  },
  {
    title: 'Data sharing',
    subtitle: 'When and why we share data',
    body: `We do not sell your data. We share your information
only with trusted service partners for order delivery, 
payments and analytics.`,
  },
  {
    title: 'Your rights & choices',
    subtitle: 'Your privacy rights and control',
    body: `You can access, update or delete your personal
information. You can also opt-out of marketing communications.`,
  },
  {
    title: 'Data security',
    subtitle: 'How we protect your data',
    body: `We use industry-standard security measures to
protect your data from unauthorized access, 
alteration or loss.`,
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
