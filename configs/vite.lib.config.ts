import { defineConfig } from 'vite';
import { resolve } from 'path';

export interface ViteLibConfigOptions {
  entry: string;
  name: string;
  external?: string[];
  globals?: Record<string, string>;
}

export function createViteLibConfig(options: ViteLibConfigOptions) {
  return defineConfig({
    build: {
      lib: {
        entry: resolve(process.cwd(), options.entry),
        name: options.name,
        formats: ['es', 'cjs', 'umd'],
        fileName: format => `index.${format}.js`,
      },
      rollupOptions: {
        external: options.external || [],
        output: {
          globals: options.globals || {},
          // 优化代码分割
          manualChunks: undefined,
          // 减少包体积
          compact: true,
        },
      },
      minify: 'terser',
      sourcemap: true,
      outDir: 'dist',
      // 优化构建性能
      target: 'es2020',
      // 减少构建时间
      reportCompressedSize: false,
      // 优化依赖处理
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    // 优化开发体验
    optimizeDeps: {
      include: options.external || [],
    },
  });
}
