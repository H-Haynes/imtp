import { defineConfig } from 'vitest/config';

export interface VitestConfigOptions {
  include?: string[];
  exclude?: string[];
  environment?: 'node' | 'jsdom';
}

export function createVitestConfig(options: VitestConfigOptions = {}) {
  return defineConfig({
    test: {
      globals: true,
      environment: options.environment || 'node',
      include: options.include || ['tests/**/*.{test,spec}.{js,ts}'],
      exclude: options.exclude || ['node_modules', 'dist'],
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
  });
}
