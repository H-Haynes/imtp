#!/usr/bin/env node

import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

class InteractiveScripts {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  // 显示主菜单
  async showMainMenu() {
    console.clear();
    console.log('🚀 IMTP 交互式脚本管理器');
    console.log('='.repeat(50));
    console.log('请选择要执行的功能：\n');

    const options = [
      { key: '1', name: '📦 依赖管理', module: 'deps' },
      { key: '2', name: '🔧 环境管理', module: 'env' },
      { key: '3', name: '💾 备份管理', module: 'backup' },
      { key: '4', name: '📊 监控管理', module: 'monitor' },
      { key: '5', name: '🛠️  开发工具', module: 'dev' },
      { key: '6', name: '📋 生成工具', module: 'generate' },
      { key: '7', name: '🧪 测试工具', module: 'test' },
      { key: '8', name: '🏗️  构建工具', module: 'build' },
      { key: '9', name: '🔒 安全工具', module: 'security' },
      { key: '0', name: '❌ 退出' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    switch (choice) {
      case '1':
        await this.showDepsMenu();
        break;
      case '2':
        await this.showEnvMenu();
        break;
      case '3':
        await this.showBackupMenu();
        break;
      case '4':
        await this.showMonitorMenu();
        break;
      case '5':
        await this.showDevMenu();
        break;
      case '6':
        await this.showGenerateMenu();
        break;
      case '7':
        await this.showTestMenu();
        break;
      case '8':
        await this.showBuildMenu();
        break;
      case '9':
        await this.showSecurityMenu();
        break;
      case '0':
        console.log('👋 再见！');
        this.rl.close();
        process.exit(0);
      default:
        console.log('❌ 无效选项，请重新选择');
        await this.wait(1000);
        await this.showMainMenu();
    }
  }

  // 依赖管理菜单
  async showDepsMenu() {
    console.clear();
    console.log('📦 依赖管理');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '🔄 检查依赖更新',
        command: 'node scripts/dependency-manager.js updates',
      },
      {
        key: '2',
        name: '⚠️  检测版本冲突',
        command: 'node scripts/dependency-manager.js conflicts',
      },
      {
        key: '3',
        name: '🔒 安全漏洞扫描',
        command: 'node scripts/dependency-manager.js security',
      },
      {
        key: '4',
        name: '📊 包大小分析',
        command: 'node scripts/dependency-manager.js size',
      },
      {
        key: '5',
        name: '🧹 清理未使用依赖',
        command: 'node scripts/dependency-manager.js cleanup',
      },
      {
        key: '6',
        name: '📋 生成依赖报告',
        command: 'node scripts/dependency-manager.js report',
      },
      {
        key: '7',
        name: '🚀 运行所有检查',
        command: 'node scripts/dependency-manager.js',
      },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showDepsMenu();
  }

  // 环境管理菜单
  async showEnvMenu() {
    console.clear();
    console.log('🔧 环境管理');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '✅ 验证环境配置',
        command: 'node scripts/dev-tools.js env:validate',
      },
      {
        key: '2',
        name: '🔍 检查环境状态',
        command: 'node scripts/dev-tools.js env:check',
      },
      {
        key: '3',
        name: '📝 创建环境文件',
        command: 'node scripts/dev-tools.js env:create',
      },
      {
        key: '4',
        name: '🏠 本地环境设置',
        command: 'node scripts/dev-tools.js env:local',
      },
      {
        key: '5',
        name: '📋 列出环境文件',
        command: 'node scripts/dev-tools.js env:list',
      },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showEnvMenu();
  }

