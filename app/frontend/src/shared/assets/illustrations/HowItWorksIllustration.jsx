import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NODES = [
  { icon: 'camera',       color: '#0F82F5', bg: '#EEF7FF', label: 'Capture' },
  { icon: 'cpu',          color: '#7C3AED', bg: '#F5F3FF', label: 'Analyse' },
  { icon: 'check-circle', color: '#059669', bg: '#ECFDF5', label: 'Result'  },
];

export function HowItWorksIllustration() {
  return (
    <View className="w-72 h-52 items-center justify-center">
      {/* Card background */}
      <View className="absolute w-72 h-48 bg-gray-50 rounded-3xl border border-gray-100" />

      <View className="flex-row items-center px-6" style={{ gap: 6 }}>
        {NODES.map((node, i) => (
          <React.Fragment key={node.label}>
            {/* Step card */}
            <View className="items-center" style={{ gap: 8 }}>
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center shadow-sm"
                style={{ backgroundColor: node.bg, borderWidth: 1, borderColor: node.bg }}
              >
                <Feather name={node.icon} size={26} color={node.color} />
              </View>
              <Text className="text-xs font-semibold text-gray-600">{node.label}</Text>
            </View>
            {/* Arrow */}
            {i < NODES.length - 1 && (
              <View className="mb-5">
                <Feather name="chevron-right" size={20} color="#D1D5DB" />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Decorative dots */}
      <View className="absolute top-3 right-5 w-3 h-3 rounded-full bg-primary-200" />
      <View className="absolute bottom-3 left-5 w-2 h-2 rounded-full bg-red-200" />
    </View>
  );
}
