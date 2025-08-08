import { config } from 'dotenv';
import { resolve } from 'path';

// 获取当前环境
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * 加载环境变量文件
 * 按照 Vite 的优先级顺序加载：
 * 1. .env.local (最高优先级，不提交到版本控制)
 * 2. .env.[mode].local
 * 3. .env.[mode]
 * 4. .env (最低优先级)
 */
const loadEnvFiles = () => {
  const envFiles = [
    '.env',
    `.env.${NODE_ENV}`,
    `.env.${NODE_ENV}.local`,
    '.env.local',
  ];

  // 从低优先级到高优先级加载
  envFiles.reverse().forEach(file => {
    const envPath = resolve(process.cwd(), file);
    config({ path: envPath });
  });
};

// 加载环境变量
loadEnvFiles();

/**
 * 简化的环境变量配置
 */
export const env = {
  // 应用配置
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEBUG: process.env.DEBUG === 'true',
  PORT: parseInt(process.env.PORT || '3000'),
  HOST: process.env.HOST || 'localhost',

  // 数据库配置
  DATABASE_URL: process.env.DATABASE_URL || '',
  DATABASE_NAME: process.env.DATABASE_NAME || 'imtp',

  // Redis配置
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379'),

  // JWT配置
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // API配置
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  API_DOCS_URL: process.env.API_DOCS_URL || 'http://localhost:3000/api-docs',
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '5000'),
  API_TYPES_OUTPUT:
    process.env.API_TYPES_OUTPUT ||
    'packages/types/src/api/generated/openapi.ts',

  // 文件上传配置
  UPLOAD_MAX_SIZE: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760'),
  UPLOAD_ALLOWED_TYPES: (
    process.env.UPLOAD_ALLOWED_TYPES || 'image/jpeg,image/png,image/gif'
  ).split(','),

  // 邮件配置
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',

  // 第三方服务
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',

  // 监控配置
  SENTRY_DSN: process.env.SENTRY_DSN || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
} as const;

/**
 * 环境检测函数
 */
export const isDev = () => env.NODE_ENV === 'development';
export const isProd = () => env.NODE_ENV === 'production';
export const isTest = () => env.NODE_ENV === 'test';

/**
 * 验证必需的环境变量
 */
export const validateEnv = () => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !env[key as keyof typeof env]);

  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }

  return true;
};

/**
 * 获取配置组
 */
export const getConfig = {
  server: () => ({
    port: env.PORT,
    host: env.HOST,
    debug: env.DEBUG,
  }),

  database: () => ({
    url: env.DATABASE_URL,
    name: env.DATABASE_NAME,
  }),

  redis: () => ({
    url: env.REDIS_URL,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  }),

  jwt: () => ({
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  }),

  api: () => ({
    baseUrl: env.API_BASE_URL,
    timeout: env.API_TIMEOUT,
  }),

  upload: () => ({
    maxSize: env.UPLOAD_MAX_SIZE,
    allowedTypes: env.UPLOAD_ALLOWED_TYPES,
  }),

  mail: () => ({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  }),
};

// 导出类型
export type EnvConfig = typeof env;
