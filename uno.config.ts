import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  shortcuts: [
    // 自定义快捷方式
    ['btn', 'px-4 py-2 rounded-lg font-medium transition-colors'],
    ['btn-primary', 'btn bg-blue-500 text-white hover:bg-blue-600'],
    ['btn-secondary', 'btn bg-gray-200 text-gray-800 hover:bg-gray-300'],
    ['card', 'bg-white rounded-lg shadow-md p-6'],
    [
      'input',
      'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    ],
  ],
  theme: {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
    },
  },
  rules: [
    // 自定义规则
    [/^text-(.+)$/, ([, c]) => ({ color: c })],
    [/^bg-(.+)$/, ([, c]) => ({ 'background-color': c })],
  ],
  safelist: [
    // 安全列表，确保某些类名不会被清除
    'btn',
    'btn-primary',
    'btn-secondary',
    'card',
    'input',
  ],
});
