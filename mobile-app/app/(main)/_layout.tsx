import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

import { colors, fonts, spacing, type } from '../../themes';

const TAB_ICONS = {
  home: require('../../assets/icons/bottom-tabs/home.png'),
  advisor: require('../../assets/icons/bottom-tabs/advisor.png'),
  orders: require('../../assets/icons/bottom-tabs/orders.png'),
  profile: require('../../assets/icons/bottom-tabs/profile.png'),
};

function TabIcon({
  name,
  focused,
}: {
  name: keyof typeof TAB_ICONS;
  focused: boolean;
}) {
  return (
    <Image
      source={TAB_ICONS[name]}
      resizeMode="contain"
      style={[
        styles.icon,
        { tintColor: focused ? colors.purple : colors.black },
      ]}
    />
  );
}

export const TAB_BAR_STYLE = {
  height: 70,
  paddingTop: spacing.sm,
  paddingBottom: spacing.sm,
  backgroundColor: colors.cream,
  borderTopWidth: 0,
  elevation: 0,
} as const;

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.black,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.iconContainer,
        tabBarStyle: TAB_BAR_STYLE,
      }}
    >
      {/* Main bottom tabs */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="home" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="crop-advisor"
        options={{
          title: 'Advisor',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="advisor" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="orders" focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="profile" focused={focused} />
          ),
        }}
      />

      {/* Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Checkout */}
      <Tabs.Screen
        name="checkout/payment"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="checkout/success"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Product details */}
      <Tabs.Screen
        name="product/[id]"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Wallet */}
      <Tabs.Screen
        name="wallet/index"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="wallet/add-money"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />

      {/* Existing secondary routes */}
      <Tabs.Screen name="order-detail" options={{ href: null }} />
      <Tabs.Screen name="help-centre" options={{ href: null }} />
      <Tabs.Screen name="help-upload" options={{ href: null }} />
      <Tabs.Screen name="return-success" options={{ href: null }} />
      <Tabs.Screen name="cancel-order" options={{ href: null }} />
      <Tabs.Screen name="confirm-cancellation" options={{ href: null }} />
      <Tabs.Screen name="cancellation-success" options={{ href: null }} />
      <Tabs.Screen name="reviews" options={{ href: null }} />
      <Tabs.Screen name="my-reviews" options={{ href: null }} />
      <Tabs.Screen name="write-to-us" options={{ href: null }} />
      <Tabs.Screen name="feedback-success" options={{ href: null }} />
      <Tabs.Screen name="review-success" options={{ href: null }} />
      <Tabs.Screen name="refer-now" options={{ href: null }} />
      <Tabs.Screen name="account-settings" options={{ href: null }} />
      <Tabs.Screen name="notifications-settings" options={{ href: null }} />
      <Tabs.Screen name="privacy-policy" options={{ href: null }} />
      <Tabs.Screen name="terms-and-conditions" options={{ href: null }} />
      <Tabs.Screen name="advisor" options={{ href: null }} />
      <Tabs.Screen name="wishlist" options={{ href: null }} />
      <Tabs.Screen name="crop-advisor-history" options={{ href: null }} />
      <Tabs.Screen name="consultation-details" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    fontSize: type.sm,
  },
  iconContainer: {
    marginTop: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
