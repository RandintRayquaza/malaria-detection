import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import { InputField } from '../components/InputField';
import { Button } from '../../../../shared/components/Button';
import { useSignup } from '../../hooks/useSignup';

const PASSWORD_LABELS = ['Very weak', 'Weak', 'Fair', 'Strong', 'Excellent'];

function ToggleRow({ label, value, onToggle }) {
  return (
    <Pressable className="flex-row items-center justify-between py-2" onPress={onToggle}>
      <Text className="text-sm text-gray-700 flex-1 pr-3">{label}</Text>
      <View
        className={[
          'w-6 h-6 rounded-md border-2 items-center justify-center',
          value ? 'bg-primary-500 border-primary-500' : 'border-gray-300 bg-white',
        ].join(' ')}
      >
        {value ? <Feather name="check" size={14} color="white" /> : null}
      </View>
    </Pressable>
  );
}

export function SignupScreen() {
  const router = useRouter();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    acceptTerms,
    setAcceptTerms,
    subscribeUpdates,
    setSubscribeUpdates,
    passwordScore,
    loading,
    error,
    handleSignup,
  } = useSignup();

  const heroY = useSharedValue(-30);
  const heroOpacity = useSharedValue(0);
  const formY = useSharedValue(40);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
    heroY.value = withSpring(0, { damping: 14, stiffness: 95 });
    heroOpacity.value = withTiming(1, { duration: 420 });
    formY.value = withDelay(150, withSpring(0, { damping: 14, stiffness: 90 }));
    formOpacity.value = withDelay(150, withTiming(1, { duration: 420, easing: Easing.out(Easing.quad) }));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroY.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  async function onSubmit() {
    const success = await handleSignup();
    if (success) router.replace('/next');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-4">
          <Button
            label="Back"
            variant="ghost"
            icon="arrow-left"
            iconLeft
            onPress={() => router.back()}
          />
        </View>

        <Animated.View style={heroStyle} className="px-6 pt-6 pb-2">
          <View className="w-20 h-20 rounded-3xl bg-primary-100 items-center justify-center mb-4">
            <Feather name="user-plus" size={34} color="#0F82F5" />
          </View>
          <Text className="text-3xl font-bold text-gray-900">Create your account</Text>
          <Text className="text-base text-gray-500 mt-2">
            Join the malaria detection workspace with secure access and personalized setup.
          </Text>
        </Animated.View>

        <Animated.View style={formStyle} className="px-6 pt-4">
          <InputField
            icon="user"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="Amina Yusuf"
            autoCapitalize="words"
          />
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
            placeholder="Create a secure password"
            secureTextEntry
          />
          <InputField
            icon="shield"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter password"
            secureTextEntry
          />

          <View className="mb-4 mt-1">
            <View className="flex-row items-center justify-between mb-1">
              <Text className="text-sm text-gray-600">Password Strength</Text>
              <Text className="text-sm text-primary-600 font-medium">{PASSWORD_LABELS[passwordScore]}</Text>
            </View>
            <View className="flex-row" style={{ gap: 6 }}>
              {[1, 2, 3, 4].map((step) => (
                <View
                  key={step}
                  className={[
                    'h-2 flex-1 rounded-full',
                    passwordScore >= step ? 'bg-primary-500' : 'bg-gray-200',
                  ].join(' ')}
                />
              ))}
            </View>
          </View>

          <View className="mb-4 rounded-2xl border border-gray-200 px-4 py-3 bg-gray-50">
            <ToggleRow
              label="I agree to the terms and privacy policy"
              value={acceptTerms}
              onToggle={() => setAcceptTerms((prev) => !prev)}
            />
            <View className="h-px bg-gray-200 my-2" />
            <ToggleRow
              label="Send me product and model update emails"
              value={subscribeUpdates}
              onToggle={() => setSubscribeUpdates((prev) => !prev)}
            />
          </View>

          {error ? (
            <View className="flex-row items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <Feather name="alert-circle" size={16} color="#EF4444" style={{ marginRight: 8 }} />
              <Text className="text-sm text-red-600 flex-1">{error}</Text>
            </View>
          ) : null}

          <View style={{ gap: 12 }}>
            <Button
              label={loading ? 'Creating account…' : 'Create Account'}
              icon="arrow-right"
              onPress={onSubmit}
              disabled={loading}
            />
            <Button
              label="Already have an account"
              variant="outline"
              icon="log-in"
              onPress={() => router.replace('/login')}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}