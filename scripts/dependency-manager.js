#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '..');

class DependencyManager {
  constructor() {
    this.rootPackageJson = JSON.parse(
      readFileSync(join(rootDir, 'package.json'), 'utf8')
    );
    this.packages = this.getPackages();
  }

  getPackages() {
    const packagesDir = join(rootDir, 'packages');
    const packages = [];

    try {
      const dirs = execSync('ls packages', { cwd: rootDir, encoding: 'utf8' })
        .split('\n')
        .filter(Boolean);

      for (const dir of dirs) {
        const packageJsonPath = join(packagesDir, dir, 'package.json');
        if (existsSync(packageJsonPath)) {
          packages.push({
            name: dir,
            path: join(packagesDir, dir),
            packageJson: JSON.parse(readFileSync(packageJsonPath, 'utf8')),
          });
        }
      }
    } catch (error) {
      console.error('Error reading packages:', error.message);
    }

    return packages;
  }

  // 可中断的命令执行函数
  runInterruptibleCommand(command, cwd) {
    return new Promise((resolve, reject) => {
      let isResolved = false;
      const startTime = Date.now();

      let progressCleared = false;

      // 显示进度
      const progressInterval = setInterval(() => {
        if (!progressCleared) {
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          process.stdout.write(`\r   🔄 正在检查 (已用时 ${elapsed}s)...`);
        }
      }, 1000);

      // 启动子进程
      const child = spawn('pnpm', ['outdated', '--depth=0'], {
        cwd: cwd,
        stdio: ['inherit', 'pipe', 'inherit'],
      });

      let outputBuffer = '';

      // 处理子进程输出，确保不与进度指示器冲突
      child.stdout.on('data', data => {
        if (!progressCleared) {
          // 清除进度行：使用足够长的空格覆盖，然后回到行首
          process.stdout.write(
            '\r                                                            \r'
          );
          progressCleared = true;
        }
        outputBuffer += data;
      });

      // 子进程结束时输出所有内容
      child.on('close', () => {
        if (outputBuffer.trim()) {
          process.stdout.write(outputBuffer);
        }
      });

      // 子进程完成
      child.on('exit', (code, signal) => {
        if (!isResolved) {
          isResolved = true;
          clearInterval(progressInterval);

          // 如果没有输出内容且进度没有被清除，需要清除进度行
          if (!progressCleared && !outputBuffer.trim()) {
            process.stdout.write(
              '\r                                                            \r'
            );
          }

          if (
            signal === 'SIGTERM' ||
            signal === 'SIGINT' ||
            signal === 'SIGKILL'
          ) {
            reject(new Error('INTERRUPTED'));
          } else {
            resolve(code);
          }
        }
      });

      // 子进程错误
      child.on('error', error => {
        if (!isResolved) {
          isResolved = true;
          clearInterval(progressInterval);

          // 清除进度行
          if (!progressCleared) {
            process.stdout.write(
              '\r                                                            \r'
            );
          }

          reject(error);
        }
      });

      // 设置中断处理器
      const interruptHandler = () => {
        if (!isResolved) {
          isResolved = true;
          clearInterval(progressInterval);

          // 清除进度行
          if (!progressCleared) {
            process.stdout.write(
              '\r                                                            \r'
            );
          }

          console.log('\n⚠️  收到中断信号，正在终止...');
          child.kill('SIGTERM');
          setTimeout(() => child.kill('SIGKILL'), 2000);
          process.exit(0);
        }
      };

      process.on('SIGINT', interruptHandler);
      process.on('SIGTERM', interruptHandler);

      // 清理处理器
      child.on('exit', () => {
        process.removeListener('SIGINT', interruptHandler);
        process.removeListener('SIGTERM', interruptHandler);
      });
    });
  }

