// controllers/authJwt.ts
import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import config from '../config';

export async function jwtAuth(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;

  // ✅ 第①步：输出收到的 header 内容
  console.log('🔐 Received auth header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.status = 401;
    ctx.body = { error: 'Authorization header missing or invalid' };
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // ✅ 第②步：输出解析前的 token
    console.log('🟡 Token to verify:', token);

    const decoded = jwt.verify(token, config.jwtSecret);

    // ✅ 第③步：输出解析后的 user 内容
    console.log('✅ Token verified:', decoded);

    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid or expired token' };
  }
}
