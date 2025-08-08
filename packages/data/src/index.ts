// IMTP Data Package - 主入口文件

// 导出所有验证器
export * from './validators';

// 导出所有转换器
export * from './transformers';

// 版本信息
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@imtp/data';

// 数据处理包信息
export const DATA_INFO = {
  name: PACKAGE_NAME,
  version: VERSION,
  description: 'IMTP data processing package',
  exports: {
    validators: '数据验证器',
    transformers: '数据转换器',
  },
} as const;
