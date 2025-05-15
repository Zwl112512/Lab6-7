// routes/public.ts
import Router from 'koa-router';
import * as articlesModel from '../models/articles';

const publicRouter = new Router({ prefix: '/api/v1/public' });

publicRouter.get('/articles', async (ctx) => {
  const articles = await articlesModel.getAll();
  ctx.body = articles.length ? articles : {};
});

publicRouter.get('/articles/:id', async (ctx) => {
  const id = Number(ctx.params.id);
  const article = await articlesModel.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Not Found' };
  }
});

export default publicRouter;
