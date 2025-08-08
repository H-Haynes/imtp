// IMTP Core Package - 主入口文件

// 导出所有类型定义
export type * from './types';

// 导出所有工具函数
export * from './utils';

// 导出所有常量
export * from './constants';

// 版本信息
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@imtp/core';

// 核心包信息
export const CORE_INFO = {
  name: PACKAGE_NAME,
  version: VERSION,
  description: 'IMTP core functionality package',
  exports: {
    types: '核心类型定义',
    utils: '核心工具函数',
    constants: '核心常量定义',
  },
} as const;

// 核心管理器
export class CoreManager {
  private static instance: CoreManager | undefined;
  private config: Record<string, unknown> = {};

  private constructor() {}

  static getInstance(): CoreManager {
    return (CoreManager.instance ??= new CoreManager());
  }

  // 设置配置
  setConfig(key: string, value: unknown): void {
    this.config[key] = value;
  }

  // 获取配置
  getConfig(key: string): unknown {
    return this.config[key];
  }

  // 获取所有配置
  getAllConfig(): Record<string, unknown> {
    return { ...this.config };
  }

  // 清除配置
  clearConfig(): void {
    this.config = {};
  }
}

// 默认核心管理器实例
export const coreManager = CoreManager.getInstance();
