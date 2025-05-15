// routes/special.ts
import Router from 'koa-router';
import { basicAuth } from '../controllers/auth';

const router = new Router();

router.get('/special', basicAuth, async (ctx) => {
  const user = ctx.state.user;

  ctx.body = {
    message: 'You are authenticated!',
    user: user,
    role: user.username === 'admin' ? 'admin' : 'user'  // 判断角色
  };
});

export default router;
