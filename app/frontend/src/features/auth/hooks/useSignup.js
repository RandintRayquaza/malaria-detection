import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginFailure, loginStart, loginSuccess } from '../state/authSlice';
import { registerRequest } from '../api';

function getPasswordScore(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export function useSignup() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [subscribeUpdates, setSubscribeUpdates] = useState(true);

  const passwordScore = useMemo(() => getPasswordScore(password), [password]);

  function validateForm() {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      return 'Please complete all required fields.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }
    if (passwordScore < 3) {
      return 'Use a stronger password (8+ chars with number and uppercase/symbol).';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!acceptTerms) {
      return 'You must accept the terms to continue.';
    }
    return null;
  }

  async function handleSignup() {
    dispatch(clearAuthError());
    const validationError = validateForm();

    if (validationError) {
      dispatch(loginFailure(validationError));
      return false;
    }

    dispatch(loginStart());

    try {
      const data = await registerRequest(
        fullName.trim(),
        email.trim().toLowerCase(),
        password,
      );
      dispatch(loginSuccess({ user: data.user, token: data.token }));
      return true;
    } catch (err) {
      dispatch(loginFailure(err.message));
      return false;
    }
  }

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    acceptTerms,
    setAcceptTerms,
    subscribeUpdates,
    setSubscribeUpdates,
    passwordScore,
    loading,
    error,
    handleSignup,
  };
}