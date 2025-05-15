// controllers/auth.ts
import passport from 'koa-passport';
import { BasicStrategy } from 'passport-http';
import { RouterContext } from 'koa-router';
import * as users from '../models/users';

const verifyPassword = (user: any, password: string) => {
  return user.password === password; // 简单密码比对（生产环境应使用加密）
};

passport.use(new BasicStrategy(async (username, password, done) => {
  try {
    const result = await users.findByUsername(username);
    if (result.length === 0) {
      console.log(`❌ No user found: ${username}`);
      return done(null, false);
    }

    const user = result[0];
    if (verifyPassword(user, password)) {
      console.log(`✅ Auth success: ${username}`);
      return done(null, user);
    } else {
      console.log(`❌ Password incorrect for ${username}`);
      return done(null, false);
    }
  } catch (err) {
    console.error(`⚠️ Auth error:`, err);
    return done(err);
  }
}));

// 导出的中间件，用于路由保护
export const basicAuth = async (ctx: RouterContext, next: any) => {
  return passport.authenticate('basic', { session: false })(ctx, next);
};
