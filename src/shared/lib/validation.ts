const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[6-9]\d{9}$/

export function isValidEmail(value: string) {
  return EMAIL_REGEX.test(value.trim())
}

export function isValidPhone(value: string) {
  return PHONE_REGEX.test(value.replace(/\s/g, ''))
}

export function isValidContact(value: string) {
  const trimmed = value.trim()
  return isValidEmail(trimmed) || isValidPhone(trimmed)
}
