#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

class CICDManager {
  constructor() {
    this.config = {
      commands: {
        test: 'pnpm test',
        lint: 'pnpm lint',
        typeCheck: 'pnpm type-check',
        build: 'pnpm build',
        security: 'pnpm deps:security',
        release: 'pnpm release',
        releaseDryRun: 'pnpm release:dry-run',
      },
    };
  }

  async runCommand(command, description = '执行命令') {
    return new Promise((resolve, reject) => {
      console.log(`🚀 ${description}: ${command}`);

      const child = spawn(command.split(' ')[0], command.split(' ').slice(1), {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true,
      });

      child.on('exit', code => {
        if (code === 0) {
          console.log(`✅ ${description} 完成`);
          resolve();
        } else {
          console.log(`❌ ${description} 失败 (退出码: ${code})`);
          reject(new Error(`命令执行失败: ${code}`));
        }
      });

      child.on('error', error => {
        console.log(`❌ ${description} 错误: ${error.message}`);
        reject(error);
      });
    });
  }

  async runFullPipeline() {
    console.log('🚀 开始执行完整 CI/CD 流程\n');

    try {
      // 1. 代码质量检查
      console.log('📋 阶段 1: 代码质量检查');
      await this.runCommand(this.config.commands.lint, '代码检查');
      await this.runCommand(this.config.commands.typeCheck, '类型检查');

      // 2. 测试
      console.log('\n📋 阶段 2: 测试');
      await this.runCommand(this.config.commands.test, '运行测试');

      // 3. 安全扫描
      console.log('\n📋 阶段 3: 安全扫描');
      await this.runCommand(this.config.commands.security, '安全扫描');

      // 4. 构建
      console.log('\n📋 阶段 4: 构建');
      await this.runCommand(this.config.commands.build, '项目构建');

      console.log('\n✅ CI/CD 流程执行完成！');
    } catch (error) {
      console.log(`\n❌ CI/CD 流程执行失败: ${error.message}`);
      process.exit(1);
    }
  }

  async runRelease(dryRun = false) {
    console.log('🚀 开始执行发布流程\n');

    try {
      // 1. 预检查
      console.log('📋 阶段 1: 预检查');
      await this.runCommand(this.config.commands.lint, '代码检查');
      await this.runCommand(this.config.commands.typeCheck, '类型检查');
      await this.runCommand(this.config.commands.test, '运行测试');
      await this.runCommand(this.config.commands.build, '项目构建');

      // 2. 发布
      console.log('\n📋 阶段 2: 发布');
      const releaseCommand = dryRun
        ? this.config.commands.releaseDryRun
        : this.config.commands.release;
      await this.runCommand(releaseCommand, dryRun ? '发布预览' : '发布');

      console.log(`\n✅ 发布流程执行完成！${dryRun ? '(预览模式)' : ''}`);
    } catch (error) {
      console.log(`\n❌ 发布流程执行失败: ${error.message}`);
      process.exit(1);
    }
  }

  async analyzeCommits() {
    console.log('🔍 分析提交历史...\n');

    try {
      const result = execSync('git log --oneline -10', {
        cwd: rootDir,
        encoding: 'utf8',
      });

      console.log('最近 10 次提交:');
      console.log(result);

      console.log('\n📊 提交类型统计:');
      const stats = execSync(
        'git log --pretty=format:"%s" | head -20 | cut -d: -f1 | sort | uniq -c',
        {
          cwd: rootDir,
          encoding: 'utf8',
        }
      );
      console.log(stats);
    } catch (error) {
      console.log(`❌ 分析失败: ${error.message}`);
    }
  }

  showHelp() {
    console.log(`
🚀 CI/CD 管理工具

使用方法:
  node scripts/ci-cd.js <command> [options]

命令:
  pipeline    执行完整 CI/CD 流程
  release     执行发布流程
  release:dry 执行发布预览
  analyze     分析提交历史
  help        显示帮助信息

选项:
  --dry-run   预览模式，不实际执行发布

示例:
  node scripts/ci-cd.js pipeline
  node scripts/ci-cd.js release
  node scripts/ci-cd.js release --dry-run
  node scripts/ci-cd.js analyze
    `);
  }
}

async function main() {
  const manager = new CICDManager();
  const args = process.argv.slice(2);
  const command = args[0];
  const options = args.slice(1);

  switch (command) {
    case 'pipeline':
      await manager.runFullPipeline();
      break;
    case 'release':
      await manager.runRelease(options.includes('--dry-run'));
      break;
    case 'release:dry':
      await manager.runRelease(true);
      break;
    case 'analyze':
      await manager.analyzeCommits();
      break;
    case 'help':
    case '--help':
    case '-h':
      manager.showHelp();
      break;
    default:
      console.log('❌ 未知命令');
      manager.showHelp();
      process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
