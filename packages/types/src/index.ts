// IMTP Types Package - 主入口文件

// 导出所有通用类型
export type * from './common';

// 导出所有API类型
export type * from './api';

// 导出所有共享类型
export type * from './shared';

// 显式导出以避免命名冲突
export type { PaginatedResponse, RetryConfig } from './api';
export type { EventHandler, FormValidation, Theme } from './common';

// 版本信息
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@imtp/types';

// 类型包信息
export const TYPES_INFO = {
  name: PACKAGE_NAME,
  version: VERSION,
  description: 'IMTP shared types package',
  exports: {
    common: '通用类型定义',
    api: 'API相关类型定义',
    shared: '共享业务类型定义',
  },
} as const;
