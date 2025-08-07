// utils 包的主入口文件

export function hello(name: string): string {
  return `Hello from utils, ${name}!`;
}

// 默认导出
export default {
  hello,
};
