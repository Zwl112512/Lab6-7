// backend/helpers/jwt.ts
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'zwl112512'; // ✅ 建议后续用环境变量管理

// 生成 JWT（有效期 1 小时）
export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

// 验证 JWT 并返回解码后的内容
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}
