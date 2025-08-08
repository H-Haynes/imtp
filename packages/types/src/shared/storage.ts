/* eslint-disable @typescript-eslint/no-explicit-any */
// 存储相关类型定义

// 存储类型
export type StorageType =
  | 'localStorage'
  | 'sessionStorage'
  | 'indexedDB'
  | 'memory'
  | 'cookie';

// 存储配置
export type StorageConfig = {
  type: StorageType;
  prefix?: string;
  encryption?: boolean;
  compression?: boolean;
  ttl?: number;
  maxSize?: number;
  version?: string;
  migrate?: boolean;
};

// 存储项
export type StorageItem<T = any> = {
  key: string;
  value: T;
  timestamp: number;
  expiresAt?: number;
  version?: string;
  checksum?: string;
};

// 存储元数据
export type StorageMetadata = {
  version: string;
  createdAt: number;
  updatedAt: number;
  size: number;
  itemCount: number;
  checksum: string;
};

// 存储接口
export interface IStorage {
  // 基础操作
  get<T = any>(key: string): T | null;
  set<T = any>(key: string, value: T, ttl?: number): void;
  delete(key: string): void;
  clear(): void;
  has(key: string): boolean;
  keys(): string[];

  // 批量操作
  getMany<T = any>(keys: string[]): Record<string, T | null>;
  setMany<T = any>(items: Record<string, T>, ttl?: number): void;
  deleteMany(keys: string[]): void;

  // 高级操作
  getOrSet<T = any>(key: string, defaultValue: T | (() => T), ttl?: number): T;
  increment(key: string, value?: number): number;
  decrement(key: string, value?: number): number;

  // 查询操作
  query(pattern: string | RegExp): string[];
  queryValues<T = any>(pattern: string | RegExp): T[];

  // 统计信息
  size(): number;
  getMetadata(): StorageMetadata;

  // 事件
  on(event: StorageEventType, handler: StorageEventHandler): void;
  off(event: StorageEventType, handler: StorageEventHandler): void;
}

// 存储事件类型
export type StorageEventType =
  | 'set'
  | 'get'
  | 'delete'
  | 'clear'
  | 'expire'
  | 'error';

// 存储事件
export type StorageEvent = {
  type: StorageEventType;
  key?: string;
  value?: any;
  timestamp: number;
  error?: Error;
};

// 存储事件处理器
export type StorageEventHandler = (event: StorageEvent) => void;

// 本地存储
export type LocalStorageConfig = StorageConfig & {
  type: 'localStorage';
  quota?: number;
  fallback?: StorageType;
};

// 会话存储
export type SessionStorageConfig = StorageConfig & {
  type: 'sessionStorage';
  persist?: boolean;
};

// IndexedDB 存储
export type IndexedDBConfig = StorageConfig & {
  type: 'indexedDB';
  databaseName: string;
  storeName: string;
  version?: number;
  keyPath?: string;
  indexes?: IndexedDBIndex[];
};

export type IndexedDBIndex = {
  name: string;
  keyPath: string | string[];
  options?: IDBIndexParameters;
};

// 内存存储
export type MemoryStorageConfig = StorageConfig & {
  type: 'memory';
  maxItems?: number;
  evictionPolicy?: 'lru' | 'lfu' | 'fifo';
};

// Cookie 存储
export type CookieStorageConfig = StorageConfig & {
  type: 'cookie';
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
};

// 缓存策略
export type CacheStrategy = {
  // 缓存键生成
  generateKey(...args: any[]): string;

  // 缓存验证
  isValid(item: StorageItem<any>): boolean;

  // 缓存时间
  getTTL(item: StorageItem<any>): number;

  // 缓存清理
  shouldCleanup(): boolean;

  // 缓存替换
  shouldEvict(items: StorageItem<any>[]): StorageItem<any> | null;
};

// LRU 缓存
export type LRUCacheConfig = {
  maxSize: number;
  ttl?: number;
  updateAgeOnGet?: boolean;
  allowStale?: boolean;
  maxAge?: number;
  dispose?: (key: string, value: any) => void;
  noDisposeOnSet?: boolean;
  stale?: boolean;
  updateAgeOnHas?: boolean;
};

