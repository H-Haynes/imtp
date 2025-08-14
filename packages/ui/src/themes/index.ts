/**
 * IMTP UI 主题系统
 */

// 主题类型定义
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
    divider: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// 默认亮色主题
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    background: '#ffffff',
    surface: '#f9fafb',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      disabled: '#9ca3af',
    },
    border: '#e5e7eb',
    divider: '#f3f4f6',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      h1: '2.25rem',
      h2: '1.875rem',
      h3: '1.5rem',
      h4: '1.25rem',
      h5: '1.125rem',
      h6: '1rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

// 暗色主题
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    primary: '#60a5fa',
    secondary: '#9ca3af',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#22d3ee',
    background: '#111827',
    surface: '#1f2937',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      disabled: '#6b7280',
    },
    border: '#374151',
    divider: '#374151',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
  },
  breakpoints: lightTheme.breakpoints,
};

// 主题管理器
export class ThemeManager {
  private currentTheme: Theme;
  private themes: Map<string, Theme>;

  constructor() {
    this.themes = new Map();
    this.themes.set('light', lightTheme);
    this.themes.set('dark', darkTheme);

    // 从本地存储或系统偏好获取主题
    this.currentTheme =
      this.getStoredTheme() || this.getSystemTheme() || lightTheme;
    this.applyTheme(this.currentTheme);
  }

  // 获取存储的主题
  private getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('imtp-theme');
    if (stored && this.themes.has(stored)) {
      return this.themes.get(stored)!;
    }
    return null;
  }

  // 获取系统主题偏好
  private getSystemTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? darkTheme : lightTheme;
  }

  // 应用主题
  private applyTheme(theme: Theme) {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // 应用颜色变量
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--color-${key}`, value);
      }
    });

    // 应用间距变量
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // 应用字体变量
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });
    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value.toString());
    });

    // 应用圆角变量
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    // 应用阴影变量
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // 设置主题类名
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme.name}`);
  }

  // 切换主题
  toggleTheme() {
    const newTheme =
      this.currentTheme.name === 'light' ? darkTheme : lightTheme;
    this.setTheme(newTheme);
  }

  // 设置主题
  setTheme(theme: Theme | string) {
    let targetTheme: Theme;

    if (typeof theme === 'string') {
      targetTheme = this.themes.get(theme) || lightTheme;
    } else {
      targetTheme = theme;
    }

    this.currentTheme = targetTheme;
    this.applyTheme(targetTheme);

    // 保存到本地存储
    if (typeof window !== 'undefined') {
      localStorage.setItem('imtp-theme', targetTheme.name);
    }
  }

  // 获取当前主题
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  // 获取所有可用主题
  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  // 注册新主题
  registerTheme(theme: Theme) {
    this.themes.set(theme.name, theme);
  }
}

// 创建全局主题管理器实例
export const themeManager = new ThemeManager();

// 导出主题相关的工具函数
export const createTheme = (overrides: Partial<Theme>): Theme => {
  return {
    ...lightTheme,
    ...overrides,
  };
};

export const getThemeValue = (path: string): string => {
  const keys = path.split('.');
  let value: any = themeManager.getCurrentTheme();

  for (const key of keys) {
    value = value[key];
    if (value === undefined) break;
  }

  return value || '';
};
