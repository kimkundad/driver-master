import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState  } from 'react';
import 'react-native-reanimated';
import * as Font from 'expo-font';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Prompt_400Regular': require('../assets/fonts/Prompt-Regular.ttf'),
      'Prompt_500Medium': require('../assets/fonts/Prompt-Medium.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(alogin)" options={{ headerShown: false }} />
        <Stack.Screen name="(order)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(setting)" options={{ headerShown: false }}/>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
