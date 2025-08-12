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
      { key: '10', name: '🚀 CI/CD 工具', module: 'cicd' },
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
        command: 'cleanup',
        isSpecial: true,
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
        needsInput: true,
        inputPrompt:
          '请输入包名 (只能包含小写字母、数字和连字符，且必须以字母开头): ',
        inputValidation: input => /^[a-z][a-z0-9-]*$/.test(input),
        inputErrorMessage:
          '包名格式不正确！只能包含小写字母、数字和连字符，且必须以字母开头。',
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
  cicd: {
    title: '🚀 CI/CD 工具',
    options: [
      {
        key: '1',
        name: '🔄 执行完整 CI/CD 流程',
        command: 'node scripts/ci-cd.js pipeline',
      },
      {
        key: '2',
        name: '🚀 执行发布流程',
        command: 'node scripts/ci-cd.js release',
      },
      {
        key: '3',
        name: '👀 发布预览',
        command: 'node scripts/ci-cd.js release:dry',
      },
      {
        key: '4',
        name: '🔍 分析提交历史',
        command: 'node scripts/ci-cd.js analyze',
      },
      {
        key: '5',
        name: '📋 查看 CI/CD 帮助',
        command: 'node scripts/ci-cd.js help',
      },
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

      // 检查是否需要用户输入
      if (selectedOption.needsInput) {
        let userInput = '';
        let isValid = false;

        while (!isValid) {
          userInput = await this.question(selectedOption.inputPrompt);

          if (selectedOption.inputValidation) {
            isValid = selectedOption.inputValidation(userInput);
            if (!isValid) {
              console.log(`❌ ${selectedOption.inputErrorMessage}`);
            }
          } else {
            isValid = true;
          }
        }

        // 将用户输入添加到命令中
        const commandWithInput = `${selectedOption.command} ${userInput}`;
        await this.executeCommand(commandWithInput, selectedOption.name);
      } else {
        await this.executeCommand(selectedOption.command, selectedOption.name);
      }

      await this.question('\n按回车键继续...');
      await this.showMenu(menuKey, parentMenu);
    }
  }

  // 执行命令
  async executeCommand(command, description) {
    console.log(`\n🚀 执行: ${description}`);
    console.log(`📝 命令: ${command}`);
    console.log('='.repeat(50));

    // 处理特殊的清理命令
    if (command === 'cleanup') {
      await this.executeCleanupCommand();
      return;
    }

    return new Promise(resolve => {
      const startTime = Date.now();
      const [cmd, ...args] = command.split(' ');

      // 检查命令是否需要交互式输入
      const needsInteractiveInput =
        command.includes('cleanup') || command.includes('conflicts');

      // 创建自定义的 stdio 配置来捕获输出
      const child = spawn(cmd, args, {
        cwd: rootDir,
        stdio: needsInteractiveInput
          ? ['inherit', 'inherit', 'inherit']
          : ['inherit', 'pipe', 'pipe'],
        env: { ...process.env, FORCE_COLOR: '1' },
        detached: false,
        // 确保子进程能接收到中断信号
        shell: false,
      });

      let isInterrupted = false;
      let outputLines = [];
      let isFirstOutput = true;
      let checkLines = []; // 存储检查过程中的输出行
      let checkInProgress = false; // 标记是否正在检查中

      // 处理标准输出（仅当不使用 inherit 时）
      if (!needsInteractiveInput) {
        child.stdout.on('data', data => {
          const output = data.toString();

          // 检查是否是进度显示行（包含"正在执行"）
          if (output.includes('正在执行')) {
            // 直接输出进度，不换行
            process.stdout.write(output);
          } else {
            // 处理其他输出
            const lines = output.split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                // 检查是否是扫描中的提示（包含"扫描"）
                if (line.includes('👁️') && line.includes('扫描')) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                  }
                  // 直接输出扫描提示，不换行
                  process.stdout.write(line);
                  checkInProgress = true; // 标记正在扫描中
                } else if (
                  line.includes('✅') ||
                  line.includes('❌') ||
                  line.includes('📦')
                ) {
                  // 如果有正在进行的扫描，清除扫描提示
                  if (checkInProgress) {
                    // 清除扫描提示行
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                  checkLines.push(line); // 记录检查结果
                } else if (
                  line.includes('🧹') &&
                  line.includes('清理未使用的依赖')
                ) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                } else if (
                  line.includes('🔍') ||
                  line.includes('📦') ||
                  line.includes('检查')
                ) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  // 替换为眼睛图标
                  const modifiedLine = line.replace(/🔍|📦/, '👁️');
                  console.log(modifiedLine);
                  outputLines.push(modifiedLine);
                  checkLines.push(modifiedLine); // 记录检查行
                } else {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                }
              }
            });
          }
        });
      }

      // 处理标准错误（仅当不使用 inherit 时）
      if (!needsInteractiveInput) {
        child.stderr.on('data', data => {
          const output = data.toString();

          // 检查是否是进度显示行（包含"正在执行"）
          if (output.includes('正在执行')) {
            // 直接输出进度，不换行
            process.stdout.write(output);
          } else {
            // 处理其他输出
            const lines = output.split('\n');
            lines.forEach(line => {
              if (line.trim()) {
                // 检查是否是扫描中的提示（包含"扫描"）
                if (line.includes('👁️') && line.includes('扫描')) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                  }
                  // 直接输出扫描提示，不换行
                  process.stdout.write(line);
                  checkInProgress = true; // 标记正在扫描中
                } else if (
                  line.includes('✅') ||
                  line.includes('❌') ||
                  line.includes('📦')
                ) {
                  // 如果有正在进行的扫描，清除扫描提示
                  if (checkInProgress) {
                    // 清除扫描提示行
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                  checkLines.push(line); // 记录检查结果
                } else if (
                  line.includes('🧹') &&
                  line.includes('清理未使用的依赖')
                ) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                } else if (
                  line.includes('🔍') ||
                  line.includes('📦') ||
                  line.includes('检查')
                ) {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  // 替换为眼睛图标
                  const modifiedLine = line.replace(/🔍|📦/, '👁️');
                  console.log(modifiedLine);
                  outputLines.push(modifiedLine);
                  checkLines.push(modifiedLine); // 记录检查行
                } else {
                  // 清除之前的扫描提示
                  if (checkInProgress) {
                    process.stdout.write('\r' + ' '.repeat(50) + '\r');
                    checkInProgress = false;
                  }
                  console.log(line);
                  outputLines.push(line);
                }
              }
            });
          }
        });
      }

      const interruptHandler = () => {
        if (!isInterrupted) {
          isInterrupted = true;
          console.log('\n⚠️  收到中断信号，正在终止子进程...');
          try {
            // 先尝试优雅终止
            child.kill('SIGTERM');

            // 如果3秒后还在运行，强制终止
            setTimeout(() => {
              try {
                child.kill('SIGKILL');
              } catch (e) {
                // 忽略错误
              }
            }, 3000);
          } catch (e) {
            // 忽略错误
          }
        }
      };

      // 注册中断处理器
      process.on('SIGINT', interruptHandler);
      process.on('SIGTERM', interruptHandler);

      child.on('exit', (code, signal) => {
        process.removeListener('SIGINT', interruptHandler);
        process.removeListener('SIGTERM', interruptHandler);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);

        // 根据命令类型显示不同的完成信息
        if (code === 0 && !isInterrupted) {
          // 判断是否是检查类型的命令
          const isCheckCommand =
            description.includes('检查') ||
            description.includes('验证') ||
            description.includes('类型检查') ||
            description.includes('代码检查') ||
            description.includes('安全审计');

          if (isCheckCommand) {
            // 检查类命令显示检查完成信息
            console.log('\n✅ 检查完成！');
            console.log(`⏱️  耗时: ${duration} 秒`);

            // 统计检查结果
            const successCount = checkLines.filter(line =>
              line.includes('✅')
            ).length;
            const failCount = checkLines.filter(line =>
              line.includes('❌')
            ).length;
            const totalCount = successCount + failCount;

            if (totalCount > 0) {
              console.log(
                `📊 检查结果: ${successCount} 项通过, ${failCount} 项失败`
              );
            }
          } else {
            // 非检查类命令显示执行成功信息
            console.log('\n✅ 执行成功！');
            console.log(`⏱️  耗时: ${duration} 秒`);
          }
        } else if (
          isInterrupted ||
          signal === 'SIGINT' ||
          signal === 'SIGTERM' ||
          signal === 'SIGKILL'
        ) {
          console.log('\n⚠️  命令被中断');
          console.log(`⏱️  耗时: ${duration} 秒`);
        } else {
          console.log('\n❌ 执行失败！');
          console.log(`退出码: ${code}`);
          console.log(`⏱️  耗时: ${duration} 秒`);
        }
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

  // 执行清理命令
  async executeCleanupCommand() {
    try {
      const { execSync } = await import('child_process');
      const { join } = await import('path');
      const { fileURLToPath } = await import('url');

      const __dirname = fileURLToPath(new URL('.', import.meta.url));
      const rootDir = join(__dirname, '..');

      console.log('📦 发现 7 个包\n');
      console.log('🧹 清理未使用的依赖...');

      // 需要先安装 depcheck
      try {
        execSync('pnpm list depcheck', { cwd: rootDir, stdio: 'ignore' });
      } catch (error) {
        console.log('安装 depcheck...');
        execSync('pnpm add -D depcheck', { cwd: rootDir, stdio: 'inherit' });
      }

      // 扫描各个包
      const packages = [
        { name: 'ui', path: join(rootDir, 'packages/ui') },
        { name: 'types', path: join(rootDir, 'packages/types') },
        { name: 'core', path: join(rootDir, 'packages/core') },
        { name: 'utils', path: join(rootDir, 'packages/utils') },
        { name: 'test-package', path: join(rootDir, 'packages/test-package') },
        {
          name: 'example-package',
          path: join(rootDir, 'packages/example-package'),
        },
        { name: 'data', path: join(rootDir, 'packages/data') },
      ];

      const allUnusedDeps = [];
      const allUnusedDevDeps = [];

      // 扫描子包
      for (const pkg of packages) {
        process.stdout.write(`👁️  扫描 ${pkg.name}...`);

        try {
          const result = execSync('npx depcheck --json', {
            cwd: pkg.path,
            encoding: 'utf8',
            stdio: 'pipe',
          });
          const depcheckResult = JSON.parse(result);

          const unusedDeps = depcheckResult.dependencies.filter(dep => {
            if (dep.startsWith('@imtp/')) return false;
            return true;
          });

          const unusedDevDeps = depcheckResult.devDependencies.filter(dep => {
            if (
              dep.includes('test') ||
              dep.includes('vitest') ||
              dep.includes('coverage')
            ) {
              return false;
            }
            return true;
          });

          process.stdout.write('\r' + ' '.repeat(50) + '\r');

          if (unusedDeps.length > 0 || unusedDevDeps.length > 0) {
            console.log(`📦 ${pkg.name} - 发现未使用依赖:`);
            if (unusedDeps.length > 0) {
              console.log(`   🚨 生产依赖: ${unusedDeps.join(', ')}`);
              allUnusedDeps.push({ package: pkg.name, deps: unusedDeps });
            }
            if (unusedDevDeps.length > 0) {
              console.log(`   ⚠️  开发依赖: ${unusedDevDeps.join(', ')}`);
              allUnusedDevDeps.push({ package: pkg.name, deps: unusedDevDeps });
            }
          } else {
            console.log(`✅ ${pkg.name} - 无未使用依赖`);
          }
        } catch (error) {
          process.stdout.write('\r' + ' '.repeat(50) + '\r');

          if (error.status === 255) {
            try {
              const depcheckResult = JSON.parse(error.stdout || '{}');
              const unusedDeps = (depcheckResult.dependencies || []).filter(
                dep => {
                  if (dep.startsWith('@imtp/')) return false;
                  return true;
                }
              );
              const unusedDevDeps = (
                depcheckResult.devDependencies || []
              ).filter(dep => {
                if (
                  dep.includes('test') ||
                  dep.includes('vitest') ||
                  dep.includes('coverage')
                ) {
                  return false;
                }
                return true;
              });

              if (unusedDeps.length > 0 || unusedDevDeps.length > 0) {
                console.log(`📦 ${pkg.name} - 发现未使用依赖:`);
                if (unusedDeps.length > 0) {
                  console.log(`   🚨 生产依赖: ${unusedDeps.join(', ')}`);
                  allUnusedDeps.push({ package: pkg.name, deps: unusedDeps });
                }
                if (unusedDevDeps.length > 0) {
                  console.log(`   ⚠️  开发依赖: ${unusedDevDeps.join(', ')}`);
                  allUnusedDevDeps.push({
                    package: pkg.name,
                    deps: unusedDevDeps,
                  });
                }
              } else {
                console.log(`✅ ${pkg.name} - 无未使用依赖`);
              }
            } catch (parseError) {
              console.log(`✅ ${pkg.name} - 分析完成`);
            }
          } else {
            console.log(`✅ ${pkg.name} - 分析完成`);
          }
        }
      }

      // 扫描根目录
      process.stdout.write(`👁️  扫描根目录...`);
      try {
        const result = execSync('npx depcheck --json', {
          cwd: rootDir,
          encoding: 'utf8',
          stdio: 'pipe',
        });
        const depcheckResult = JSON.parse(result);

        const unusedDeps = depcheckResult.dependencies.filter(dep => {
          if (dep.startsWith('@imtp/')) return false;
          return true;
        });

        const unusedDevDeps = depcheckResult.devDependencies.filter(dep => {
          const importantTools = [
            'typescript',
            'vite',
            'vitest',
            'eslint',
            'prettier',
            'husky',
            'lint-staged',
            '@changesets/cli',
            '@commitlint/cli',
            '@commitlint/config-conventional',
            'semantic-release',
            '@semantic-release/changelog',
            '@semantic-release/git',
            '@semantic-release/github',
            '@semantic-release/npm',
            '@graphql-codegen/typescript',
            '@graphql-codegen/typescript-operations',
            'graphql-codegen',
            'openapi-typescript',
            'swagger-typescript-api',
            '@unocss/preset-attributify',
            '@unocss/preset-icons',
            '@unocss/preset-uno',
            'unocss',
            'unplugin-auto-import',
            'unplugin-vue-components',
            'unplugin-vue-define-options',
            'typedoc',
            'typedoc-plugin-markdown',
            '@vitest/coverage-v8',
            '@vitest/ui',
            'rimraf',
            'depcheck',
            'terser',
            'dotenv',
            'vitepress',
          ];
          if (importantTools.includes(dep)) return false;
          return true;
        });

        process.stdout.write('\r' + ' '.repeat(50) + '\r');

        if (unusedDeps.length > 0 || unusedDevDeps.length > 0) {
          console.log(`📦 根目录 - 发现未使用依赖:`);
          if (unusedDeps.length > 0) {
            console.log(`   🚨 生产依赖: ${unusedDeps.join(', ')}`);
            allUnusedDeps.push({ package: '根目录', deps: unusedDeps });
          }
          if (unusedDevDeps.length > 0) {
            console.log(`   ⚠️  开发依赖: ${unusedDevDeps.join(', ')}`);
            allUnusedDevDeps.push({ package: '根目录', deps: unusedDevDeps });
          }
        } else {
          console.log(`✅ 根目录 - 无未使用依赖`);
        }
      } catch (error) {
        process.stdout.write('\r' + ' '.repeat(50) + '\r');

        if (error.status === 255) {
          try {
            const depcheckResult = JSON.parse(error.stdout || '{}');
            const unusedDeps = (depcheckResult.dependencies || []).filter(
              dep => {
                if (dep.startsWith('@imtp/')) return false;
                return true;
              }
            );
            const unusedDevDeps = (depcheckResult.devDependencies || []).filter(
              dep => {
                const importantTools = [
                  'typescript',
                  'vite',
                  'vitest',
                  'eslint',
                  'prettier',
                  'husky',
                  'lint-staged',
                  '@changesets/cli',
                  '@commitlint/cli',
                  '@commitlint/config-conventional',
                  'semantic-release',
                  '@semantic-release/changelog',
                  '@semantic-release/git',
                  '@semantic-release/github',
                  '@semantic-release/npm',
                  '@graphql-codegen/typescript',
                  '@graphql-codegen/typescript-operations',
                  'graphql-codegen',
                  'openapi-typescript',
                  'swagger-typescript-api',
                  '@unocss/preset-attributify',
                  '@unocss/preset-icons',
                  '@unocss/preset-uno',
                  'unocss',
                  'unplugin-auto-import',
                  'unplugin-vue-components',
                  'unplugin-vue-define-options',
                  'typedoc',
                  'typedoc-plugin-markdown',
                  '@vitest/coverage-v8',
                  '@vitest/ui',
                  'rimraf',
                  'depcheck',
                  'terser',
                  'dotenv',
                  'vitepress',
                ];
                if (importantTools.includes(dep)) return false;
                return true;
              }
            );

            if (unusedDeps.length > 0 || unusedDevDeps.length > 0) {
              console.log(`📦 根目录 - 发现未使用依赖:`);
              if (unusedDeps.length > 0) {
                console.log(`   🚨 生产依赖: ${unusedDeps.join(', ')}`);
                allUnusedDeps.push({ package: '根目录', deps: unusedDeps });
              }
              if (unusedDevDeps.length > 0) {
                console.log(`   ⚠️  开发依赖: ${unusedDevDeps.join(', ')}`);
                allUnusedDevDeps.push({
                  package: '根目录',
                  deps: unusedDevDeps,
                });
              }
            } else {
              console.log(`✅ 根目录 - 无未使用依赖`);
            }
          } catch (parseError) {
            console.log(`✅ 根目录 - 分析完成`);
          }
        } else {
          console.log(`✅ 根目录 - 分析完成`);
        }
      }

      // 如果有未使用的依赖，询问用户是否要清理
      if (allUnusedDeps.length > 0 || allUnusedDevDeps.length > 0) {
        console.log('\n🗑️  发现未使用的依赖，是否要清理？');

        const totalUnusedDeps = allUnusedDeps.reduce(
          (sum, item) => sum + item.deps.length,
          0
        );
        const totalUnusedDevDeps = allUnusedDevDeps.reduce(
          (sum, item) => sum + item.deps.length,
          0
        );

        console.log(
          `   📊 总计: ${totalUnusedDeps} 个生产依赖, ${totalUnusedDevDeps} 个开发依赖`
        );

        const answer = await this.question(
          '\n是否要清理这些未使用的依赖？(y/N): '
        );

        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          console.log('\n🧹 开始清理未使用的依赖...');
          await this.removeUnusedDependencies(
            allUnusedDeps,
            allUnusedDevDeps,
            rootDir
          );
        } else {
          console.log('\n⏹️  跳过清理操作');
        }
      } else {
        console.log('\n🎉 所有依赖都在使用中，无需清理！');
      }

      console.log('\n✅ 清理检查完成！');
    } catch (error) {
      console.error('清理未使用的依赖失败:', error.message);
    }
  }

  // 移除未使用的依赖
  async removeUnusedDependencies(allUnusedDeps, allUnusedDevDeps, rootDir) {
    let totalRemoved = 0;
    let totalPackagesModified = 0;

    const fs = await import('fs');
    const path = await import('path');

    // 读取根目录 package.json
    const rootPackageJsonPath = path.join(rootDir, 'package.json');
    const rootPackageJson = JSON.parse(
      fs.readFileSync(rootPackageJsonPath, 'utf8')
    );

    // 处理生产依赖
    for (const item of allUnusedDeps) {
      const { package: pkgName, deps } = item;

      if (pkgName === '根目录') {
        for (const dep of deps) {
          if (rootPackageJson.dependencies?.[dep]) {
            delete rootPackageJson.dependencies[dep];
            console.log(`   🗑️  从根目录移除生产依赖: ${dep}`);
            totalRemoved++;
          }
        }
        totalPackagesModified++;
      }
    }

    // 处理开发依赖
    for (const item of allUnusedDevDeps) {
      const { package: pkgName, deps } = item;

      if (pkgName === '根目录') {
        for (const dep of deps) {
          if (rootPackageJson.devDependencies?.[dep]) {
            delete rootPackageJson.devDependencies[dep];
            console.log(`   🗑️  从根目录移除开发依赖: ${dep}`);
            totalRemoved++;
          }
        }
        totalPackagesModified++;
      }
    }

    // 保存修改
    if (totalRemoved > 0) {
      fs.writeFileSync(
        rootPackageJsonPath,
        JSON.stringify(rootPackageJson, null, 2)
      );

      console.log('\n📊 清理结果汇总:');
      console.log(`   • 移除的依赖数: ${totalRemoved}`);
      console.log(`   • 修改的包数: ${totalPackagesModified}`);

      console.log('\n💡 建议:');
      console.log('   1. 运行 pnpm install 重新安装依赖');
      console.log('   2. 运行 pnpm deps:cleanup 验证清理结果');
      console.log('   3. 测试项目确保功能正常');
    } else {
      console.log('\n⚠️  没有找到需要移除的依赖');
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
    console.log('📖 版本: 2.0.0');
    console.log('🎯 优化版本 - 更好的用户体验');
    await this.wait(1000);
    await this.showMenu('main');
  }
}

// 启动应用
const interactive = new InteractiveScripts();
interactive.start().catch(console.error);
