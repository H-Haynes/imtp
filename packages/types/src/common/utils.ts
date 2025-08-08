// 工具类型定义

// 类型守卫
export type TypeGuard<T> = (value: unknown) => value is T;

// 类型断言
export type TypeAssertion<T> = (value: unknown) => T;

// 类型转换
export type TypeConverter<From, To> = (value: From) => To;

// 类型映射
export type TypeMapper<T, U> = {
  [K in keyof T]: U;
};

// 条件类型
export type ConditionalType<T, U, V> = T extends U ? V : never;

// 联合类型工具
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? [R]
    : never;

// 对象类型工具
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// 函数类型工具
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 异步类型工具
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// 递归类型工具
export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

// 不可变类型工具
export type Immutable<T> = {
  readonly [P in keyof T]: T[P] extends object ? Immutable<T[P]> : T[P];
};

// 可变类型工具
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? Mutable<T[P]> : T[P];
};

// 键值对类型
export type KeyValuePair<K, V> = {
  key: K;
  value: V;
};

// 枚举类型工具
export type EnumValues<T> = T[keyof T];

// 路径类型
export type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? `${K}` | `${K}.${Path<T[K]>}`
        : never;
    }[keyof T]
  : never;

// 深度路径类型
export type DeepPath<T> = T extends object
  ? {
      [K in keyof T]: K extends string | number
        ? `${K}` | `${K}.${DeepPath<T[K]>}`
        : never;
    }[keyof T]
  : never;

// 类型合并
export type Merge<T, U> = Omit<T, keyof U> & U;

// 类型覆盖
export type Override<T, U> = Omit<T, keyof U> & U;

// 类型扩展
export type Extend<T, U> = T & U;

// 类型交集
export type Intersection<T, U> = T & U;

// 类型差集
export type Difference<T, U> = Omit<T, keyof U>;

// 类型对称差集
export type SymmetricDifference<T, U> = Difference<T, U> & Difference<U, T>;

// 类型补集
export type Complement<T, U> = Exclude<keyof U, keyof T>;

// 类型相等
export type Equal<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

// 类型包含
export type Includes<T, U> = U extends T ? true : false;

// 类型长度
export type Length<T extends readonly any[]> = T['length'];

// 类型头部
export type Head<T extends readonly any[]> = T extends [infer H, ...any[]]
  ? H
  : never;

// 类型尾部
export type Tail<T extends readonly any[]> = T extends [any, ...infer R]
  ? R
  : never;

// 类型最后一个
export type Last<T extends readonly any[]> = T extends [...any[], infer L]
  ? L
  : never;

// 类型初始化
export type Init<T extends readonly any[]> = T extends [...infer I, any]
  ? I
  : never;
