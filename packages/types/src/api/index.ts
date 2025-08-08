// API 类型定义

import type {
  ApiResponse,
  PaginationParams,
  SortParams,
  FilterParams,
} from '../common';

// HTTP 方法
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'OPTIONS';

// HTTP 状态码
export type HttpStatusCode =
  | 200
  | 201
  | 202
  | 204
  | 300
  | 301
  | 302
  | 304
  | 307
  | 308
  | 400
  | 401
  | 403
  | 404
  | 405
  | 406
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 422
  | 429
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505;

// HTTP 请求头
export type HttpHeaders = Record<string, string>;

// HTTP 请求配置
export type RequestConfig = {
  method: HttpMethod;
  url: string;
  headers?: HttpHeaders;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  onDownloadProgress?: (progressEvent: ProgressEvent) => void;
  cancelToken?: CancelToken;
};

// HTTP 响应
export type HttpResponse<T = any> = {
  data: T;
  status: HttpStatusCode;
  statusText: string;
  headers: HttpHeaders;
  config: RequestConfig;
  request?: any;
};

// 取消令牌
export type CancelToken = {
  promise: Promise<Cancel>;
  reason?: Cancel;
  throwIfRequested(): void;
};

// 取消原因
export type Cancel = {
  message: string;
};

// API 端点
export type ApiEndpoint = {
  path: string;
  method: HttpMethod;
  description?: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
  tags?: string[];
  deprecated?: boolean;
};

// API 参数
export type ApiParameter = {
  name: string;
  in: 'path' | 'query' | 'header' | 'body';
  required?: boolean;
  type: string;
  description?: string;
  example?: any;
  schema?: any;
};

// API 错误
export type ApiError = {
  code: string;
  message: string;
  details?: any;
  timestamp?: string;
  path?: string;
  method?: HttpMethod;
};

// API 客户端配置
export type ApiClientConfig = {
  baseURL: string;
  timeout?: number;
  headers?: HttpHeaders;
  withCredentials?: boolean;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
  validateStatus?: (status: HttpStatusCode) => boolean;
  maxRedirects?: number;
  maxContentLength?: number;
  maxBodyLength?: number;
  proxy?: {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
  };
};

// API 拦截器
export type RequestInterceptor = (
  config: RequestConfig
) => RequestConfig | Promise<RequestConfig>;
export type ResponseInterceptor<T = any> = (
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>;
export type ErrorInterceptor = (error: ApiError) => any;

// API 客户端接口
export interface IApiClient {
  request<T = any>(config: RequestConfig): Promise<HttpResponse<T>>;
  get<T = any>(
    url: string,
    config?: Partial<RequestConfig>
  ): Promise<HttpResponse<T>>;
  post<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<HttpResponse<T>>;
  put<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<HttpResponse<T>>;
  delete<T = any>(
    url: string,
    config?: Partial<RequestConfig>
  ): Promise<HttpResponse<T>>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: Partial<RequestConfig>
  ): Promise<HttpResponse<T>>;

  // 拦截器
  addRequestInterceptor(interceptor: RequestInterceptor): void;
  addResponseInterceptor(interceptor: ResponseInterceptor): void;
  addErrorInterceptor(interceptor: ErrorInterceptor): void;

  // 配置
  setBaseURL(baseURL: string): void;
  setDefaultHeaders(headers: HttpHeaders): void;
  setTimeout(timeout: number): void;
}

// API 服务接口
export interface IApiService<T = any> {
  // CRUD 操作
  findAll(params?: QueryParams): Promise<PaginatedResponse<T>>;
  findById(id: string | number): Promise<T>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;

  // 批量操作
  createMany(data: Partial<T>[]): Promise<T[]>;
  updateMany(ids: (string | number)[], data: Partial<T>): Promise<T[]>;
  deleteMany(ids: (string | number)[]): Promise<void>;

  // 自定义操作
  customRequest<R = any>(config: RequestConfig): Promise<R>;
}

// 分页响应
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

// 查询参数
export type QueryParams = {
  pagination?: PaginationParams;
  sort?: SortParams[];
  filter?: FilterParams;
  include?: string[];
  select?: string[];
  search?: string;
  [key: string]: any;
};

// API 缓存
export type ApiCache = {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
};

// API 重试配置
export type RetryConfig = {
  maxRetries: number;
  retryDelay: number;
  retryCondition?: (error: ApiError) => boolean;
  onRetry?: (retryCount: number, error: ApiError) => void;
};

// API 限流配置
export type RateLimitConfig = {
  maxRequests: number;
  timeWindow: number;
  onLimitExceeded?: (config: RequestConfig) => void;
};

// API 监控
export type ApiMetrics = {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  cacheHitRate: number;
};

// API 日志
export type ApiLog = {
  timestamp: string;
  method: HttpMethod;
  url: string;
  status: HttpStatusCode;
  responseTime: number;
  requestSize: number;
  responseSize: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
};

// API 文档
export type ApiDocumentation = {
  title: string;
  version: string;
  description?: string;
  baseURL: string;
  endpoints: ApiEndpoint[];
  schemas: Record<string, any>;
  security?: any[];
  tags?: string[];
};

// API 版本控制
export type ApiVersion = {
  version: string;
  deprecated?: boolean;
  sunsetDate?: string;
  migrationGuide?: string;
  breakingChanges?: string[];
};

// API 安全
export type ApiSecurity = {
  type: 'bearer' | 'basic' | 'apiKey' | 'oauth2';
  token?: string;
  username?: string;
  password?: string;
  apiKey?: string;
  apiKeyName?: string;
  scopes?: string[];
};

// API 健康检查
export type HealthCheck = {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  uptime: number;
  version: string;
  dependencies: {
    database?: HealthStatus;
    cache?: HealthStatus;
    external?: HealthStatus;
  };
  metrics: {
    memory: number;
    cpu: number;
    disk: number;
  };
};

// 健康状态
export type HealthStatus = {
  status: 'up' | 'down';
  responseTime?: number;
  error?: string;
};

// 导出所有类型
export type * from './rest';
export type * from './graphql';
export type * from './websocket';
