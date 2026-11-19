import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="get-started" />
      <Stack.Screen name="mobile-number" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
