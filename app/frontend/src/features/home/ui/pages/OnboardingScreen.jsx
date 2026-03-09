import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { useOnboarding } from '../../hooks/useOnboarding';
import { ProgressDots } from '../components/ProgressDots';
import { Button } from '../../../../shared/components/Button';
import { WelcomeIllustration } from '../../../../shared/assets/illustrations/WelcomeIllustration';
import { HowItWorksIllustration } from '../../../../shared/assets/illustrations/HowItWorksIllustration';
import { GetStartedIllustration } from '../../../../shared/assets/illustrations/GetStartedIllustration';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL = 3;

// ─── Data ────────────────────────────────────────────────────────────────────
const HOW_IT_WORKS_STEPS = [
  { number: '1', text: 'Upload or capture a blood cell image' },
  { number: '2', text: 'AI analyzes the image' },
  { number: '3', text: 'The system predicts malaria infection' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StepContent({ step }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 450, easing: Easing.out(Easing.quad) });
    translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={style} className="flex-1">
      {step}
    </Animated.View>
  );
}

function IllustrationFade({ children }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={style} className="flex-1 items-center justify-center">
      {children}
    </Animated.View>
  );
}

function HowItWorksContent() {
  return (
    <View style={{ gap: 14 }}>
      {HOW_IT_WORKS_STEPS.map((s) => (
        <View key={s.number} className="flex-row items-center" style={{ gap: 14 }}>
          <View className="w-9 h-9 rounded-full bg-primary-500 items-center justify-center">
            <Text className="text-white font-bold text-sm">{s.number}</Text>
          </View>
          <Text className="flex-1 text-base text-gray-600 leading-relaxed">{s.text}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Step definitions ────────────────────────────────────────────────────────
const STEPS = [
  {
    Illustration: WelcomeIllustration,
    title: 'Hello, Welcome',
    renderBody: () => (
      <Text className="text-base text-gray-500 leading-relaxed mb-8">
        This app helps detect malaria from microscope images using AI.
      </Text>
    ),
  },
  {
    Illustration: HowItWorksIllustration,
    title: 'How It Works',
    renderBody: () => (
      <View className="mb-8">
        <HowItWorksContent />
      </View>
    ),
  },
  {
    Illustration: GetStartedIllustration,
    title: 'Ready to Start',
    renderBody: () => (
      <Text className="text-base text-gray-500 leading-relaxed mb-8">
        Ready to start detecting malaria using AI.
      </Text>
    ),
  },
];

// ─── Main screen ─────────────────────────────────────────────────────────────
export function OnboardingScreen() {
  const router = useRouter();
  const { currentStep, goToStep, finish, totalSteps } = useOnboarding();

  // Horizontal pager offset
  const pagerX = useSharedValue(0);

  useEffect(() => {
    pagerX.value = withTiming(-currentStep * SCREEN_WIDTH, {
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentStep]);

  const pagerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pagerX.value }],
  }));

  function handleNext() {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    }
  }

  function handleScan() {
    finish();
    router.replace('/scan');
  }

  function handleLogin() {
    router.push('/login');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ overflow: 'hidden' }}>
      {/* Pager container: all 3 pages laid out horizontally */}
      <Animated.View
        style={[pagerStyle, { flexDirection: 'row', width: SCREEN_WIDTH * TOTAL, flex: 1 }]}
      >
        {STEPS.map(({ Illustration, title, renderBody }, index) => (
          <View
            key={index}
            style={{ width: SCREEN_WIDTH }}
            className="flex-1 px-6 pb-6"
          >
            {/* Illustration area */}
            <IllustrationFade key={`ill-${index}`}>
              <Illustration />
            </IllustrationFade>

            {/* Text content — animates in when this page is current */}
            <StepContent key={`content-${index}-${currentStep === index}`} step={
              <View>
                {/* Title */}
                <Text className="text-3xl font-bold text-gray-900 mb-3">{title}</Text>

                {/* Body */}
                {renderBody()}

                {/* Progress dots */}
                <View className="items-center mb-6">
                  <ProgressDots total={totalSteps} current={currentStep} />
                </View>

                {/* Actions */}
                {index === 2 ? (
                  <View style={{ gap: 12 }}>
                    <Button label="Start Scan" onPress={handleScan} />
                    <Button label="Login" variant="outline" onPress={handleLogin} />
                  </View>
                ) : (
                  <Button label="Next" onPress={handleNext} />
                )}
              </View>
            } />
          </View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
}
