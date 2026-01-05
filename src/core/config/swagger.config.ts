import type { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as redoc from 'redoc-express';
import { config } from './index.js';

/**
 * Swagger/OpenAPI Configuration
 */
const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js TypeScript API',
      version: '2.0.0',
      description: `
# Enterprise-grade Node.js TypeScript API

This API follows Clean Architecture principles with:
- **API Versioning**: Support for multiple API versions (v1, v2)
- **Feature-based Architecture**: Organized by business domains
- **SOLID Principles**: Dependency injection and separation of concerns
- **Type Safety**: Full TypeScript implementation
- **Documentation**: Swagger UI and ReDoc

## Authentication

Most endpoints require authentication using JWT tokens:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Versioning

The API supports versioning through multiple methods:

1. **URL Path** (Recommended): \`/api/v1/users\`
2. **Header**: \`API-Version: v1\`
3. **Query Parameter**: \`/api/users?version=v1\`

## Rate Limiting

API requests are rate-limited:
- **General API**: 100 requests per 15 minutes
- **Auth Endpoints**: 5 requests per 15 minutes

## Error Handling

All errors follow a consistent format:

\`\`\`json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  },
  "meta": {
    "timestamp": "2025-01-05T10:00:00.000Z",
    "path": "/api/v1/users"
  }
}
\`\`\`
`,
      contact: {
        name: 'Otabek Sadiridinov',
        url: 'https://github.com/otabekoff',
        email: 'otabek@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: 'Development server',
      },
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints (API v1)',
      },
      {
        name: 'Users V2',
        description: 'User management endpoints (API v2 - Enhanced)',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'object',
              properties: {
                code: {
                  type: 'string',
                  example: 'VALIDATION_ERROR',
                },
                message: {
                  type: 'string',
                  example: 'Validation failed',
                },
                details: {
                  type: 'object',
                },
              },
            },
            meta: {
              type: 'object',
              properties: {
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                },
                path: {
                  type: 'string',
                },
              },
            },
          },
        },
        ValidationError: {
          allOf: [
            { $ref: '#/components/schemas/Error' },
            {
              type: 'object',
              properties: {
                error: {
                  type: 'object',
                  properties: {
                    details: {
                      type: 'object',
                      example: {
                        email: ['Invalid email address'],
                        password: ['Password must be at least 8 characters'],
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: 'cj3k4l5m6n7o8p9q0',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              example: 'user',
            },
          },
        },
        UserV2: {
          allOf: [
            { $ref: '#/components/schemas/User' },
            {
              type: 'object',
              properties: {
                isActive: {
                  type: 'boolean',
                  example: true,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
                profile: {
                  type: 'object',
                  properties: {
                    displayName: {
                      type: 'string',
                    },
                    status: {
                      type: 'string',
                      enum: ['active', 'inactive'],
                    },
                  },
                },
              },
            },
          ],
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully',
            },
            data: {
              type: 'object',
            },
            meta: {
              type: 'object',
              properties: {
                timestamp: {
                  type: 'string',
                  format: 'date-time',
                },
                requestId: {
                  type: 'string',
                },
                version: {
                  type: 'string',
                  example: 'v1',
                },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'AUTHENTICATION_ERROR',
                  message: 'Authentication required',
                },
              },
            },
          },
        },
        ForbiddenError: {
          description: 'User does not have permission to access this resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'AUTHORIZATION_ERROR',
                  message: 'Insufficient permissions',
                },
              },
            },
          },
        },
        NotFoundError: {
          description: 'The requested resource was not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
              example: {
                success: false,
                error: {
                  code: 'NOT_FOUND',
                  message: 'Resource not found',
                },
              },
            },
          },
        },
        ValidationError: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError',
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/routes/**/*.ts', './src/features/**/presentation/controllers/*.ts'],
};

/**
 * Generate Swagger specification
 */
const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * Setup Swagger UI and ReDoc
 */
export function setupSwagger(app: Application): void {
  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'API Documentation',
    }),
  );

  // ReDoc - using default export
  const redocHandler = (redoc as unknown as { default: unknown }).default || redoc;
  if (typeof redocHandler === 'function') {
    app.get(
      '/redoc',
      redocHandler(swaggerSpec, {
        title: 'API Documentation',
        theme: {
          colors: {
            primary: {
              main: '#2563eb',
            },
          },
        },
      }),
    );
  }

  // Swagger JSON endpoint
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
