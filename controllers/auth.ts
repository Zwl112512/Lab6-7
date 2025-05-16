import { Context, Next } from 'koa';
import * as users from '../models/users';
import { validatePassword } from '../helpers/password';

/**
 * Basic Auth 中间件
 * 从 Authorization 头中提取 Basic 认证信息，并校验用户名与密码（密码使用哈希验证）
 */
export async function basicAuth(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;

  // 🔒 没有授权头：直接要求提供 Basic Auth
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    ctx.status = 401;
    ctx.set('WWW-Authenticate', 'Basic');
    ctx.body = 'Authentication required';
    return;
  }

  // 🧾 解析 Base64 内容：格式应为 admin:admin123
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString();
  const [username, password] = credentials.split(':');

  console.log('🟡 解码后的用户名:', username);
  console.log('🟡 解码后的密码:', password);

  // 🧑‍💻 查找用户资料（查数据库）+ 类型断言
  const user = await users.findByUsername(username) as {
    username: string;
    password: string;
    passwordsalt: string;
    role?: string;
  };

  if (!user) {
    ctx.status = 401;
    ctx.body = 'Invalid credentials (user not found)';
    return;
  }

  console.log('🟡 用户数据库密码:', user.password);
  console.log('🟡 用户 salt:', user.passwordsalt);

  // ✅ 使用哈希函数加盐比对密码
  const isValid = validatePassword(password, user.password, user.passwordsalt);
  console.log('🟡 密码验证结果:', isValid);

  if (!isValid) {
    ctx.status = 401;
    ctx.body = 'Invalid credentials (password mismatch)';
    return;
  }

  // 🎉 认证通过，保存用户信息
  ctx.state.user = user;
  await next();
}
