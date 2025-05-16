// schemas/registerSchema.ts

const registerSchema = {
  type: 'object',
  required: ['username', 'password', 'firstname', 'lastname', 'email'],
  properties: {
    username: { type: 'string', minLength: 3 },
    password: { type: 'string', minLength: 6 },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string', format: 'email' },
  },
  additionalProperties: false,
};

export default registerSchema;
