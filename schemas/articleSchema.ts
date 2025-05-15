export const articleSchema = {
  type: 'object',
  required: ['title', 'alltext', 'summary', 'published', 'authorid'],
  properties: {
    title: { type: 'string' },
    alltext: { type: 'string' },
    summary: { type: 'string' },
    imageurl: { type: 'string' },
    published: { type: 'boolean' },
    authorid: { type: 'number' },
  },
  additionalProperties: false,
};
