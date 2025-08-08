/* eslint-disable @typescript-eslint/no-explicit-any */
// WebSocket API 类型定义

// WebSocket 状态
export type WebSocketState = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

// WebSocket 事件类型
export type WebSocketEventType = 'open' | 'close' | 'error' | 'message';

// WebSocket 事件
export type WebSocketEvent = {
  type: WebSocketEventType;
  data?: any;
  target: WebSocket;
  timestamp: number;
};

// WebSocket 消息
export type WebSocketMessage<T = any> = {
  id?: string;
  type: string;
  data: T;
  timestamp: number;
  sequence?: number;
};

// WebSocket 连接配置
export type WebSocketConfig = {
  url: string;
  protocols?: string | string[];
  headers?: Record<string, string>;
  timeout?: number;
  reconnect?: {
    enabled: boolean;
    maxAttempts: number;
    delay: number;
    backoff: 'linear' | 'exponential';
  };
  heartbeat?: {
    enabled: boolean;
    interval: number;
    timeout: number;
  };
  compression?: {
    enabled: boolean;
    algorithm: 'gzip' | 'deflate';
  };
};

// WebSocket 客户端接口
export interface IWebSocketClient {
  // 连接管理
  connect(): Promise<void>;
  disconnect(code?: number, reason?: string): void;
  reconnect(): Promise<void>;

  // 消息发送
  send<T = any>(message: WebSocketMessage<T>): void;
  sendText(text: string): void;
  sendBinary(data: ArrayBuffer | Blob): void;

  // 事件监听
  on(event: WebSocketEventType, handler: (event: WebSocketEvent) => void): void;
  off(
    event: WebSocketEventType,
    handler: (event: WebSocketEvent) => void
  ): void;
  once(
    event: WebSocketEventType,
    handler: (event: WebSocketEvent) => void
  ): void;

  // 状态查询
  getState(): WebSocketState;
  isConnected(): boolean;
  isConnecting(): boolean;
  isClosing(): boolean;
  isClosed(): boolean;

  // 配置
  setUrl(url: string): void;
  setHeaders(headers: Record<string, string>): void;
  setTimeout(timeout: number): void;

  // 统计
  getStats(): WebSocketStats;
}

// WebSocket 服务接口
export interface IWebSocketService<T = any> {
  // 连接管理
  connect(): Promise<void>;
  disconnect(): void;

  // 消息处理
  send<T = any>(type: string, data: T): void;
  subscribe<T = any>(type: string, handler: (data: T) => void): () => void;
  unsubscribe(type: string, handler: (data: any) => void): void;

  // 状态查询
  isConnected(): boolean;
  getState(): WebSocketState;

  // 统计
  getStats(): WebSocketStats;
}

// WebSocket 统计
export type WebSocketStats = {
  totalMessages: number;
  sentMessages: number;
  receivedMessages: number;
  totalBytes: number;
  sentBytes: number;
  receivedBytes: number;
  averageLatency: number;
  connectionTime: number;
  reconnectAttempts: number;
  errors: number;
  lastMessageTime: number;
  lastErrorTime: number;
};

// WebSocket 连接状态
export type WebSocketConnectionState = {
  state: WebSocketState;
  url: string;
  protocols: string[];
  readyState: number;
  bufferedAmount: number;
  extensions: string;
  protocol: string;
  timestamp: number;
};

// WebSocket 错误
export type WebSocketError = {
  type:
    | 'connection'
    | 'message'
    | 'protocol'
    | 'network'
    | 'timeout'
    | 'unknown';
  message: string;
  code?: number;
  reason?: string;
  timestamp: number;
  url?: string;
};

// WebSocket 心跳
export type WebSocketHeartbeat = {
  enabled: boolean;
  interval: number;
  timeout: number;
  lastPing: number;
  lastPong: number;
  missedHeartbeats: number;
  maxMissedHeartbeats: number;
};

// WebSocket 重连
export type WebSocketReconnect = {
  enabled: boolean;
  maxAttempts: number;
  currentAttempt: number;
  delay: number;
  backoff: 'linear' | 'exponential';
  lastAttempt: number;
  nextAttempt: number;
};

// WebSocket 消息队列
export type WebSocketMessageQueue = {
  messages: WebSocketMessage[];
  maxSize: number;
  isProcessing: boolean;
  add(message: WebSocketMessage): void;
  process(): void;
  clear(): void;
  size(): number;
};

