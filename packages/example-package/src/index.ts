// 示例工具函数
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 示例类
export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }
}

// 默认导出
export default {
  greet,
  Calculator,
};
