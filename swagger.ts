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

    '/login': {
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
        security: [{ JWT: [] }], // Add security requirement for JWT token
      },
    },

    '/forget-password': {
      post: {
        summary: 'When a user forget their password',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/reset-password': {
      post: {
        summary: 'Reset password',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                  newPassword: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/upload-new-word': {
      post: {
        summary: 'Upload new word by admin',
        tags: ['Dictionary'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  word: { type: 'string' },
                  meaning: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/edit-existing-word': {
      post: {
        summary: 'Edit word or meaning by admin',
        tags: ['Dictionary'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  word: { type: 'string' },
                  changeWord: { type: 'string', nullable: true },
                  meaning: { type: 'string', nullable: true },
                },
              },
              required: ['word'],
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/delete-existing-word': {
      post: {
        summary: 'Delete word by admin',
        tags: ['Dictionary'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  word: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },
  },
  security: [
    {
      JWT: [], // Define the JWT security scheme
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: 'JWT Authorization header using the Bearer scheme',
      },
    },
  },
};