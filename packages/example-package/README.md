# @imtp/example-package

这是一个示例包，展示了如何在IMTP monorepo中创建和发布npm包。

## 安装

```bash
npm install @imtp/example-package
```

## 使用方法

```typescript
import { greet, Calculator } from '@imtp/example-package';

// 使用greet函数
console.log(greet('World')); // 输出: Hello, World!

// 使用Calculator类
const calc = new Calculator();
console.log(calc.add(5, 3)); // 输出: 8
console.log(calc.multiply(4, 2)); // 输出: 8
```

## API

### `greet(name: string): string`

返回一个问候字符串。

### `Calculator`

计算器类，提供基本的数学运算。

#### 方法

- `add(a: number, b: number): number` - 加法
- `subtract(a: number, b: number): number` - 减法
- `multiply(a: number, b: number): number` - 乘法
- `divide(a: number, b: number): number` - 除法

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 测试
pnpm test
```

## 许可证

MIT
