import React from 'react';
import { View, Text } from 'react-native';

/** Step-flow diagram illustration for the How It Works screen */
export function HowItWorksIllustration() {
  const nodes = [
    { icon: '📷', label: 'Capture' },
    { icon: '🧠', label: 'Analyse' },
    { icon: '✅', label: 'Result' },
  ];

  return (
    <View className="w-72 h-56 items-center justify-center">
      {/* Background card */}
      <View className="absolute w-72 h-52 bg-primary-50 rounded-3xl" />

      <View className="flex-row items-center gap-2 px-6">
        {nodes.map((node, i) => (
          <React.Fragment key={node.label}>
            {/* Node */}
            <View className="items-center gap-2">
              <View className="w-16 h-16 rounded-2xl bg-white shadow items-center justify-center border border-primary-100">
                <Text style={{ fontSize: 28 }}>{node.icon}</Text>
              </View>
              <Text className="text-xs font-semibold text-primary-700">{node.label}</Text>
            </View>

            {/* Connector arrow */}
            {i < nodes.length - 1 && (
              <View className="mb-5">
                <View className="w-6 h-0.5 bg-primary-300" />
                <View
                  className="absolute bg-primary-300"
                  style={{
                    width: 6,
                    height: 6,
                    right: -3,
                    top: -2.5,
                    transform: [{ rotate: '45deg' }],
                    borderTopWidth: 2,
                    borderRightWidth: 2,
                    borderColor: '#93C5FD',
                    backgroundColor: 'transparent',
                  }}
                />
              </View>
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Decorative circles */}
      <View className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary-200 opacity-50" />
      <View className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-accent opacity-30" />
    </View>
  );
}
