/* eslint-disable @typescript-eslint/no-explicit-any */
// GraphQL API 类型定义

// GraphQL 操作类型
export type GraphQLOperationType = 'query' | 'mutation' | 'subscription';

// GraphQL 操作
export type GraphQLOperation = {
  type: GraphQLOperationType;
  name?: string;
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
};

// GraphQL 请求
export type GraphQLRequest = {
  query: string;
  variables?: Record<string, any>;
  operationName?: string;
  extensions?: Record<string, any>;
};

// GraphQL 响应
export type GraphQLResponse<T = any> = {
  data?: T;
  errors?: GraphQLError[];
  extensions?: Record<string, any>;
};

// GraphQL 错误
export type GraphQLError = {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: (string | number)[];
  extensions?: Record<string, any>;
  code?: string;
};

// GraphQL 字段
export type GraphQLField = {
  name: string;
  alias?: string;
  arguments?: Record<string, any>;
  directives?: GraphQLDirective[];
  selectionSet?: GraphQLSelectionSet;
};

// GraphQL 指令
export type GraphQLDirective = {
  name: string;
  arguments?: Record<string, any>;
};

// GraphQL 选择集
export type GraphQLSelectionSet = GraphQLField[];

// GraphQL 片段
export type GraphQLFragment = {
  name: string;
  typeCondition: string;
  selectionSet: GraphQLSelectionSet;
  directives?: GraphQLDirective[];
};

// GraphQL 内联片段
export type GraphQLInlineFragment = {
  typeCondition?: string;
  selectionSet: GraphQLSelectionSet;
  directives?: GraphQLDirective[];
};

// GraphQL 类型
export type GraphQLType = {
  name: string;
  kind:
    | 'SCALAR'
    | 'OBJECT'
    | 'INTERFACE'
    | 'UNION'
    | 'ENUM'
    | 'INPUT_OBJECT'
    | 'LIST'
    | 'NON_NULL';
  description?: string;
  fields?: GraphQLFieldDefinition[];
  interfaces?: GraphQLType[];
  possibleTypes?: GraphQLType[];
  enumValues?: GraphQLEnumValue[];
  inputFields?: GraphQLInputFieldDefinition[];
  ofType?: GraphQLType;
};

// GraphQL 字段定义
export type GraphQLFieldDefinition = {
  name: string;
  type: GraphQLType;
  description?: string;
  arguments?: GraphQLArgumentDefinition[];
  isDeprecated?: boolean;
  deprecationReason?: string;
};

// GraphQL 参数定义
export type GraphQLArgumentDefinition = {
  name: string;
  type: GraphQLType;
  description?: string;
  defaultValue?: any;
};

// GraphQL 输入字段定义
export type GraphQLInputFieldDefinition = {
  name: string;
  type: GraphQLType;
  description?: string;
  defaultValue?: any;
};

// GraphQL 枚举值
export type GraphQLEnumValue = {
  name: string;
  description?: string;
  isDeprecated?: boolean;
  deprecationReason?: string;
};

// GraphQL 模式
export type GraphQLSchema = {
  queryType?: GraphQLType;
  mutationType?: GraphQLType;
  subscriptionType?: GraphQLType;
  types: GraphQLType[];
  directives: GraphQLDirectiveDefinition[];
};

// GraphQL 指令定义
export type GraphQLDirectiveDefinition = {
  name: string;
  description?: string;
  locations: string[];
  arguments?: GraphQLArgumentDefinition[];
};

// GraphQL 客户端配置
export type GraphQLClientConfig = {
  url: string;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
  fetchOptions?: RequestInit;
  wsUrl?: string;
  wsOptions?: {
    connectionParams?: Record<string, any>;
    lazyCloseTimeout?: number;
    keepAlive?: boolean;
  };
};

// GraphQL 客户端接口
export interface IGraphQLClient {
  // 查询
  query<T = any>(
    query: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>>;
  mutation<T = any>(
    mutation: string,
    variables?: Record<string, any>
  ): Promise<GraphQLResponse<T>>;
  subscribe<T = any>(
    subscription: string,
    variables?: Record<string, any>
  ): AsyncIterator<GraphQLResponse<T>>;

  // 批量操作
  batch(operations: GraphQLOperation[]): Promise<GraphQLResponse[]>;

  // 配置
  setUrl(url: string): void;
  setHeaders(headers: Record<string, string>): void;
  setTimeout(timeout: number): void;

  // 缓存
  clearCache(): void;
  getCacheStats(): {
    hits: number;
    misses: number;
    size: number;
  };
}

// GraphQL 服务接口
export interface IGraphQLService<T = any> {
  // 基础操作
  query<R = any>(query: string, variables?: Record<string, any>): Promise<R>;
  mutation<R = any>(
    mutation: string,
    variables?: Record<string, any>
  ): Promise<R>;
  subscribe<R = any>(
    subscription: string,
    variables?: Record<string, any>
  ): AsyncIterator<R>;

