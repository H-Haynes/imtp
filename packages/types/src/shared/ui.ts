// UI 相关类型定义

// 主题相关
export type Theme = {
  name: string;
  type: 'light' | 'dark' | 'auto';
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  breakpoints: ThemeBreakpoints;
  animations: ThemeAnimations;
};

export type ThemeColors = {
  primary: ColorPalette;
  secondary: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  info: ColorPalette;
  neutral: ColorPalette;
  background: ColorPalette;
  surface: ColorPalette;
  text: ColorPalette;
  border: ColorPalette;
};

export type ColorPalette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  contrast: string;
};

export type ThemeTypography = {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
};

export type ThemeSpacing = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
  40: string;
  48: string;
  56: string;
  64: string;
};

export type ThemeBorderRadius = {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
};

export type ThemeShadows = {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
};

export type ThemeBreakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
};

export type ThemeAnimations = {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easing: {
    linear: string;
    ease: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
  };
  keyframes: Record<string, any>;
};

// 导入React类型
import type { CSSProperties as ReactCSSProperties, ReactNode } from 'react';

// 组件相关
export type ComponentProps<T = any> = {
  className?: string;
  style?: ReactCSSProperties;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
  [key: string]: any;
} & T;

export type ComponentState = {
  loading?: boolean;
  disabled?: boolean;
  error?: string | null;
  success?: boolean;
  focused?: boolean;
  hovered?: boolean;
  active?: boolean;
  expanded?: boolean;
  selected?: boolean;
};

export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'ghost'
  | 'outline';

