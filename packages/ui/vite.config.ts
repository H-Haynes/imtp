import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'IMTPUI',
      formats: ['es', 'cjs', 'umd'],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@imtp/core', '@imtp/types'],
      output: {
        globals: {
          vue: 'Vue',
          '@imtp/core': 'IMTPCore',
          '@imtp/types': 'IMTPTypes',
        },
      },
    },
    minify: 'terser',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
