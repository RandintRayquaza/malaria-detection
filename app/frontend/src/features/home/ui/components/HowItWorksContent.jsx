import React from 'react';
import { View, Text } from 'react-native';

const HOW_IT_WORKS_STEPS = [
  { number: '1', text: 'Upload or capture a blood cell image' },
  { number: '2', text: 'AI analyzes the image' },
  { number: '3', text: 'The system predicts malaria infection' },
];

export function HowItWorksContent() {
  return (
    <View style={{ gap: 14 }}>
      {HOW_IT_WORKS_STEPS.map((s) => (
        <View key={s.number} className="flex-row items-center" style={{ gap: 14 }}>
          <View className="w-9 h-9 rounded-full bg-primary-500 items-center justify-center">
            <Text className="text-white font-bold text-sm">{s.number}</Text>
          </View>
          <Text className="flex-1 text-base text-gray-600 leading-relaxed">
            {s.text}
          </Text>
        </View>
      ))}
    </View>
  );
}
