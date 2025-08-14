# 🔍 Debug 库使用指南

## 概述

本项目已集成 `debug` 库，用于条件调试输出。通过环境变量 `DEBUG` 可以精确控制哪些模块显示调试信息。

## 调试命名空间

项目使用以下调试命名空间：

- `imtp:build` - 构建相关调试信息
- `imtp:test` - 测试相关调试信息
- `imtp:performance` - 性能监控调试信息
- `imtp:security` - 安全监控调试信息
- `imtp:monitor` - 监控系统调试信息
- `imtp:metrics` - 指标收集调试信息
- `imtp:interactive` - 交互式脚本调试信息
- `imtp:menu` - 菜单系统调试信息
- `imtp:command` - 命令执行调试信息

## 使用方法

### 1. 启用所有调试信息

```bash
DEBUG=imtp:* node scripts/monitor.js performance
```

### 2. 只启用特定模块调试

```bash
# 只查看构建相关调试
DEBUG=imtp:build node scripts/monitor.js build

# 只查看测试相关调试
DEBUG=imtp:test node scripts/monitor.js test

# 只查看性能相关调试
DEBUG=imtp:performance node scripts/monitor.js performance
```

### 3. 启用多个模块调试

```bash
# 查看构建和测试调试信息
DEBUG=imtp:build,imtp:test node scripts/monitor.js all

# 查看性能监控和指标收集调试信息
DEBUG=imtp:performance,imtp:metrics node scripts/monitor.js performance
```

### 4. 排除特定模块

```bash
# 启用所有调试，但排除安全模块
DEBUG=imtp:*,-imtp:security node scripts/monitor.js all
```

### 5. 交互式脚本调试

```bash
# 查看交互式脚本的调试信息
DEBUG=imtp:interactive,imtp:menu,imtp:command node scripts/interactive.js
```

## 调试输出示例

### 构建调试输出

```
imtp:build 🔨 开始监控构建性能... +0ms
imtp:build ✅ 构建成功，耗时: 2948ms +3s
imtp:build 📦 开始分析包大小... +1ms
imtp:build 📦 包大小分析完成 +2ms
```

### 性能调试输出

```
imtp:performance ⚡ 开始监控性能... +0ms
imtp:performance 🔍 开始收集构建性能数据... +2ms
imtp:performance ✅ 构建性能数据收集完成 +3s
imtp:performance 🔍 开始收集测试性能数据... +0ms
imtp:performance ✅ 测试性能数据收集完成 +5s
imtp:performance 💡 生成了 1 个性能建议 +0ms
```

### 测试调试输出

```
imtp:test 🧪 开始监控测试... +0ms
imtp:test ✅ 测试成功，耗时: 3790ms +4s
imtp:test 📊 测试时间已记录到性能指标: 3790ms +0ms
imtp:test 📊 覆盖率: 72.83% +0ms
imtp:test 📊 测试统计: 15 通过, 0 失败, 总计 15 +0ms
```

## 性能监控报告

运行性能监控后，会生成包含 ECharts 图表的 HTML 报告：

```bash
# 生成性能报告
node scripts/monitor.js performance

# 打开报告
open performance-report.html
```

### 报告包含的图表

1. **包大小分布图** - 饼图显示各包的大小占比
2. **构建时间对比图** - 柱状图显示各包的构建时间
3. **性能指标雷达图** - 雷达图综合评估各项性能指标

## 最佳实践

1. **开发时**：使用 `DEBUG=imtp:*` 查看所有调试信息
2. **调试特定问题**：只启用相关模块的调试，如 `DEBUG=imtp:build`
3. **生产环境**：不设置 DEBUG 环境变量，避免性能影响
4. **CI/CD**：可以设置 `DEBUG=imtp:performance` 来监控构建性能

## 环境变量持久化

可以将常用的调试配置添加到 shell 配置文件中：

```bash
# 添加到 ~/.zshrc 或 ~/.bashrc
export DEBUG=imtp:build,imtp:test,imtp:performance
```

## 注意事项

- 调试信息只在设置了 `DEBUG` 环境变量时输出
- 生产环境中不设置 `DEBUG` 时，调试代码不会执行，不影响性能
- 调试信息包含时间戳，显示距离上次调用的时间间隔
- 不同模块使用不同颜色区分，便于识别
