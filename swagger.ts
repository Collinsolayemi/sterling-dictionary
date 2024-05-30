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
    '/onboard-user': {
      post: {
        summary: 'Onboard Users',
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

    '/onboard-admin': {
      post: {
        summary: 'Onboard Admin',
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

    '/onboard-subadmin': {
      post: {
        summary: 'Onboard Sub-Admin',
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

    '/verify-otp': {
      post: {
        summary: 'Verify the otp sent to user',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  otp: { type: 'string' },
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
                  email: { type: 'string' },
                  newPassword: { type: 'string' },
                  confirmPassword: { type: 'string' },
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
                  link: { type: 'string' },
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
                  id: { type: 'string' },
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
                  id: { type: 'string' },
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

    '/all-existing-words': {
      get: {
        summary: 'Get all existing words',
        tags: ['Dictionary'],
        responses: {
          '200': {
            description: 'Successful operation',
          },
        },
      },
    },

    '/search-word': {
      post: {
        summary: 'Search for words',
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

    '/upload-many-word': {
      post: {
        summary: 'Upload many words at once by admin',
        tags: ['Dictionary'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    word: { type: 'string' },
                    meaning: { type: 'string' },
                  },
                  required: ['word', 'meaning'],
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid input format',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Error adding words and meanings',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },

    '/send-word-to-email': {
      post: {
        summary: 'Send unavailable word to admin email',
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
      JWT: [],
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
