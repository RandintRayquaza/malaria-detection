import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * @param {{ label: string, variant?: 'primary'|'outline', onPress?: () => void }} props
 */
export function Button({ label, variant = 'primary', onPress, ...rest }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={
        variant === 'primary'
          ? 'bg-primary-500 rounded-2xl py-4 px-8 items-center justify-center'
          : 'border-2 border-primary-500 rounded-2xl py-4 px-8 items-center justify-center'
      }
      onPressIn={() => { scale.value = withSpring(0.96, { damping: 12, stiffness: 200 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }); }}
      onPress={onPress}
      {...rest}
    >
      <Text
        className={
          variant === 'primary'
            ? 'text-white text-base font-semibold tracking-wide'
            : 'text-primary-500 text-base font-semibold tracking-wide'
        }
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}
