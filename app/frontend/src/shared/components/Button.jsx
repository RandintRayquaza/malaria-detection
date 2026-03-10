import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const STYLES = {
  primary:  'bg-primary-500 rounded-2xl py-4 px-8 flex-row items-center justify-center',
  outline:  'border-2 border-primary-500 rounded-2xl py-4 px-8 flex-row items-center justify-center',
  ghost:    'py-2 px-3 flex-row items-center justify-center',
};

const TEXT_STYLES = {
  primary: 'text-white text-base font-semibold tracking-wide',
  outline: 'text-primary-500 text-base font-semibold tracking-wide',
  ghost:   'text-primary-500 text-sm font-semibold',
};

const ICON_COLORS = {
  primary: '#FFFFFF',
  outline: '#0F82F5',
  ghost:   '#0F82F5',
};

/**
 * @param {{ label: string, variant?: 'primary'|'outline'|'ghost', icon?: string, iconLeft?: boolean, onPress?: () => void }} props
 */
export function Button({ label, variant = 'primary', onPress, icon, iconLeft = false, disabled = false, ...rest }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  const iconEl = icon
    ? <Feather name={icon} size={18} color={ICON_COLORS[variant]} />
    : null;

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={STYLES[variant] ?? STYLES.primary}
      onPressIn={() => { if (!disabled) scale.value = withSpring(0.96, { damping: 12, stiffness: 200 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 12, stiffness: 200 }); }}
      onPress={disabled ? undefined : onPress}
      {...rest}
    >
      {iconLeft && iconEl ? <View style={{ marginRight: 8 }}>{iconEl}</View> : null}
      <Text className={TEXT_STYLES[variant] ?? TEXT_STYLES.primary}>
        {label}
      </Text>
      {!iconLeft && iconEl ? <View style={{ marginLeft: 8 }}>{iconEl}</View> : null}
    </AnimatedPressable>
  );
}
