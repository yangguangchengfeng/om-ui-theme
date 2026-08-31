import { defineStore } from 'pinia'
import {
  applyColorThemeAttr,
  COLOR_THEME_STORAGE_KEY,
  getAntdTheme,
  readStoredColorTheme,
  type ColorThemeName
} from '@/styles/theme'

/**
 * 界面配色：科技风 / 德贝风 / 暗黑风 / 绿野风，写入 localStorage（om-color-theme）。
 */
export const useThemeStore = defineStore('ui-theme', {
  state: () => ({
    /** 当前配色。 */
    name: readStoredColorTheme() as ColorThemeName
  }),
  getters: {
    /**
     * 当前 Ant Design Vue 主题。
     * @param state 状态
     */
    antdTheme: (state) => getAntdTheme(state.name)
  },
  actions: {
    /**
     * 切换并记住配色。
     * @param name 已登记的配色键
     */
    setTheme(name: ColorThemeName) {
      this.name = name
      localStorage.setItem(COLOR_THEME_STORAGE_KEY, name)
      applyColorThemeAttr(name)
    },
    /**
     * 按当前状态同步 html[data-theme]。
     */
    hydrate() {
      applyColorThemeAttr(this.name)
    }
  }
})
