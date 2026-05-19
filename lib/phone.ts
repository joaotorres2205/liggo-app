export function normalizePhoneNumber(value: string) {
  if (!value) return null;

  const cleaned = value.trim().replace(/[^+\d]/g, '');
  const plusPrefixed = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  const digits = plusPrefixed.replace(/[^\d]/g, '');
  const normalized = `+${digits}`;

  if (!/^[1-9]\d{9,14}$/.test(digits)) {
    return null;
  }

  return normalized;
}

export function isValidWhatsappNumber(value: string) {
  return Boolean(normalizePhoneNumber(value));
}
