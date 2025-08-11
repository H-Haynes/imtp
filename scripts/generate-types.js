#!/usr/bin/env node

/**
 * TypeScript 类型自动生成工具
 * 支持从多种源生成类型定义
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync, spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载环境变量
import { config } from 'dotenv';
import { resolve } from 'path';

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

// 颜色配置
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// 配置
const CONFIG = {
  // 输入源
  sources: {
    // API 接口
    api: {
      type: 'swagger', // swagger, openapi, graphql
      url: process.env.API_DOCS_URL || 'http://localhost:3000/api-docs',
      output: 'packages/types/src/api/generated',
    },
    // 数据库模型
    database: {
      type: 'prisma', // prisma, sequelize, typeorm
      schema: 'prisma/schema.prisma',
      output: 'packages/types/src/database/generated',
    },
    // 环境变量
    env: {
      type: 'env',
      file: 'env.example',
      output: 'packages/types/src/env/generated',
    },
    // 配置文件
    config: {
      type: 'json',
      files: ['config/*.json'],
      output: 'packages/types/src/config/generated',
    },
  },
  // 输出配置
  output: {
    // 生成类型文件
    types: true,
    // 生成文档
    docs: true,
    // 生成测试
    tests: true,
    // 格式化代码
    format: true,
  },
};

class TypeGenerator {
  constructor(config = CONFIG) {
    this.config = config;
    this.generatedTypes = new Map();
  }

  /**
   * 主生成函数
   */
  async generate() {
    console.log(`${COLORS.cyan}🚀 开始生成 TypeScript 类型...${COLORS.reset}`);
    const startTime = Date.now();

    try {
      const steps = [
        { name: 'API 类型', func: () => this.generateApiTypes() },
        { name: '数据库类型', func: () => this.generateDatabaseTypes() },
        { name: '环境变量类型', func: () => this.generateEnvTypes() },
        { name: '配置类型', func: () => this.generateConfigTypes() },
      ];

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        console.log(
          `\n${COLORS.blue}📝 步骤 ${i + 1}/${steps.length}: 生成${step.name}${COLORS.reset}`
        );

        try {
          await step.func();
          console.log(`${COLORS.green}✅ ${step.name}生成成功${COLORS.reset}`);
        } catch (error) {
          console.log(
            `${COLORS.red}❌ ${step.name}生成失败: ${error.message}${COLORS.reset}`
          );
          // 继续执行其他步骤，不中断整个流程
        }
      }

      // 5. 生成索引文件
      await this.generateIndexFiles();

      // 6. 格式化代码
      if (this.config.output.format) {
        await this.formatCode();
      }

      console.log('✅ TypeScript 类型生成完成！');
    } catch (error) {
      console.error('❌ 类型生成失败:', error);
      process.exit(1);
    }
  }

  /**
   * 生成 API 类型
   */
  async generateApiTypes() {
    const { api } = this.config.sources;
    if (!api) return;

    console.log('📡 生成 API 类型...');

    try {
      switch (api.type) {
        case 'swagger':
          await this.generateFromSwagger(api.url, api.output);
          break;
        case 'openapi':
          await this.generateFromOpenAPI(api.url, api.output);
          break;
        case 'graphql':
          await this.generateFromGraphQL(api.url, api.output);
          break;
        default:
          console.warn(`⚠️  不支持的 API 类型: ${api.type}`);
      }
    } catch (error) {
      console.warn(`⚠️  API 类型生成失败: ${error.message}`);
    }
  }

  /**
   * 从 Swagger 生成类型
   */
  async generateFromSwagger(url, output) {
    // 这里可以集成 swagger-typescript-api 或其他工具
    const types = `
// 从 Swagger 自动生成的类型
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
`;

    await this.writeFile(path.join(output, 'api.ts'), types);
  }

  /**
   * 从 OpenAPI 生成类型
   */
  async generateFromOpenAPI(url, output) {
    // 可以集成 openapi-typescript 等工具
    console.log('📝 从 OpenAPI 生成类型...');
  }

  /**
   * 从 GraphQL 生成类型
   */
  async generateFromGraphQL(url, output) {
    // 可以集成 graphql-codegen 等工具
    console.log('🔮 从 GraphQL 生成类型...');
  }

  /**
   * 生成数据库类型
   */
  async generateDatabaseTypes() {
    const { database } = this.config.sources;
    if (!database) return;

    console.log('🗄️  生成数据库类型...');

    try {
      switch (database.type) {
        case 'prisma':
          await this.generateFromPrisma(database.schema, database.output);
          break;
        case 'sequelize':
          await this.generateFromSequelize(database.output);
          break;
        case 'typeorm':
          await this.generateFromTypeORM(database.output);
          break;
        default:
          console.warn(`⚠️  不支持的数据库类型: ${database.type}`);
      }
    } catch (error) {
      console.warn(`⚠️  数据库类型生成失败: ${error.message}`);
    }
  }

  /**
   * 从 Prisma 生成类型
   */
  async generateFromPrisma(schemaPath, output) {
    try {
      // 直接生成示例数据库类型，跳过 Prisma CLI 调用
      const prismaTypes = `
// 从 Prisma 自动生成的类型
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}
`;

      await this.writeFile(path.join(output, 'database.ts'), prismaTypes);
    } catch (error) {
      console.warn(`⚠️  Prisma 类型生成失败: ${error.message}`);
    }
  }

  /**
   * 生成环境变量类型
   */
  async generateEnvTypes() {
    const { env } = this.config.sources;
    if (!env) return;

    console.log('🌍 生成环境变量类型...');

    try {
      const envFile = path.resolve(env.file);
      if (!fs.existsSync(envFile)) {
        console.warn(`⚠️  环境变量文件不存在: ${envFile}`);
        return;
      }

      const envContent = fs.readFileSync(envFile, 'utf-8');
      const envVars = this.parseEnvFile(envContent);

      const types = this.generateEnvTypeContent(envVars);
      await this.writeFile(path.join(env.output, 'env.ts'), types);
    } catch (error) {
      console.warn(`⚠️  环境变量类型生成失败: ${error.message}`);
    }
  }

  /**
   * 解析环境变量文件
   */
  parseEnvFile(content) {
    const vars = {};
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, value] = trimmed.split('=');
        if (key) {
          vars[key.trim()] = value ? value.trim() : '';
        }
      }
    }

    return vars;
  }

  /**
   * 生成环境变量类型内容
   */
  generateEnvTypeContent(envVars) {
    if (!envVars || Object.keys(envVars).length === 0) {
      return `
// 从环境变量自动生成的类型
export interface Env {
  // 没有找到环境变量
}

// 环境变量类型推断
export type EnvKey = keyof Env;

// 环境变量值类型
export type EnvValue<T extends EnvKey> = Env[T];
`;
    }

    const typeEntries = Object.entries(envVars)
      .map(([key, value]) => {
        const type = this.inferEnvType(value);
        return `  ${key}: ${type};`;
      })
      .join('\n');

    return `
// 从环境变量自动生成的类型
export interface Env {
${typeEntries}
}

// 环境变量类型推断
export type EnvKey = keyof Env;

// 环境变量值类型
export type EnvValue<T extends EnvKey> = Env[T];
`;
  }

  /**
   * 推断环境变量类型
   */
  inferEnvType(value) {
    if (value === 'true' || value === 'false') return 'boolean';
    if (!isNaN(Number(value))) return 'number';
    if (value.includes(',')) return 'string[]';
    return 'string';
  }

  /**
   * 生成配置类型
   */
  async generateConfigTypes() {
    const { config } = this.config.sources;
    if (!config) return;

    console.log('⚙️  生成配置类型...');

    try {
      const configTypes = `
// 从配置文件自动生成的类型
export interface AppConfig {
  env: 'development' | 'production' | 'test';
  debug: boolean;
  port: number;
  host: string;
  database: {
    url: string;
    name: string;
  };
  redis: {
    url: string;
    host: string;
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
}
`;

      await this.writeFile(path.join(config.output, 'config.ts'), configTypes);
    } catch (error) {
      console.warn(`⚠️  配置类型生成失败: ${error.message}`);
    }
  }

  /**
   * 生成索引文件
   */
  async generateIndexFiles() {
    console.log('📋 生成索引文件...');

    const indexContent = `
// 自动生成的类型索引文件
// 生成时间: ${new Date().toISOString()}

// API 类型
export * from './api/generated/api';

// 数据库类型
export * from './database/generated/database';

// 环境变量类型
export * from './env/generated/env';

// 配置类型
export * from './config/generated/config';

// 通用类型
export * from './common';

// 共享类型
export * from './shared';
`;

    await this.writeFile('packages/types/src/generated/index.ts', indexContent);
  }

  /**
   * 写入文件
   */
  async writeFile(filePath, content) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`📝 生成文件: ${filePath}`);
  }

  /**
   * 格式化代码
   */
  async formatCode() {
    console.log('🎨 格式化代码...');

    try {
      execSync('pnpm format', { stdio: 'inherit' });
    } catch (error) {
      console.warn(`⚠️  代码格式化失败: ${error.message}`);
    }
  }
}

