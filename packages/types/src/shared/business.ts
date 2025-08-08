/* eslint-disable @typescript-eslint/no-explicit-any */
// 业务相关类型定义

// 用户相关
export type User = {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences?: UserPreferences;
};

export type UserRole = 'admin' | 'user' | 'guest' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export type UserPreferences = {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
};

export type NotificationSettings = {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
};

export type PrivacySettings = {
  profileVisibility: 'public' | 'private' | 'friends';
  dataSharing: boolean;
  analytics: boolean;
};

// 组织相关
export type Organization = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  status: OrganizationStatus;
  type: OrganizationType;
  members: OrganizationMember[];
  settings: OrganizationSettings;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationStatus =
  | 'active'
  | 'inactive'
  | 'suspended'
  | 'pending';
export type OrganizationType =
  | 'company'
  | 'nonprofit'
  | 'government'
  | 'educational'
  | 'other';

export type OrganizationMember = {
  userId: string;
  role: OrganizationRole;
  joinedAt: string;
  permissions: string[];
};

export type OrganizationRole = 'owner' | 'admin' | 'member' | 'viewer';

export type OrganizationSettings = {
  features: string[];
  limits: {
    members: number;
    projects: number;
    storage: number;
  };
  integrations: Record<string, any>;
};

// 项目相关
export type Project = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  organizationId: string;
  ownerId: string;
  status: ProjectStatus;
  visibility: ProjectVisibility;
  members: ProjectMember[];
  settings: ProjectSettings;
  metadata: ProjectMetadata;
  createdAt: string;
  updatedAt: string;
};

export type ProjectStatus = 'active' | 'archived' | 'deleted' | 'draft';
export type ProjectVisibility = 'public' | 'private' | 'organization';

export type ProjectMember = {
  userId: string;
  role: ProjectRole;
  joinedAt: string;
  permissions: string[];
};

export type ProjectRole = 'owner' | 'admin' | 'editor' | 'viewer';

export type ProjectSettings = {
  features: string[];
  integrations: Record<string, any>;
  workflows: WorkflowDefinition[];
};

export type ProjectMetadata = {
  tags: string[];
  category: string;
  version: string;
  license?: string;
  repository?: string;
};

// 工作流相关
export type WorkflowDefinition = {
  id: string;
  name: string;
  description?: string;
  version: string;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  settings: WorkflowSettings;
};

export type WorkflowStep = {
  id: string;
  name: string;
  type: WorkflowStepType;
  config: Record<string, any>;
  next?: string[];
  error?: string;
  timeout?: number;
};

export type WorkflowStepType =
  | 'action'
  | 'condition'
  | 'delay'
  | 'webhook'
  | 'integration';

export type WorkflowTrigger = {
  type: 'manual' | 'scheduled' | 'event' | 'webhook';
  config: Record<string, any>;
};

export type WorkflowSettings = {
  retry: {
    enabled: boolean;
    maxAttempts: number;
    delay: number;
  };
  timeout: number;
  concurrency: number;
};

// 任务相关
export type Task = {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  type: TaskType;
  tags: string[];
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  dependencies: string[];
  attachments: TaskAttachment[];
  comments: TaskComment[];
  history: TaskHistory[];
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus =
  | 'todo'
  | 'in_progress'
  | 'review'
  | 'done'
  | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskType =
  | 'feature'
  | 'bug'
  | 'improvement'
  | 'documentation'
  | 'research';

export type TaskAttachment = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
};

export type TaskComment = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  mentions: string[];
};

export type TaskHistory = {
  id: string;
  action: string;
  field: string;
  oldValue: any;
  newValue: any;
  userId: string;
  timestamp: string;
};

// 文件相关
export type File = {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  mimeType: string;
  hash: string;
  url: string;
  thumbnailUrl?: string;
  metadata: FileMetadata;
  permissions: FilePermissions;
  uploadedBy: string;
  uploadedAt: string;
  updatedAt: string;
};

export type FileMetadata = {
  width?: number;
  height?: number;
  duration?: number;
  encoding?: string;
  tags: string[];
  description?: string;
};

export type FilePermissions = {
  read: string[];
  write: string[];
  delete: string[];
  share: string[];
};

// 审计相关
export type AuditLog = {
  id: string;
  action: string;
  resourceType: string;
  resourceId: string;
  userId: string;
  userAgent?: string;
  ip?: string;
  details: Record<string, any>;
  timestamp: string;
};

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'read'
  | 'login'
  | 'logout'
  | 'password_change'
  | 'permission_grant'
  | 'permission_revoke'
  | 'export'
  | 'import'
  | 'backup'
  | 'restore';

// 通知相关
export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  recipientId: string;
  senderId?: string;
  resourceType?: string;
  resourceId?: string;
  data?: Record<string, any>;
  status: NotificationStatus;
  priority: NotificationPriority;
  readAt?: string;
  createdAt: string;
  expiresAt?: string;
};

export type NotificationType =
  | 'task_assigned'
  | 'task_completed'
  | 'task_due'
  | 'comment_mentioned'
  | 'project_invite'
  | 'system_alert'
  | 'security_alert'
  | 'update_available';

export type NotificationStatus = 'unread' | 'read' | 'archived';
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent';

// 报告相关
export type Report = {
  id: string;
  name: string;
  description?: string;
  type: ReportType;
  format: ReportFormat;
  schedule?: ReportSchedule;
  filters: ReportFilter[];
  columns: ReportColumn[];
  data: ReportData;
  generatedBy: string;
  generatedAt: string;
  expiresAt?: string;
};

export type ReportType =
  | 'summary'
  | 'detailed'
  | 'analytics'
  | 'audit'
  | 'custom';
export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json' | 'html';

export type ReportSchedule = {
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  time: string;
  timezone: string;
  recipients: string[];
  enabled: boolean;
};

export type ReportFilter = {
  field: string;
  operator: string;
  value: any;
};

export type ReportColumn = {
  name: string;
  label: string;
  type: string;
  sortable: boolean;
  filterable: boolean;
};

export type ReportData = {
  rows: any[];
  total: number;
  summary: Record<string, any>;
  metadata: Record<string, any>;
};
