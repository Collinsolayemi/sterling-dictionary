export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'STERLING DICTIONARY API Documentation',
    description:
      'API documentation for the Sterling Dictionary ServerSide API.',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server',
    },
    {
      url: 'https://sterling-dictionary.onrender.com/api/v1',
      description: 'Development server',
    },
  ],
  paths: {
    '/signup': {
      post: {
        summary: 'Onboard new users',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/api/v1/login': {
      post: {
        summary: 'logging in users',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User logged in successfully',
          },
        },
      },
    },
  },
};
