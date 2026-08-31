# OM 管理端脚手架细节

Agent 创建工程时按本节写布局与登录；主题文件从 `templates/` 拷贝，不要手搓色板。

## 依赖

```json
{
  "dependencies": {
    "@ant-design/icons-vue": "^7.0.1",
    "ant-design-vue": "^4.2.6",
    "axios": "^1.8.4",
    "pinia": "^3.0.3",
    "pinia-plugin-persistedstate": "^4.2.0",
    "vue": "^3.5.13",
    "vue-router": "^4.5.0"
  }
}
```

## 建议目录

```
src/
  styles/          # 模板七件中的 css + theme.ts
  stores/theme.ts
  components/ThemeSwitch.vue
  layouts/BasicLayout.vue
  views/login/LoginView.vue
  views/...        # 业务
  App.vue
  main.ts
index.html
```

## `index.html`

- `lang="zh-CN"`。
- `<head>` 靠前 FOUC：读 `localStorage` 键（默认 `om-color-theme`），仅当值为 `blue|wine|night|oz` 时采用，否则 `blue`。
- 字体：

```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&display=swap
```

脚本原文见 [wiring.md](wiring.md)。

## `main.ts`

顺序：`createApp` → Pinia + persistedstate → **`useThemeStore(pinia).hydrate()`** → router → `app.use(Antd)` → `mount`。

```
import 'ant-design-vue/dist/reset.css'
import './styles/om-theme-style.css'
```

`om-theme-style.css` 已 `@import` wine/dark/oz，不要漏 import 主文件。

## `App.vue`

`a-config-provider`：`locale` 用 `ant-design-vue/es/locale/zh_CN`，`:theme="antdTheme"`（来自 theme store 的 getter）。`onMounted` 再 `hydrate()` 一次。

只有 `<router-view />`，不要再包一层会冲掉 token 的 ConfigProvider。

## 登录页结构

```
.login-page          全屏渐变（radial login-glow + linear login-grad-*）
  .login-stage       grid: 1.2fr + 400–460px，padding 48px 64px
    .login-hero      白字
      .lv-kicker     系统中文名
      .hero-title    一句话价值
      .hero-lede
      .hero-list     li 左侧 accent-2 短条
    .login-panel
      .login-card    panel 底、左 4px accent
        .card-head   简称方块 + 「操作员登录」+ ThemeSwitch light
        表单
```

`.lv-kicker`：`display:inline-block`；`font-family:var(--display)`；`font-size:48px`（≤960px 用 38px）；`::after` `width:100%; height:5px; margin-top:16px; background:var(--kicker)`。

`.hero-title`：约 44px，display 字体，白色。

`.login-card`：`padding:36px`；`border-radius:12px`；`border-left:4px solid var(--accent)`。

登录卡上 `ThemeSwitch` 传 `light`。

业务表单字段按需求；皮肤不要改成居中单列浅灰页。

## 布局签名 CSS（BasicLayout）

侧栏宽 220，`theme="dark"`，自管 collapse。品牌区高 64px：`.sider-mark`（accent 方块 + 2 字简称）+ 系统名。

必须包含这些规则（可用 `var(--*)`，不要换成别的主色）：

```css
.app-layout { height: 100vh; overflow: hidden; background: var(--bg); }
.app-sider {
  background: linear-gradient(180deg, var(--navy-mid) 0%, var(--navy) 40%, var(--navy-deep) 100%) !important;
  box-shadow: inset 3px 0 0 var(--accent);
}
.app-sider :deep(.ant-menu-item-selected) { background: var(--accent) !important; }
.app-header {
  height: 56px;
  background: var(--navy) !important;
  border-bottom: 3px solid var(--accent);
  color: #fff;
}
.app-content {
  margin: 8px 12px 12px;
  padding: 12px 16px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  flex: 1; min-height: 0; overflow: hidden;
  display: flex; flex-direction: column;
}
.user-avatar { background: var(--accent); border-radius: 50%; color: #fff; }
```

顶栏右侧：隐藏的 `ThemeSwitch hide-trigger` + 人员下拉（头像首字、姓名、企业名）。菜单项：「切换风格」调用 `openPicker()`；「退出」。

下拉皮肤用全局 class（已在 `om-theme-style.css`）：`overlay-class-name="user-dropdown"`，菜单 DOM 用 `.user-menu` / `.user-menu-item`。

菜单选中项圆角 8px、左右 margin 约 10px。折叠按钮白色。

## 列表页皮肤

- 页内标题或弹窗标题：`.om-title-mark`（左 3px accent）。
- 筛选区：`.om-query-rail` 或 `.query-rail`。
- 表格走 antd Table；全局表头/hover 已在主题 CSS。暗黑 hover 不要删 `dark-theme-style.css` 里的覆盖。
- 主操作：`a-button type="primary"`（全局已绑 `--accent`）。

多页签（可选）：顶栏与 content 之间一条浅底页签，激活态用 `--accent`。没有页签也可以，侧栏+顶栏+content 不能缺。

## 路由最小集

- `/login` 无布局
- `/` 下 `BasicLayout`，至少一个业务子路由
- 未登录进登录（按用户的鉴权；无后端时可先做静态壳 + 占位登录）

## 验收（创建完成后）

1. 冷启动无白闪错误主题（FOUC 生效）。
2. 登录页系统名下划线与文字同宽。
3. 「切换风格」四套缩略图可选，刷新后仍是所选主题。
4. 科技风/德贝/绿野：浅底工作区 + 深色顶栏侧栏。
5. 暗黑风：整页深底，主按钮字为深色（`--on-accent`），表格行悬停能看出来。
6. 侧栏选中项、顶栏底边、查询条左边条均为当前 `--accent`。