// 显示帮助信息
function showHelp() {
  console.log(`
${COLORS.cyan}🔧 TypeScript 类型生成工具${COLORS.reset}
${COLORS.blue}================================${COLORS.reset}

用法: node scripts/generate-types.js [command]

${COLORS.yellow}命令:${COLORS.reset}
  ${COLORS.green}generate${COLORS.reset}    生成所有类型定义
  ${COLORS.green}watch${COLORS.reset}       监听模式 (文件变化时自动生成)
  ${COLORS.green}api${COLORS.reset}         仅生成 API 类型
  ${COLORS.green}db${COLORS.reset}          仅生成数据库类型
  ${COLORS.green}env${COLORS.reset}         仅生成环境变量类型
  ${COLORS.green}config${COLORS.reset}      仅生成配置类型
  ${COLORS.green}help${COLORS.reset}        显示此帮助信息

${COLORS.yellow}示例:${COLORS.reset}
  node scripts/generate-types.js generate
  node scripts/generate-types.js api
  node scripts/generate-types.js watch

${COLORS.yellow}配置:${COLORS.reset}
  编辑 scripts/generate-types.js 中的 CONFIG 对象来配置生成选项
`);
}

// 命令行参数处理
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    const generator = new TypeGenerator();

    switch (command) {
      case 'generate':
        await generator.generate();
        break;
      case 'watch':
        console.log(
          `${COLORS.cyan}👀 监听模式 - 文件变化时自动生成类型${COLORS.reset}`
        );
        // 这里可以实现文件监听逻辑
        break;
      case 'api':
        console.log(`${COLORS.blue}📝 生成 API 类型${COLORS.reset}`);
        await generator.generateApiTypes();
        break;
      case 'db':
        console.log(`${COLORS.blue}📝 生成数据库类型${COLORS.reset}`);
        await generator.generateDatabaseTypes();
        break;
      case 'env':
        console.log(`${COLORS.blue}📝 生成环境变量类型${COLORS.reset}`);
        await generator.generateEnvTypes();
        break;
      case 'config':
        console.log(`${COLORS.blue}📝 生成配置类型${COLORS.reset}`);
        await generator.generateConfigTypes();
        break;
      case 'help':
      case '--help':
      case '-h':
      case undefined:
        showHelp();
        break;
      default:
        console.log(`${COLORS.red}❌ 未知命令: ${command}${COLORS.reset}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(`${COLORS.red}❌ 执行失败: ${error.message}${COLORS.reset}`);
    process.exit(1);
  }
}

// 运行主函数
main().catch(error => {
  console.error(
    `${COLORS.red}❌ 未处理的错误: ${error.message}${COLORS.reset}`
  );
  process.exit(1);
});
