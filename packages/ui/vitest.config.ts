import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/tests/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@imtp/core': resolve(__dirname, '../core/src'),
      '@imtp/types': resolve(__dirname, '../types/src'),
    },
  },
});
