// routes/users.ts
import Router from 'koa-router';
import * as model from '../models/users';

const router = new Router();

router.get('/users', async (ctx, next) => {
  let users = await model.getAll();
  ctx.body = users.length ? users : {};
  await next();
});

router.get('/users/:id', async (ctx, next) => {
  let id = ctx.params.id;
  let user = await model.getById(id);
  if (user.length) {
    ctx.body = user[0];
  } else {
    ctx.status = 404;
  }
  await next();
});

router.post('/users', async (ctx, next) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert user failed" };
  }
  await next();
});

router.put('/users/:id', async (ctx, next) => {
  const id = Number(ctx.params.id);
  const body = ctx.request.body;
  let result = await model.update(id, body);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { msg: "updated" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "update user failed" };
  }
  await next();
});

router.delete('/users/:id', async (ctx, next) => {
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
