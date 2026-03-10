import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createScanRequest } from '../api';

export function useScan() {
  const { token, isLoggedIn } = useSelector((s) => s.auth);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function submitScan(imageUri) {
    if (!imageUri || !isLoggedIn || !token) return;
    setScanning(true);
    setError(null);
    setResult(null);
    try {
      const data = await createScanRequest(imageUri, token);
      setResult(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return { scanning, result, error, submitScan, reset, isLoggedIn };
}
