#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// 回滚配置
const ROLLBACK_CONFIG = {
  maxBackups: 5,
  backupDir: path.join(ROOT_DIR, '.backups'),
  npmRegistry: 'https://registry.npmjs.org',
};

// 创建备份
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `backup-${timestamp}`;
  const backupPath = path.join(ROLLBACK_CONFIG.backupDir, backupName);

  console.log(`📦 创建备份: ${backupName}`);

  // 创建备份目录
  if (!fs.existsSync(ROLLBACK_CONFIG.backupDir)) {
    fs.mkdirSync(ROLLBACK_CONFIG.backupDir, { recursive: true });
  }

  // 创建具体的备份目录
  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  // 备份包信息
  const packages = [];
  const packagesDir = path.join(ROOT_DIR, 'packages');

  if (fs.existsSync(packagesDir)) {
    const packageDirs = fs.readdirSync(packagesDir);

    packageDirs.forEach(pkgDir => {
      const packageJsonPath = path.join(packagesDir, pkgDir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8')
        );
        packages.push({
          name: packageJson.name,
          version: packageJson.version,
          path: pkgDir,
        });
      }
    });
  }

  // 保存备份信息
  const backupInfo = {
    timestamp,
    packages,
    gitCommit: getCurrentCommit(),
    gitBranch: getCurrentBranch(),
  };

  fs.writeFileSync(
    path.join(backupPath, 'backup-info.json'),
    JSON.stringify(backupInfo, null, 2)
  );

  console.log(`✅ 备份创建完成: ${backupPath}`);
  return backupName;
}

// 获取当前 Git 提交
function getCurrentCommit() {
  try {
    return execSync('git rev-parse HEAD', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    }).trim();
  } catch (error) {
    return 'unknown';
  }
}

// 获取当前分支
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: ROOT_DIR,
      encoding: 'utf8',
    }).trim();
  } catch (error) {
    return 'unknown';
  }
}

// 列出所有备份
function listBackups() {
  if (!fs.existsSync(ROLLBACK_CONFIG.backupDir)) {
    console.log('📋 没有找到备份');
    return [];
  }

  const backups = fs
    .readdirSync(ROLLBACK_CONFIG.backupDir)
    .filter(dir => dir.startsWith('backup-'))
    .sort()
    .reverse();

  console.log('📋 可用备份:');
  backups.forEach((backup, index) => {
    const backupPath = path.join(ROLLBACK_CONFIG.backupDir, backup);
    const infoPath = path.join(backupPath, 'backup-info.json');

    if (fs.existsSync(infoPath)) {
      const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
      console.log(`  ${index + 1}. ${backup} (${info.timestamp})`);
      console.log(`     提交: ${info.gitCommit.substring(0, 8)}`);
      console.log(`     分支: ${info.gitBranch}`);
      console.log(`     包数量: ${info.packages.length}`);
    } else {
      console.log(`  ${index + 1}. ${backup} (信息缺失)`);
    }
  });

  return backups;
}

// 执行回滚
function performRollback(backupName) {
  console.log(`🔄 开始回滚到: ${backupName}`);

  const backupPath = path.join(ROLLBACK_CONFIG.backupDir, backupName);
  const infoPath = path.join(backupPath, 'backup-info.json');

  if (!fs.existsSync(infoPath)) {
    console.error(`❌ 备份信息不存在: ${backupName}`);
    return false;
  }

  const backupInfo = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

  try {
    // 回滚 Git 到指定提交
    console.log(`🔄 回滚 Git 到提交: ${backupInfo.gitCommit}`);
    execSync(`git reset --hard ${backupInfo.gitCommit}`, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });

    // 回滚包版本
    console.log('🔄 回滚包版本...');
    backupInfo.packages.forEach(pkg => {
      const packageJsonPath = path.join(
        ROOT_DIR,
        'packages',
        pkg.path,
        'package.json'
      );
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, 'utf8')
        );
        packageJson.version = pkg.version;
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`  ✅ ${pkg.name} -> ${pkg.version}`);
      }
    });

    // 重新安装依赖
    console.log('📦 重新安装依赖...');
    execSync('pnpm install', { cwd: ROOT_DIR, stdio: 'inherit' });

    // 重新构建
    console.log('🔨 重新构建...');
    execSync('pnpm build', { cwd: ROOT_DIR, stdio: 'inherit' });

    console.log('✅ 回滚完成');
    return true;
  } catch (error) {
    console.error(`❌ 回滚失败: ${error.message}`);
    return false;
  }
}

// 清理旧备份
function cleanupOldBackups() {
  if (!fs.existsSync(ROLLBACK_CONFIG.backupDir)) {
    return;
  }

  const backups = fs
    .readdirSync(ROLLBACK_CONFIG.backupDir)
    .filter(dir => dir.startsWith('backup-'))
    .sort()
    .reverse();

  if (backups.length > ROLLBACK_CONFIG.maxBackups) {
    const toDelete = backups.slice(ROLLBACK_CONFIG.maxBackups);
    console.log(`🧹 清理 ${toDelete.length} 个旧备份...`);

    toDelete.forEach(backup => {
      const backupPath = path.join(ROLLBACK_CONFIG.backupDir, backup);
      fs.rmSync(backupPath, { recursive: true, force: true });
      console.log(`  🗑️  删除: ${backup}`);
    });
  }
}

// 主函数
function main() {
  const command = process.argv[2];
  const backupName = process.argv[3];

  switch (command) {
    case 'create':
      createBackup();
      cleanupOldBackups();
      break;

    case 'list':
      listBackups();
      break;

    case 'rollback':
      if (!backupName) {
        console.error('❌ 请指定备份名称');
        console.log('用法: node scripts/rollback.js rollback <backup-name>');
        process.exit(1);
      }
      performRollback(backupName);
      break;

    case 'cleanup':
      cleanupOldBackups();
      break;

    default:
      console.log('🔄 回滚工具');
      console.log('');
      console.log('用法:');
      console.log('  node scripts/rollback.js create           - 创建备份');
      console.log('  node scripts/rollback.js list             - 列出备份');
      console.log('  node scripts/rollback.js rollback <name>  - 执行回滚');
      console.log('  node scripts/rollback.js cleanup          - 清理旧备份');
  }
}

main();
