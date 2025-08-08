// 通用类型定义

// 基础类型
export type Primitive = string | number | boolean | null | undefined;

// 可选类型
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

// 数组类型
export type ArrayElement<T> = T extends Array<infer U> ? U : never;

// 对象类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 函数类型
export type FunctionType<T = any, R = any> = (...args: T[]) => R;
export type AsyncFunction<T = any, R = any> = (...args: T[]) => Promise<R>;

// 事件类型
export type EventHandler<T = Event> = (event: T) => void;
export type EventMap = Record<string, EventHandler>;

// 状态类型
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

// 分页类型
export type PaginationParams = {
  page: number;
  pageSize: number;
  total?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationParams;
};

// 排序类型
export type SortOrder = 'asc' | 'desc';
export type SortParams<T = string> = {
  field: T;
  order: SortOrder;
};

// 过滤类型
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'like'
  | 'regex';
export type FilterCondition<T = any> = {
  field: string;
  operator: FilterOperator;
  value: T;
};

export type FilterParams = {
  conditions: FilterCondition[];
  logic?: 'and' | 'or';
};

// 响应类型
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
};

// 配置类型
export type ConfigValue = Primitive | object | Array<Primitive>;
export type Config = Record<string, ConfigValue>;

// 环境类型
export type Environment = 'development' | 'test' | 'staging' | 'production';

// 主题类型
export type Theme = 'light' | 'dark' | 'auto';

// 语言类型
export type Language = 'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR';

// 设备类型
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

// 平台类型
export type Platform = 'web' | 'ios' | 'android' | 'desktop';

// 导出所有类型
export type * from './utils';
export type * from './validation';
