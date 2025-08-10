// 从环境变量自动生成的类型
export interface Env {
  NODE_ENV: string;
  DEBUG: string;
  API_URL: string;
  API_TIMEOUT: number;
  API_RETRY_ATTEMPTS: number;
  LOG_LEVEL: string;
  LOG_FORMAT: string;
  LOG_FILE: string;
  DATABASE_URL: string;
  DATABASE_POOL_SIZE: number;
  DATABASE_TIMEOUT: number;
  CACHE_TTL: number;
  CACHE_PREFIX: string;
  REDIS_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  BCRYPT_ROUNDS: number;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  UPLOAD_MAX_SIZE: string;
  UPLOAD_PATH: string;
  UPLOAD_ALLOWED_TYPES: string[];
  TEST_TIMEOUT: number;
  COVERAGE_THRESHOLD: number;
  TEST_DATABASE_URL: string;
  METRICS_ENABLED: boolean;
  METRICS_PORT: number;
  HEALTH_CHECK_INTERVAL: number;
  SENTRY_DSN: string;
  GOOGLE_ANALYTICS_ID: string;
  STRIPE_SECRET_KEY: string;
  API_DOCS_URL: string;
  API_TYPES_OUTPUT: string;
  GRAPHQL_ENDPOINT: string;
}

// 环境变量类型推断
export type EnvKey = keyof Env;

// 环境变量值类型
export type EnvValue<T extends EnvKey> = Env[T];
