import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@imtp': resolve(__dirname, './packages'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IMTP',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    minify: 'terser',
    sourcemap: true,
  },
});
