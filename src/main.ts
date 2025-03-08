import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    await app.listen(port);
    console.log(`Application is running on port ${port} in ${configService.get('app.env')} mode`);
    console.log(`API is available at http://localhost:${port}/${apiPrefix}/${apiVersion}`);
}
bootstrap();