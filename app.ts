// app.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import articlesRoutes from './routes/articles';
import usersRoutes from './routes/users';

const app = new Koa();
app.use(bodyParser());
app.use(articlesRoutes.routes());
app.use(usersRoutes.routes());

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
