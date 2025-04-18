// routes/articles.ts
import Router from 'koa-router';
import { Context, Next } from 'koa';
import * as model from '../models/articles';

const router = new Router();

router.get('/articles', async (ctx: Context, next: Next) => {
  let articles = await model.getAll();
  ctx.body = articles.length ? articles : {};
  await next();
});

router.get('/articles/:id', async (ctx: Context, next: Next) => {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
  await next();
});

router.post('/articles', async (ctx: Context, next: Next) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
});

// 更新
router.put('/articles/:id', async (ctx: Context, next: Next) => {
  const id = Number(ctx.params.id);
  const body = ctx.request.body;
  let result = await model.update(id, body);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { msg: "updated" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "update data failed" };
  }
  await next();
});

// 删除
router.delete('/articles/:id', async (ctx: Context, next: Next) => {
  const id = Number(ctx.params.id);
  let result = await model.remove(id);
  if (result.status == 200) {
    ctx.status = 200;
    ctx.body = { msg: "deleted" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete data failed" };
  }
  await next();
});

export default router;
