// 数据转换器

import { capitalize, formatDate } from '@imtp/core';

// 类型定义
type TransformableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Record<string, unknown>
  | unknown[];
type TransformableObject = Record<string, TransformableValue>;

// 数据转换器类
export class DataTransformer {
  // 格式化日期
  formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return formatDate(dateObj, format);
  }

  // 格式化数字
  formatNumber(num: number, options: Intl.NumberFormatOptions = {}): string {
    return new Intl.NumberFormat('zh-CN', options).format(num);
  }

  // 格式化货币
  formatCurrency(amount: number, currency: string = 'CNY'): string {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  // 格式化文件大小
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 格式化时间间隔
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}小时${minutes}分钟${secs}秒`;
    } else if (minutes > 0) {
      return `${minutes}分钟${secs}秒`;
    } else {
      return `${secs}秒`;
    }
  }

  // 格式化相对时间
  formatRelativeTime(date: Date | string): string {
    const now = new Date();
    const targetDate = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor(
      (now.getTime() - targetDate.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return '刚刚';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}分钟前`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}小时前`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 86400)}天前`;
    } else if (diffInSeconds < 31536000) {
      return `${Math.floor(diffInSeconds / 2592000)}个月前`;
    } else {
      return `${Math.floor(diffInSeconds / 31536000)}年前`;
    }
  }

  // 转换对象键名
  transformKeys(
    obj: TransformableObject,
    transformer: (key: string) => string
  ): TransformableObject {
    const result: TransformableObject = {};

    for (const [key, value] of Object.entries(obj)) {
      const newKey = transformer(key);
      result[newKey] = value;
    }

    return result;
  }

  // 转换为驼峰命名
  toCamelCase(obj: TransformableObject): TransformableObject {
    return this.transformKeys(obj, key => {
      return key.replace(/[-_\s]+(.)?/g, (_, c) => {
        if (typeof c === 'string') {
          return c.toUpperCase();
        }
        return '';
      });
    });
  }

  // 转换为下划线命名
  toSnakeCase(obj: TransformableObject): TransformableObject {
    return this.transformKeys(obj, key => {
      return key.replace(/([A-Z])/g, '_$1').toLowerCase();
    });
  }

  // 转换为短横线命名
  toKebabCase(obj: TransformableObject): TransformableObject {
    return this.transformKeys(obj, key => {
      return key.replace(/([A-Z])/g, '-$1').toLowerCase();
    });
  }

  // 深度转换对象
  deepTransform(
    obj: TransformableValue,
    transformer: (value: TransformableValue) => TransformableValue
  ): TransformableValue {
    if (Array.isArray(obj)) {
      return obj.map(item =>
        this.deepTransform(item as TransformableValue, transformer)
      );
    } else if (obj !== null && typeof obj === 'object') {
      const result: TransformableObject = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = this.deepTransform(
          value as TransformableValue,
          transformer
        );
      }
      return result;
    } else {
      return transformer(obj);
    }
  }

  // 过滤对象属性
  filterObject(
    obj: TransformableObject,
    predicate: (value: TransformableValue, key: string) => boolean
  ): TransformableObject {
    const result: TransformableObject = {};

    for (const [key, value] of Object.entries(obj)) {
      if (predicate(value, key)) {
        result[key] = value;
      }
    }

    return result;
  }

  // 移除空值
  removeEmptyValues(obj: TransformableObject): TransformableObject {
    return this.filterObject(obj, value => {
      return value !== null && value !== undefined && value !== '';
    });
  }
}

// 创建转换器实例
export const transformer = new DataTransformer();
