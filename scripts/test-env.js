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

  console.log('🔍 加载环境文件:');

  // 从低优先级到高优先级加载
  envFiles.reverse().forEach(file => {
    const envPath = resolve(process.cwd(), file);
    console.log(`  📄 ${file} ${envPath}`);
    config({ path: envPath });
  });
};

// 加载环境变量
loadEnvFiles();

// 简化的环境变量配置
const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEBUG: process.env.DEBUG === 'true',
  PORT: parseInt(process.env.PORT || '3000'),
  HOST: process.env.HOST || 'localhost',
  DATABASE_URL: process.env.DATABASE_URL || '',
  DATABASE_NAME: process.env.DATABASE_NAME || 'imtp',
  JWT_SECRET: process.env.JWT_SECRET || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
  API_DOCS_URL: process.env.API_DOCS_URL || 'http://localhost:3000/api-docs',
  API_TYPES_OUTPUT:
    process.env.API_TYPES_OUTPUT ||
    'packages/types/src/api/generated/openapi.ts',
};

console.log('\n📊 当前环境变量:');
console.log(JSON.stringify(env, null, 2));

// 环境检测函数
const isDev = () => env.NODE_ENV === 'development';
const isProd = () => env.NODE_ENV === 'production';
const isTest = () => env.NODE_ENV === 'test';

console.log('\n🔧 环境检测:');
console.log(`  开发环境: ${isDev()}`);
console.log(`  生产环境: ${isProd()}`);
console.log(`  测试环境: ${isTest()}`);
