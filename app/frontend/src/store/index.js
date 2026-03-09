import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from '../features/home/state/onboardingSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
  },
});
