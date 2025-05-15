// controllers/validation.ts
import { Context, Next } from 'koa';
import { Validator } from 'jsonschema';

const v = new Validator();
export const validate = (schema: object) => {
  return async (ctx: Context, next: Next) => {
    const result = v.validate(ctx.request.body, schema);
    if (!result.valid) {
      ctx.status = 400;
      ctx.body = {
        error: 'Validation failed',
        details: result.errors.map(e => e.stack)
      };
      return;
    }
    await next();
  };
};

const articleSchema = {
  type: 'object',
  required: ['title', 'alltext', 'summary', 'imageurl', 'published', 'authorid'],
  properties: {
    title: { type: 'string' },
    alltext: { type: 'string' },
    summary: { type: 'string' },
    imageurl: { type: 'string', format: 'uri' },
    published: { type: 'boolean' },
    authorid: { type: 'integer' }
  }
};

const validator = new Validator();

export const validateArticle = async (ctx: Context, next: Next) => {
  const validationResult = validator.validate(ctx.request.body, articleSchema);

  if (!validationResult.valid) {
    ctx.status = 400;
    ctx.body = {
      error: 'JSON validation failed',
      details: validationResult.errors.map(e => e.stack)
    };
  } else {
    await next();
  }
};
