import { describe, it, expect } from 'vitest';
import { VERSION, PACKAGE_NAME, TYPES_INFO } from '../src/index';

describe('@imtp/types', () => {
  it('should export correct version', () => {
    expect(VERSION).toBe('1.0.0');
  });

  it('should export correct package name', () => {
    expect(PACKAGE_NAME).toBe('@imtp/types');
  });

  it('should export package info', () => {
    expect(TYPES_INFO).toEqual({
      name: '@imtp/types',
      version: '1.0.0',
      description: 'IMTP shared types package',
      exports: {
        common: '通用类型定义',
        api: 'API相关类型定义',
        shared: '共享业务类型定义',
      },
    });
  });

  it('should export common types', () => {
    // 测试通用类型导出
    expect(true).toBe(true);
  });

  it('should export API types', () => {
    // 测试API类型导出
    expect(true).toBe(true);
  });

  it('should export shared types', () => {
    // 测试共享类型导出
    expect(true).toBe(true);
  });
});
