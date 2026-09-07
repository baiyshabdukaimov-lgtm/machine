const NOTIFICATIONS_KEY = 'mehanik-notifications-enabled';
const PAYMENT_METHODS_KEY = 'mehanik-payment-methods';

export function getNotificationsEnabled() {
  return localStorage.getItem(NOTIFICATIONS_KEY) !== 'false';
}

export function setNotificationsEnabled(enabled) {
  localStorage.setItem(NOTIFICATIONS_KEY, String(enabled));
  window.dispatchEvent(new CustomEvent('mehanik:notifications', { detail: enabled }));
}

export function getPaymentMethods() {
  try {
    return JSON.parse(localStorage.getItem(PAYMENT_METHODS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function savePaymentMethods(methods) {
  localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(methods));
}
