// routes/private.ts
import Router from 'koa-router';
import * as articlesModel from '../models/articles';
import passport from 'koa-passport';
import { validateArticle } from './../controllers/validation';

const privateRouter = new Router({ prefix: '/api/v1/private' });

// 需要认证
privateRouter.use(passport.authenticate('basic', { session: false }));

// POST /api/v1/private/articles
privateRouter.post('/articles', validateArticle, async (ctx) => {
  const result = await articlesModel.add(ctx.request.body);
  if (result.status === 201) {
    ctx.status = 201;
    ctx.body = ctx.request.body;
  } else {
    ctx.status = 500;
    ctx.body = { error: 'Insert failed' };
  }
});

// PUT /api/v1/private/articles/:id
privateRouter.put('/articles/:id', validateArticle, async (ctx) => {
  const id = Number(ctx.params.id);
  const result = await articlesModel.update(id, ctx.request.body);
  if (result.status === 200) {
    ctx.body = { msg: 'updated' };
  } else {
    ctx.status = 500;
    ctx.body = { error: 'Update failed' };
  }
});

// DELETE /api/v1/private/articles/:id
privateRouter.delete('/articles/:id', async (ctx) => {
  const id = Number(ctx.params.id);
  const result = await articlesModel.remove(id);
  if (result.status === 200) {
    ctx.body = { msg: 'deleted' };
  } else {
    ctx.status = 500;
    ctx.body = { error: 'Delete failed' };
  }
});

export default privateRouter;
