/**
 * 环境变量使用示例
 *
 * 这个文件展示了如何在代码中使用环境变量配置
 */

import {
  env,
  isDev,
  isProd,
  isTest,
  getConfig,
  validateEnv,
} from '../config/env';

console.log('🔧 环境变量使用示例\n');

// 1. 直接使用环境变量
console.log('📊 直接使用环境变量:');
console.log(`   NODE_ENV: ${env.NODE_ENV}`);
console.log(`   PORT: ${env.PORT}`);
console.log(`   HOST: ${env.HOST}`);
console.log(`   DEBUG: ${env.DEBUG}`);
console.log(`   DATABASE_URL: ${env.DATABASE_URL}`);
console.log(`   JWT_SECRET: ${env.JWT_SECRET ? '已设置' : '未设置'}`);
console.log('');

// 2. 环境检测
console.log('🌍 环境检测:');
console.log(`   开发环境: ${isDev()}`);
console.log(`   生产环境: ${isProd()}`);
console.log(`   测试环境: ${isTest()}`);
console.log('');

// 3. 使用配置组
console.log('⚙️ 配置组使用:');

const serverConfig = getConfig.server();
console.log('   服务器配置:', serverConfig);

const dbConfig = getConfig.database();
console.log('   数据库配置:', {
  ...dbConfig,
  url: dbConfig.url ? '已设置' : '未设置',
});

const redisConfig = getConfig.redis();
console.log('   Redis配置:', redisConfig);

const jwtConfig = getConfig.jwt();
console.log('   JWT配置:', {
  ...jwtConfig,
  secret: jwtConfig.secret ? '已设置' : '未设置',
});

const apiConfig = getConfig.api();
console.log('   API配置:', apiConfig);

const uploadConfig = getConfig.upload();
console.log('   文件上传配置:', uploadConfig);

const mailConfig = getConfig.mail();
console.log('   邮件配置:', {
  ...mailConfig,
  user: mailConfig.user ? '已设置' : '未设置',
  pass: mailConfig.pass ? '已设置' : '未设置',
});

console.log('');

// 4. 环境验证
console.log('✅ 环境验证:');
const isValid = validateEnv();
console.log(`   验证结果: ${isValid ? '通过' : '失败'}`);

if (!isValid) {
  console.log('   ❌ 缺少必需的环境变量');
  process.exit(1);
}

console.log('   ✅ 所有必需的环境变量都已设置');
console.log('');

// 5. 条件逻辑示例
console.log('🔀 条件逻辑示例:');

if (isDev()) {
  console.log('   🛠️ 开发环境: 启用详细日志和调试功能');
  console.log(`   📝 日志级别: ${env.LOG_LEVEL}`);
  console.log(`   🔍 调试模式: ${env.DEBUG ? '开启' : '关闭'}`);
} else if (isProd()) {
  console.log('   🚀 生产环境: 优化性能和安全性');
  console.log(`   📝 日志级别: ${env.LOG_LEVEL}`);
  console.log(`   🔍 调试模式: ${env.DEBUG ? '开启' : '关闭'}`);
} else if (isTest()) {
  console.log('   🧪 测试环境: 专注于测试功能');
  console.log(`   📝 日志级别: ${env.LOG_LEVEL}`);
  console.log(`   🔍 调试模式: ${env.DEBUG ? '开启' : '关闭'}`);
}

console.log('');

// 6. 配置使用示例
console.log('🎯 实际使用示例:');

// 服务器启动配置
const server = {
  port: serverConfig.port,
  host: serverConfig.host,
  debug: serverConfig.debug,
  start: () => {
    console.log(`   🚀 服务器启动在 ${serverConfig.host}:${serverConfig.port}`);
    if (serverConfig.debug) {
      console.log('   🔍 调试模式已启用');
    }
  },
};

// 数据库连接配置
const database = {
  url: dbConfig.url,
  name: dbConfig.name,
  connect: () => {
    if (dbConfig.url) {
      console.log(`   🗄️ 连接到数据库: ${dbConfig.name}`);
    } else {
      console.log('   ❌ 数据库 URL 未配置');
    }
  },
};

// API 配置
const api = {
  baseUrl: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  setup: () => {
    console.log(`   📡 API 基础地址: ${apiConfig.baseUrl}`);
    console.log(`   ⏱️ 请求超时: ${apiConfig.timeout}ms`);
  },
};

// 执行示例
server.start();
database.connect();
api.setup();

console.log('\n✅ 环境变量使用示例完成！');
