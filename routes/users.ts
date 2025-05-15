import Router from 'koa-router';
import * as model from '../models/users';
import { validate } from '../controllers/validation';
import { userSchema } from '../schemas/userSchema';
import passport from 'koa-passport';

const router = new Router();

router.post('/users', validate(userSchema), async (ctx, next) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: 'insert user failed' };
  }
  await next();
});

router.put('/users/:id', validate(userSchema), async (ctx, next) => {
  const id = Number(ctx.params.id);
  const body = ctx.request.body;
  let result = await model.update(id, body);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { msg: 'updated' };
  } else {
    ctx.status = 500;
    ctx.body = { err: 'update user failed' };
  }
  await next();
});


router.delete('/users/:id', passport.authenticate('basic', { session: false }), async (ctx, next) => {
  const id = Number(ctx.params.id);
  let result = await model.remove(id);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { msg: "deleted" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete user failed" };
  }
  await next();
});

export default router;