// LFU 缓存
export type LFUCacheConfig = {
  maxSize: number;
  ttl?: number;
  updateAgeOnGet?: boolean;
  allowStale?: boolean;
  maxAge?: number;
  dispose?: (key: string, value: any) => void;
  noDisposeOnSet?: boolean;
  stale?: boolean;
  updateAgeOnHas?: boolean;
};

// 存储管理器
export interface IStorageManager {
  // 存储实例管理
  createStorage(config: StorageConfig): IStorage;
  getStorage(name: string): IStorage | undefined;
  removeStorage(name: string): void;
  listStorages(): string[];

  // 默认存储
  setDefaultStorage(storage: IStorage): void;
  getDefaultStorage(): IStorage;

  // 配置管理
  setConfig(name: string, config: Partial<StorageConfig>): void;
  getConfig(name: string): StorageConfig | undefined;

  // 全局操作
  clearAll(): void;
  getStats(): StorageStats;

  // 事件
  on(event: StorageManagerEventType, handler: StorageManagerEventHandler): void;
  off(
    event: StorageManagerEventType,
    handler: StorageManagerEventHandler
  ): void;
}

// 存储管理器事件类型
export type StorageManagerEventType =
  | 'storage_created'
  | 'storage_removed'
  | 'storage_error'
  | 'storage_full';

// 存储管理器事件
export type StorageManagerEvent = {
  type: StorageManagerEventType;
  storageName?: string;
  storage?: IStorage;
  error?: Error;
  timestamp: number;
};

// 存储管理器事件处理器
export type StorageManagerEventHandler = (event: StorageManagerEvent) => void;

// 存储统计
export type StorageStats = {
  totalStorages: number;
  totalItems: number;
  totalSize: number;
  averageSize: number;
  largestStorage: string;
  mostUsedStorage: string;
  errors: number;
  lastError?: Error;
};

// 存储迁移
export type StorageMigration = {
  version: string;
  up: (storage: IStorage) => Promise<void>;
  down: (storage: IStorage) => Promise<void>;
  description?: string;
};

// 存储迁移器
export interface IStorageMigrator {
  // 迁移管理
  addMigration(migration: StorageMigration): void;
  removeMigration(version: string): void;
  listMigrations(): StorageMigration[];

  // 迁移执行
  migrate(targetVersion?: string): Promise<void>;
  rollback(targetVersion?: string): Promise<void>;

  // 迁移状态
  getCurrentVersion(): string;
  getPendingMigrations(): StorageMigration[];
  getAppliedMigrations(): StorageMigration[];

  // 迁移历史
  getMigrationHistory(): MigrationHistory[];
}

// 迁移历史
export type MigrationHistory = {
  version: string;
  appliedAt: number;
  direction: 'up' | 'down';
  duration: number;
  success: boolean;
  error?: Error;
};

// 存储同步
export type StorageSyncConfig = {
  enabled: boolean;
  interval: number;
  strategy: 'push' | 'pull' | 'both';
  conflictResolution: 'local' | 'remote' | 'timestamp' | 'manual';
  filters?: string[];
  transformers?: StorageTransformer[];
};

// 存储转换器
export type StorageTransformer = {
  name: string;
  transform: (data: any) => any;
  reverse: (data: any) => any;
};

// 存储同步器
export interface IStorageSynchronizer {
  // 同步配置
  setConfig(config: StorageSyncConfig): void;
  getConfig(): StorageSyncConfig;

  // 同步控制
  start(): void;
  stop(): void;
  isRunning(): boolean;

  // 手动同步
  sync(): Promise<void>;
  syncItem(key: string): Promise<void>;

  // 冲突处理
  resolveConflict(key: string, localValue: any, remoteValue: any): Promise<any>;

  // 状态查询
  getSyncStatus(): SyncStatus;
  getLastSyncTime(): number;
  getPendingChanges(): string[];

  // 事件
  on(event: SyncEventType, handler: SyncEventHandler): void;
  off(event: SyncEventType, handler: SyncEventHandler): void;
}

// 同步状态
export type SyncStatus = 'idle' | 'syncing' | 'error' | 'conflict';

// 同步事件类型
export type SyncEventType =
  | 'sync_start'
  | 'sync_complete'
  | 'sync_error'
  | 'conflict_detected';

// 同步事件
export type SyncEvent = {
  type: SyncEventType;
  key?: string;
  error?: Error;
  timestamp: number;
  duration?: number;
};

// 同步事件处理器
export type SyncEventHandler = (event: SyncEvent) => void;
