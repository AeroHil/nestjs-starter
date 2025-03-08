import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
    const env = process.env.NODE_ENV || 'development';

    const baseConfig = {
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        logging: process.env.DB_LOGGING === 'true',
        synchronize: env !== 'production', // Auto-sync schema in non-production
    };

    // SQLite configuration for development
    if (env === 'development') {
        return {
            ...baseConfig,
            type: 'sqlite',
            database: process.env.SQLITE_DATABASE || 'data/dev.sqlite',
        };
    }

    // PostgreSQL configuration for test/production
    return {
        ...baseConfig,
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: process.env.DB_SSL === 'true',
    };
});