// 表单相关
export type FormField<T = any> = {
  name: string;
  label?: string;
  placeholder?: string;
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  multiple?: boolean;
  accept?: string;
  size?: ComponentSize;
  variant?: ComponentVariant;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export type FormValidation = {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirty: Record<string, boolean>;
};

export type FormConfig = {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnSubmit?: boolean;
  reValidateOnChange?: boolean;
  reValidateOnBlur?: boolean;
  reValidateOnSubmit?: boolean;
  validateOnMount?: boolean;
  validateOnFocus?: boolean;
  validateOnInput?: boolean;
  validateOnTouch?: boolean;
  validateOnUpdate?: boolean;
};

// 布局相关
export type LayoutDirection = 'ltr' | 'rtl';
export type LayoutMode = 'static' | 'fluid' | 'boxed';
export type LayoutTheme = 'light' | 'dark' | 'auto';

export type LayoutConfig = {
  direction: LayoutDirection;
  mode: LayoutMode;
  theme: LayoutTheme;
  sidebar: SidebarConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  content: ContentConfig;
};

export type SidebarConfig = {
  visible: boolean;
  collapsed: boolean;
  width: number;
  collapsedWidth: number;
  position: 'left' | 'right';
  theme: 'light' | 'dark';
  fixed: boolean;
  overlay: boolean;
  breakpoint: string;
};

export type HeaderConfig = {
  visible: boolean;
  height: number;
  fixed: boolean;
  theme: 'light' | 'dark';
  transparent: boolean;
  shadow: boolean;
};

export type FooterConfig = {
  visible: boolean;
  height: number;
  fixed: boolean;
  theme: 'light' | 'dark';
  transparent: boolean;
  shadow: boolean;
};

export type ContentConfig = {
  padding: number;
  maxWidth: number;
  centered: boolean;
  fluid: boolean;
};

// 导航相关
export type NavigationItem = {
  id: string;
  title: string;
  path?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  children?: NavigationItem[];
  meta?: Record<string, any>;
};

export type NavigationConfig = {
  items: NavigationItem[];
  mode: 'vertical' | 'horizontal' | 'inline';
  theme: 'light' | 'dark';
  collapsed: boolean;
  accordion: boolean;
  multiple: boolean;
};

export type BreadcrumbItem = {
  title: string;
  path?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

// 模态框相关
export type ModalConfig = {
  visible: boolean;
  title?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  keyboard?: boolean;
  destroyOnClose?: boolean;
  zIndex?: number;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  wrapClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  onOk?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
};

// 通知相关
export type NotificationConfig = {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  description?: string;
  duration?: number;
  placement?:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'topCenter'
    | 'bottomCenter';
  closable?: boolean;
  showClose?: boolean;
  icon?: React.ReactNode;
  btn?: React.ReactNode;
  key?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
};

// 表格相关
export type TableColumn<T = any> = {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
  filters?: TableFilter[];
  onFilter?: (value: any, record: T) => boolean;
  children?: TableColumn<T>[];
};

export type TableFilter = {
  text: string;
  value: any;
  children?: TableFilter[];
};

export type TableConfig<T = any> = {
  dataSource: T[];
  columns: TableColumn<T>[];
  rowKey?: string | ((record: T) => string);
  pagination?: TablePagination | false;
  loading?: boolean;
  bordered?: boolean;
  size?: ComponentSize;
  tableLayout?: 'auto' | 'fixed';
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  expandable?: TableExpandable<T>;
  rowSelection?: TableRowSelection<T>;
  onRow?: (
    record: T,
    index: number
  ) => React.HTMLAttributes<HTMLTableRowElement>;
  onChange?: (
    pagination: TablePagination,
    filters: Record<string, any>,
    sorter: any
  ) => void;
};

export type TablePagination = {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  pageSizeOptions?: string[];
  position?: 'top' | 'bottom' | 'both';
  size?: ComponentSize;
  simple?: boolean;
  responsive?: boolean;
  hideOnSinglePage?: boolean;
};

export type TableExpandable<T = any> = {
  expandedRowKeys?: string[];
  defaultExpandedRowKeys?: string[];
  expandedRowRender?: (
    record: T,
    index: number,
    indent: number,
    expanded: boolean
  ) => React.ReactNode;
  expandRowByClick?: boolean;
  expandIcon?: (props: any) => React.ReactNode;
  onExpand?: (expanded: boolean, record: T) => void;
  onExpandedRowsChange?: (expandedRows: T[]) => void;
};

export type TableRowSelection<T = any> = {
  selectedRowKeys?: string[];
  defaultSelectedRowKeys?: string[];
  type?: 'checkbox' | 'radio';
  preserveSelectedRowKeys?: boolean;
  selections?: TableSelection[];
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void;
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void;
  getCheckboxProps?: (record: T) => any;
  columnWidth?: number | string;
  fixed?: boolean;
  hideSelectAll?: boolean;
};

export type TableSelection = {
  key: string;
  text: string;
  onSelect?: (changeableRowKeys: string[]) => void;
};

// 图表相关
export type ChartConfig = {
  type: ChartType;
  data: ChartData;
  options: ChartOptions;
  width?: number | string;
  height?: number | string;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: ChartPlugin[];
  events?: ChartEvent[];
};

export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'bubble'
  | 'scatter';

export type ChartData = {
  labels?: string[];
  datasets: ChartDataset[];
};

export type ChartDataset = {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
  [key: string]: any;
};

export type ChartOptions = {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: Record<string, any>;
  scales?: Record<string, any>;
  elements?: Record<string, any>;
  animation?: Record<string, any>;
  interaction?: Record<string, any>;
  [key: string]: any;
};

export type ChartPlugin = {
  id: string;
  beforeInit?: (chart: any) => void;
  afterInit?: (chart: any) => void;
  beforeUpdate?: (chart: any) => void;
  afterUpdate?: (chart: any) => void;
  beforeRender?: (chart: any) => void;
  afterRender?: (chart: any) => void;
  beforeDraw?: (chart: any) => void;
  afterDraw?: (chart: any) => void;
  beforeDatasetsDraw?: (chart: any) => void;
  afterDatasetsDraw?: (chart: any) => void;
  beforeDatasetDraw?: (chart: any) => void;
  afterDatasetDraw?: (chart: any) => void;
  beforeTooltipDraw?: (chart: any) => void;
  afterTooltipDraw?: (chart: any) => void;
  beforeEvent?: (chart: any) => void;
  afterEvent?: (chart: any) => void;
  resize?: (chart: any) => void;
  destroy?: (chart: any) => void;
};

export type ChartEvent = {
  type: string;
  handler: (event: any) => void;
};
