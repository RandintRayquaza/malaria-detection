// Base URL for all backend requests.
// Set EXPO_PUBLIC_API_URL in .env (e.g. http://192.168.x.x:3000 for a real device).
const raw = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
export const API_BASE_URL = raw.replace(/\/$/, '');
