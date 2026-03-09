import '../global.css';
import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from '../src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ animation: 'none' }} />
            <Stack.Screen name="login" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="scan" options={{ animation: 'slide_from_right' }} />
          </Stack>
          <StatusBar style="auto" />
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
