---
name: om-ui-theme
description: >-
  Scaffolds a Vue 3 + TypeScript + Vite + Ant Design Vue 4 admin with the
  OrderManagement (OM-2026) four-theme UI: 科技风 blue, 德贝风 wine, 暗黑风 night,
  绿野风 oz, ThemeSwitch, login hero, navy sider. Use when creating a new
  Vue 3 Ant Design Vue 管理端, cloning OM visual style, 切换风格, html[data-theme],
  om-color-theme, or asking for 和订单系统一样的风格.
---

# OM 管理端视觉壳（Vue 3 + Ant Design Vue）

在**新建** Vue 3 + Ant Design Vue 管理端时，按本 Skill **搭出与订单管理系统同一套皮肤的壳**（登录、侧栏、顶栏、工作区、四套可切换主题）。业务页面、接口、权限按用户需求另写。

**禁止**用 `frontend-design` 另起色板。色值、组件接线、布局签名以本目录为准。

读完本文件后按需打开：

- [scaffold.md](scaffold.md) — 工程清单、布局/登录 CSS 签名、验收
- [palettes.md](palettes.md) — 四套 CSS 变量与 Ant Design token
- [wiring.md](wiring.md) — 运行时接线
- [templates/](templates/) — **原样拷贝**的主题源文件

## 触发后立刻做

1. 问清（用户已给则不要再问）：系统中文名、侧栏 2 字简称、默认路由、是否要多页签。
2. 用 Vite + Vue 3 + TypeScript 建前端工程（已有工程则只补皮肤，不要拆掉业务）。
3. **先拷贝 `templates/`，再改文案**。不要凭记忆重写 `theme.ts` / 四套 CSS / `ThemeSwitch.vue`。
4. 业务色只写 CSS 变量，禁止页面里写死 `#1F6FEB`。
5. 未点名不要加第五套主题，不要给 Message/Modal 再包一层皮肤。

## 技术栈（与 OM 对齐）

| 项 | 选型 |
|----|------|
| 框架 | Vue 3 `<script setup>` + TypeScript |
| 构建 | Vite |
| UI | ant-design-vue **^4** + `@ant-design/icons-vue` |
| 状态 | Pinia + `pinia-plugin-persistedstate` |
| 路由 | vue-router 4 |
| 入口 CSS | `ant-design-vue/dist/reset.css` + `om-theme-style.css` |

依赖版本以源项目 `package.json` 为参考：Vue ~3.5、antd-vue ~4.2、Pinia 3。

## 模板落点

把 `templates/` 拷进新项目（文件名可保持）：

| 模板 | 目标 |
|------|------|
| `theme.ts` | `src/styles/theme.ts` |
| `om-theme-style.css` | `src/styles/om-theme-style.css` |
| `wine-theme-style.css` | `src/styles/wine-theme-style.css` |
| `dark-theme-style.css` | `src/styles/dark-theme-style.css` |
| `oz-theme-style.css` | `src/styles/oz-theme-style.css` |
| `theme.store.ts` | `src/stores/theme.ts` |
| `ThemeSwitch.vue` | `src/components/ThemeSwitch.vue` |

存储键默认 `om-color-theme`。若用户要独立键（如 `erp-color-theme`），**同时改** `theme.ts` 的 `COLOR_THEME_STORAGE_KEY` 与 `index.html` 内联脚本，二者必须一致。

## 创建顺序

```
Task Progress:
- [ ] Vite Vue TS 工程 + 上表依赖
- [ ] 拷贝 templates/ 七个文件
- [ ] index.html：FOUC + Noto 字体
- [ ] main.ts：reset.css、主题 CSS、Pinia、hydrate、Antd、router
- [ ] App.vue：ConfigProvider locale=zhCN + :theme="antdTheme"
- [ ] 登录页：渐变左栏 + 白卡 + ThemeSwitch light + .lv-kicker
- [ ] BasicLayout：navy 侧栏/顶栏、工作区卡片、人员菜单「切换风格」
- [ ] 列表页至少一页：查询条 .om-query-rail + 表 + .om-title-mark
- [ ] 浏览器切四套主题验收登录与布局
```

## 四套主题（键名不可改）

| 键 | 名 | accent | navy |
|----|-----|--------|------|
| `blue` | 科技风 | `#1F6FEB` | `#0F2744` |
| `wine` | 德贝风 | `#94243A` | `#4A1520` |
| `night` | 暗黑风 | `#E08B4D` | `#080706` |
| `oz` | 绿野风 | `#147A4E` | `#0A3D2A` |

非法存储值回退 `blue`。绿野 `--accent-2` 是黄砖 `#D4A017`。暗黑用 `darkAlgorithm`、`color-scheme: dark`、`--on-accent` 深色字。

选择器文案固定：科技风 / 德贝风 / 暗黑风 / 绿野风；desc 见 `COLOR_THEMES`。弹窗标题「选择系统风格」。

## 签名样式（缺一则不像 OM）

1. `html[data-theme]` + FOUC 脚本 + `getAntdTheme` + Pinia。
2. 侧栏：纵向 navy 渐变 + **内侧 3px accent 竖条**；选中菜单项 accent 底。
3. 顶栏：navy 底 + **底边 3px accent**；头像圆钮 accent。
4. 内容区：`--panel` 卡片，圆角 `--radius`（10px）。
5. 登录全屏渐变；`.lv-kicker` 48px、`inline-block`、`::after { width:100% }`。
6. 查询条左边 4px accent（`.om-query-rail`）；区块标题 `.om-title-mark`。
7. 标题字体 Noto Serif SC，正文 Noto Sans SC。

布局/登录完整 CSS 约束见 [scaffold.md](scaffold.md)。

## 不要做的

- 不要 ProComponents / 紫色 Ant Design 默认主色当成品。
- 不要只改 `colorPrimary` 却不写 CSS 变量与四套 `data-theme`。
- 不要把登录做成居中单卡片浅灰底（必须是渐变分栏）。
- 不要跳过暗黑表格 hover 覆盖（已在 `dark-theme-style.css` 模板里）。
