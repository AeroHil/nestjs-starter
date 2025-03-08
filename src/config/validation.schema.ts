import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().default(3000),

  // SQLite specific config (development)
  SQLITE_DATABASE: Joi.string().when('NODE_ENV', {
    is: 'development',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  // PostgreSQL specific config (test/production)
  DB_HOST: Joi.string().when('NODE_ENV', {
    is: 'development',
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  DB_PORT: Joi.number().when('NODE_ENV', {
    is: 'development',
    then: Joi.optional(),
    otherwise: Joi.number().default(5432),
  }),
  DB_USERNAME: Joi.string().when('NODE_ENV', {
    is: 'development',
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  DB_PASSWORD: Joi.string().when('NODE_ENV', {
    is: 'development',
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  DB_DATABASE: Joi.string().when('NODE_ENV', {
    is: 'development',
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  DB_SSL: Joi.boolean().default(false),
  DB_LOGGING: Joi.boolean().default(true),
});
