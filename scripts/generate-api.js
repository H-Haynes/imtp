#!/usr/bin/env node

import { execSync } from 'child_process';
import { resolve } from 'path';
import { config } from 'dotenv';

// 加载环境变量
const NODE_ENV = process.env.NODE_ENV || 'development';
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

// 从环境变量获取 API 配置
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
const API_DOCS_URL =
  process.env.API_DOCS_URL || `${API_BASE_URL.replace('/api', '')}/api-docs`;
const OUTPUT_PATH =
  process.env.API_TYPES_OUTPUT || 'packages/types/src/api/generated/openapi.ts';

console.log('🔧 生成 API 类型...');
console.log(`  API 文档地址: ${API_DOCS_URL}`);
console.log(`  输出路径: ${OUTPUT_PATH}`);

try {
  // 检查 openapi-typescript 是否安装
  try {
    execSync('openapi-typescript --version', { stdio: 'ignore' });
  } catch (error) {
    console.log('📦 正在安装 openapi-typescript...');
    execSync('pnpm add -D openapi-typescript', { stdio: 'inherit' });
  }

  // 使用 openapi-typescript 生成类型
  const command = `openapi-typescript "${API_DOCS_URL}" -o "${OUTPUT_PATH}"`;
  execSync(command, { stdio: 'inherit' });
  console.log('✅ API 类型生成完成！');
} catch (error) {
  console.log('⚠️  API 服务未运行，生成示例 API 类型...');

  // 生成示例 API 类型
  const exampleTypes = `// 示例 API 类型（API 服务未运行时生成）
// 当 API 服务运行时，此文件会被实际的 OpenAPI 文档生成的类型覆盖

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// 生成时间: ${new Date().toISOString()}
// 注意: 这是示例类型，实际使用时请确保 API 服务正在运行
`;

  // 确保输出目录存在
  const fs = await import('fs');
  const path = await import('path');
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 写入示例类型文件
  fs.writeFileSync(OUTPUT_PATH, exampleTypes, 'utf-8');
  console.log('✅ 示例 API 类型生成完成！');
  console.log(
    '💡 当 API 服务运行时，运行 pnpm generate:api 会生成实际的 API 类型'
  );
}
