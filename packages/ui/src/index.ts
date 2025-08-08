// IMTP Vue3 UI Package - 主入口文件

// 导出所有组件
export * from './components';

// 导出所有 Hooks
export * from './hooks';

// 版本信息
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@imtp/ui';

// UI包信息
export const UI_INFO = {
  name: PACKAGE_NAME,
  version: VERSION,
  description: 'IMTP Vue3 UI components package',
  exports: {
    components: 'Vue3 UI组件',
    hooks: 'Vue3 Composition API Hooks',
  },
} as const;
