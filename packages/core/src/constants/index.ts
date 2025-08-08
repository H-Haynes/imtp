// 核心常量定义

// 环境常量
export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 日期格式
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  HUMAN: 'MMM DD, YYYY',
} as const;

// 文件大小限制
export const FILE_SIZE_LIMITS = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
} as const;

// 正则表达式
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
} as const;

// 默认配置
export const DEFAULT_CONFIG = {
  API_TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  CACHE_TTL: 300000, // 5 minutes
  PAGE_SIZE: 20,
  MAX_FILE_SIZE: FILE_SIZE_LIMITS.MB * 10, // 10MB
} as const;

// 错误代码
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
} as const;
