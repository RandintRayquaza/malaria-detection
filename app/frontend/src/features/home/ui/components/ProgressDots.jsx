import React from 'react';
import { View } from 'react-native';

/**
 * Progress indicator dots for the onboarding pager.
 * @param {{ total: number, current: number }} props
 */
export function ProgressDots({ total, current }) {
  return (
    <View className="flex-row items-center" style={{ gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={
            i === current
              ? 'h-2 bg-primary-500 rounded-full'
              : 'w-2 h-2 bg-primary-200 rounded-full'
          }
          style={i === current ? { width: 24 } : undefined}
        />
      ))}
    </View>
  );
}
