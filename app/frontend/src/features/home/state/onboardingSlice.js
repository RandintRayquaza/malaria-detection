import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    currentStep: 0,
    completed: false,
  },
  reducers: {
    setStep(state, action) {
      state.currentStep = action.payload;
    },
    completeOnboarding(state) {
      state.completed = true;
    },
  },
});

export const { setStep, completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