  // 类型化操作
  findById(id: string | number): Promise<T>;
  findAll(variables?: Record<string, any>): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<void>;

  // 自定义操作
  customQuery<R = any>(
    query: string,
    variables?: Record<string, any>
  ): Promise<R>;
  customMutation<R = any>(
    mutation: string,
    variables?: Record<string, any>
  ): Promise<R>;
}

// GraphQL 缓存
export type GraphQLCache = {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
};

// GraphQL 缓存策略
export type GraphQLCacheStrategy = {
  // 缓存键生成
  generateKey(operation: GraphQLOperation): string;

  // 缓存验证
  isValid(response: GraphQLResponse<any>): boolean;

  // 缓存时间
  getTTL(response: GraphQLResponse<any>): number;

  // 缓存清理
  shouldCleanup(): boolean;
};

// GraphQL 重试策略
export type GraphQLRetryStrategy = {
  // 是否应该重试
  shouldRetry(error: GraphQLError, attempt: number): boolean;

  // 重试延迟
  getDelay(attempt: number): number;

  // 最大重试次数
  getMaxRetries(): number;

  // 重试条件
  getRetryCondition(): (error: GraphQLError) => boolean;
};

// GraphQL 中间件
export type GraphQLMiddleware = {
  name: string;
  before?: (
    operation: GraphQLOperation
  ) => GraphQLOperation | Promise<GraphQLOperation>;
  after?: <T = any>(
    response: GraphQLResponse<T>
  ) => GraphQLResponse<T> | Promise<GraphQLResponse<T>>;
  error?: (error: GraphQLError) => any;
};

// GraphQL 拦截器
export type GraphQLInterceptor = {
  request?: (
    operation: GraphQLOperation
  ) => GraphQLOperation | Promise<GraphQLOperation>;
  response?: <T = any>(
    response: GraphQLResponse<T>
  ) => GraphQLResponse<T> | Promise<GraphQLResponse<T>>;
  error?: (error: GraphQLError) => any;
};

// GraphQL 监控
export type GraphQLMetrics = {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  averageResponseTime: number;
  operationsPerSecond: number;
  errorRate: number;
  cacheHitRate: number;
  retryRate: number;
  subscriptionCount: number;
};

// GraphQL 日志
export type GraphQLLog = {
  timestamp: string;
  operation: GraphQLOperationType;
  operationName?: string;
  query: string;
  variables?: Record<string, any>;
  responseTime: number;
  cacheHit: boolean;
  retryCount: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
  errors?: GraphQLError[];
};

// GraphQL 文档
export type GraphQLDocumentation = {
  title: string;
  version: string;
  description?: string;
  url: string;
  schema: GraphQLSchema;
  operations: GraphQLOperationDefinition[];
  examples: GraphQLExample[];
  security?: any[];
  tags?: string[];
};

// GraphQL 操作定义
export type GraphQLOperationDefinition = {
  name: string;
  type: GraphQLOperationType;
  description?: string;
  query: string;
  variables?: Record<string, any>;
  examples?: GraphQLExample[];
  deprecated?: boolean;
};

// GraphQL 示例
export type GraphQLExample = {
  name: string;
  description?: string;
  operation: GraphQLOperation;
  response: GraphQLResponse;
};

// GraphQL 内省
export type GraphQLIntrospection = {
  __schema: {
    queryType: { name: string };
    mutationType?: { name: string };
    subscriptionType?: { name: string };
    types: GraphQLType[];
    directives: GraphQLDirectiveDefinition[];
  };
};

// GraphQL 验证
export type GraphQLValidation = {
  isValid: boolean;
  errors: GraphQLError[];
  warnings: GraphQLWarning[];
};

// GraphQL 警告
export type GraphQLWarning = {
  message: string;
  locations?: Array<{
    line: number;
    column: number;
  }>;
  path?: (string | number)[];
  extensions?: Record<string, any>;
};

// GraphQL 性能
export type GraphQLPerformance = {
  queryComplexity: number;
  fieldCount: number;
  depth: number;
  executionTime: number;
  memoryUsage: number;
  cacheHits: number;
  cacheMisses: number;
};

// GraphQL 安全
export type GraphQLSecurity = {
  maxQueryDepth: number;
  maxQueryComplexity: number;
  maxFieldCount: number;
  allowedOperations: GraphQLOperationType[];
  blockedFields: string[];
  rateLimit: {
    maxRequests: number;
    timeWindow: number;
  };
};
