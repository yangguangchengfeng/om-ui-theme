# OM 主题接线

创建新管理端时，**先拷贝本 Skill 的 `templates/`**，不要从记忆重写色板。

源项目对照：`OrderManagement-Vue/`。新项目按同职责拆文件即可。

## 文件

| 职责 | 源文件 |
|------|--------|
| 类型、解析、Ant Design token | `src/styles/theme.ts` |
| 科技风 + 全局覆盖 + `@import` 其它主题 | `src/styles/om-theme-style.css` |
| 德贝 / 暗黑 / 绿野 变量（及 night 表格覆盖） | `wine-theme-style.css` `dark-theme-style.css` `oz-theme-style.css` |
| Pinia | `src/stores/theme.ts` |
| 选择器 UI | `src/components/ThemeSwitch.vue` |
| ConfigProvider | `src/App.vue` |
| FOUC | `index.html` 内联脚本 |
| 登录签名排版 | `src/views/login/LoginView.vue`（`.lv-kicker`） |

在 `main.ts` 引入主题 CSS（源项目在入口或布局中 import `om-theme-style.css`）。

## FOUC（`index.html` `<head>` 靠前）

```html
<script>
  (function () {
    try {
      var t = localStorage.getItem('om-color-theme')
      var ok = t === 'wine' || t === 'night' || t === 'oz' || t === 'blue'
      document.documentElement.setAttribute('data-theme', ok ? t : 'blue')
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'blue')
    }
  })()
</script>
```

存储键与 `COLOR_THEME_STORAGE_KEY` 必须相同。

## Store

- `name`: `readStoredColorTheme()`
- getter `antdTheme` → `getAntdTheme(state.name)`
- `setTheme(name)`：写 state、localStorage、`applyColorThemeAttr`
- `hydrate()`：按 state 再设一次 `data-theme`（`App` `onMounted`）

## ConfigProvider

```vue
<a-config-provider :locale="zhCN" :theme="antdTheme">
  <router-view />
</a-config-provider>
```

不要用静态 `antdTheme` 常量包全站；必须跟 store 的计算属性走。

## ThemeSwitch

- 默认按钮文案「切换风格」，图标皮肤。
- `light`：登录浅色卡上用实心按钮。
- `hideTrigger` + `defineExpose({ openPicker })`：顶栏菜单只弹窗。
- Modal：`centered`，`footer=null`，宽约 900，`wrap-class-name="theme-picker-modal"`。
- 缩略图 class：`thumb-blue` `thumb-wine` `thumb-night` `thumb-oz`（在 ThemeSwitch 内写死四套迷你色，与 palettes 一致）。

## `getAntdTheme` 组件覆盖要点

- Table：`colorFillAlter` = headerBg，`colorTextHeading` = heading，`colorBgContainer` = container
- Layout：`colorBgHeader` = navy，`colorBgBody` = layout，`colorBgTrigger` = menuHover
- Drawer：`colorBgElevated` = container
- Button/Input/Select：`borderRadius` 8，容器底 = container
- Modal：`fontSizeHeading5` 16，`borderRadiusLG` 10

## 全局 CSS 必覆盖（科技风文件内）

- `.ant-btn-primary` → accent + btn-shadow
- 输入框 focus → `box-shadow: 0 0 0 3px var(--input-ring)`
- `.ant-table-thead > tr > th` → panel-2 + table-head-ink
- `.ant-pagination-item-active` → accent 底，字 `var(--on-accent)`
- `.om-title-mark` / `.block-title` / `.modal-drag-handle` → 左 3px accent 条

暗黑风额外选择器见源 `dark-theme-style.css`（表格 hover、部分 Ant 默认浅底）。

## 登录栅格（可按屏宽改数字，结构不要丢）

左 hero + 右表单：`grid-template-columns: minmax(0, 1.2fr) minmax(400px, 460px)`；左栏白字叠在 navy→accent 渐变上。
