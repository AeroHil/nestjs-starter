## Project Structure
```shell
nestjs-starter/
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   │   └── api-pagination.decorator.ts
│   │   ├── dto/
│   │   │   └── pagination-query.dto.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── transform.interceptor.ts
│   │   ├── interfaces/
│   │   │   └── base-entity.interface.ts
│   │   └── services/
│   │       └── database-health.service.ts
│   ├── config/
│   │   ├── config.module.ts
│   │   ├── database.config.ts
│   │   ├── app.config.ts
│   │   └── validation.schema.ts
│   ├── health/
│   │   ├── health.controller.ts
│   │   ├── health.module.ts
│   │   └── health.service.ts
│   ├── modules/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── update-user.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── user.controller.ts
│   │   │   ├── user.module.ts
│   │   │   └── user.service.ts
│   │   └── [other domain modules]/
│   ├── app.module.ts
│   └── main.ts
├── .env.development
├── .env.test
├── .env.production
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

## Summary
1. Core configuration files:
   - Database configuration with environment-specific settings 
   - Environment files for development, test, and production 
   - TypeORM connection setup with async factory

2. Complete API implementation:
   - User entity with CRUD operations
   - DTOs with validation 
   - Error handling with proper HTTP status codes 
   - Database connection test endpoint

3. Environment-specific database setup:
   - SQLite for development (file-based in the data directory)
   - PostgreSQL for test and production environments 
   - Proper configuration for each environment

4. Project configuration:
   - Updated package.json with cross-env for environment variables 
   - Proper TypeScript configuration 
   - NestJS CLI configuration

5. Documentation:
   - Detailed project structure 
   - Setup instructions 
   - Running commands for different environments

## Advanced

1. (Advanced) Modular Architecture
   - Separated Configuration: Created a dedicated config module with environment validation 
   - Domain-Based Structure: Organized code by business domains in the modules directory 
   - Common Components: Added a common directory for shared code (filters, interceptors, DTOs)
   - Health Monitoring: Added a dedicated health module for application monitoring

2. (Advanced) Improved Application Structure
   - Global Error Handling: Added HTTP exception filter for consistent error responses 
   - Response Transformation: Added interceptor to standardize API responses 
   - API Versioning: Implemented API versioning and prefixing 
   - Environment Configuration: Enhanced environment validation with Joi 
   - Route Organization: Created clear API paths with proper HTTP status codes

3. (Advanced) Enhanced Database Features
   - Pagination Support: Added reusable pagination for all collection endpoints 
   - Better Entity Design: Improved entity structure with proper indexing 
   - Health Checks: Dedicated database health check service 
   - Optimized Queries: Better repository patterns in service classes

4. (Advanced) Developer Experience
   - Consistent Response Format: All API responses follow the same structure 
   - Better Type Safety: Added interfaces and improved TypeScript usage 
   - Custom Decorators: Added utility decorators for common patterns 
   - Documentation Support: Added Swagger support for API documentation

5. (Advanced) Scalability Improvements
   - Proper Error Logging: Added error logging for better debugging 
   - Environment-Specific Config: Better separation of environment concerns 
   - Maintainable Structure: Code is now organized for future growth 
   - Modular Components: Easy to add new features without affecting existing code

## Getting Started

Install dependencies:

```bash
npm install
```

Data directory for SQLite:

```bash
mkdir -p data
touch data/.gitkeep
```
Running the application
To speed up dev process (20x faster builds use `-b swc`)

```bash
npm run start
npm run start -- -b swc 
```

Create a local `.env.development` variables file
```bash
touch .env.development
```
```text
SQLITE_DATABASE=data/dev.sqlite
DB_LOGGING=true
PORT=3000
NODE_ENV=development
API_PREFIX=api
API_VERSION=v1
APP_NAME=NestJS API
```

Run the development server (using SQLite) while watching file changes:

```bash
npm run start:dev
```

Run with test configuration (using PostgreSQL):

```bash
# Make sure PostgreSQL is running and the database exists
npm run start:test
```

Build and run for production:

```bash
npm run build
npm run start:prod
```

## Stack
- TypeScript
- [NestJS](https://docs.nestjs.com/)
- Express HTTP server (default)
- [TypeORM](https://typeorm.io/)
- Swagger UI