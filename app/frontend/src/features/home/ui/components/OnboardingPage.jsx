import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import { ProgressDots } from './ProgressDots';
import { Button } from '../../../../shared/components/Button';

export function OnboardingPage({
  width,
  Illustration,
  title,
  renderBody,
  isActive,
  isFinalStep,
  totalSteps,
  currentStep,
  onNext,
  onScan,
  onLogin,
  onSignup,
}) {
  const illScale = useSharedValue(0.82);
  const illOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textY = useSharedValue(28);
  const wasActive = useRef(false);

  useEffect(() => {
    if (isActive) {
      illScale.value = withSpring(1, { damping: 14, stiffness: 90 });
      illOpacity.value = withTiming(1, { duration: 380 });
      textOpacity.value = withTiming(1, {
        duration: 420,
        easing: Easing.out(Easing.quad),
      });
      textY.value = withSpring(0, { damping: 14, stiffness: 120 });
    } else if (wasActive.current) {
      illScale.value = withTiming(0.88, { duration: 220 });
      illOpacity.value = withTiming(0.55, { duration: 220 });
      textOpacity.value = withTiming(0, { duration: 160 });
      textY.value = withTiming(16, { duration: 180 });
    }

    wasActive.current = isActive;
  }, [isActive]);

  const illStyle = useAnimatedStyle(() => ({
    transform: [{ scale: illScale.value }],
    opacity: illOpacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }));

  return (
    <View style={{ width }} className="flex-1 px-6 pb-6">
      <Animated.View
        style={[illStyle, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}
      >
        <Illustration />
      </Animated.View>

      <Animated.View style={textStyle}>
        <Text className="text-3xl font-bold text-gray-900 mb-3">{title}</Text>

        {renderBody()}

        <View className="items-center mb-6">
          <ProgressDots total={totalSteps} current={currentStep} />
        </View>

        {isFinalStep ? (
          <View style={{ gap: 12 }}>
            <Button label="Start Scan" icon="camera" onPress={onScan} />
            <Button label="Create Account" icon="user-plus" variant="outline" onPress={onSignup} />
            <Button label="Login" icon="log-in" variant="ghost" onPress={onLogin} />
          </View>
        ) : (
          <Button label="Next" icon="arrow-right" onPress={onNext} />
        )}
      </Animated.View>
    </View>
  );
}
