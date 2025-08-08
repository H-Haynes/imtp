import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IMTPTypes',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        exports: 'named',
      },
    },
    sourcemap: true,
    minify: false,
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
