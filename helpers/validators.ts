// helpers/validators.ts
import { Validator } from 'jsonschema';

const v = new Validator();

// 用户 JSON 验证 schema
export const userSchema = {
  id: '/User',
  type: 'object',
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    passwordsalt: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  required: ['firstname', 'lastname', 'username', 'password', 'passwordsalt', 'email']
};

// 文章 JSON 验证 schema
export const articleSchema = {
  id: '/Article',
  type: 'object',
  properties: {
    title: { type: 'string' },
    alltext: { type: 'string' },
    summary: { type: 'string' },
    authorid: { type: 'number' },
    published: { type: 'boolean' }
  },
  required: ['title', 'alltext', 'summary', 'authorid', 'published']
};

// 验证函数
export const validateJson = (data: any, schema: any) => {
  return v.validate(data, schema);
};
