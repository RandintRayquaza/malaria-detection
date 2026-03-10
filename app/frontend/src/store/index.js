import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from '../features/home/state/onboardingSlice';
import authReducer from '../features/auth/state/authSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    auth: authReducer,
  },
});

