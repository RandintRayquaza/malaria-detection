import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { loginStart, loginSuccess, loginFailure } from '../state/authSlice';
import { loginRequest } from '../api';

export function useLogin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) return;
    dispatch(loginStart());
    try {
      const data = await loginRequest(email.trim().toLowerCase(), password);
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      router.replace('/scan');
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }

  return { email, setEmail, password, setPassword, handleLogin, loading, error };
}
