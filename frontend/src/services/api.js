// Vercel: VITE_API_URL=https://your-render-service.onrender.com/api
// Local Vite proxies this relative path to Django (see vite.config.js).
const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

const buildHeaders = (token, extra = {}) => {
  const headers = { 'Content-Type': 'application/json', ...extra };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const api = {
  async get(endpoint, token = null) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: buildHeaders(token),
    });
    if (!res.ok) throw new Error('Ошибка запроса');
    return res.json();
  },

  async post(endpoint, payload, token = null) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = data.detail || data.non_field_errors?.[0] || 'Ошибка запроса';
      throw new Error(message);
    }
    return data;
  },

  async update(endpoint, payload, token = null) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: buildHeaders(token),
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = data.detail || 'Ошибка обновления';
      throw new Error(message);
    }
    return data;
  },
};

export default API_URL;