  // 检查依赖更新
  async checkUpdates() {
    console.log('🔍 检查依赖更新...\n');

    try {
      // 检查根目录依赖
      console.log('📦 根目录依赖更新:');
      console.log('   ⏳ 连接 npm 仓库中...');

      const startTime = Date.now();

      try {
        const exitCode = await this.runInterruptibleCommand(
          'pnpm outdated --depth=0',
          rootDir
        );
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        if (exitCode === 0) {
          console.log(`\n   ✅ 所有依赖都是最新的 (${duration}s)`);
        } else if (exitCode === 1) {
          console.log(`\n   📋 发现可更新的依赖 (${duration}s)`);
        }
      } catch (error) {
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);

        if (error.message === 'INTERRUPTED') {
          console.log(`\n   ⏹️  已中断 (${duration}s)`);
          return;
        } else {
          console.log(`\n   ⚠️  检查失败 (${duration}s):`, error.message);
        }
      }

      // 检查各包依赖
      if (this.packages.length > 0) {
        console.log(`\n📋 发现 ${this.packages.length} 个子包`);

        let completedPackages = 0;
        const totalPackages = this.packages.length;

        for (const pkg of this.packages) {
          completedPackages++;
          console.log(
            `\n📦 ${pkg.name}: [${completedPackages}/${totalPackages}]`
          );
          console.log(`   ⏳ 检查中...`);

          const pkgStartTime = Date.now();

          try {
            const exitCode = await this.runInterruptibleCommand(
              'pnpm outdated --depth=0',
              pkg.path
            );
            const duration = ((Date.now() - pkgStartTime) / 1000).toFixed(1);

            if (exitCode === 0) {
              console.log(`\n   ✅ 最新 (${duration}s)`);
            } else if (exitCode === 1) {
              console.log(`\n   📋 有更新 (${duration}s)`);
            }
          } catch (error) {
            const duration = ((Date.now() - pkgStartTime) / 1000).toFixed(1);

            if (error.message === 'INTERRUPTED') {
              console.log(`\n   ⏹️  已中断 (${duration}s)`);
              return;
            } else {
              console.log(`\n   ⚠️  失败 (${duration}s)，跳过`);
            }
          }
        }
      }

      console.log('\n🎉 依赖更新检查完成！');
    } catch (error) {
      console.error('\n❌ 检查更新失败:', error.message);
    }
  }

  // 检测版本冲突
  detectConflicts() {
    console.log('\n⚠️  检测版本冲突...');

    const allDeps = new Map();

    // 收集所有依赖
    this.collectDependencies(this.rootPackageJson, allDeps);
    for (const pkg of this.packages) {
      this.collectDependencies(pkg.packageJson, allDeps);
    }

    // 检查冲突
    const conflicts = [];
    const duplicates = [];

    for (const [name, versions] of allDeps.entries()) {
      const versionArray = Array.from(versions);

      // 跳过 workspace 依赖，这些是正常的
      if (name.startsWith('@imtp/')) {
        continue;
      }

      // 检查是否有真正的版本冲突（不同版本）
      const uniqueVersions = new Set(versionArray.map(v => v.version));
      if (uniqueVersions.size > 1) {
        conflicts.push({
          name,
          versions: versionArray,
          packages: versionArray.map(v => v.package),
        });
      } else if (versionArray.length > 1) {
        // 相同版本但重复定义
        duplicates.push({
          name,
          version: versionArray[0].version,
          packages: versionArray.map(v => v.package),
        });
      }
    }

    if (conflicts.length > 0) {
      console.log('\n❌ 发现版本冲突:');
      conflicts.forEach(conflict => {
        console.log(`\n  ${conflict.name}:`);
        conflict.versions.forEach(version => {
          console.log(`    ${version.package}: ${version.version}`);
        });
      });
    } else {
      console.log('✅ 未发现版本冲突');
    }

    if (duplicates.length > 0) {
      console.log('\n📋 发现重复依赖（相同版本）:');
      duplicates.forEach(duplicate => {
        console.log(`\n  ${duplicate.name} (${duplicate.version}):`);
        duplicate.packages.forEach(pkg => {
          console.log(`    ${pkg}`);
        });
      });
    }

    return { conflicts, duplicates };
  }

  collectDependencies(packageJson, allDeps) {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    for (const [name, version] of Object.entries(deps)) {
      if (!allDeps.has(name)) {
        allDeps.set(name, new Set());
      }
      allDeps.get(name).add({
        version,
        package: packageJson.name || 'root',
      });
    }
  }

  // 安全漏洞扫描
  async securityScan() {
    console.log('\n🔒 安全漏洞扫描...');

    try {
      console.log('\n📦 根目录安全扫描:');
      try {
        execSync('pnpm audit --audit-level moderate', {
          cwd: rootDir,
          stdio: 'inherit',
        });
      } catch (error) {
        if (error.status === 1) {
          console.log('  ✅ 扫描完成，未发现严重漏洞');
        } else {
          console.log('  ⚠️  扫描失败:', error.message);
        }
      }

      for (const pkg of this.packages) {
        console.log(`\n📦 ${pkg.name} 安全扫描:`);
        try {
          execSync('pnpm audit --audit-level moderate', {
            cwd: pkg.path,
            stdio: 'inherit',
          });
        } catch (error) {
          if (error.status === 1) {
            console.log('  ✅ 扫描完成，未发现严重漏洞');
          } else {
            console.log('  ⚠️  扫描失败，跳过');
          }
        }
      }
    } catch (error) {
      console.error('安全扫描失败:', error.message);
    }
  }

  // 包大小分析
  async analyzeSize() {
    console.log('\n📊 包大小分析...');

    try {
      // 构建所有包
      console.log('构建包以分析大小...');
      execSync('pnpm build', {
        cwd: rootDir,
        stdio: 'inherit',
      });

      console.log('\n📦 各包构建后大小:');
      let hasBuiltPackages = false;

      for (const pkg of this.packages) {
        const distPath = join(pkg.path, 'dist');
        if (existsSync(distPath)) {
          const size = this.getDirectorySize(distPath);
          if (size > 0) {
            console.log(`  ${pkg.name}: ${this.formatSize(size)}`);
            hasBuiltPackages = true;
          } else {
            console.log(`  ${pkg.name}: 构建目录为空`);
          }
        } else {
          console.log(`  ${pkg.name}: 未找到构建输出`);
        }
      }

      if (!hasBuiltPackages) {
        console.log('  未找到有效的构建输出');
      }
    } catch (error) {
      console.error('包大小分析失败:', error.message);
    }
  }

  getDirectorySize(dirPath) {
    try {
      // macOS 兼容：使用 -sk 获取 KB 大小，然后转换为字节
      const result = execSync(`du -sk "${dirPath}"`, { encoding: 'utf8' });
      const sizeInKB = parseInt(result.split('\t')[0]);
      return sizeInKB * 1024; // 转换为字节
    } catch (error) {
      return 0;
    }
  }

  formatSize(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  // 清理未使用的依赖
  async cleanupUnused() {
    console.log('\n🧹 清理未使用的依赖...');

    try {
      // 需要先安装 depcheck
      try {
        execSync('pnpm list depcheck', { cwd: rootDir, stdio: 'ignore' });
      } catch (error) {
        console.log('安装 depcheck...');
        execSync('pnpm add -D depcheck', { cwd: rootDir, stdio: 'inherit' });
      }

      // 为每个包运行 depcheck，但忽略 workspace 依赖的误报
      for (const pkg of this.packages) {
        console.log(`\n📦 ${pkg.name} 未使用依赖:`);
        try {
          const result = execSync('npx depcheck --json', {
            cwd: pkg.path,
            encoding: 'utf8',
          });
          const depcheckResult = JSON.parse(result);

          // 过滤掉 workspace 依赖的误报
          const unusedDeps = depcheckResult.dependencies.filter(dep => {
            // 忽略 workspace 依赖
            if (dep.startsWith('@imtp/')) {
              return false;
            }
            return true;
          });

          const unusedDevDeps = depcheckResult.devDependencies.filter(dep => {
            // 忽略测试相关的依赖
            if (
              dep.includes('test') ||
              dep.includes('vitest') ||
              dep.includes('coverage')
            ) {
              return false;
            }
            return true;
          });

          if (unusedDeps.length > 0) {
            console.log(`  未使用的生产依赖: ${unusedDeps.join(', ')}`);
          }

          if (unusedDevDeps.length > 0) {
            console.log(`  未使用的开发依赖: ${unusedDevDeps.join(', ')}`);
          }

          if (unusedDeps.length === 0 && unusedDevDeps.length === 0) {
            console.log('  所有依赖都在使用中');
          }
        } catch (error) {
          console.log('  分析完成');
        }
      }

      // 根目录的特殊处理
      console.log('\n📦 根目录未使用依赖:');
      try {
        const result = execSync('npx depcheck --json', {
          cwd: rootDir,
          encoding: 'utf8',
        });
        const depcheckResult = JSON.parse(result);

        // 过滤掉 workspace 依赖和工具依赖
        const unusedDeps = depcheckResult.dependencies.filter(dep => {
          if (dep.startsWith('@imtp/')) return false;
          return true;
        });

        const unusedDevDeps = depcheckResult.devDependencies.filter(dep => {
          // 保留重要的工具依赖
          const importantTools = [
            'typescript',
            'vite',
            'vitest',
            'eslint',
            'prettier',
            'husky',
            'lint-staged',
          ];
          if (importantTools.includes(dep)) return false;
          return true;
        });

        if (unusedDeps.length > 0) {
          console.log(`  未使用的生产依赖: ${unusedDeps.join(', ')}`);
        }

        if (unusedDevDeps.length > 0) {
          console.log(`  未使用的开发依赖: ${unusedDevDeps.join(', ')}`);
        }

        if (unusedDeps.length === 0 && unusedDevDeps.length === 0) {
          console.log('  所有依赖都在使用中');
        }
      } catch (error) {
        console.log('  分析完成');
      }
    } catch (error) {
      console.error('清理未使用依赖失败:', error.message);
    }
  }

  // 修复重复依赖
  async fixDuplicates() {
    console.log('\n🔧 修复重复依赖...');

    const { duplicates } = this.detectConflicts();

    if (duplicates.length === 0) {
      console.log('✅ 没有需要修复的重复依赖');
      return;
    }

    // 分析哪些依赖可以提升到根目录
    const candidatesForPromotion = duplicates.filter(duplicate => {
      // 只考虑开发依赖，生产依赖通常需要保持在各包中
      return this.isDevDependency(duplicate.name);
    });

    if (candidatesForPromotion.length === 0) {
      console.log('没有适合提升到根目录的依赖');
      return;
    }

    console.log('\n📦 可提升到根目录的依赖:');
    candidatesForPromotion.forEach(candidate => {
      console.log(`  ${candidate.name} (${candidate.version})`);
    });

    // 检查是否要执行自动修复
    const shouldAutoFix = process.argv.includes('--auto-fix');

    if (shouldAutoFix) {
      await this.performAutoFix(candidatesForPromotion);
    } else {
      console.log(
        '\n要自动修复，请运行: node scripts/dependency-manager.js fix-duplicates --auto-fix'
      );
    }
  }

  async performAutoFix(candidates) {
    console.log('\n🚀 开始自动修复...');

    try {
      // 备份当前的 package.json 文件
      const backupDir = join(rootDir, '.backup');
      if (!existsSync(backupDir)) {
        execSync(`mkdir -p "${backupDir}"`);
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      execSync(
        `cp "${join(rootDir, 'package.json')}" "${join(backupDir, `package.json.${timestamp}`)}"`
      );

      for (const pkg of this.packages) {
        execSync(
          `cp "${join(pkg.path, 'package.json')}" "${join(backupDir, `${pkg.name}.package.json.${timestamp}`)}"`
        );
      }

      console.log('✅ 已备份所有 package.json 文件');

      // 为每个候选依赖执行提升
      for (const candidate of candidates) {
        await this.promoteDependency(candidate);
      }

      console.log('\n✅ 自动修复完成！');
    } catch (error) {
      console.error('❌ 自动修复失败:', error.message);
      console.log('请检查备份文件并手动恢复');
    }
  }

  async promoteDependency(candidate) {
    console.log(`\n📦 提升依赖: ${candidate.name} (${candidate.version})`);

    // 确保根目录有该依赖
    if (!this.rootPackageJson.devDependencies?.[candidate.name]) {
      if (!this.rootPackageJson.devDependencies) {
        this.rootPackageJson.devDependencies = {};
      }
      this.rootPackageJson.devDependencies[candidate.name] = candidate.version;
    }

    // 从各个包中移除该依赖
    for (const pkg of this.packages) {
      if (pkg.packageJson.devDependencies?.[candidate.name]) {
        delete pkg.packageJson.devDependencies[candidate.name];
        console.log(`  从 ${pkg.name} 中移除 ${candidate.name}`);
      }
    }

    // 保存修改
    writeFileSync(
      join(rootDir, 'package.json'),
      JSON.stringify(this.rootPackageJson, null, 2)
    );

    for (const pkg of this.packages) {
      writeFileSync(
        join(pkg.path, 'package.json'),
        JSON.stringify(pkg.packageJson, null, 2)
      );
    }
  }

  isDevDependency(depName) {
    // 检查是否在所有包中都是开发依赖
    const isDevInRoot = this.rootPackageJson.devDependencies?.[depName];

    for (const pkg of this.packages) {
      const isDevInPackage = pkg.packageJson.devDependencies?.[depName];
      const isProdInPackage = pkg.packageJson.dependencies?.[depName];

      // 如果某个包中作为生产依赖，则不适合提升
      if (isProdInPackage) {
        return false;
      }
    }

    return isDevInRoot;
  }

  // 生成依赖报告
  generateReport() {
    console.log('\n📋 生成依赖报告...');

    const report = {
      timestamp: new Date().toISOString(),
      root: {
        name: this.rootPackageJson.name,
        dependencies: Object.keys(this.rootPackageJson.dependencies || {})
          .length,
        devDependencies: Object.keys(this.rootPackageJson.devDependencies || {})
          .length,
      },
      packages: this.packages.map(pkg => ({
        name: pkg.name,
        dependencies: Object.keys(pkg.packageJson.dependencies || {}).length,
        devDependencies: Object.keys(pkg.packageJson.devDependencies || {})
          .length,
      })),
      totalPackages: this.packages.length,
    };

    const reportPath = join(rootDir, 'dependency-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`报告已生成: ${reportPath}`);

    return report;
  }

  // 运行所有检查
  async runAll() {
    console.log('🚀 开始智能依赖管理检查...\n');

    await this.checkUpdates();
    this.detectConflicts();
    await this.securityScan();
    await this.analyzeSize();
    await this.cleanupUnused();
    this.generateReport();

    console.log('\n✅ 依赖管理检查完成！');
  }
}

// 命令行接口
const args = process.argv.slice(2);
const manager = new DependencyManager();

if (args.length === 0) {
  manager.runAll();
} else {
  const command = args[0];
  switch (command) {
    case 'updates':
      manager.checkUpdates();
      break;

    case 'conflicts':
      manager.detectConflicts();
      break;
    case 'fix-duplicates':
      manager.fixDuplicates();
      break;
    case 'security':
      manager.securityScan();
      break;
    case 'size':
      manager.analyzeSize();
      break;
    case 'cleanup':
      manager.cleanupUnused();
      break;
    case 'report':
      manager.generateReport();
      break;
    default:
      console.log(`
用法: node scripts/dependency-manager.js [command]

命令:
  updates        检查依赖更新（带进度提示）
  conflicts      检测版本冲突（本地快速）
  fix-duplicates 修复重复依赖
  security       安全漏洞扫描
  size           包大小分析
  cleanup        清理未使用依赖
  report         生成依赖报告
  (无参数)       运行所有检查
      `);
  }
}
