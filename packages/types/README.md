# @imtp/types

IMTP 项目的统一类型定义包，提供所有包共享的类型定义。

## 📦 安装

```bash
pnpm add @imtp/types
```

## 🚀 使用

### 导入通用类型

```typescript
import type {
  ApiResponse,
  PaginationParams,
  LoadingState,
  AsyncState,
} from '@imtp/types';
```

### 导入API类型

```typescript
import type {
  HttpMethod,
  RequestConfig,
  HttpResponse,
  RestResource,
  GraphQLOperation,
} from '@imtp/types';
```

### 导入业务类型

```typescript
import type { User, Project, Task, Organization } from '@imtp/types';
```

### 导入UI类型

```typescript
import type {
  Theme,
  ComponentProps,
  FormField,
  TableConfig,
} from '@imtp/types';
```

## 📚 类型分类

### 通用类型 (`common`)

- 基础类型：`Primitive`, `Optional`, `Nullable`
- 对象类型：`DeepPartial`, `DeepRequired`, `Merge`
- 函数类型：`FunctionType`, `AsyncFunction`
- 状态类型：`LoadingState`, `AsyncState`
- 分页类型：`PaginationParams`, `PaginatedResponse`
- 排序类型：`SortParams`, `SortOrder`
- 过滤类型：`FilterParams`, `FilterCondition`
- 响应类型：`ApiResponse`
- 工具类型：`TypeGuard`, `TypeConverter`, `Path`

### API类型 (`api`)

- HTTP相关：`HttpMethod`, `HttpStatusCode`, `RequestConfig`
- REST API：`RestResource`, `RestCollection`, `RestError`
- GraphQL：`GraphQLOperation`, `GraphQLResponse`, `GraphQLError`
- WebSocket：`WebSocketMessage`, `WebSocketConfig`, `WebSocketEvent`
- 客户端接口：`IApiClient`, `IRestClient`, `IGraphQLClient`
- 服务接口：`IApiService`, `IRestService`, `IGraphQLService`

### 业务类型 (`shared/business`)

- 用户相关：`User`, `UserRole`, `UserPreferences`
- 组织相关：`Organization`, `OrganizationMember`, `OrganizationSettings`
- 项目相关：`Project`, `ProjectMember`, `ProjectSettings`
- 任务相关：`Task`, `TaskStatus`, `TaskPriority`
- 工作流：`WorkflowDefinition`, `WorkflowStep`, `WorkflowTrigger`
- 文件相关：`File`, `FileMetadata`, `FilePermissions`
- 审计相关：`AuditLog`, `AuditAction`
- 通知相关：`Notification`, `NotificationType`
- 报告相关：`Report`, `ReportType`, `ReportData`

### UI类型 (`shared/ui`)

- 主题相关：`Theme`, `ThemeColors`, `ThemeTypography`
- 组件相关：`ComponentProps`, `ComponentState`, `ComponentSize`
- 表单相关：`FormField`, `FormValidation`, `FormConfig`
- 布局相关：`LayoutConfig`, `SidebarConfig`, `HeaderConfig`
- 导航相关：`NavigationItem`, `NavigationConfig`, `BreadcrumbItem`
- 模态框：`ModalConfig`
- 通知：`NotificationConfig`
- 表格：`TableConfig`, `TableColumn`, `TablePagination`
- 图表：`ChartConfig`, `ChartData`, `ChartOptions`

### 存储类型 (`shared/storage`)

- 存储接口：`IStorage`, `StorageConfig`, `StorageItem`
- 存储类型：`LocalStorageConfig`, `IndexedDBConfig`, `MemoryStorageConfig`
- 缓存策略：`CacheStrategy`, `LRUCacheConfig`, `LFUCacheConfig`
- 存储管理：`IStorageManager`, `IStorageMigrator`, `IStorageSynchronizer`

### 事件类型 (`shared/events`)

- 事件总线：`IEventBus`, `Event`, `EventHandler`
- 事件管理：`IEventManager`, `EventConfig`, `EventStats`
- 事件管道：`IEventPipeline`, `EventMiddleware`
- 事件调度：`IEventScheduler`, `ScheduledEvent`
- 事件重试：`IEventRetrier`, `RetryConfig`
- 事件限流：`IEventThrottler`, `ThrottleConfig`
- 事件日志：`IEventLogger`, `EventLog`, `LoggerConfig`

## 🔧 开发

### 构建

```bash
pnpm build
```

### 测试

```bash
pnpm test
pnpm test:coverage
```

### 代码检查

```bash
pnpm lint
pnpm lint:fix
```

## 📋 类型导出

所有类型都通过主入口文件 `src/index.ts` 导出：

```typescript
// 导出所有通用类型
export * from './common';

// 导出所有API类型
export * from './api';

// 导出所有共享类型
export * from './shared';
```

## 🤝 贡献

1. 在 `src/` 目录下添加新的类型定义
2. 在相应的 `index.ts` 文件中导出新类型
3. 更新此 README 文档
4. 提交 Pull Request

## 📄 许可证

MIT License
