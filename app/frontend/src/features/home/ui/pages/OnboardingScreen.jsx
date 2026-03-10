import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useRouter } from 'expo-router';

import { useOnboarding } from '../../hooks/useOnboarding';
import { HowItWorksContent } from '../components/HowItWorksContent';
import { OnboardingPage } from '../components/OnboardingPage';

import { WelcomeIllustration } from '../../../../shared/assets/illustrations/WelcomeIllustration';
import { HowItWorksIllustration } from '../../../../shared/assets/illustrations/HowItWorksIllustration';
import { GetStartedIllustration } from '../../../../shared/assets/illustrations/GetStartedIllustration';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOTAL = 3;
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
export function OnboardingScreen() {
  const router = useRouter();
  const { currentStep, goToStep, finish, totalSteps } = useOnboarding();

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

  function handleSignup() {
    router.push('/signup');
  }

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ overflow: 'hidden' }}>

      <Animated.View
        style={[
          pagerStyle,
          { flexDirection: 'row', width: SCREEN_WIDTH * TOTAL, flex: 1 },
        ]}
      >
        {STEPS.map(({ Illustration, title, renderBody }, index) => (
          <OnboardingPage
            key={index}
            width={SCREEN_WIDTH}
            Illustration={Illustration}
            title={title}
            renderBody={renderBody}
            isActive={currentStep === index}
            isFinalStep={index === TOTAL - 1}
            totalSteps={totalSteps}
            currentStep={currentStep}
            onNext={handleNext}
            onScan={handleScan}
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        ))}
      </Animated.View>

    </SafeAreaView>
  );
}