/* eslint-disable @typescript-eslint/no-explicit-any */
// 事件相关类型定义

// 事件类型
export type EventType = string;

// 事件数据
export type EventData = any;

// 事件处理器
export type EventHandler<T = EventData> = (data: T, event: Event) => void;

// 事件
export type Event<T = EventData> = {
  type: EventType;
  data: T;
  timestamp: number;
  source?: string;
  target?: string;
  id?: string;
  correlationId?: string;
  metadata?: Record<string, any>;
};

// 事件总线接口
export interface IEventBus {
  // 事件订阅
  on<T = EventData>(type: EventType, handler: EventHandler<T>): void;
  off<T = EventData>(type: EventType, handler: EventHandler<T>): void;
  once<T = EventData>(type: EventType, handler: EventHandler<T>): void;

  // 事件发布
  emit<T = EventData>(type: EventType, data?: T): void;
  emitAsync<T = EventData>(type: EventType, data?: T): Promise<void>;

  // 事件查询
  hasListeners(type: EventType): boolean;
  getListeners(type: EventType): EventHandler[];
  getEventTypes(): EventType[];

  // 事件清理
  clear(type?: EventType): void;
  removeAllListeners(type?: EventType): void;

  // 事件统计
  getStats(): EventStats;
}

// 事件统计
export type EventStats = {
  totalEvents: number;
  totalListeners: number;
  eventTypes: number;
  averageListenersPerEvent: number;
  mostFrequentEvent: string;
  leastFrequentEvent: string;
  lastEventTime: number;
  errors: number;
};

// 事件配置
export type EventConfig = {
  maxListeners?: number;
  enableAsync?: boolean;
  enableErrorHandling?: boolean;
  enableLogging?: boolean;
  enableMetrics?: boolean;
  enableRetry?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
};

// 事件管理器
export interface IEventManager {
  // 事件总线管理
  createEventBus(config?: EventConfig): IEventBus;
  getEventBus(name: string): IEventBus | undefined;
  removeEventBus(name: string): void;
  listEventBuses(): string[];

  // 默认事件总线
  setDefaultEventBus(bus: IEventBus): void;
  getDefaultEventBus(): IEventBus;

  // 全局事件
  on<T = EventData>(type: EventType, handler: EventHandler<T>): void;
  off<T = EventData>(type: EventType, handler: EventHandler<T>): void;
  emit<T = EventData>(type: EventType, data?: T): void;

  // 事件路由
  route(
    sourceType: EventType,
    targetType: EventType,
    transformer?: (data: any) => any
  ): void;
  unroute(sourceType: EventType, targetType: EventType): void;

  // 事件过滤
  filter(type: EventType, predicate: (data: any) => boolean): void;
  unfilter(type: EventType): void;

  // 事件转换
  transform(type: EventType, transformer: (data: any) => any): void;
  untransform(type: EventType): void;

  // 统计信息
  getStats(): EventManagerStats;
}

// 事件管理器统计
export type EventManagerStats = {
  totalEventBuses: number;
  totalEvents: number;
  totalListeners: number;
  totalRoutes: number;
  totalFilters: number;
  totalTransformers: number;
  errors: number;
  lastError?: Error;
};

// 事件中间件
export type EventMiddleware = {
  name: string;
  before?: (event: Event) => Event | Promise<Event>;
  after?: (event: Event) => Event | Promise<Event>;
  error?: (error: Error, event: Event) => void;
};

// 事件管道
export interface IEventPipeline {
  // 中间件管理
  use(middleware: EventMiddleware): IEventPipeline;
  remove(name: string): IEventPipeline;
  clear(): IEventPipeline;

  // 管道执行
  process(event: Event): Promise<Event>;

  // 管道状态
  getMiddlewares(): EventMiddleware[];
  getStats(): PipelineStats;
}

// 管道统计
export type PipelineStats = {
  totalProcessed: number;
  totalErrors: number;
  averageProcessingTime: number;
  middlewares: number;
  lastProcessedTime: number;
};

// 事件调度器
export interface IEventScheduler {
  // 调度管理
  schedule<T = EventData>(type: EventType, data: T, delay: number): string;
  scheduleAt<T = EventData>(type: EventType, data: T, time: number): string;
  scheduleRecurring<T = EventData>(
    type: EventType,
    data: T,
    interval: number,
    count?: number
  ): string;

  // 调度控制
  cancel(id: string): boolean;
  cancelAll(type?: EventType): number;
  pause(id: string): boolean;
  resume(id: string): boolean;

  // 调度查询
  getScheduled(id: string): ScheduledEvent | undefined;
  getScheduledByType(type: EventType): ScheduledEvent[];
  getAllScheduled(): ScheduledEvent[];

  // 调度状态
  isScheduled(id: string): boolean;
  isPaused(id: string): boolean;
  getNextExecution(id: string): number | undefined;

