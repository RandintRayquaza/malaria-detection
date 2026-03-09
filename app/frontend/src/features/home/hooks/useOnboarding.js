import { useDispatch, useSelector } from 'react-redux';
import { setStep, completeOnboarding } from '../state/onboardingSlice';

export const TOTAL_STEPS = 3;

export function useOnboarding() {
  const dispatch = useDispatch();
  const { currentStep, completed } = useSelector((s) => s.onboarding);

  function goToStep(step) {
    dispatch(setStep(step));
  }

  function finish() {
    dispatch(completeOnboarding());
  }

  return { currentStep, completed, goToStep, finish, totalSteps: TOTAL_STEPS };
}
