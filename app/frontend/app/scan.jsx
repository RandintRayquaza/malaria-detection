import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../src/features/auth/state/authSlice';
import { useScan } from '../src/features/malaria/hooks/useScan';
import { Button } from '../src/shared/components/Button';

export default function ScanScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((s) => s.auth);
  const { scanning, result, error, submitScan, reset } = useScan();

  const [imageUri, setImageUri] = useState(null);

  async function pickFromGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant gallery access to upload images.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.85,
    });
    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
      reset();
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera access.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.85 });
    if (!res.canceled) {
      setImageUri(res.assets[0].uri);
      reset();
    }
  }

  function clearImage() {
    setImageUri(null);
    reset();
  }

  const isParasitized = result?.prediction === 'Parasitized';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Malaria Scan</Text>
            <Text className="text-sm text-gray-500">
              {isLoggedIn ? `Hello, ${user?.name?.split(' ')[0] ?? 'User'}` : 'Upload a blood smear image'}
            </Text>
          </View>
          {isLoggedIn ? (
            <Pressable
              onPress={() => {
                Alert.alert('Logout', 'Are you sure you want to log out?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => {
                      dispatch(logout());
                      router.replace('/');
                    },
                  },
                ]);
              }}
              className="p-2"
            >
              <Feather name="log-out" size={22} color="#6B7280" />
            </Pressable>
          ) : (
            <Pressable onPress={() => router.push('/login')} className="p-2">
              <Feather name="user" size={22} color="#0F82F5" />
            </Pressable>
          )}
        </View>

        {/* ── Image area ── */}
        {imageUri ? (
          <View className="mb-6 rounded-2xl overflow-hidden bg-gray-100" style={{ height: 260 }}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: '100%', height: 260, resizeMode: 'cover' }}
            />
            <Pressable
              onPress={clearImage}
              className="absolute top-3 right-3 bg-black/50 rounded-full p-2"
            >
              <Feather name="x" size={18} color="white" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={pickFromGallery}
            className="mb-6 border-2 border-dashed border-gray-300 rounded-2xl items-center justify-center bg-gray-50"
            style={{ height: 220 }}
          >
            <Feather name="upload" size={44} color="#9CA3AF" />
            <Text className="text-base font-medium text-gray-500 mt-4">
              Tap to choose an image
            </Text>
            <Text className="text-sm text-gray-400 mt-1">JPG, PNG supported</Text>
          </Pressable>
        )}

        {/* ── Picker buttons ── */}
        <View className="flex-row mb-5" style={{ gap: 12 }}>
          <View className="flex-1">
            <Button
              label="Gallery"
              variant="outline"
              icon="image"
              iconLeft
              onPress={pickFromGallery}
            />
          </View>
          <View className="flex-1">
            <Button
              label="Camera"
              variant="outline"
              icon="camera"
              iconLeft
              onPress={takePhoto}
            />
          </View>
        </View>

        {/* ── Analyse button ── */}
        <Button
          label={scanning ? 'Analysing…' : 'Analyse Image'}
          icon={scanning ? undefined : 'cpu'}
          onPress={() => submitScan(imageUri)}
          disabled={!imageUri || scanning || !isLoggedIn}
        />

        {/* ── Not logged in nudge ── */}
        {!isLoggedIn && (
          <View className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-4">
            <View className="flex-row items-center mb-2">
              <Feather name="info" size={16} color="#3B82F6" style={{ marginRight: 8 }} />
              <Text className="text-sm font-semibold text-blue-700">
                Sign in to analyse images
              </Text>
            </View>
            <Text className="text-sm text-blue-600 mb-3">
              Create a free account to scan blood smear images and track your results.
            </Text>
            <View style={{ gap: 8 }}>
              <Button
                label="Login"
                icon="log-in"
                onPress={() => router.push('/login')}
              />
              <Button
                label="Create Account"
                variant="outline"
                icon="user-plus"
                onPress={() => router.push('/signup')}
              />
            </View>
          </View>
        )}

        {/* ── Error ── */}
        {error ? (
          <View className="mt-5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex-row items-start">
            <Feather
              name="alert-circle"
              size={16}
              color="#EF4444"
              style={{ marginRight: 8, marginTop: 1 }}
            />
            <Text className="text-sm text-red-600 flex-1">{error}</Text>
          </View>
        ) : null}

        {/* ── Result card ── */}
        {result ? (
          <View
            className={[
              'mt-6 rounded-2xl p-6 border',
              isParasitized
                ? 'bg-red-50 border-red-200'
                : 'bg-green-50 border-green-200',
            ].join(' ')}
          >
            {/* Title row */}
            <View className="flex-row items-center mb-4">
              <View
                className={[
                  'w-12 h-12 rounded-full items-center justify-center mr-3',
                  isParasitized ? 'bg-red-100' : 'bg-green-100',
                ].join(' ')}
              >
                <Feather
                  name={isParasitized ? 'alert-triangle' : 'check-circle'}
                  size={24}
                  color={isParasitized ? '#EF4444' : '#22C55E'}
                />
              </View>
              <Text
                className={[
                  'text-xl font-bold',
                  isParasitized ? 'text-red-700' : 'text-green-700',
                ].join(' ')}
              >
                {isParasitized ? 'Malaria Detected' : 'No Malaria Detected'}
              </Text>
            </View>

            {/* Stats */}
            <View
              className="flex-row rounded-xl overflow-hidden mb-4"
              style={{ gap: 1 }}
            >
              <View
                className={[
                  'flex-1 items-center py-3',
                  isParasitized ? 'bg-red-100' : 'bg-green-100',
                ].join(' ')}
              >
                <Text
                  className={[
                    'text-xs font-medium mb-1',
                    isParasitized ? 'text-red-500' : 'text-green-500',
                  ].join(' ')}
                >
                  Prediction
                </Text>
                <Text
                  className={[
                    'text-sm font-bold',
                    isParasitized ? 'text-red-700' : 'text-green-700',
                  ].join(' ')}
                >
                  {result.prediction}
                </Text>
              </View>
              <View
                className={[
                  'flex-1 items-center py-3',
                  isParasitized ? 'bg-red-100' : 'bg-green-100',
                ].join(' ')}
              >
                <Text
                  className={[
                    'text-xs font-medium mb-1',
                    isParasitized ? 'text-red-500' : 'text-green-500',
                  ].join(' ')}
                >
                  Confidence
                </Text>
                <Text
                  className={[
                    'text-sm font-bold',
                    isParasitized ? 'text-red-700' : 'text-green-700',
                  ].join(' ')}
                >
                  {(result.confidence * 100).toFixed(1)}%
                </Text>
              </View>
            </View>

            {isParasitized && (
              <View className="flex-row bg-red-100 rounded-xl px-3 py-2">
                <Feather
                  name="alert-triangle"
                  size={14}
                  color="#B91C1C"
                  style={{ marginRight: 6, marginTop: 1 }}
                />
                <Text className="text-xs text-red-700 flex-1">
                  This is an AI-assisted result only. Please consult a qualified medical
                  professional for diagnosis and treatment.
                </Text>
              </View>
            )}

            {/* Scan another */}
            <View style={{ marginTop: 16 }}>
              <Button
                label="Scan Another Image"
                variant="outline"
                icon="refresh-cw"
                iconLeft
                onPress={clearImage}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
