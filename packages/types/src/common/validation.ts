// 验证类型定义

// 验证结果
export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
};

// 验证错误
export type ValidationError = {
  field: string;
  message: string;
  code: string;
  value?: any;
};

// 验证警告
export type ValidationWarning = {
  field: string;
  message: string;
  code: string;
  value?: any;
};

// 验证规则
export type ValidationRule<T = any> = {
  type: string;
  value?: T;
  message?: string;
  required?: boolean;
};

// 验证器函数
export type Validator<T = any> = (
  value: T,
  rule?: ValidationRule
) => ValidationResult;

// 验证器配置
export type ValidatorConfig = {
  stopOnFirstError?: boolean;
  includeWarnings?: boolean;
  customMessages?: Record<string, string>;
};

// 字段验证
export type FieldValidation = {
  field: string;
  rules: ValidationRule[];
  required?: boolean;
  custom?: Validator;
};

// 表单验证
export type FormValidation = {
  fields: FieldValidation[];
  config?: ValidatorConfig;
};

// 验证模式
export type ValidationMode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched';

// 验证状态
export type ValidationState = {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
};

// 内置验证规则类型
export type BuiltInValidationRules = {
  required: { required: true };
  email: { type: 'email' };
  url: { type: 'url' };
  min: { type: 'min'; value: number };
  max: { type: 'max'; value: number };
  minLength: { type: 'minLength'; value: number };
  maxLength: { type: 'maxLength'; value: number };
  pattern: { type: 'pattern'; value: RegExp };
  custom: { type: 'custom'; validator: Validator };
};

// 验证规则类型
export type ValidationRuleType = keyof BuiltInValidationRules;

// 验证器接口
export interface IValidator {
  validate<T>(value: T, rules: ValidationRule[]): ValidationResult;
  addRule(name: string, validator: Validator): void;
  removeRule(name: string): void;
  getRule(name: string): Validator | undefined;
}

// 异步验证器
export type AsyncValidator<T = any> = (
  value: T,
  rule?: ValidationRule
) => Promise<ValidationResult>;

// 异步验证结果
export type AsyncValidationResult = Promise<ValidationResult>;

// 验证器工厂
export type ValidatorFactory<T = any> = (config?: any) => Validator<T>;

// 验证器注册表
export type ValidatorRegistry = Record<string, Validator | ValidatorFactory>;

// 验证器上下文
export type ValidationContext = {
  field: string;
  value: any;
  formData?: Record<string, any>;
  config?: ValidatorConfig;
};

// 验证器选项
export type ValidatorOptions = {
  context?: ValidationContext;
  config?: ValidatorConfig;
  customValidators?: ValidatorRegistry;
};

// 验证器链
export type ValidatorChain = {
  add(validator: Validator): ValidatorChain;
  validate<T>(value: T): ValidationResult;
  validateAsync<T>(value: T): AsyncValidationResult;
};

// 验证器组合器
export type ValidatorComposer = {
  and(...validators: Validator[]): Validator;
  or(...validators: Validator[]): Validator;
  not(validator: Validator): Validator;
  optional(validator: Validator): Validator;
};

// 验证器装饰器
export type ValidatorDecorator<T = any> = (
  validator: Validator<T>
) => Validator<T>;

// 验证器中间件
export type ValidatorMiddleware = (
  context: ValidationContext,
  next: () => ValidationResult
) => ValidationResult;

// 验证器管道
export type ValidatorPipeline = {
  use(middleware: ValidatorMiddleware): ValidatorPipeline;
  execute(context: ValidationContext): ValidationResult;
};

// 验证器缓存
export type ValidatorCache = {
  get(key: string): Validator | undefined;
  set(key: string, validator: Validator): void;
  clear(): void;
  has(key: string): boolean;
};

// 验证器性能监控
export type ValidatorPerformance = {
  executionTime: number;
  memoryUsage: number;
  cacheHits: number;
  cacheMisses: number;
};

// 验证器统计
export type ValidatorStats = {
  totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  averageExecutionTime: number;
  performance: ValidatorPerformance;
};
