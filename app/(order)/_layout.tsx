import { Stack } from 'expo-router';
import { UserProvider } from '../../hooks/UserContext';

export default function Layout() {
  return (
    <UserProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="detail"  options={{ headerShown: false }}/>
      <Stack.Screen name="success" options={{ headerShown: false }} />
      <Stack.Screen name="danger"  options={{ headerShown: false }}/>
      <Stack.Screen name="addPic"  options={{ headerShown: false }}/>
      <Stack.Screen name="mapsDestination" options={{ headerShown: false }} />
    </Stack>
    </UserProvider>
  );
}
