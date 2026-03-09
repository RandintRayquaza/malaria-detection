import React from 'react';
import { View, Text } from 'react-native';

/** AI-ready illustration for the Get Started screen */
export function GetStartedIllustration() {
  return (
    <View className="w-64 h-64 items-center justify-center">
      {/* Pulsing ring layers */}
      <View className="absolute w-56 h-56 rounded-full bg-primary-100 opacity-40" />
      <View className="absolute w-44 h-44 rounded-full bg-primary-200 opacity-50" />
      <View className="absolute w-32 h-32 rounded-full bg-primary-300 opacity-40" />

      {/* Central AI badge */}
      <View className="w-24 h-24 rounded-3xl bg-primary-500 items-center justify-center shadow-lg">
        <Text style={{ fontSize: 40 }}>🔬</Text>
      </View>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * 2 * Math.PI;
        const radius = 96;
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);
        return (
          <View
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary-400"
            style={{ marginLeft: x, marginTop: y, opacity: 0.8 }}
          />
        );
      })}

      {/* Checkmark badge */}
      <View className="absolute bottom-6 right-4 w-10 h-10 rounded-full bg-green-400 items-center justify-center">
        <Text className="text-white font-bold text-base">✓</Text>
      </View>
    </View>
  );
}
