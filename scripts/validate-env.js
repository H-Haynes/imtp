#!/usr/bin/env node

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
const env = {
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
};

/**
 * 验证必需的环境变量
 */
const validateEnv = () => {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !env[key]);

  if (missing.length > 0) {
    console.error('❌ 缺少必需的环境变量:', missing);
    console.error('💡 请检查以下环境变量是否已设置:');
    missing.forEach(key => {
      console.error(`   - ${key}`);
    });
    return false;
  }

  // 验证环境变量格式
  const validationErrors = [];

  // 验证端口号
  if (env.PORT && (env.PORT < 1 || env.PORT > 65535)) {
    validationErrors.push(
      `PORT 必须是 1-65535 之间的数字，当前值: ${env.PORT}`
    );
  }

  // 验证 Redis 端口
  if (env.REDIS_PORT && (env.REDIS_PORT < 1 || env.REDIS_PORT > 65535)) {
    validationErrors.push(
      `REDIS_PORT 必须是 1-65535 之间的数字，当前值: ${env.REDIS_PORT}`
    );
  }

  // 验证 SMTP 端口
  if (env.SMTP_PORT && (env.SMTP_PORT < 1 || env.SMTP_PORT > 65535)) {
    validationErrors.push(
      `SMTP_PORT 必须是 1-65535 之间的数字，当前值: ${env.SMTP_PORT}`
    );
  }

  // 验证 API 超时时间
  if (env.API_TIMEOUT && env.API_TIMEOUT < 1000) {
    validationErrors.push(
      `API_TIMEOUT 必须大于 1000ms，当前值: ${env.API_TIMEOUT}`
    );
  }

  // 验证文件上传大小
  if (env.UPLOAD_MAX_SIZE && env.UPLOAD_MAX_SIZE < 1024) {
    validationErrors.push(
      `UPLOAD_MAX_SIZE 必须大于 1024 字节，当前值: ${env.UPLOAD_MAX_SIZE}`
    );
  }

  if (validationErrors.length > 0) {
    console.error('❌ 环境变量格式验证失败:');
    validationErrors.forEach(error => {
      console.error(`   - ${error}`);
    });
    return false;
  }

  return true;
};

// 执行验证
if (validateEnv()) {
  console.log('✅ 环境变量验证通过');
  console.log('📊 当前环境:', env.NODE_ENV);
  console.log('🔧 调试模式:', env.DEBUG);
  console.log('🌐 服务器地址:', `${env.HOST}:${env.PORT}`);
  console.log('🗄️  数据库:', env.DATABASE_NAME);
  console.log('📡 API 地址:', env.API_BASE_URL);
} else {
  console.log('💡 验证失败，请检查环境变量配置');
  process.exit(1);
}
