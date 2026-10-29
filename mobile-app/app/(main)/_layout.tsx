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

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.black,
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.iconContainer,
        tabBarStyle: styles.tabBar,
      }}
    >
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
        name="advisor"
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

      <Tabs.Screen
        name="cart"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="order-detail"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="help-centre"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="help-upload"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="return-success"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="cancel-order"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="confirm-cancellation"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="cancellation-success"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="reviews"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="write-to-us"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="feedback-success"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
      <Tabs.Screen
        name="review-success"
        options={{ href: null, tabBarStyle: { display: 'none' } }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    backgroundColor: colors.cream,
    borderTopWidth: 0,
    elevation: 0,
  },
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