// WebSocket 中间件
export type WebSocketMiddleware = {
  name: string;
  before?: (
    message: WebSocketMessage
  ) => WebSocketMessage | Promise<WebSocketMessage>;
  after?: (
    message: WebSocketMessage
  ) => WebSocketMessage | Promise<WebSocketMessage>;
  error?: (error: WebSocketError) => any;
};

// WebSocket 拦截器
export type WebSocketInterceptor = {
  connect?: (
    config: WebSocketConfig
  ) => WebSocketConfig | Promise<WebSocketConfig>;
  message?: (
    message: WebSocketMessage
  ) => WebSocketMessage | Promise<WebSocketMessage>;
  error?: (error: WebSocketError) => any;
};

// WebSocket 缓存
export type WebSocketCache = {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];
};

// WebSocket 监控
export type WebSocketMetrics = {
  totalConnections: number;
  activeConnections: number;
  totalMessages: number;
  messagesPerSecond: number;
  averageLatency: number;
  errorRate: number;
  reconnectRate: number;
  bandwidthUsage: number;
  memoryUsage: number;
};

// WebSocket 日志
export type WebSocketLog = {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  event: string;
  message?: string;
  data?: any;
  error?: WebSocketError;
  connectionId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
};

// WebSocket 协议
export type WebSocketProtocol = {
  name: string;
  version: string;
  description?: string;
  messageTypes: WebSocketMessageType[];
  handshake?: (url: string, protocols: string[]) => Promise<boolean>;
  serialize?: (message: WebSocketMessage) => string | ArrayBuffer;
  deserialize?: (data: string | ArrayBuffer) => WebSocketMessage;
};

// WebSocket 消息类型
export type WebSocketMessageType = {
  name: string;
  description?: string;
  schema: any;
  required: boolean;
  deprecated?: boolean;
  examples?: WebSocketMessageExample[];
};

// WebSocket 消息示例
export type WebSocketMessageExample = {
  name: string;
  description?: string;
  message: WebSocketMessage;
};

// WebSocket 安全
export type WebSocketSecurity = {
  authentication: {
    type: 'token' | 'basic' | 'oauth2' | 'custom';
    token?: string;
    username?: string;
    password?: string;
    customAuth?: (connection: WebSocketConnectionState) => Promise<boolean>;
  };
  encryption: {
    enabled: boolean;
    algorithm: 'wss' | 'tls' | 'custom';
    certificate?: string;
    privateKey?: string;
  };
  rateLimit: {
    enabled: boolean;
    maxMessages: number;
    timeWindow: number;
    maxConnections: number;
  };
  validation: {
    enabled: boolean;
    schema?: any;
    customValidator?: (message: WebSocketMessage) => boolean;
  };
};

// WebSocket 性能
export type WebSocketPerformance = {
  connectionTime: number;
  messageLatency: number;
  throughput: number;
  memoryUsage: number;
  cpuUsage: number;
  bandwidthUsage: number;
  cacheHitRate: number;
  compressionRatio: number;
};

// WebSocket 文档
export type WebSocketDocumentation = {
  title: string;
  version: string;
  description?: string;
  url: string;
  protocols: WebSocketProtocol[];
  messageTypes: WebSocketMessageType[];
  examples: WebSocketExample[];
  security?: WebSocketSecurity;
  tags?: string[];
};

// WebSocket 示例
export type WebSocketExample = {
  name: string;
  description?: string;
  connection: {
    url: string;
    protocols: string[];
    headers: Record<string, string>;
  };
  messages: WebSocketMessage[];
  expectedResponses: WebSocketMessage[];
};

// WebSocket 测试
export type WebSocketTest = {
  name: string;
  description?: string;
  setup?: () => Promise<void>;
  teardown?: () => Promise<void>;
  steps: WebSocketTestStep[];
  assertions: WebSocketTestAssertion[];
  timeout: number;
};

// WebSocket 测试步骤
export type WebSocketTestStep = {
  name: string;
  action: 'connect' | 'send' | 'receive' | 'wait' | 'disconnect';
  data?: any;
  timeout?: number;
  expectedResult?: any;
};

// WebSocket 测试断言
export type WebSocketTestAssertion = {
  name: string;
  condition: (result: any) => boolean;
  message: string;
  critical: boolean;
};

// WebSocket 调试
export type WebSocketDebug = {
  enabled: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  logMessages: boolean;
  logEvents: boolean;
  logPerformance: boolean;
  logSecurity: boolean;
  maxLogSize: number;
  logRetention: number;
};
