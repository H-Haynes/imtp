import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        // 性能优化
        cacheLifetime: {
          glob: 'Infinity',
        },
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // Node.js 全局变量
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        // Node.js 类型
        NodeJS: 'readonly',
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        // React 全局变量
        React: 'readonly',
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript 严格规则
      '@typescript-eslint/no-unused-vars': 'off', // 允许未使用的变量
      'no-unused-vars': 'off', // 关闭基础规则，使用 TypeScript 版本
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/return-await': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/prefer-string-starts-ends-with': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',

      // 通用规则
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'prefer-promise-reject-errors': 'error',

      // 性能优化规则
      'no-await-in-loop': 'warn',
      'no-promise-executor-return': 'error',
    },
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off', // 允许未使用的变量
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // 浏览器环境
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        // Vue 全局变量
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        // Vue 3 组合式 API
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        onUpdated: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        onBeforeUpdate: 'readonly',
        nextTick: 'readonly',
        // Vue 3 工具函数
        toRef: 'readonly',
        toRefs: 'readonly',
        unref: 'readonly',
        isRef: 'readonly',
        // Vue 3 生命周期
        onErrorCaptured: 'readonly',
        onRenderTracked: 'readonly',
        onRenderTriggered: 'readonly',
        onActivated: 'readonly',
        onDeactivated: 'readonly',
        // Vue 3 注入
        provide: 'readonly',
        inject: 'readonly',
        // Vue 3 模板引用
        templateRef: 'readonly',
        // Vue 3 其他
        markRaw: 'readonly',
        shallowRef: 'readonly',
        shallowReactive: 'readonly',
        readonly: 'readonly',
        isReadonly: 'readonly',
        isProxy: 'readonly',
        isReactive: 'readonly',
        toRaw: 'readonly',
        // Vitest 全局变量
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      vue,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'off', // 允许未使用的变量
    },
  },
  {
    files: ['**/tests/**/*.ts', '**/tests/**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 不要求项目解析，避免 tsconfig 问题
        project: null,
      },
      globals: {
        // Vitest 全局变量
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        // Node.js 全局变量
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
      // 禁用需要类型信息的规则
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-array-constructor': 'off',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/prefer-includes': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
    },
  },
  {
    files: ['**/vite.config.ts', '**/vitest.config.ts', '**/*.config.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // 不要求项目解析，避免 tsconfig 问题
        project: null,
      },
      globals: {
        // Node.js 全局变量
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
      // 禁用需要类型信息的规则
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-array-constructor': 'off',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/prefer-includes': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
    },
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '*.js',
      '*.cjs',
      '.husky/',
      '**/*.config.ts',
      'uno.config.ts',
      'vitest.config.ts',
      '.lintstagedrc.js',
      // types 包中的示例代码和生成文件
      'packages/types/src/generated/',
      'packages/types/src/api/generated/',
      'packages/types/src/database/generated/',
      'packages/types/src/config/generated/',
      'packages/types/src/api/graphql.ts',
      'packages/types/src/api/rest.ts',
      'packages/types/src/api/websocket.ts',
      'packages/types/src/common/utils.ts',
      'packages/types/src/common/validation.ts',
      'packages/types/src/shared/business.ts',
      'packages/types/src/shared/events.ts',
      'packages/types/src/shared/storage.ts',
      'packages/types/src/shared/ui.ts',
      'packages/types/src/shared/ui-simple.ts',
    ],
    // 抑制忽略文件的警告
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
      noInlineConfig: false,
    },
  },
];
