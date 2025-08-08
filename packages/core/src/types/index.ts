// 核心类型定义

// 基础类型
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 分页类型
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  stack?: string;
}

// 配置类型
export interface AppConfig {
  env: 'development' | 'production' | 'test';
  debug: boolean;
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    [key: string]: boolean;
  };
}
