import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Import custom config module
    AppConfigModule,

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),

    // Feature modules
    UserModule,
    HealthModule,
  ],
})
export class AppModule {}
