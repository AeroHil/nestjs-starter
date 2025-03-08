import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import appConfig from './app.config';
import * as Joi from 'joi';
import { validationSchema } from './validation.schema';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, appConfig],
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            validationSchema,
        }),
    ],
})
export class ConfigModule {}