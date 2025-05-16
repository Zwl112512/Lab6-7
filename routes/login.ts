import Router from 'koa-router';
import * as users from '../models/users';
import { validatePassword } from '../helpers/password';
import { generateToken } from '../helpers/jwt';

const router = new Router();

router.post('/login', async (ctx) => {
  // 👇 添加类型断言
  const { username, password } = ctx.request.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password required' };
    return;
  }

  const user = await users.findByUsername(username) as {
    id: number;
    username: string;
    password: string;
    passwordsalt: string;
  };

  if (!user || !validatePassword(password, user.password, user.passwordsalt)) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid username or password' };
    return;
  }

  const token = generateToken({ id: user.id, username: user.username });

  ctx.body = {
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.username === 'admin' ? 'admin' : 'user'
    }
  };
});

export default router;
