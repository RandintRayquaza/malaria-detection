import { API_BASE_URL } from '../../../shared/config/api';

/**
 * Upload an image and get a malaria prediction.
 * @param {string} imageUri - Local file URI from expo-image-picker
 * @param {string} token    - JWT auth token
 */
export async function createScanRequest(imageUri, token) {
  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename ?? '');
  const mimeType = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

  const formData = new FormData();
  // React Native FormData accepts a file-like object with uri/type/name
  formData.append('image', { uri: imageUri, type: mimeType, name: filename ?? 'scan.jpg' });

  const res = await fetch(`${API_BASE_URL}/scan`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    // Do NOT set Content-Type manually — fetch sets multipart boundary automatically
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Scan failed');
  return data;
}

/**
 * Fetch paginated scan history for the current user.
 * @param {string} token
 * @param {number} [page=1]
 */
export async function getScanHistoryRequest(token, page = 1) {
  const res = await fetch(`${API_BASE_URL}/scan/history?page=${page}&limit=10`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch history');
  return data;
}

/**
 * Delete a scan by ID.
 * @param {string} token
 * @param {string} scanId
 */
export async function deleteScanRequest(token, scanId) {
  const res = await fetch(`${API_BASE_URL}/scan/${scanId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete scan');
  return data;
}
