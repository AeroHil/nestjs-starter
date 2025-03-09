import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('app.port');
  const apiPrefix = configService.get('app.apiPrefix');
  const apiVersion = configService.get('app.apiVersion');

  // Global prefix for all routes (e.g., /api/v1)
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  // Global pipes, filters, and interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger configuration (enable only when not in production)
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('NestJS API Documentation')
        .setDescription('NestJS API Starter')
        .setVersion('1.0')
        .addTag('your-api-tag')
        // Add bearer auth if your API uses JWT or other token auth
        // .addBearerAuth(
        //     {
        //       type: 'http',
        //       scheme: 'bearer',
        //       bearerFormat: 'JWT',
        //       name: 'JWT',
        //       description: 'Enter JWT token',
        //       in: 'header',
        //     },
        //     'JWT-auth', // This name here is important for reference in your controller
        // )
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
  /* eslint-disable no-console */
  console.log(`Application is running on port ${port} in ${configService.get('app.env')} mode`);
  console.log(`API is available at http://localhost:${port}/${apiPrefix}/${apiVersion}`);
}
bootstrap();
