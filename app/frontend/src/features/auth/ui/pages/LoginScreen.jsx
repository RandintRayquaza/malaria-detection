import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { useLogin } from '../../hooks/useLogin';
import { InputField } from '../components/InputField';
import { Button } from '../../../../shared/components/Button';

export function LoginScreen() {
  const router = useRouter();
  const { email, setEmail, password, setPassword, handleLogin, loading, error } = useLogin();

  // Entry animations
  const logoY = useSharedValue(-40);
  const logoOpacity = useSharedValue(0);
  const formY = useSharedValue(50);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    logoY.value = withSpring(0, { damping: 15, stiffness: 100 });
    logoOpacity.value = withTiming(1, { duration: 400 });
    formY.value = withDelay(180, withSpring(0, { damping: 14, stiffness: 90 }));
    formOpacity.value = withDelay(180, withTiming(1, { duration: 400, easing: Easing.out(Easing.quad) }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <View className="px-6 pt-4">
          <Button
            label="Back"
            variant="ghost"
            icon="arrow-left"
            iconLeft
            onPress={() => router.back()}
          />
        </View>

        {/* Logo / illustration area */}
        <Animated.View style={logoStyle} className="items-center pt-8 pb-6">
          <View className="w-24 h-24 rounded-3xl bg-primary-500 items-center justify-center shadow-lg mb-6">
            <Feather name="shield" size={44} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Login to Continue</Text>
          <Text className="text-base text-gray-400 mt-2 text-center px-8">
            Enter your credentials to access the malaria detection system.
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View style={formStyle} className="px-6 pt-2">
          <InputField
            icon="mail"
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
          />
          <InputField
            icon="lock"
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          {error ? (
            <View className="flex-row items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <Feather name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 8 }} />
              <Text className="text-sm text-red-600 flex-1">{error}</Text>
            </View>
          ) : null}

          <View className="mt-2" style={{ gap: 12 }}>
            <Button
              label={loading ? 'Logging in…' : 'Login'}
              icon="log-in"
              onPress={handleLogin}
              disabled={loading}
            />
            <Button
              label="Go Back"
              variant="outline"
              icon="arrow-left"
              iconLeft
              onPress={() => router.back()}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
