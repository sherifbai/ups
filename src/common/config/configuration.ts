import { registerAs } from '@nestjs/config';

export const CONFIG_APP_TOKEN = 'app';
export const CONFIG_PRISMA_DB_TOKEN = 'db';

export const appConfig = registerAs(CONFIG_APP_TOKEN, (): AppConfig => {
  return {
    mode: process.env.NODE_ENV,
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT) || 3000,
  };
});

export const dbConfig = registerAs(CONFIG_PRISMA_DB_TOKEN, () => ({
  url: process.env.DATABASE_URL,
}));

export type AppConfig = {
  host?: string;
  mode: string;
  port: number;
};
