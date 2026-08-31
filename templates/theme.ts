import { theme } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

/** 可选配色主题。 */
export type ColorThemeName = 'blue' | 'wine' | 'night' | 'oz'

/** 合法主题键，解析存储值时使用。 */
const THEME_KEYS: ColorThemeName[] = ['blue', 'wine', 'night', 'oz']

/** 风格展示名、说明与存储键。 */
export const COLOR_THEMES: { name: ColorThemeName; label: string; desc: string }[] = [
  { name: 'blue', label: '科技风', desc: '钢蓝工作台，信号蓝点缀' },
  { name: 'wine', label: '德贝风', desc: '酒红主色，稳重商务' },
  { name: 'night', label: '暗黑风', desc: '炭黑台面，暖铜点缀' },
  { name: 'oz', label: '绿野风', desc: '翡翠城绿，黄砖点缀' }
]

/** 本地存储键，供首屏脚本与 Pinia 共用。 */
export const COLOR_THEME_STORAGE_KEY = 'om-color-theme'

/**
 * 把存储值规范成合法主题名；非法值回退科技风。
 * @param value localStorage 或 html 上的原始值
 */
export function parseColorThemeName(value: string | null | undefined): ColorThemeName {
  return THEME_KEYS.includes(value as ColorThemeName) ? (value as ColorThemeName) : 'blue'
}

/**
 * 从存储读取主题；非法值回退科技风。
 */
export function readStoredColorTheme(): ColorThemeName {
  try {
    return parseColorThemeName(localStorage.getItem(COLOR_THEME_STORAGE_KEY))
  } catch {
    return 'blue'
  }
}

/**
 * 把主题写到 html[data-theme]，驱动各主题 CSS。
 * @param name 主题名
 */
export function applyColorThemeAttr(name: ColorThemeName) {
  document.documentElement.setAttribute('data-theme', name)
}

/** 单套主题对应的 Ant Design token 色板。 */
interface AntdPalette {
  /** 主色。 */
  primary: string
  /** 悬停色。 */
  hover: string
  /** 顶栏/侧栏底。 */
  navy: string
  /** 布局底。 */
  layout: string
  /** 边框。 */
  border: string
  /** 表头底。 */
  headerBg: string
  /** 侧栏触发底。 */
  menuHover: string
  /** 正文。 */
  text: string
  /** 次要文字。 */
  textSecondary: string
  /** 容器底。 */
  container: string
  /** 表头文字。 */
  heading: string
}

const PALETTES: Record<ColorThemeName, AntdPalette> = {
  blue: {
    primary: '#1F6FEB',
    hover: '#3D8BFF',
    navy: '#0F2744',
    layout: '#EEF3F9',
    border: '#C5D4E6',
    headerBg: '#E8F1FB',
    menuHover: '#163A5C',
    text: '#1A2332',
    textSecondary: '#5B6778',
    container: '#FFFFFF',
    heading: '#4A5A70'
  },
  wine: {
    primary: '#94243A',
    hover: '#C44A62',
    navy: '#4A1520',
    layout: '#F7F1F2',
    border: '#D4B8BD',
    headerBg: '#F3E6E9',
    menuHover: '#5C1D2A',
    text: '#2A1418',
    textSecondary: '#6B5358',
    container: '#FFFFFF',
    heading: '#6A4A50'
  },
  night: {
    primary: '#E08B4D',
    hover: '#F0B07A',
    navy: '#080706',
    layout: '#0C0B0A',
    border: '#2E2924',
    headerBg: '#1C1916',
    menuHover: '#100E0C',
    text: '#F0E6D8',
    textSecondary: '#A89888',
    container: '#141210',
    heading: '#C4B4A4'
  },
  oz: {
    primary: '#147A4E',
    hover: '#1A9A62',
    navy: '#0A3D2A',
    layout: '#EAF3E4',
    border: '#A8C498',
    headerBg: '#E3EED8',
    menuHover: '#0F4F36',
    text: '#1A2E22',
    textSecondary: '#5A6E5E',
    container: '#FFFFFF',
    heading: '#3D5C48'
  }
}

/**
 * 按主色组装 Ant Design Vue token。
 * @param name 主题名
 */
export function getAntdTheme(name: ColorThemeName): ThemeConfig {
  const pal = PALETTES[name] ?? PALETTES.blue
  const dark = name === 'night'
  return {
    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: pal.primary,
      colorInfo: pal.hover,
      colorSuccess: dark ? '#3DCEC0' : '#2BA3C7',
      colorWarning: '#D4A017',
      colorError: dark ? '#E85D5D' : '#D63B4A',
      colorText: pal.text,
      colorTextSecondary: pal.textSecondary,
      colorBgLayout: pal.layout,
      colorBgContainer: pal.container,
      colorBgElevated: dark ? pal.headerBg : pal.container,
      colorBorder: pal.border,
      colorPrimaryHover: pal.hover,
      borderRadius: 8,
      fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
      fontSize: 14,
      controlHeight: 36,
      controlHeightLG: 40
    },
    components: {
      Button: {
        borderRadius: 8,
        controlHeight: 36,
        fontWeightStrong: 500
      },
      Input: {
        borderRadius: 8,
        colorBgContainer: pal.container
      },
      Select: {
        borderRadius: 8,
        colorBgContainer: pal.container
      },
      Table: {
        colorFillAlter: pal.headerBg,
        colorTextHeading: pal.heading,
        colorBgContainer: pal.container
      },
      Drawer: {
        paddingLG: 24,
        colorBgElevated: pal.container
      },
      Modal: {
        fontSizeHeading5: 16,
        borderRadiusLG: 10
      },
      Layout: {
        colorBgHeader: pal.navy,
        colorBgBody: pal.layout,
        colorBgTrigger: pal.menuHover
      }
    }
  }
}

/** 默认科技风，兼容旧引用。 */
export const antdTheme = getAntdTheme('blue')
