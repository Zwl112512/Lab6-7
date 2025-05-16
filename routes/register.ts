// routes/register.ts
import Router from 'koa-router';
import * as users from '../models/users';
import { hashPassword } from '../helpers/password';
import { validate  } from '../controllers/validation';
import registerSchema from '../schemas/registerSchema';

const router = new Router();

// 注册接口：POST /register
router.post('/register', validate (registerSchema), async (ctx) => {
const { username, password, firstname, lastname, email } = ctx.request.body as {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
};

  // 简单检查字段（可扩展）
  if (!username || !password || !firstname || !lastname || !email) {
    ctx.status = 400;
    ctx.body = { error: 'Missing required fields' };
    return;
  }

  // 检查用户名是否已存在
  const existingUser = await users.findByUsername(username);
  if (existingUser) {
    ctx.status = 409;
    ctx.body = { error: 'Username already exists' };
    return;
  }

  // 生成 salt + 加密密码
  const salt = Math.random().toString(36).substring(2, 15);
  const hashedPassword = hashPassword(password, salt);

  // 准备用户对象
  const newUser = {
    username,
    password: hashedPassword,
    passwordsalt: salt,
    firstname,
    lastname,
    email,
  };

  // 插入数据库
  const result = await users.add(newUser);
  if (result.status === 201) {
    ctx.status = 201;
    ctx.body = { message: 'User registered successfully', username };
  } else {
    ctx.status = 500;
    ctx.body = { error: 'Database error', detail: result };
  }
});

export default router;
