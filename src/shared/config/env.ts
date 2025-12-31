import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['DEVELOPMENT', 'test', 'production']).default('DEVELOPMENT'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  // Adiciona aqui outras variáveis como JWT_SECRET, API_KEY, etc.
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables!', _env.error.format());
  throw new Error('Invalid environment variables.');
}

export const env = _env.data;