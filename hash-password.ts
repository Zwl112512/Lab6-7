import { hashPassword } from './helpers/password';

const password = 'admin123';
const salt = 'salt123';
const hashed = hashPassword(password, salt);

console.log('Hashed password:', hashed);
