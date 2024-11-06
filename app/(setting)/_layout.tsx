import { Stack } from 'expo-router';
import { UserProvider } from '../../hooks/UserContext';

export default function Layout() {
  return (
    <UserProvider>
    <Stack>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" />
      <Stack.Screen name="language" options={{ headerShown: false }} />
      <Stack.Screen name="helpcen" />
      <Stack.Screen name="policy" />
      <Stack.Screen name="about"  />
      <Stack.Screen name="notification" options={{ headerShown: false }} />
      <Stack.Screen name="upDoc"  />
    </Stack>
    </UserProvider>
  );
}
