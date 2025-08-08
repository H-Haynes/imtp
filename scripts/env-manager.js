#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');

// 环境配置
const ENVIRONMENTS = {
  development: {
    name: 'development',
    file: '.env.development',
    required: ['NODE_ENV', 'DEBUG'],
    optional: ['API_URL', 'LOG_LEVEL'],
  },
  test: {
    name: 'test',
    file: '.env.test',
    required: ['NODE_ENV'],
    optional: ['TEST_TIMEOUT', 'COVERAGE_THRESHOLD'],
  },
  production: {
    name: 'production',
    file: '.env.production',
    required: ['NODE_ENV', 'API_URL'],
    optional: ['LOG_LEVEL', 'CACHE_TTL'],
  },
};

// 验证环境文件
function validateEnvironment(envName) {
  const env = ENVIRONMENTS[envName];
  if (!env) {
    console.error(`❌ 未知环境: ${envName}`);
    return false;
  }

  const envFile = path.join(ROOT_DIR, env.file);
  const exampleFile = path.join(ROOT_DIR, '.env.example');

  console.log(`🔍 验证环境: ${envName}`);

  // 检查环境文件是否存在
  if (!fs.existsSync(envFile)) {
    console.warn(`⚠️  环境文件不存在: ${env.file}`);
    return false;
  }

  // 读取环境变量
  const envContent = fs.readFileSync(envFile, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  });

  // 检查必需变量
  let isValid = true;
  env.required.forEach(requiredVar => {
    if (!envVars[requiredVar]) {
      console.error(`❌ 缺少必需环境变量: ${requiredVar}`);
      isValid = false;
    } else {
      console.log(`✅ 必需变量: ${requiredVar}`);
    }
  });

  // 检查可选变量
  env.optional.forEach(optionalVar => {
    if (envVars[optionalVar]) {
      console.log(`✅ 可选变量: ${optionalVar}`);
    } else {
      console.log(`ℹ️  可选变量未设置: ${optionalVar}`);
    }
  });

  return isValid;
}

// 检查环境一致性
function checkEnvironmentConsistency() {
  console.log('🔍 检查环境配置一致性...');

  const envFiles = Object.values(ENVIRONMENTS).map(env => env.file);
  const existingFiles = envFiles.filter(file =>
    fs.existsSync(path.join(ROOT_DIR, file))
  );

  if (existingFiles.length === 0) {
    console.warn('⚠️  没有找到任何环境配置文件');
    return false;
  }

  console.log(`✅ 找到 ${existingFiles.length} 个环境配置文件`);

  // 检查变量命名一致性
  const allVars = new Set();
  existingFiles.forEach(file => {
    const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
    content.split('\n').forEach(line => {
      const [key] = line.split('=');
      if (key && key.trim()) {
        allVars.add(key.trim());
      }
    });
  });

  console.log(`📊 总共发现 ${allVars.size} 个不同的环境变量`);
  return true;
}

// 创建环境文件
function createEnvironment(envName) {
  const env = ENVIRONMENTS[envName];
  if (!env) {
    console.error(`❌ 未知环境: ${envName}`);
    return false;
  }

  const envFile = path.join(ROOT_DIR, env.file);
  const exampleFile = path.join(ROOT_DIR, '.env.example');

  if (fs.existsSync(envFile)) {
    console.warn(`⚠️  环境文件已存在: ${env.file}`);
    return false;
  }

  let content = `# ${env.name} 环境配置\n`;
  content += `NODE_ENV=${env.name}\n\n`;

  // 添加必需变量
  env.required.forEach(varName => {
    if (varName !== 'NODE_ENV') {
      content += `# 必需: ${varName}\n`;
      content += `${varName}=\n\n`;
    }
  });

  // 添加可选变量
  env.optional.forEach(varName => {
    content += `# 可选: ${varName}\n`;
    content += `# ${varName}=\n\n`;
  });

  fs.writeFileSync(envFile, content);
  console.log(`✅ 创建环境文件: ${env.file}`);
  return true;
}

// 列出所有环境
function listEnvironments() {
  console.log('📋 可用环境:');
  Object.entries(ENVIRONMENTS).forEach(([key, env]) => {
    const exists = fs.existsSync(path.join(ROOT_DIR, env.file));
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${key} (${env.file})`);
  });
}

// 主函数
function main() {
  const command = process.argv[2];
  const envName = process.argv[3];

  switch (command) {
    case 'validate':
      if (envName) {
        validateEnvironment(envName);
      } else {
        Object.keys(ENVIRONMENTS).forEach(env => validateEnvironment(env));
      }
      break;

    case 'check':
      checkEnvironmentConsistency();
      break;

    case 'create':
      if (!envName) {
        console.error('❌ 请指定环境名称');
        process.exit(1);
      }
      createEnvironment(envName);
      break;

    case 'list':
      listEnvironments();
      break;

    default:
      console.log('🔧 环境管理工具');
      console.log('');
      console.log('用法:');
      console.log(
        '  node scripts/env-manager.js validate [env]  - 验证环境配置'
      );
      console.log(
        '  node scripts/env-manager.js check          - 检查环境一致性'
      );
      console.log(
        '  node scripts/env-manager.js create <env>   - 创建环境文件'
      );
      console.log(
        '  node scripts/env-manager.js list           - 列出所有环境'
      );
      console.log('');
      console.log('环境: development, test, production');
  }
}

main();
