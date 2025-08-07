import { minify } from 'terser';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

async function buildMinVersions(packagePath) {
  const distPath = resolve(packagePath, 'dist');

  if (!existsSync(distPath)) {
    console.log(`跳过 ${packagePath}: dist目录不存在`);
    return;
  }

  const files = ['index.es.js', 'index.cjs.js', 'index.umd.js'];

  for (const file of files) {
    const filePath = resolve(distPath, file);

    if (!existsSync(filePath)) {
      console.log(`跳过 ${file}: 文件不存在`);
      continue;
    }

    try {
      const code = readFileSync(filePath, 'utf8');
      const result = await minify(code, {
        compress: true,
        mangle: true,
        format: {
          comments: false,
        },
      });

      if (result.code) {
        const minFileName = file.replace('.js', '.min.js');
        const minFilePath = resolve(distPath, minFileName);
        writeFileSync(minFilePath, result.code);
        console.log(`✅ 生成: ${minFileName}`);
      }
    } catch (error) {
      console.error(`❌ 压缩失败 ${file}:`, error.message);
    }
  }
}

// 获取命令行参数
const args = process.argv.slice(2);
const packagePath = args[0] || process.cwd();

console.log(`开始生成min版本: ${packagePath}`);
buildMinVersions(packagePath)
  .then(() => {
    console.log('✅ min版本生成完成');
  })
  .catch(error => {
    console.error('❌ 生成失败:', error);
    process.exit(1);
  });
