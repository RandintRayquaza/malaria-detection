import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isLoggedIn = true;
      // payload may be { user, token } (from backend) or a plain user object
      state.user = action.payload.user ?? action.payload;
      state.token = action.payload.token ?? null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError(state) {
      state.error = null;
    },
    updateUser(state, action) {
      state.user = { ...(state.user ?? {}), ...action.payload };
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, clearAuthError, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
