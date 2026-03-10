import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

/** Welcome illustration — microscope / activity motif */
export function WelcomeIllustration() {
  return (
    <View className="w-64 h-64 items-center justify-center">
      {/* Concentric halos */}
      <View className="absolute w-56 h-56 rounded-full bg-primary-50" />
      <View className="absolute w-44 h-44 rounded-full bg-primary-100" />
      <View className="absolute w-32 h-32 rounded-full bg-primary-200" />

      {/* Central icon badge */}
      <View className="w-20 h-20 rounded-3xl bg-primary-500 items-center justify-center">
        <Feather name="activity" size={40} color="white" />
      </View>

      {/* Floating accent badges */}
      <View className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white shadow items-center justify-center">
        <Feather name="eye" size={18} color="#0F82F5" />
      </View>
      <View className="absolute bottom-8 left-4 w-9 h-9 rounded-2xl bg-white shadow items-center justify-center">
        <Feather name="cpu" size={16} color="#E32B2B" />
      </View>
      <View className="absolute top-14 left-2 w-3 h-3 rounded-full bg-primary-300" />
      <View className="absolute bottom-14 right-2 w-2 h-2 rounded-full bg-primary-400" />
    </View>
  );
}
