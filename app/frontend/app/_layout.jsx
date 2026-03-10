import '../global.css';
import 'react-native-reanimated';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux';
import { store } from '../src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

// Inner component so it can access the Redux store through the Provider
function AuthGuard() {
  const { isLoggedIn } = useSelector((s) => s.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const currentRoute = segments[0];
    // If already logged in, redirect away from auth/onboarding screens to scan
    if (isLoggedIn && (currentRoute === 'index' || currentRoute === 'login' || currentRoute === 'signup')) {
      router.replace('/scan');
    }
  }, [isLoggedIn, segments]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <AuthGuard />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animation: 'none' }} />
            <Stack.Screen name="login" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="signup" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="next" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="scan" options={{ animation: 'none' }} />
          </Stack>
          <StatusBar style="auto" />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