  // 调度统计
  getStats(): SchedulerStats;
}

// 调度事件
export type ScheduledEvent = {
  id: string;
  type: EventType;
  data: any;
  scheduledAt: number;
  nextExecution: number;
  interval?: number;
  count?: number;
  executedCount: number;
  status: 'scheduled' | 'paused' | 'cancelled' | 'completed';
};

// 调度器统计
export type SchedulerStats = {
  totalScheduled: number;
  totalExecuted: number;
  totalCancelled: number;
  totalErrors: number;
  activeSchedules: number;
  pausedSchedules: number;
  averageExecutionTime: number;
  nextExecutionTime: number;
};

// 事件重试
export type RetryConfig = {
  maxAttempts: number;
  delay: number;
  backoff: 'linear' | 'exponential' | 'fibonacci';
  maxDelay: number;
  retryCondition?: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
  onMaxAttemptsReached?: (error: Error) => void;
};

// 事件重试器
export interface IEventRetrier {
  // 重试配置
  setConfig(config: RetryConfig): void;
  getConfig(): RetryConfig;

  // 重试执行
  retry<T = EventData>(
    type: EventType,
    data: T,
    handler: EventHandler<T>
  ): Promise<void>;

  // 重试状态
  isRetrying(id: string): boolean;
  getRetryCount(id: string): number;
  getRetryHistory(id: string): RetryAttempt[];

  // 重试控制
  cancel(id: string): boolean;
  cancelAll(): number;

  // 重试统计
  getStats(): RetryStats;
}

// 重试尝试
export type RetryAttempt = {
  attempt: number;
  timestamp: number;
  error: Error;
  delay: number;
};

// 重试统计
export type RetryStats = {
  totalRetries: number;
  successfulRetries: number;
  failedRetries: number;
  averageRetryCount: number;
  averageRetryDelay: number;
  activeRetries: number;
  lastRetryTime: number;
};

// 事件限流
export type ThrottleConfig = {
  limit: number;
  window: number;
  strategy: 'drop' | 'queue' | 'debounce';
  queueSize?: number;
  onLimitExceeded?: (event: Event) => void;
};

// 事件限流器
export interface IEventThrottler {
  // 限流配置
  setConfig(type: EventType, config: ThrottleConfig): void;
  getConfig(type: EventType): ThrottleConfig | undefined;
  removeConfig(type: EventType): void;

  // 限流执行
  throttle<T = EventData>(type: EventType, data: T): boolean;

  // 限流状态
  isThrottled(type: EventType): boolean;
  getQueueSize(type: EventType): number;
  getRemainingLimit(type: EventType): number;

  // 限流控制
  reset(type: EventType): void;
  resetAll(): void;

  // 限流统计
  getStats(): ThrottleStats;
}

// 限流统计
export type ThrottleStats = {
  totalThrottled: number;
  totalDropped: number;
  totalQueued: number;
  averageQueueSize: number;
  averageThrottleRate: number;
  activeThrottles: number;
  lastThrottleTime: number;
};

// 事件日志
export type EventLog = {
  id: string;
  type: EventType;
  data: any;
  timestamp: number;
  source?: string;
  target?: string;
  correlationId?: string;
  metadata?: Record<string, any>;
  processingTime?: number;
  error?: Error;
  retryCount?: number;
  throttled?: boolean;
};

// 事件日志器
export interface IEventLogger {
  // 日志配置
  setConfig(config: LoggerConfig): void;
  getConfig(): LoggerConfig;

  // 日志记录
  log(event: Event, processingTime?: number, error?: Error): void;
  logRetry(event: Event, attempt: number, error: Error): void;
  logThrottle(event: Event): void;

  // 日志查询
  getLogs(type?: EventType, startTime?: number, endTime?: number): EventLog[];
  getLogsByCorrelationId(correlationId: string): EventLog[];
  getLogsByError(error: Error): EventLog[];

  // 日志清理
  clear(type?: EventType, beforeTime?: number): number;
  archive(type?: EventType, beforeTime?: number): number;

  // 日志统计
  getStats(): LoggerStats;
}

// 日志配置
export type LoggerConfig = {
  enabled: boolean;
  level: 'debug' | 'info' | 'warn' | 'error';
  maxLogs: number;
  retention: number;
  includeMetadata: boolean;
  includeProcessingTime: boolean;
  includeRetryInfo: boolean;
  includeThrottleInfo: boolean;
};

// 日志统计
export type LoggerStats = {
  totalLogs: number;
  logsByType: Record<string, number>;
  logsByLevel: Record<string, number>;
  averageProcessingTime: number;
  errorRate: number;
  retryRate: number;
  throttleRate: number;
  oldestLog: number;
  newestLog: number;
};
