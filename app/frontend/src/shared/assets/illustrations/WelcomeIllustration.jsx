import React from 'react';
import { View } from 'react-native';

/** Microscope + blood cell illustration for the Welcome screen */
export function WelcomeIllustration() {
  return (
    <View className="w-64 h-64 items-center justify-center">
      {/* Background halos */}
      <View className="absolute w-56 h-56 rounded-full bg-primary-100 opacity-60" />
      <View className="absolute w-40 h-40 rounded-full bg-primary-200 opacity-50" />

      {/* Microscope body */}
      <View className="w-20 h-28 bg-primary-600 rounded-xl items-center justify-end pb-2" style={{ marginTop: 20 }}>
        {/* Eyepiece tube */}
        <View className="absolute bg-primary-800 rounded-full" style={{ width: 10, height: 36, top: -28 }} />
        {/* Eyepiece top */}
        <View className="absolute bg-primary-900 rounded-full" style={{ width: 18, height: 10, top: -34 }} />
        {/* Arm */}
        <View className="absolute bg-primary-700 rounded-r-xl" style={{ width: 10, height: 50, top: 12, right: 0 }} />
        {/* Objective lens */}
        <View className="w-9 h-9 rounded-full bg-primary-900 border-4 border-primary-300" />
        {/* Stage */}
        <View className="w-16 h-3 bg-primary-400 rounded-md mt-1" />
      </View>

      {/* Decorative blood cell */}
      <View
        className="absolute rounded-full border-4 border-red-400"
        style={{ width: 52, height: 52, bottom: 12, right: 12, opacity: 0.7 }}
      >
        <View
          className="absolute rounded-full bg-red-300"
          style={{ width: 20, height: 20, top: 10, left: 10, opacity: 0.5 }}
        />
      </View>

      {/* Side dots (DNA motif) */}
      {[0, 1, 2, 3].map((i) => (
        <View
          key={i}
          className="absolute rounded-full bg-primary-400"
          style={{ width: 10, height: 10, top: 20 + i * 20, left: 10 }}
        />
      ))}
    </View>
  );
}
