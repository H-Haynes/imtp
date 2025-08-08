/* eslint-disable @typescript-eslint/no-explicit-any */
// REST API 类型定义

import type {
  HttpMethod,
  HttpStatusCode,
  HttpHeaders,
  RequestConfig,
  HttpResponse,
} from './index';

// REST 资源
export type RestResource<T = any> = {
  id: string | number;
  type: string;
  attributes: T;
  relationships?: Record<string, RestRelationship>;
  meta?: Record<string, any>;
  links?: RestLinks;
};

// REST 关系
export type RestRelationship = {
  data: RestResource | RestResource[] | null;
  links?: RestLinks;
  meta?: Record<string, any>;
};

// REST 链接
export type RestLinks = {
  self?: string;
  related?: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
};

// REST 集合
export type RestCollection<T = any> = {
  data: RestResource<T>[];
  included?: RestResource[];
  meta?: {
    pagination?: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
    [key: string]: any;
  };
  links?: RestLinks;
};

// REST 错误
export type RestError = {
  id?: string;
  status: HttpStatusCode;
  code: string;
  title: string;
  detail: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  meta?: Record<string, any>;
};

// REST 错误响应
export type RestErrorResponse = {
  errors: RestError[];
  meta?: Record<string, any>;
  links?: RestLinks;
};

// REST 操作
export type RestOperation = {
  op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
  path: string;
  value?: any;
  from?: string;
};

// REST 批量操作
export type RestBulkOperation = {
  operations: RestOperation[];
};

// REST 查询参数
export type RestQueryParams = {
  // 分页
  page?: {
    number?: number;
    size?: number;
    offset?: number;
    limit?: number;
  };

  // 排序
  sort?: string | string[];

  // 过滤
  filter?: Record<string, any>;

  // 包含关系
  include?: string | string[];

  // 字段选择
  fields?: Record<string, string | string[]>;

  // 搜索
  search?: string;

  // 自定义参数
  [key: string]: any;
};

// REST 客户端配置
export type RestClientConfig = {
  baseURL: string;
  apiVersion?: string;
  defaultHeaders?: HttpHeaders;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  validateStatus?: (status: HttpStatusCode) => boolean;
  maxRedirects?: number;
  maxContentLength?: number;
  maxBodyLength?: number;
  retry?: {
    maxRetries: number;
    retryDelay: number;
    retryCondition?: (error: RestError) => boolean;
  };
  cache?: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
};

// REST 客户端接口
export interface IRestClient {
  // 基础 CRUD
  get<T = any>(
    url: string,
    params?: RestQueryParams
  ): Promise<HttpResponse<RestResource<T> | RestCollection<T>>>;
  post<T = any>(
    url: string,
    data?: any
  ): Promise<HttpResponse<RestResource<T>>>;
  put<T = any>(url: string, data?: any): Promise<HttpResponse<RestResource<T>>>;
  patch<T = any>(
    url: string,
    data?: any
  ): Promise<HttpResponse<RestResource<T>>>;
  delete(url: string): Promise<HttpResponse<void>>;

  // 批量操作
  bulk(operations: RestBulkOperation): Promise<HttpResponse<RestResource[]>>;

  // 关系操作
  getRelated<T = any>(
    resourceId: string,
    relationship: string
  ): Promise<HttpResponse<RestResource<T> | RestCollection<T>>>;
  addRelated(
    resourceId: string,
    relationship: string,
    relatedIds: string[]
  ): Promise<HttpResponse<void>>;
  removeRelated(
    resourceId: string,
    relationship: string,
    relatedIds: string[]
  ): Promise<HttpResponse<void>>;

  // 配置
  setBaseURL(baseURL: string): void;
  setApiVersion(version: string): void;
  setDefaultHeaders(headers: HttpHeaders): void;
  setTimeout(timeout: number): void;

  // 缓存
  clearCache(): void;
  getCacheStats(): {
    hits: number;
    misses: number;
    size: number;
  };
}

// REST 服务接口
export interface IRestService<T = any> {
  // 基础 CRUD
  findAll(params?: RestQueryParams): Promise<RestCollection<T>>;
  findById(
    id: string | number,
    params?: RestQueryParams
  ): Promise<RestResource<T>>;
  create(data: Partial<T>): Promise<RestResource<T>>;
  update(id: string | number, data: Partial<T>): Promise<RestResource<T>>;
  delete(id: string | number): Promise<void>;

