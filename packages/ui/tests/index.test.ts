import { describe, it, expect } from 'vitest';
import { VERSION, PACKAGE_NAME, UI_INFO } from '../src/index';

describe('@imtp/ui', () => {
  it('should export correct version and package name', () => {
    expect(VERSION).toBe('1.0.0');
    expect(PACKAGE_NAME).toBe('@imtp/ui');
  });

  it('should export correct package info', () => {
    expect(UI_INFO).toEqual({
      name: '@imtp/ui',
      version: '1.0.0',
      description: 'IMTP Vue3 UI components package',
      exports: {
        components: 'Vue3 UI组件',
        hooks: 'Vue3 Composition API Hooks',
      },
    });
  });

  // 注意：Vue3组件的测试需要专门的测试环境，这里只测试基础导出
  // 完整的组件测试应该在专门的测试环境中进行
});
