// 核心工具函数

// 类型检查工具
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

// 字符串工具
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => {
    if (typeof c === 'string') {
      return c.toUpperCase();
    }
    return '';
  });
}

export function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// 数组工具
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// 对象工具
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

// 日期工具
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
}

// 分页工具
export function createPagination<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