  // 备份管理菜单
  async showBackupMenu() {
    console.clear();
    console.log('💾 备份管理');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '💾 创建备份',
        command: 'node scripts/rollback.js create',
      },
      {
        key: '2',
        name: '📋 列出备份',
        command: 'node scripts/rollback.js list',
      },
      {
        key: '3',
        name: '🔄 回滚备份',
        command: 'node scripts/rollback.js rollback',
      },
      {
        key: '4',
        name: '🧹 清理备份',
        command: 'node scripts/rollback.js cleanup',
      },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showBackupMenu();
  }

  // 监控管理菜单
  async showMonitorMenu() {
    console.clear();
    console.log('📊 监控管理');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '🏗️  构建监控',
        command: 'node scripts/monitor.js build',
      },
      {
        key: '2',
        name: '🧪 测试监控',
        command: 'node scripts/monitor.js test',
      },
      {
        key: '3',
        name: '🔒 安全监控',
        command: 'node scripts/monitor.js security',
      },
      { key: '4', name: '📈 全面监控', command: 'node scripts/monitor.js all' },
      {
        key: '5',
        name: '📋 生成报告',
        command: 'node scripts/monitor.js report',
      },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showMonitorMenu();
  }

  // 开发工具菜单
  async showDevMenu() {
    console.clear();
    console.log('🛠️  开发工具');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '🔍 代码检查',
        command: 'node scripts/dev-tools.js lint',
      },
      {
        key: '2',
        name: '🔧 类型检查',
        command: 'node scripts/dev-tools.js type-check',
      },
      {
        key: '3',
        name: '📊 代码分析',
        command: 'node scripts/dev-tools.js analyze',
      },
      {
        key: '4',
        name: '📦 创建新包',
        command: 'node scripts/create-package.js',
      },
      { key: '5', name: '🧹 清理构建', command: 'pnpm clean:all' },
      { key: '6', name: '🏗️  构建项目', command: 'pnpm build' },
      { key: '7', name: '🧪 运行测试', command: 'pnpm test' },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showDevMenu();
  }

  // 生成工具菜单
  async showGenerateMenu() {
    console.clear();
    console.log('📋 生成工具');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '📝 生成类型',
        command: 'node scripts/generate-types.js generate',
      },
      { key: '2', name: '🔗 生成API', command: 'node scripts/generate-api.js' },
      { key: '3', name: '📊 生成GraphQL', command: 'pnpm generate:graphql' },
      { key: '4', name: '📚 生成文档', command: 'pnpm docs' },
      { key: '5', name: '🚀 生成全部', command: 'pnpm generate:all' },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showGenerateMenu();
  }

  // 测试工具菜单
  async showTestMenu() {
    console.clear();
    console.log('🧪 测试工具');
    console.log('='.repeat(30));

    const options = [
      { key: '1', name: '🧪 运行测试', command: 'pnpm test' },
      { key: '2', name: '🖥️  测试UI界面', command: 'pnpm test:ui' },
      { key: '3', name: '📊 测试覆盖率', command: 'pnpm test:coverage' },
      { key: '4', name: '👀 监听模式', command: 'pnpm test:watch' },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showTestMenu();
  }

  // 构建工具菜单
  async showBuildMenu() {
    console.clear();
    console.log('🏗️  构建工具');
    console.log('='.repeat(30));

    const options = [
      { key: '1', name: '🏗️  构建项目', command: 'pnpm build' },
      { key: '2', name: '📦 最小化构建', command: 'pnpm build:min' },
      { key: '3', name: '🧹 清理后构建', command: 'pnpm build:clean' },
      { key: '4', name: '🧹 清理构建', command: 'pnpm clean:all' },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showBuildMenu();
  }

  // 安全工具菜单
  async showSecurityMenu() {
    console.clear();
    console.log('🔒 安全工具');
    console.log('='.repeat(30));

    const options = [
      {
        key: '1',
        name: '🔍 安全审计',
        command: 'pnpm audit --audit-level moderate',
      },
      { key: '2', name: '🛡️  Snyk扫描', command: 'snyk test' },
      { key: '0', name: '⬅️  返回主菜单' },
    ];

    options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    const choice = await this.question('\n请输入选项: ');

    if (choice === '0') {
      await this.showMainMenu();
      return;
    }

    const selectedOption = options.find(opt => opt.key === choice);
    if (selectedOption && selectedOption.command) {
      await this.executeCommand(selectedOption.command, selectedOption.name);
    } else {
      console.log('❌ 无效选项');
      await this.wait(1000);
    }

    await this.question('\n按回车键继续...');
    await this.showSecurityMenu();
  }

  // 执行命令
  async executeCommand(command, description) {
    console.log(`\n🚀 执行: ${description}`);
    console.log(`📝 命令: ${command}`);
    console.log('='.repeat(50));

    try {
      execSync(command, {
        cwd: rootDir,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' },
      });
      console.log('\n✅ 执行成功！');
    } catch (error) {
      console.log('\n❌ 执行失败！');
      console.log(`错误信息: ${error.message}`);
    }
  }

  // 等待用户输入
  question(prompt) {
    return new Promise(resolve => {
      try {
        this.rl.question(prompt, answer => {
          resolve(answer.trim());
        });
      } catch (error) {
        if (error.code === 'ERR_USE_AFTER_CLOSE') {
          console.log('\n👋 再见！');
          process.exit(0);
        } else {
          throw error;
        }
      }
    });
  }

  // 等待指定时间
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 启动管理器
  async start() {
    console.log('🚀 启动 IMTP 交互式脚本管理器...');
    await this.wait(500);
    await this.showMainMenu();
  }
}

// 启动应用
const interactive = new InteractiveScripts();
interactive.start().catch(console.error);
