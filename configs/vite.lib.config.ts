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
        },
      },
      minify: 'terser',
      sourcemap: true,
      outDir: 'dist',
    },
  });
}
