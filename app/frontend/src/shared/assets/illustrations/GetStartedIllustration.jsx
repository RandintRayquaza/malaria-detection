import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function GetStartedIllustration() {
  const orbitIcons = [
    { name: 'camera',    angle: 0   },
    { name: 'upload',    angle: 60  },
    { name: 'bar-chart', angle: 120 },
    { name: 'zap',       angle: 180 },
    { name: 'shield',    angle: 240 },
    { name: 'check',     angle: 300 },
  ];
  const R = 90;

  return (
    <View className="w-64 h-64 items-center justify-center">
      {/* Pulsing rings */}
      <View className="absolute w-56 h-56 rounded-full bg-primary-50" />
      <View className="absolute w-40 h-40 rounded-full bg-primary-100" />

      {/* Central microscope badge */}
      <View className="w-20 h-20 rounded-3xl bg-primary-500 items-center justify-center">
        <Feather name="zap" size={38} color="white" />
      </View>

      {/* Check badge */}
      <View className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-green-500 items-center justify-center">
        <Feather name="check" size={18} color="white" />
      </View>

      {/* Orbiting icon dots */}
      {orbitIcons.slice(0, 4).map((item, i) => {
        const rad = (item.angle * Math.PI) / 180;
        return (
          <View
            key={i}
            className="absolute w-8 h-8 rounded-full bg-white shadow items-center justify-center"
            style={{
              marginLeft: Math.round(Math.cos(rad) * R),
              marginTop:  Math.round(Math.sin(rad) * R),
            }}
          >
            <Feather name={item.name} size={14} color="#0F82F5" />
          </View>
        );
      })}
    </View>
  );
}