  // 批量操作
  createMany(data: Partial<T>[]): Promise<RestResource<T>[]>;
  updateMany(
    ids: (string | number)[],
    data: Partial<T>
  ): Promise<RestResource<T>[]>;
  deleteMany(ids: (string | number)[]): Promise<void>;

  // 关系操作
  getRelated<R = any>(
    id: string | number,
    relationship: string
  ): Promise<RestResource<R> | RestCollection<R>>;
  addRelated(
    id: string | number,
    relationship: string,
    relatedIds: string[]
  ): Promise<void>;
  removeRelated(
    id: string | number,
    relationship: string,
    relatedIds: string[]
  ): Promise<void>;

  // 自定义操作
  customRequest<R = any>(config: RequestConfig): Promise<R>;
}

// REST 中间件
export type RestMiddleware = {
  name: string;
  before?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  after?: <T = any>(
    response: HttpResponse<T>
  ) => HttpResponse<T> | Promise<HttpResponse<T>>;
  error?: (error: RestError) => any;
};

// REST 拦截器
export type RestInterceptor = {
  request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  response?: <T = any>(
    response: HttpResponse<T>
  ) => HttpResponse<T> | Promise<HttpResponse<T>>;
  error?: (error: RestError) => any;
};

// REST 缓存策略
export type RestCacheStrategy = {
  // 缓存键生成
  generateKey(config: RequestConfig): string;

  // 缓存验证
  isValid(response: HttpResponse<any>): boolean;

  // 缓存时间
  getTTL(response: HttpResponse<any>): number;

  // 缓存清理
  shouldCleanup(): boolean;
};

// REST 重试策略
export type RestRetryStrategy = {
  // 是否应该重试
  shouldRetry(error: RestError, attempt: number): boolean;

  // 重试延迟
  getDelay(attempt: number): number;

  // 最大重试次数
  getMaxRetries(): number;

  // 重试条件
  getRetryCondition(): (error: RestError) => boolean;
};

// REST 限流策略
export type RestRateLimitStrategy = {
  // 是否超过限制
  isLimitExceeded(): boolean;

  // 获取限制信息
  getLimitInfo(): {
    limit: number;
    remaining: number;
    reset: number;
  };

  // 等待时间
  getWaitTime(): number;
};

// REST 监控
export type RestMetrics = {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  cacheHitRate: number;
  retryRate: number;
  rateLimitHits: number;
};

// REST 日志
export type RestLog = {
  timestamp: string;
  method: HttpMethod;
  url: string;
  status: HttpStatusCode;
  responseTime: number;
  requestSize: number;
  responseSize: number;
  cacheHit: boolean;
  retryCount: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
  resourceType?: string;
  resourceId?: string;
  operation?: string;
};

// REST 文档
export type RestDocumentation = {
  title: string;
  version: string;
  description?: string;
  baseURL: string;
  resources: RestResourceDefinition[];
  schemas: Record<string, any>;
  security?: any[];
  tags?: string[];
};

// REST 资源定义
export type RestResourceDefinition = {
  type: string;
  attributes: Record<string, any>;
  relationships?: Record<string, any>;
  endpoints: RestEndpointDefinition[];
  examples?: RestResourceExample[];
};

// REST 端点定义
export type RestEndpointDefinition = {
  path: string;
  method: HttpMethod;
  description?: string;
  parameters?: RestParameterDefinition[];
  responses?: RestResponseDefinition[];
  examples?: RestEndpointExample[];
  deprecated?: boolean;
};

// REST 参数定义
export type RestParameterDefinition = {
  name: string;
  in: 'path' | 'query' | 'header' | 'body';
  required?: boolean;
  type: string;
  description?: string;
  example?: any;
  schema?: any;
};

// REST 响应定义
export type RestResponseDefinition = {
  status: HttpStatusCode;
  description?: string;
  schema?: any;
  examples?: RestResponseExample[];
};

// REST 示例
export type RestResourceExample = {
  name: string;
  description?: string;
  data: RestResource;
};

export type RestEndpointExample = {
  name: string;
  description?: string;
  request: {
    method: HttpMethod;
    url: string;
    headers?: HttpHeaders;
    body?: any;
  };
  response: {
    status: HttpStatusCode;
    headers?: HttpHeaders;
    body?: any;
  };
};

export type RestResponseExample = {
  name: string;
  description?: string;
  data: any;
};
