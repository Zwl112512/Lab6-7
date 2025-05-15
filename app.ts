// app.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import passport from 'koa-passport';
import usersRoutes from './routes/users';
import specialRoutes from './routes/special';
import privateRoutes from './routes/private';
import publicRoutes from './routes/public';


const app = new Koa();
app.use(bodyParser());

// 初始化认证机制
app.use(passport.initialize());

// 路由注册
app.use(usersRoutes.routes()).use(usersRoutes.allowedMethods());
app.use(specialRoutes.routes()).use(specialRoutes.allowedMethods());
app.use(publicRoutes.routes()).use(publicRoutes.allowedMethods());
app.use(privateRoutes.routes()).use(privateRoutes.allowedMethods());


// 启动服务
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
