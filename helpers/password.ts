import crypto from 'crypto';

export function hashPassword(password: string, salt: string): string {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

export function validatePassword(
  inputPassword: string,
  storedHash: string,
  salt: string
): boolean {
  const inputHash = hashPassword(inputPassword, salt);
  return inputHash === storedHash;
}
