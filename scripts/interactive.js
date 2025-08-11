#!/usr/bin/env node

import { spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

// 菜单配置
const MENU_CONFIG = {
  main: {
    title: '🚀 IMTP 交互式脚本管理器',
    options: [
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
    ],
  },
  deps: {
    title: '📦 依赖管理',
    options: [
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
    ],
  },
  env: {
    title: '🔧 环境管理',
    options: [
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
    ],
  },
  backup: {
    title: '💾 备份管理',
    options: [
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
    ],
  },
  monitor: {
    title: '📊 监控管理',
    options: [
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
    ],
  },
  dev: {
    title: '🛠️  开发工具',
    options: [
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
    ],
  },
  generate: {
    title: '📋 生成工具',
    options: [
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
    ],
  },
  test: {
    title: '🧪 测试工具',
    options: [
      { key: '1', name: '🧪 运行测试', command: 'pnpm test' },
      { key: '2', name: '🖥️  测试UI界面', command: 'pnpm test:ui' },
      { key: '3', name: '📊 测试覆盖率', command: 'pnpm test:coverage' },
      { key: '4', name: '👀 监听模式', command: 'pnpm test:watch' },
      { key: '0', name: '⬅️  返回主菜单' },
    ],
  },
  build: {
    title: '🏗️  构建工具',
    options: [
      { key: '1', name: '🏗️  构建项目', command: 'pnpm build' },
      { key: '2', name: '📦 最小化构建', command: 'pnpm build:min' },
      { key: '3', name: '🧹 清理后构建', command: 'pnpm build:clean' },
      { key: '4', name: '🧹 清理构建', command: 'pnpm clean:all' },
      { key: '0', name: '⬅️  返回主菜单' },
    ],
  },
  security: {
    title: '🔒 安全工具',
    options: [
      {
        key: '1',
        name: '🔍 安全审计',
        command: 'pnpm audit --audit-level moderate',
      },
      { key: '2', name: '🛡️  Snyk扫描', command: 'snyk test' },
      { key: '0', name: '⬅️  返回主菜单' },
    ],
  },
};

class InteractiveScripts {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.setupInterruptHandler();
    this.commandHistory = [];
    this.maxHistorySize = 10;
  }

  setupInterruptHandler() {
    const interruptHandler = () => {
      console.log('\n\n⚠️  收到中断信号，正在退出...');
      try {
        this.rl.close();
      } catch (e) {
        // 忽略错误
      }
      process.exit(0);
    };

    process.on('SIGINT', interruptHandler);
    process.on('SIGTERM', interruptHandler);
  }

  // 添加命令到历史记录
  addToHistory(command) {
    this.commandHistory.unshift(command);
    if (this.commandHistory.length > this.maxHistorySize) {
      this.commandHistory.pop();
    }
  }

  // 显示历史记录
  showHistory() {
    console.log('\n📜 最近执行的命令：');
    if (this.commandHistory.length === 0) {
      console.log('暂无历史记录');
      return;
    }
    this.commandHistory.forEach((cmd, index) => {
      console.log(`${index + 1}. ${cmd}`);
    });
  }

  // 通用菜单显示方法
  async showMenu(menuKey, parentMenu = null) {
    const config = MENU_CONFIG[menuKey];
    if (!config) {
      console.log('❌ 菜单配置不存在');
      return;
    }

    console.clear();
    console.log(config.title);
    console.log('='.repeat(50));
    console.log('请选择要执行的功能：\n');

    config.options.forEach(option => {
      console.log(`${option.key}. ${option.name}`);
    });

    // 添加快速命令提示
    if (menuKey === 'main') {
      console.log('\n💡 快速命令：');
      console.log('  h - 查看历史记录');
      console.log('  q - 快速退出');
      console.log('  c - 清屏');
    }

    const choice = await this.question('\n请输入选项: ');
    await this.handleMenuChoice(menuKey, choice, parentMenu);
  }

  // 处理菜单选择
  async handleMenuChoice(menuKey, choice, parentMenu) {
    // 处理快速命令
    if (menuKey === 'main') {
      switch (choice.toLowerCase()) {
        case 'h':
          this.showHistory();
          await this.question('\n按回车键继续...');
          await this.showMenu(menuKey, parentMenu);
          return;
        case 'q':
          console.log('👋 再见！');
          this.rl.close();
          process.exit(0);
          return;
        case 'c':
          console.clear();
          await this.showMenu(menuKey, parentMenu);
          return;
      }
    }

    const config = MENU_CONFIG[menuKey];
    const selectedOption = config.options.find(opt => opt.key === choice);

    if (!selectedOption) {
      console.log('❌ 无效选项，请重新选择');
      await this.wait(1000);
      await this.showMenu(menuKey, parentMenu);
      return;
    }

    // 处理返回操作
    if (choice === '0') {
      if (parentMenu) {
        await this.showMenu(parentMenu);
      } else {
        console.log('👋 再见！');
        this.rl.close();
        process.exit(0);
      }
      return;
    }

    // 处理子菜单
    if (selectedOption.module) {
      await this.showMenu(selectedOption.module, menuKey);
      return;
    }

    // 执行命令
    if (selectedOption.command) {
      this.addToHistory(selectedOption.command);
      await this.executeCommand(selectedOption.command, selectedOption.name);
      await this.question('\n按回车键继续...');
      await this.showMenu(menuKey, parentMenu);
    }
  }

  // 执行命令
  async executeCommand(command, description) {
    console.log(`\n🚀 执行: ${description}`);
    console.log(`📝 命令: ${command}`);
    console.log('='.repeat(50));

    return new Promise(resolve => {
      const startTime = Date.now();
      const [cmd, ...args] = command.split(' ');
      const child = spawn(cmd, args, {
        cwd: rootDir,
        stdio: 'inherit',
        env: { ...process.env, FORCE_COLOR: '1' },
        detached: false,
      });

      let isInterrupted = false;

      const interruptHandler = () => {
        if (!isInterrupted) {
          isInterrupted = true;
          console.log('\n⚠️  收到中断信号，正在终止子进程...');
          try {
            child.kill('SIGKILL');
          } catch (e) {
            // 忽略错误
          }
        }
      };

      process.on('SIGINT', interruptHandler);
      process.on('SIGTERM', interruptHandler);

      child.on('exit', (code, signal) => {
        process.removeListener('SIGINT', interruptHandler);
        process.removeListener('SIGTERM', interruptHandler);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        if (
          isInterrupted ||
          signal === 'SIGINT' ||
          signal === 'SIGTERM' ||
          signal === 'SIGKILL'
        ) {
          console.log('\n⚠️  命令被中断');
        } else if (code === 0) {
          console.log('\n✅ 执行成功！');
        } else {
          console.log('\n❌ 执行失败！');
          console.log(`退出码: ${code}`);
        }
        console.log(`⏱️  耗时: ${duration} 秒`);
        resolve();
      });

      child.on('error', error => {
        process.removeListener('SIGINT', interruptHandler);
        process.removeListener('SIGTERM', interruptHandler);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log('\n❌ 执行失败！');
        console.log(`错误信息: ${error.message}`);
        console.log(`⏱️  耗时: ${duration} 秒`);
        resolve();
      });
    });
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
    console.log('📖 版本: 2.0.0');
    console.log('🎯 优化版本 - 更好的用户体验');
    await this.wait(1000);
    await this.showMenu('main');
  }
}

// 启动应用
const interactive = new InteractiveScripts();
interactive.start().catch(console.error);
