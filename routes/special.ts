// routes/special.ts
import Router from 'koa-router';
import { jwtAuth } from '../controllers/authJwt';

const router = new Router();

router.get('/special', jwtAuth, async (ctx) => {
  ctx.body = {
    message: '🎉 You are authenticated!',
    user: ctx.state.user
  };
});

export default router;
